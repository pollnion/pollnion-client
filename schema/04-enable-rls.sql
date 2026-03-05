-- Pollnion Client Row Level Security (RLS) Policies
-- Data access control for all tables

-- ========================================
-- ENABLE RLS ON ALL TABLES
-- ========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ========================================
-- PROFILES POLICIES
-- ========================================

-- Policy: Authenticated users can read all non-deleted profiles
DROP POLICY IF EXISTS profiles_select_policy ON public.profiles;
CREATE POLICY profiles_select_policy ON public.profiles
  FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Policy: Users can update their own profile
DROP POLICY IF EXISTS profiles_update_policy ON public.profiles;
CREATE POLICY profiles_update_policy ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = id AND deleted_at IS NULL);

-- Policy: Users can delete their own profile (soft delete via trigger)
DROP POLICY IF EXISTS profiles_delete_policy ON public.profiles;
CREATE POLICY profiles_delete_policy ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id AND deleted_at IS NULL);

-- ========================================
-- POLLS POLICIES
-- ========================================

-- Policy: Authenticated users can read all non-deleted polls
DROP POLICY IF EXISTS polls_select_policy ON public.polls;
CREATE POLICY polls_select_policy ON public.polls
  FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Policy: Authenticated users can create polls
DROP POLICY IF EXISTS polls_insert_policy ON public.polls;
CREATE POLICY polls_insert_policy ON public.polls
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

-- Policy: Users can update their own polls
DROP POLICY IF EXISTS polls_update_policy ON public.polls;
CREATE POLICY polls_update_policy ON public.polls
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = creator_id AND deleted_at IS NULL);

-- Policy: Users can delete their own polls
DROP POLICY IF EXISTS polls_delete_policy ON public.polls;
CREATE POLICY polls_delete_policy ON public.polls
  FOR DELETE
  TO authenticated
  USING (auth.uid() = creator_id AND deleted_at IS NULL);

-- ========================================
-- VOTES POLICIES
-- ========================================

-- Policy: Authenticated users can read all vote counts (see results)
DROP POLICY IF EXISTS votes_select_policy ON public.votes;
CREATE POLICY votes_select_policy ON public.votes
  FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Policy: Authenticated users can vote
DROP POLICY IF EXISTS votes_insert_policy ON public.votes;
CREATE POLICY votes_insert_policy ON public.votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own votes
DROP POLICY IF EXISTS votes_delete_policy ON public.votes;
CREATE POLICY votes_delete_policy ON public.votes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- ========================================
-- FOLLOWS POLICIES
-- ========================================

-- Policy: Authenticated users can read all follow relationships
DROP POLICY IF EXISTS follows_select_policy ON public.follows;
CREATE POLICY follows_select_policy ON public.follows
  FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Policy: Users can only create follows for themselves
DROP POLICY IF EXISTS follows_insert_policy ON public.follows;
CREATE POLICY follows_insert_policy ON public.follows
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = follower_id);

-- Policy: Users can only delete follows they created
DROP POLICY IF EXISTS follows_delete_policy ON public.follows;
CREATE POLICY follows_delete_policy ON public.follows
  FOR DELETE
  TO authenticated
  USING (auth.uid() = follower_id AND deleted_at IS NULL);

-- ========================================
-- REACTIONS POLICIES
-- ========================================

-- Policy: Authenticated users can read all reactions
DROP POLICY IF EXISTS reactions_select_policy ON public.reactions;
CREATE POLICY reactions_select_policy ON public.reactions
  FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Policy: Authenticated users can add reactions
DROP POLICY IF EXISTS reactions_insert_policy ON public.reactions;
CREATE POLICY reactions_insert_policy ON public.reactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reactions
DROP POLICY IF EXISTS reactions_update_policy ON public.reactions;
CREATE POLICY reactions_update_policy ON public.reactions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id AND deleted_at IS NULL);

-- Policy: Users can delete their own reactions
DROP POLICY IF EXISTS reactions_delete_policy ON public.reactions;
CREATE POLICY reactions_delete_policy ON public.reactions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- ========================================
-- NOTIFICATIONS POLICIES
-- ========================================

-- Policy: Users can only read their own notifications
DROP POLICY IF EXISTS notifications_select_policy ON public.notifications;
CREATE POLICY notifications_select_policy ON public.notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Service role (system) can create notifications
DROP POLICY IF EXISTS notifications_insert_policy ON public.notifications;
CREATE POLICY notifications_insert_policy ON public.notifications
  FOR INSERT
  TO service_role
  WITH CHECK (TRUE);

-- Policy: Users can update their own notifications (mark as read)
DROP POLICY IF EXISTS notifications_update_policy ON public.notifications;
CREATE POLICY notifications_update_policy ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own notifications
DROP POLICY IF EXISTS notifications_delete_policy ON public.notifications;
CREATE POLICY notifications_delete_policy ON public.notifications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ========================================
-- AUDIT_LOG POLICIES
-- ========================================

-- Policy: Only service role can read audit logs
DROP POLICY IF EXISTS audit_log_select_policy ON public.audit_log;
CREATE POLICY audit_log_select_policy ON public.audit_log
  FOR SELECT
  TO service_role
  USING (TRUE);

-- Policy: Only service role can insert audit logs (via triggers)
DROP POLICY IF EXISTS audit_log_insert_policy ON public.audit_log;
CREATE POLICY audit_log_insert_policy ON public.audit_log
  FOR INSERT
  TO service_role
  WITH CHECK (TRUE);
