#!/bin/bash
# Auto-Notion Super Deployment Script
# Deploys to GitHub (Source & Pages) and Firebase (Hosting)

set -e

echo "🛸 Starting Super Deployment Sequence..."

# 1. Sync Source to GitHub
echo "🐙 Pushing latest source to GitHub..."
git add .
git commit -m "deploy: super-deploy sync - $(date)" || echo "No changes to commit"
git push origin main

# 2. Build the Platform
echo "🏗️ Building Unified Platform (Landing + Dashboard)..."
bash build_platform.sh

# 3. Deploy to Firebase
echo "🔥 Deploying to Firebase Hosting (auto-notion.web.app)..."
firebase deploy --only hosting

echo "✨ Super Deployment Complete!"
echo "🌍 Live at: https://auto-notion.web.app"
echo "📡 Mission Log: https://opendev-labs.github.io/auto-notion"
