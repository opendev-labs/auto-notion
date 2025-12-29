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
echo "🛰️ Deploying to auto-notion.web.app..."
firebase deploy --only hosting:auto-notion

echo "✅ Deployment Complete. Visit https://auto-notion.web.app"
