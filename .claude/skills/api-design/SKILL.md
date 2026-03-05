Design or review an API endpoint for a Supabase/PostgreSQL backend.

Topic: $ARGUMENTS

Steps to follow:

1. If $ARGUMENTS is provided, use it as the endpoint or feature to design (e.g. "feed", "vote on poll", "follow user"). Otherwise, ask the user what they want to design.

2. Read relevant existing files to understand the current schema and patterns (look for `schema/`, `src/lib/supabase.ts`, or equivalent).

3. Design the API with the following sections:

### Endpoint

- Method and path (e.g. `POST /votes`)
- Auth requirement (public or authenticated)

### Request

- Headers
- Body schema with TypeScript types (no `any`)

### Response

- Success shape (with TypeScript type)
- Error codes and messages

### Supabase Query

- Show the actual Supabase client query or SQL to implement it
- Include RLS considerations
- Note any indexes that should exist

### Edge Cases

- List validation rules, constraints, and failure scenarios

4. If this is a new endpoint that requires schema changes, show the migration SQL needed.

5. If a corresponding TypeScript service function is needed, scaffold it following the project conventions:
   - Use camelCase for functions, TypeScript types for all params/returns
   - Organize imports: React → external libraries → local imports
