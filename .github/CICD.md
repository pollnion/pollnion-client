# CI/CD Pipeline Documentation

This document explains the GitHub Actions CI/CD pipeline setup for Pollnion Client.

## Overview

The project has automated CI/CD pipelines that:

- Run tests and linting on all pull requests
- Automatically build and deploy to staging on merge to `staging` branch
- Automatically build and deploy to beta on merge to `beta` branch
- Automatically build and deploy to production on merge to `main` branch

## Workflow Files

Located in `.github/workflows/`:

### 1. `ci.yml` - Continuous Integration

- **Triggers:** PR and push to main, staging, or beta
- **Steps:**
  - Lint code with ESLint
  - Check code formatting with Prettier
  - Run Jest tests with coverage
  - Upload coverage to Codecov
- **Test Matrix:** Node 18.x and 20.x

### 2. `deploy-staging.yml` - Staging Deployment

- **Triggers:** Push to `staging` branch
- **Steps:**
  - Install dependencies
  - Run linting and tests
  - Setup Expo
  - Build web export
  - Deploy to staging environment
  - Notify testers
  - Create GitHub release
- **Artifacts:** Web build available for download

### 3. `deploy-beta.yml` - Beta Deployment

- **Triggers:** Push to `beta` branch
- **Steps:**
  - Install dependencies
  - Run linting and tests
  - Setup Expo and build EAS preview builds
  - Build web export
  - Deploy to beta environment
  - Send Slack notification to testers
  - Create GitHub release
- **Notifications:** Slack webhook (configure required)
- **Artifacts:** Web build + EAS builds

### 4. `deploy-production.yml` - Production Deployment

- **Triggers:** Push to `main` branch or version tags
- **Steps:**
  - Install dependencies
  - Run full test suite with coverage
  - Setup Expo and build EAS production builds
  - Build web export
  - Deploy to production
  - Create GitHub release
  - Send Slack notifications (success/failure)
- **Notifications:** Slack webhook (configure required)

## Setup Instructions

### 1. GitHub Secrets Configuration

Add the following secrets to your GitHub repository settings:

#### Required Secrets:

**`EXPO_TOKEN`**

- Get from Expo account: https://expo.dev/settings/tokens
- Used for EAS builds and deployments

**Optional but Recommended:**

**`SLACK_WEBHOOK_URL`**

- Create in Slack: https://api.slack.com/messaging/webhooks
- For notifications in Slack channel

**`STAGING_DEPLOY_KEY`** (optional)

- SSH key or deploy token for staging environment
- Used in `scripts/deploy-staging.sh`

**`BETA_DEPLOY_KEY`** (optional)

- SSH key or deploy token for beta environment
- Used in `scripts/deploy-beta.sh`

**`PROD_DEPLOY_KEY`** (optional)

- SSH key or deploy token for production environment
- Used in `scripts/deploy-production.sh`

### 2. Create Deployment Scripts

Create deployment scripts in `scripts/` directory:

**`scripts/deploy-staging.sh`**

```bash
#!/bin/bash
set -e
echo "Deploying to staging..."
# Add your staging deployment logic here
# Example: Deploy to Firebase Hosting, Vercel, or custom server
```

**`scripts/deploy-beta.sh`**

```bash
#!/bin/bash
set -e
echo "Deploying to beta..."
# Add your beta deployment logic here
```

**`scripts/deploy-production.sh`**

```bash
#!/bin/bash
set -e
echo "Deploying to production..."
# Add your production deployment logic here
```

### 3. Environment-Specific Configuration

Create `.env.staging`, `.env.beta`, and `.env.production` files with environment-specific variables.

### 4. Branch Protection Rules

Configure GitHub branch protection:

1. Go to Settings → Branches
2. Add rules for `main`, `staging`, and `beta` branches
3. Require CI/CD status checks to pass before merge
4. Require at least 1 pull request review

## Workflow

### Development Flow

```
your-feature-branch
    ↓
Pull Request (triggers CI)
    ↓
Review & Approve
    ↓
Merge to staging (triggers staging deployment)
    ↓
Testing on staging environment
    ↓
Merge to beta (triggers beta deployment)
    ↓
Testing on beta environment
    ↓
Merge to main (triggers production deployment)
    ↓
Live in production
```

### Testing Builds

1. **Staging**: After merge to `staging`, testers receive notification
2. **Beta**: After merge to `beta`, testers download from GitHub releases
3. **Production**: After merge to `main`, app is deployed to production

## Monitoring & Logs

### View Workflow Status

1. Go to Actions tab in GitHub
2. Select the workflow to view runs
3. Click on a run to see detailed logs

### Build Artifacts

- Navigate to a workflow run
- Scroll to "Artifacts" section
- Download builds for testing

### Failed Builds

1. Check the workflow run logs
2. Review error messages
3. Fix issues and create a new PR
4. Re-run failed jobs manually if needed

## EAS (Expo Application Services)

The workflows use EAS for building iOS and Android apps:

### Configure EAS

```bash
npm install -g eas-cli
eas init
eas build:configure
```

### Available Profiles

- `preview` - For beta/staging testing (Android APK, iOS simulator)
- `production` - For production releases (signed for app stores)

### Submit to App Stores

To enable automatic submission to app stores:

```bash
eas submit --platform all
```

## Notifications

### Slack Setup

1. Create a Slack channel: `#deployments` or similar
2. Create an Incoming Webhook: https://api.slack.com/messaging/webhooks
3. Add `SLACK_WEBHOOK_URL` secret to GitHub
4. Messages will post to Slack on deploy success/failure

### GitHub Notifications

- View in Actions tab
- Email notifications for failures
- Create custom GitHub Actions for other tools

## Troubleshooting

### CI Build Failures

1. Check the workflow logs
2. Verify code formatting: `npm run format:check`
3. Check for linting errors: `npm run lint`
4. Run tests locally: `npm test`

### EAS Build Failures

1. Check EAS logs: `eas build:list`
2. Verify Expo configuration in `app.json`
3. Check `EXPO_TOKEN` is valid and has correct permissions
4. Review native dependencies compatibility

### Deployment Script Failures

1. Check the deployment script logs in workflow
2. Verify SSH keys or deploy tokens are correct
3. Check destination server/service accessibility
4. Review deployment environment configuration

## Best Practices

1. **Always test locally** before pushing
2. **Keep branches up to date** with main
3. **Use meaningful commit messages**
4. **Review code changes** before merging
5. **Monitor failed builds** and fix quickly
6. **Test staging/beta** before promoting to production
7. **Document deployment** changes in commit messages

## Next Steps

1. Configure required GitHub secrets
2. Create deployment scripts for your infrastructure
3. Set up Slack notifications (optional)
4. Test the pipeline with a pull request
5. Monitor the first deployments

For questions or issues, refer to the [CONTRIBUTING.md](../CONTRIBUTING.md) file.
