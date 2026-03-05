-- Pollnion Client Database Triggers
-- Audit logging and denormalized count management

-- ========================================
-- AUDIT LOG TRIGGER FUNCTION
-- ========================================
CREATE OR REPLACE FUNCTION public.audit_log_changes()
RETURNS TRIGGER AS $$
DECLARE
  v_record_id UUID;
  v_action TEXT;
  v_old_values JSONB;
  v_new_values JSONB;
  v_changed_by UUID;
BEGIN
  -- Determine action type
  IF TG_OP = 'INSERT' THEN
    v_action := 'INSERT';
    v_record_id := NEW.id;
    v_new_values := row_to_json(NEW)::JSONB;
    v_old_values := NULL;
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'UPDATE';
    v_record_id := NEW.id;
    v_new_values := row_to_json(NEW)::JSONB;
    v_old_values := row_to_json(OLD)::JSONB;
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'DELETE';
    v_record_id := OLD.id;
    v_new_values := NULL;
    v_old_values := row_to_json(OLD)::JSONB;
  END IF;

  -- Get current user if available
  v_changed_by := auth.uid();

  -- Insert audit log entry
  INSERT INTO public.audit_log (
    table_name,
    record_id,
    action,
    changed_by,
    old_values,
    new_values
  ) VALUES (
    TG_TABLE_NAME,
    v_record_id,
    v_action,
    v_changed_by,
    v_old_values,
    v_new_values
  );

  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- AUDIT TRIGGERS FOR CORE TABLES
-- ========================================
DROP TRIGGER IF EXISTS audit_profiles_changes ON public.profiles;
CREATE TRIGGER audit_profiles_changes
AFTER INSERT OR UPDATE OR DELETE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.audit_log_changes();

DROP TRIGGER IF EXISTS audit_polls_changes ON public.polls;
CREATE TRIGGER audit_polls_changes
AFTER INSERT OR UPDATE OR DELETE ON public.polls
FOR EACH ROW EXECUTE FUNCTION public.audit_log_changes();

DROP TRIGGER IF EXISTS audit_votes_changes ON public.votes;
CREATE TRIGGER audit_votes_changes
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW EXECUTE FUNCTION public.audit_log_changes();

DROP TRIGGER IF EXISTS audit_follows_changes ON public.follows;
CREATE TRIGGER audit_follows_changes
AFTER INSERT OR UPDATE OR DELETE ON public.follows
FOR EACH ROW EXECUTE FUNCTION public.audit_log_changes();

-- ========================================
-- DENORMALIZED COUNT UPDATE TRIGGERS
-- ========================================

-- Update total_votes count on polls when votes are added/removed
CREATE OR REPLACE FUNCTION public.update_poll_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.deleted_at IS NULL THEN
    UPDATE public.polls
    SET total_votes = total_votes + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.poll_id AND deleted_at IS NULL;
  ELSIF TG_OP = 'DELETE' AND OLD.deleted_at IS NULL THEN
    UPDATE public.polls
    SET total_votes = GREATEST(total_votes - 1, 0),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.poll_id AND deleted_at IS NULL;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_poll_vote_count_trigger ON public.votes;
CREATE TRIGGER update_poll_vote_count_trigger
AFTER INSERT OR DELETE ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_poll_vote_count();

-- Update follower_count on profiles when follows are added/removed
CREATE OR REPLACE FUNCTION public.update_follower_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.deleted_at IS NULL THEN
    -- Increment follower_count for the person being followed
    UPDATE public.profiles
    SET follower_count = follower_count + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.following_id AND deleted_at IS NULL;

    -- Increment following_count for the person following
    UPDATE public.profiles
    SET following_count = following_count + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.follower_id AND deleted_at IS NULL;
  ELSIF TG_OP = 'DELETE' AND OLD.deleted_at IS NULL THEN
    -- Decrement follower_count for the person being followed
    UPDATE public.profiles
    SET follower_count = GREATEST(follower_count - 1, 0),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.following_id AND deleted_at IS NULL;

    -- Decrement following_count for the person following
    UPDATE public.profiles
    SET following_count = GREATEST(following_count - 1, 0),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.follower_id AND deleted_at IS NULL;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_follower_count_trigger ON public.follows;
CREATE TRIGGER update_follower_count_trigger
AFTER INSERT OR DELETE ON public.follows
FOR EACH ROW
EXECUTE FUNCTION public.update_follower_count();

-- Update profile updated_at when profile changes
CREATE OR REPLACE FUNCTION public.update_profile_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profile_timestamp_trigger ON public.profiles;
CREATE TRIGGER update_profile_timestamp_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_profile_timestamp();

-- Update polls updated_at when poll changes
CREATE OR REPLACE FUNCTION public.update_poll_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_poll_timestamp_trigger ON public.polls;
CREATE TRIGGER update_poll_timestamp_trigger
BEFORE UPDATE ON public.polls
FOR EACH ROW
EXECUTE FUNCTION public.update_poll_timestamp();
