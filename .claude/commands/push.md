Push the current branch to the remote repository, automatically fixing formatting and lint errors, committing all changes, and pushing.

Commit message: $ARGUMENTS

If `$ARGUMENTS` is provided, use it as the commit message.
If `$ARGUMENTS` is **not** provided, generate a concise conventional commit message based on the staged/unstaged changes.

---

## Step 1 — Check current branch

```bash
git branch --show-current
```

Display the current branch name so the user knows what is being pushed.

---

## Step 2 — Auto-fix formatting

```bash
npm run format
```

This auto-fixes all formatting issues via Prettier. Note which files were modified (if any).

---

## Step 3 — Auto-fix lint errors

```bash
npm run lint
```

If lint errors are reported, attempt to auto-fix them:

```bash
npx eslint . --fix
```

Run `npm run lint` again to confirm. If **unfixable lint errors remain**, report them clearly and **stop** — do not commit or push with lint errors.

---

## Step 4 — Run tests

```bash
npm test
```

If any tests fail, report the failures and **stop**. Do not commit or push broken code unless the user explicitly confirms they want to proceed.

---

## Step 5 — Review uncommitted changes

```bash
git status
```

```bash
git diff --stat
```

Show a summary of all modified, added, and deleted files so the user can see exactly what will be committed.

---

## Step 6 — Stage and commit all changes

Stage everything (including files modified by format/lint fix in steps 2–3):

```bash
git add -A
```

Commit using the provided or generated message:

```bash
git commit -m "$ARGUMENTS"
```

**If `$ARGUMENTS` is not provided**, generate a conventional commit message based on the diff. Follow this format:

```
<type>(<scope>): <short description>
```

Types: `feat`, `fix`, `chore`, `refactor`, `style`, `test`, `docs`, `ci`

Examples:

- `feat(auth): add login screen with Supabase integration`
- `fix(button): correct disabled state style`
- `chore: auto-fix formatting and lint issues`

If there is nothing to commit (working tree is clean), skip this step and note it.

---

## Step 7 — Push to remote

```bash
git push -u origin HEAD
```

If the push is rejected due to diverged history, report the error and **do not force-push** without explicit user confirmation. If the user confirms, run:

```bash
git push --force-with-lease -u origin HEAD
```

Never use `--force` (bare) — always prefer `--force-with-lease`.

---

## Completion Report

After the push succeeds, report:

1. **Branch pushed** — current branch name
2. **Remote URL** — where it was pushed
3. **Commit message used** — the exact message committed
4. **Files changed** — summary from `git diff --stat`
5. **Remote branch URL** — link to the branch on GitHub if available
