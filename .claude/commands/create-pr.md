Create a pull request for the current branch on GitHub.

Steps to follow:

1. Run `git status` to check for any uncommitted changes. If there are uncommitted changes, warn the user before proceeding.

2. Run `git log main..HEAD --oneline` to summarize the commits on this branch.

3. Run `git diff main...HEAD --stat` to understand the scope of changes.

4. Before creating the PR, ensure the branch is pushed to remote:

```
git push -u origin HEAD
```

5. Create the pull request using the `gh` CLI:

```
gh pr create --title "<title>" --body "<body>"
```

Guidelines for the PR:
- **Title**: Short and imperative (under 70 characters), e.g. "Add poll creation screen"
- **Body**: Include a Summary section (2-4 bullet points) and a Test plan section (checklist)
- Base branch should be `main`

6. Report the PR URL once created.

If $ARGUMENTS is provided, use it as the PR title instead of generating one.

Example body format:
```
## Summary
- Brief description of changes

## Test plan
- [ ] Run `npm test` and confirm all tests pass
- [ ] Run `npm run lint` and confirm no errors
- [ ] Manually test the affected screens/components

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```
