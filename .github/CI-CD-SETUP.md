# CI/CD Setup Guide

This guide walks you through setting up the CI/CD pipeline for Pollnion Client.

## Quick Start (5 minutes)

### 1. Add GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions

Add these required secrets:

1. **EXPO_TOKEN** (required)
   - Get your token: https://expo.dev/settings/tokens
   - Copy the token and paste it here

2. **SLACK_WEBHOOK_URL** (optional but recommended)
   - Create webhook: https://api.slack.com/messaging/webhooks
   - Select your Slack workspace and channel
   - Copy the webhook URL

### 2. Make Scripts Executable

```bash
chmod +x scripts/deploy-*.sh
```

### 3. Configure Deployment Scripts

Edit the scripts in `scripts/` directory:
- `deploy-staging.sh` - Deploy staging builds
- `deploy-beta.sh` - Deploy beta builds
- `deploy-production.sh` - Deploy production builds

Uncomment the deployment method that matches your infrastructure:
- Firebase Hosting
- Vercel
- AWS S3
- Custom SSH server
- Other cloud providers

### 4. Test the Pipeline

1. Create a feature branch:
   ```bash
   git checkout -b test/ci-setup
   ```

2. Make a small change and commit:
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   ```

3. Push and create a Pull Request:
   ```bash
   git push origin test/ci-setup
   ```

4. Watch the CI workflow run in the Actions tab

5. Merge the PR to staging to test deployment:
   ```bash
   git checkout staging
   git merge test/ci-setup
   git push origin staging
   ```

## Detailed Setup

For complete setup instructions, see [.github/CICD.md](./.github/CICD.md)

## Available Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | PR & push to main/staging/beta | Run tests & linting |
| `deploy-staging.yml` | Push to staging | Deploy to staging |
| `deploy-beta.yml` | Push to beta | Deploy to beta |
| `deploy-production.yml` | Push to main | Deploy to production |

## Branch Strategy

```
main (production)
  ↑
beta (beta testing)
  ↑
staging (dev testing)
  ↑
feature branches
```

## What Happens When You Merge

### → Merge to Staging
- ✅ Run tests & linting
- 📦 Build app
- 🚀 Deploy to staging
- 📢 Notify testers

### → Merge to Beta
- ✅ Run tests & linting
- 📦 Build app
- 🚀 Deploy to beta
- 📣 Create GitHub release
- 💬 Slack notification

### → Merge to Main
- ✅ Run tests & linting
- 📦 Build app
- 🚀 Deploy to production
- 📣 Create GitHub release
- 💬 Slack notification (success/failure)

## Common Tasks

### View Build Logs
1. Go to Actions tab
2. Click the workflow run
3. Click the job name to see logs

### Download Build Artifacts
1. Go to Actions tab
2. Click a completed workflow run
3. Scroll to "Artifacts" section
4. Download the build

### Manually Trigger a Workflow
1. Go to Actions tab
2. Click the workflow name
3. Click "Run workflow"
4. Select branch and click "Run"

### Disable a Workflow
1. Go to Actions tab
2. Right-click the workflow
3. Click "Disable workflow"

## Environment Variables

Create `.env.staging`, `.env.beta`, and `.env.production` files with environment-specific settings:

```bash
# .env.staging
REACT_APP_API_URL=https://api-staging.example.com
REACT_APP_ENV=staging

# .env.beta
REACT_APP_API_URL=https://api-beta.example.com
REACT_APP_ENV=beta

# .env.production
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production
```

## Troubleshooting

### Workflow fails on tests
- Check the workflow logs
- Run `npm test` locally
- Fix issues and push again

### Workflow fails on linting
- Run `npm run lint` locally
- Run `npm run format` to auto-fix formatting
- Push the fixes

### Deployment script fails
- Check the deployment logs
- Verify credentials (GitHub secrets)
- Test deployment script locally
- Check destination service is accessible

### Slack notifications not working
- Verify `SLACK_WEBHOOK_URL` secret is set
- Check the webhook URL is correct
- Verify Slack app has permissions

## Next Steps

1. ✅ Add GitHub secrets (EXPO_TOKEN, SLACK_WEBHOOK_URL)
2. ✅ Configure deployment scripts for your infrastructure
3. ✅ Create a test PR to verify CI pipeline
4. ✅ Merge to staging to test deployment
5. ✅ Monitor the workflows in Actions tab

## Support

For detailed documentation, see [.github/CICD.md](./.github/CICD.md)

For project guidelines, see [CONTRIBUTING.md](../CONTRIBUTING.md)

Good luck! 🚀
