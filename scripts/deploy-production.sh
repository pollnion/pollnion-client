#!/bin/bash
set -e

# Production Deployment Script
# This script deploys the app to the production environment

echo "🚀 Starting production deployment..."

# Source environment variables
if [ -f ".env.production" ]; then
  export $(cat .env.production | xargs)
fi

# Get deployment information
BUILD_NUMBER=${GITHUB_RUN_NUMBER:-"unknown"}
COMMIT_SHA=${GITHUB_SHA:-"unknown"}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "📦 Build Information:"
echo "  Build Number: $BUILD_NUMBER"
echo "  Commit: ${COMMIT_SHA:0:7}"
echo "  Timestamp: $TIMESTAMP"

# Safety check - require confirmation for production
read -p "⚠️  Are you sure you want to deploy to PRODUCTION? (yes/no) " -r
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
  echo "❌ Deployment cancelled"
  exit 1
fi

# Example: Deploy to Firebase Hosting
# firebase deploy --project production-project --token $FIREBASE_TOKEN

# Example: Deploy to Vercel
# vercel --token $VERCEL_TOKEN --prod --scope <team-name>

# Example: Deploy to custom server via SSH
# scp -r dist/* prod-user@prod.example.com:/var/www/prod/

# Example: Deploy to AWS S3 + CloudFront invalidation
# aws s3 sync dist/ s3://production-bucket-name/ --delete --region us-east-1
# aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"

# Example: Create backup before deployment
# curl -X POST https://backup-service.com/backup \
#   -H "Authorization: Bearer $BACKUP_TOKEN" \
#   -d '{"environment": "production"}'

# Example: Health check after deployment
# sleep 30
# for i in {1..5}; do
#   if curl -f https://app.example.com/health; then
#     echo "✅ Health check passed"
#     break
#   fi
#   if [ $i -lt 5 ]; then
#     echo "⏳ Health check attempt $i failed, retrying..."
#     sleep 10
#   fi
# done

echo "✅ Production deployment completed!"
echo "📋 Deploy Information:"
echo "  Build: #$BUILD_NUMBER"
echo "  Environment: Production"
echo "  Status: Live"
echo "  Deployment Time: $TIMESTAMP"
echo "  Commit: $COMMIT_SHA"
