# Pollnion Client Database Schema

This directory contains SQL scripts to set up the Pollnion database in Supabase.

## Files Overview

### 1. `01-create-tables.sql`
Creates the core database tables:
- `profiles` - User profiles extending auth.users
- `polls` - Poll questions with JSONB options
- `votes` - Individual votes with duplicate prevention
- `follows` - Social following relationships
- `reactions` - Emoji reactions on polls (Phase 3)
- `notifications` - User notifications (Phase 4)
- `audit_log` - Audit trail for compliance

**Constraints:**
- Polls must have 2-4 options (CHECK constraint)
- Users cannot vote twice on the same poll (UNIQUE constraint)
- Users cannot follow themselves (CHECK constraint)

### 2. `02-create-indexes.sql`
Creates performance indexes on all tables:
- Username and creation date indexes on profiles
- Creator ID, status, and trending score indexes on polls
- Composite (poll_id, user_id) index on votes for fast duplicate checking
- Follower/following indexes for social graph queries
- GIN index for JSONB search (future feature)

### 3. `03-create-triggers.sql`
Sets up database triggers for:
- **Audit logging** - Automatically tracks all INSERT/UPDATE/DELETE operations
- **Denormalized counts** - Keeps `follower_count`, `following_count`, and `total_votes` in sync
- **Timestamps** - Auto-updates `updated_at` on profile and poll changes

### 4. `04-enable-rls.sql`
Enables Row Level Security (RLS) policies:
- Profiles: Users can only update their own profile
- Polls: Users can only create/update/delete their own polls
- Votes: Users can only vote and delete their own votes
- Follows: Users can only create/delete their own follows
- Reactions: Users can only manage their own reactions
- Notifications: Users can only read their own notifications
- Audit logs: Only service role can access

### 5. `05-mock-data.sql` (Optional)
Provides sample data for development and testing:
- 4 sample profiles
- 4 sample polls
- 9 sample votes
- 6 sample follow relationships
- 4 sample reactions

**Note:** Update placeholder UUIDs with real Supabase auth.users IDs before running.

## Setup Instructions

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your database connection string and credentials

### Step 2: Run SQL Scripts in Order

Execute each script in Supabase's SQL Editor (Dashboard > SQL Editor):

```bash
# 1. Create all tables
Run: schema/01-create-tables.sql

# 2. Create indexes
Run: schema/02-create-indexes.sql

# 3. Create triggers and functions
Run: schema/03-create-triggers.sql

# 4. Enable Row Level Security
Run: schema/04-enable-rls.sql

# 5. (Optional) Insert mock data
Run: schema/05-mock-data.sql
```

Alternatively, use psql CLI:

```bash
psql postgresql://user:password@host:5432/pollnion_db -f schema/01-create-tables.sql
psql postgresql://user:password@host:5432/pollnion_db -f schema/02-create-indexes.sql
psql postgresql://user:password@host:5432/pollnion_db -f schema/03-create-triggers.sql
psql postgresql://user:password@host:5432/pollnion_db -f schema/04-enable-rls.sql
psql postgresql://user:password@host:5432/pollnion_db -f schema/05-mock-data.sql
```

### Step 3: Update Environment Variables

Create `.env.local` with your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Key Features

### 1. Soft Deletes
All tables include a `deleted_at` column. Deleted records are preserved for audit purposes.
Always filter with `WHERE deleted_at IS NULL` in queries.

### 2. Audit Logging
Every INSERT/UPDATE/DELETE is automatically logged to `audit_log` with:
- Original values (old_values)
- New values (new_values)
- Action type (INSERT/UPDATE/DELETE)
- Timestamp and user who made the change

Query example:
```sql
SELECT * FROM audit_log
WHERE table_name = 'polls'
ORDER BY created_at DESC;
```

### 3. Denormalized Counts
For performance, counts are stored directly on records:
- `profiles.follower_count` - Updated via trigger on follows table
- `profiles.following_count` - Updated via trigger on follows table
- `polls.total_votes` - Updated via trigger on votes table

Triggers ensure counts stay in sync automatically.

### 4. JSONB Options
Poll options are stored as JSONB for flexibility:
```json
[
  {"id": 0, "text": "Option 1"},
  {"id": 1, "text": "Option 2"},
  {"id": 2, "text": "Option 3"}
]
```

### 5. Row Level Security
Authenticated users can only see/modify their own data according to policies:
- Read public data (profiles, polls, votes, reactions)
- Create/update/delete only their own records
- Service role (admin) has full access

## Testing

### Verify Schema Creation
```sql
-- Check tables exist
\dt public.*

-- Check indexes
SELECT * FROM pg_indexes WHERE tablename LIKE 'polls';

-- Check constraints
SELECT constraint_name, constraint_type FROM information_schema.table_constraints
WHERE table_name = 'votes';
```

### Test Duplicate Vote Prevention
```sql
-- Try to vote twice on same poll (should fail)
INSERT INTO votes (poll_id, user_id, option_id)
VALUES ('poll-id', 'user-id', 0);

INSERT INTO votes (poll_id, user_id, option_id)
VALUES ('poll-id', 'user-id', 1); -- This should fail with UNIQUE constraint
```

### Test Vote Count Updates
```sql
-- Check vote count before insert
SELECT total_votes FROM polls WHERE id = 'poll-id';

-- Insert a vote
INSERT INTO votes (poll_id, user_id, option_id)
VALUES ('poll-id', 'user-id', 0);

-- Check vote count after (should increment automatically)
SELECT total_votes FROM polls WHERE id = 'poll-id';
```

### Test Audit Log
```sql
-- View all changes to a poll
SELECT action, old_values, new_values, created_at
FROM audit_log
WHERE table_name = 'polls' AND record_id = 'poll-id'
ORDER BY created_at;
```

### Test RLS Policies
```sql
-- Run as authenticated user
SET ROLE authenticated_user;

-- This should work (read public polls)
SELECT * FROM polls;

-- This should fail (can't see other user's votes)
SELECT * FROM votes WHERE user_id != auth.uid();

-- This should work (update own profile)
UPDATE profiles SET display_name = 'New Name' WHERE id = auth.uid();

-- This should fail (can't update other profiles)
UPDATE profiles SET display_name = 'Hacked' WHERE id != auth.uid();
```

## Feed Query Example

Get recent polls from followed creators:

```sql
SELECT p.id, p.question, p.options, p.total_votes,
       pr.username, pr.display_name, pr.avatar_url
FROM polls p
JOIN follows f ON p.creator_id = f.following_id
JOIN profiles pr ON p.creator_id = pr.id
WHERE f.follower_id = 'user-id'
  AND p.status = 'active'
  AND p.deleted_at IS NULL
ORDER BY p.created_at DESC
LIMIT 20 OFFSET 0;
```

## Performance Tips

1. **Use the indexes** - Query planner will use them automatically
2. **Filter deleted_at early** - Always include `WHERE deleted_at IS NULL`
3. **Avoid SELECT *** - Be explicit about columns needed
4. **Use connection pooling** - Supabase handles this automatically
5. **Monitor slow queries** - Check Supabase logs for bottlenecks

## Troubleshooting

### Error: "relation does not exist"
Make sure you ran `01-create-tables.sql` first.

### Error: "permission denied for schema public"
Check RLS policies - you may need to use service role for admin operations.

### Counts not updating
Verify triggers were created in `03-create-triggers.sql`. Check:
```sql
SELECT * FROM pg_trigger WHERE tgname LIKE '%update_poll_vote_count%';
```

### Mock data UUIDs not working
Replace placeholder UUIDs in `05-mock-data.sql` with real user IDs from Supabase Auth:
1. Go to Supabase Dashboard > Authentication > Users
2. Copy actual user IDs
3. Replace in the mock data script

## Future Features

The schema supports these planned features:
- **Emoji reactions**: `reactions` table ready
- **Notifications**: `notifications` table ready
- **Trending algorithm**: `trending_score` column added
- **Search**: GIN index on poll options ready
- **Comments**: Can add `comments` table later
- **Analytics**: `view_count` and audit_log support trending

---

For more details, see `/CLAUDE.md` and the inline comments in each SQL file.
