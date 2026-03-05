-- Pollnion Client Database Indexes
-- Performance optimization indexes for all tables

-- ========================================
-- PROFILES INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_deleted_at ON public.profiles(deleted_at);

-- ========================================
-- POLLS INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_polls_creator_id ON public.polls(creator_id);
CREATE INDEX IF NOT EXISTS idx_polls_created_at ON public.polls(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_polls_status ON public.polls(status);
CREATE INDEX IF NOT EXISTS idx_polls_deleted_at ON public.polls(deleted_at);
CREATE INDEX IF NOT EXISTS idx_polls_trending_score ON public.polls(trending_score DESC);

-- GIN index for JSONB search (for future full-text search in options)
CREATE INDEX IF NOT EXISTS idx_polls_options_gin ON public.polls USING GIN (options);

-- ========================================
-- VOTES INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_votes_poll_id ON public.votes(poll_id);
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON public.votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_poll_user ON public.votes(poll_id, user_id);
CREATE INDEX IF NOT EXISTS idx_votes_deleted_at ON public.votes(deleted_at);

-- ========================================
-- FOLLOWS INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON public.follows(following_id);
CREATE INDEX IF NOT EXISTS idx_follows_created_at ON public.follows(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_follows_deleted_at ON public.follows(deleted_at);

-- ========================================
-- REACTIONS INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_reactions_poll_id ON public.reactions(poll_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON public.reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_reactions_deleted_at ON public.reactions(deleted_at);

-- ========================================
-- NOTIFICATIONS INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);

-- ========================================
-- AUDIT_LOG INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON public.audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_changed_by ON public.audit_log(changed_by);
