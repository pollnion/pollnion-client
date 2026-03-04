# Claude Settings

This directory contains Claude-specific configuration for this workspace.

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
