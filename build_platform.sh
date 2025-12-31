#!/bin/bash
# Auto-Notion Unified Platform Build Script
# Deploys Landing at / and Dashboard at /app

set -e

echo "🚀 Starting Unified Platform Build..."

# 1. Clear previous dist
rm -rf dist
mkdir -p dist/dashboard

# 2. Build Dashboard (Institutional)
echo "📦 Building Dashboard (apps/dashboard)..."
cd apps/dashboard
npm install --legacy-peer-deps
npm run build
cd ../..

# Copy dashboard build to dist/dashboard
cp -r apps/dashboard/dist/* dist/dashboard/

# 3. Build Landing (Marketing)
echo "📦 Building Landing Page (apps/landing)..."
cd apps/landing
npm install --legacy-peer-deps
npm run build
cd ../..

# Copy landing build to dist root
cp -r apps/landing/dist/* dist/

echo "✅ Platform build complete. Ready for 'firebase deploy'."
