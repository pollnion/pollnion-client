-- Pollnion Client Mock Data
-- Sample data for development and testing (OPTIONAL)
-- Use this script to populate the database with test data

-- NOTE: You will need to adjust the UUIDs to match actual auth.users IDs from Supabase.
-- This script uses placeholder UUIDs that need to be replaced with real user IDs.

-- ========================================
-- SAMPLE AUTH USERS (required before profiles due to FK constraint)
-- ========================================
-- Insert mock users directly into auth.users (requires service role / SQL editor)
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  created_at, updated_at, aud, role
)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'john@example.com', '', NOW(), NOW(), NOW(), 'authenticated', 'authenticated'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'jane@example.com', '', NOW(), NOW(), NOW(), 'authenticated', 'authenticated'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'alex@example.com', '', NOW(), NOW(), NOW(), 'authenticated', 'authenticated'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'emma@example.com', '', NOW(), NOW(), NOW(), 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- SAMPLE PROFILES
-- ========================================
-- Insert sample profiles
INSERT INTO public.profiles (id, username, display_name, bio, avatar_url)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000'::uuid, 'john_doe', 'John Doe', 'Tech enthusiast', 'avatars/john_doe.jpg'),
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'jane_smith', 'Jane Smith', 'Designer & creator', 'avatars/jane_smith.jpg'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'alex_wilson', 'Alex Wilson', 'Fitness coach', 'avatars/alex_wilson.jpg'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'emma_jones', 'Emma Jones', 'Travel blogger', 'avatars/emma_jones.jpg')
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- SAMPLE POLLS
-- ========================================
INSERT INTO public.polls (id, creator_id, question, options, status)
VALUES
  (
    '660e8400-e29b-41d4-a716-446655440000'::uuid,
    '550e8400-e29b-41d4-a716-446655440000'::uuid,
    'What''s your favorite programming language?',
    '[{"id": 0, "text": "JavaScript"}, {"id": 1, "text": "Python"}, {"id": 2, "text": "Rust"}]'::jsonb,
    'active'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    'Do you prefer iOS or Android?',
    '[{"id": 0, "text": "iOS"}, {"id": 1, "text": "Android"}]'::jsonb,
    'active'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440002'::uuid,
    '550e8400-e29b-41d4-a716-446655440002'::uuid,
    'Best time to work out?',
    '[{"id": 0, "text": "Morning"}, {"id": 1, "text": "Afternoon"}, {"id": 2, "text": "Evening"}]'::jsonb,
    'active'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440003'::uuid,
    '550e8400-e29b-41d4-a716-446655440003'::uuid,
    'Beach or mountains for vacation?',
    '[{"id": 0, "text": "Beach"}, {"id": 1, "text": "Mountains"}, {"id": 2, "text": "City"}, {"id": 3, "text": "Desert"}]'::jsonb,
    'active'
  )
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- SAMPLE VOTES
-- ========================================
INSERT INTO public.votes (id, poll_id, user_id, option_id)
VALUES
  ('770e8400-e29b-41d4-a716-446655440000'::uuid, '660e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 0),
  ('770e8400-e29b-41d4-a716-446655440001'::uuid, '660e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 1),
  ('770e8400-e29b-41d4-a716-446655440002'::uuid, '660e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 0),
  ('770e8400-e29b-41d4-a716-446655440003'::uuid, '660e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 0),
  ('770e8400-e29b-41d4-a716-446655440004'::uuid, '660e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 1),
  ('770e8400-e29b-41d4-a716-446655440005'::uuid, '660e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 0),
  ('770e8400-e29b-41d4-a716-446655440006'::uuid, '660e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 2),
  ('770e8400-e29b-41d4-a716-446655440007'::uuid, '660e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 0),
  ('770e8400-e29b-41d4-a716-446655440008'::uuid, '660e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 1)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- SAMPLE FOLLOWS
-- ========================================
INSERT INTO public.follows (id, follower_id, following_id)
VALUES
  ('880e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid),
  ('880e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid),
  ('880e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid),
  ('880e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid),
  ('880e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid),
  ('880e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid)
ON CONFLICT (follower_id, following_id) DO NOTHING;

-- ========================================
-- SAMPLE REACTIONS
-- ========================================
INSERT INTO public.reactions (id, poll_id, user_id, emoji)
VALUES
  ('990e8400-e29b-41d4-a716-446655440000'::uuid, '660e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, '❤️'),
  ('990e8400-e29b-41d4-a716-446655440001'::uuid, '660e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, '🔥'),
  ('990e8400-e29b-41d4-a716-446655440002'::uuid, '660e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, '🤔'),
  ('990e8400-e29b-41d4-a716-446655440003'::uuid, '660e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '😂')
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- NOTES ON MOCK DATA
-- ========================================
-- 1. Replace the placeholder UUIDs with actual Supabase auth.users IDs
--    - Profile IDs (550e8400-...) should match users created in Supabase Auth
--    - Find your user IDs in Supabase dashboard: Authentication > Users
--
-- 2. After inserting mock data, verify:
--    - Total vote counts are accurate
--    - Follower/following counts updated via triggers
--    - Audit log records all inserts
--
-- 3. Test queries:
--    SELECT COUNT(*) FROM profiles;
--    SELECT creator_id, total_votes FROM polls;
--    SELECT follower_id, COUNT(*) FROM follows GROUP BY follower_id;
--
-- 4. To clear all test data later:
--    DELETE FROM reactions;
--    DELETE FROM follows;
--    DELETE FROM votes;
--    DELETE FROM polls;
--    DELETE FROM profiles;
--    DELETE FROM audit_log;
