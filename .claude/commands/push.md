Push the current branch to the remote repository, automatically fixing formatting and lint errors before pushing.

Steps to follow:

1. Run `npm run format` to auto-fix any formatting issues.

2. Run `npm run lint` to check for lint errors. If there are auto-fixable errors, run:

```
npx eslint . --fix
```

If any lint errors remain that cannot be auto-fixed, report them to the user and stop — do not push with lint errors.

3. Run `git status` to check for uncommitted changes.
   - If there are changes (including any files modified by format/lint fix in steps 1-2), stage and commit them automatically:

```
git add -A
git commit -m "chore: auto-fix formatting and lint issues"
```

4. If $ARGUMENTS is provided, use it as the commit message for any remaining uncommitted changes instead of the default message above:

```
git add -A
git commit -m "$ARGUMENTS"
```

5. Run `git push -u origin HEAD` to push the current branch.

6. Report the result, including the remote URL and branch name.
