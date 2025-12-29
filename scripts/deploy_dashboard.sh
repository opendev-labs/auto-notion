#!/bin/bash
# Manual Deployment Script for Missions Control Dashboard

echo "🚀 Starting Institutional Deployment Sequence..."

# Verification
if [ ! -d "web" ]; then
    echo "❌ Error: 'web' directory not found."
    exit 1
fi

# Institutional Login
echo "📡 Verifying Firebase Authentication..."
firebase login

# Deployment
PROJECT_ID=$(grep '"default":' .firebaserc | cut -d'"' -f4)
echo "🛰️ Deploying to ${PROJECT_ID}.web.app..."
firebase deploy --only hosting --project $PROJECT_ID

if [ $? -eq 0 ]; then
    echo "✅ Deployment Complete. Visit https://${PROJECT_ID}.web.app"
else
    echo "❌ Deployment Failed. Check your project permissions."
    exit 1
fi
