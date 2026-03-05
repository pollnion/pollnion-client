# Claude Settings

This directory contains Claude-specific configuration for this workspace.

## Directory Structure

```
.claude/
├── README.md              # This file
├── settings.local.json    # Local Claude settings and environment permissions
└── commands/              # Custom slash commands for Claude Code
    ├── format.md          # /project:format
    ├── lint-fix.md        # /project:lint-fix
    ├── test.md            # /project:test
    ├── new-component.md   # /project:new-component
    ├── new-screen.md      # /project:new-screen
    ├── create-pr.md       # /project:create-pr
    └── push.md            # /project:push
```

## Custom Slash Commands

Use these commands inside Claude Code (run `claude` in your terminal to start).

| Command                  | Usage                             | Description                                       |
| ------------------------ | --------------------------------- | ------------------------------------------------- |
| `/project:format`        | `/project:format`                 | Formats all code with Prettier (`npm run format`) |
| `/project:lint-fix`      | `/project:lint-fix`               | Runs ESLint and reports issues                    |
| `/project:test`          | `/project:test [pattern]`         | Runs the full test suite or a filtered subset     |
| `/project:new-component` | `/project:new-component MyButton` | Scaffolds a component + test file                 |
| `/project:new-screen`    | `/project:new-screen profile`     | Creates a new Expo Router screen                  |
| `/project:create-pr`     | `/project:create-pr "My title"`   | Creates a GitHub PR for the current branch        |
| `/project:push`          | `/project:push "commit message"`  | Pushes the current branch to remote               |

### Examples

```
/project:new-component PollCard
/project:new-screen poll/results
/project:test PollCard
/project:format
/project:lint-fix
/project:push "fix: update styles"
/project:create-pr
```

### Adding New Commands

Create a `.md` file in `.claude/commands/`. Use `$ARGUMENTS` to accept user input:

```markdown
<!-- .claude/commands/my-command.md -->

Do something with: $ARGUMENTS
```

Then use it as `/project:my-command some input`.

---

## Configuration Files

### `settings.local.json`

Local Claude settings and environment permissions.

#### GitHub Token

The `GITHUB_TOKEN` in `settings.local.json` can be configured to use an environment variable:

```json
{
  "env": {
    "GITHUB_TOKEN": "${EXPO_GITHUB_TOKEN}"
  }
}
```

Or set directly from your environment:

```bash
export EXPO_GITHUB_TOKEN="your-github-token-here"
```

To generate a GitHub token:

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token**
3. Select scopes: `repo`, `read:user`, `user:email`
4. Copy the token and set it in your environment or `.env` file

**Note:** Never commit tokens directly to the repository.
