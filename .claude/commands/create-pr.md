Create a pull request for the current branch on GitHub.

Target base branch: $ARGUMENTS

If `$ARGUMENTS` is provided, use it as the base branch (e.g. `main`, `staging`, `beta`).
If `$ARGUMENTS` is **not** provided, ask the user which branch to target before proceeding.

---

## Pre-flight Checks

### 1. Check for uncommitted changes

```bash
git status
```

- If there are **unstaged** changes, warn the user and ask whether to stash, commit, or abort.
- If there are **staged but uncommitted** changes, warn the user and ask whether to commit them first or proceed without them.
- Do **not** silently discard or commit changes on behalf of the user.

### 2. Confirm the current branch

```bash
git branch --show-current
```

Display the current branch name so the user can confirm they are on the correct branch before creating the PR.

### 3. Confirm the base branch

If `$ARGUMENTS` was provided, use it as `<base-branch>` and confirm with the user:

> "You're about to open a PR from `<current-branch>` into `$ARGUMENTS`. Proceed?"

If `$ARGUMENTS` was **not** provided, list available remote branches and ask the user to choose:

```bash
git branch -r
```

Common options: `main`, `staging`, `beta`. Use the user's answer as `<base-branch>`.

---

## Gather Diff Context

### 4. Summarize commits on this branch

```bash
git log <base-branch>..HEAD --oneline
```

Use the output to understand what was changed. This feeds into writing an accurate PR title and summary.

### 5. Review changed files and scope

```bash
git diff <base-branch>...HEAD --stat
```

Use the file list to identify affected areas (screens, components, hooks, config, etc.) and mention them in the PR body.

### 6. Check for failing tests before opening the PR

```bash
npm test
```

If tests fail, report the failures to the user and ask whether to fix them first or proceed anyway. Do not silently continue past failures.

---

## Push and Create the PR

### 7. Push the current branch to remote

```bash
git push -u origin HEAD
```

If the push fails (e.g. rejected due to diverged history), report the error and do **not** force-push without explicit user confirmation.

### 8. Create the pull request

```bash
gh pr create --title "<title>" --body "<body>" --base <base-branch>
```

**Title guidelines:**

- Imperative mood, under 70 characters
- Describes _what_ the PR does, not _how_
- Examples: `"Add poll creation screen"`, `"Fix login redirect on session expiry"`

**Body guidelines:**

- Write a **Summary** section: 2–5 bullet points covering what changed and why
- Write a **Test plan** section: checklist of steps to verify correctness
- Note any breaking changes, migrations, or dependencies
- Reference related issues if applicable (e.g. `Closes #42`)

---

## Completion Report

After the PR is created, report:

1. **PR URL** — the full GitHub link
2. **Base branch** — confirm what branch it targets
3. **Commits included** — paste the one-line log summary
4. **Files changed** — paste the `--stat` summary

---

## PR Body Template

```markdown
## Summary

-
-
-

## Test plan

- [ ] Run `npm test` — all tests pass
- [ ] Run `npm run lint` — no errors
- [ ] Run `npm run format:check` — no formatting issues
- [ ] Manually tested affected screens/components on iOS and/or Android

## Notes

<!-- Breaking changes, migrations, dependencies, or anything reviewers should know -->

🤖 Generated with [Claude Code](https://claude.ai/claude-code)
```
