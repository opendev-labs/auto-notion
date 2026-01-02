#!/bin/bash
# ==============================================================================
# Auto-Notion Professional Deployment System
# (c) 2026 OpenDev-Labs | Institutional Logic
# ==============================================================================

set -e

# Visual Branding
BANNER="
    ___         __               _   __      __  _            
   /   | __  __/ /_____         / | / /___  / /_(_)___  ____  
  / /| |/ / / / __/ __ \______ /  |/ / __ \/ __/ / __ \/ __ \ 
 / ___ / /_/ / /_/ /_/ /_____// /|  / /_/ / /_/ / /_/ / / / / 
/_/  |_\__,_/\__/\____/      /_/ |_/\____/\__/_/\____/_/ /_/  
                                                              
"

echo -e "\033[1;32m$BANNER\033[0m"
echo -e "\033[1;34m[SYSTEM]\033[0m Initializing Super Deployment Sequence..."

# 1. Dependency & Environment Check
echo -e "\033[1;34m[CHECK]\033[0m Verifying specialized environments..."
if ! command -v node &> /dev/null; then echo "❌ Node.js not found"; exit 1; fi
if ! command -v git &> /dev/null; then echo "❌ Git not found"; exit 1; fi
if ! command -v firebase &> /dev/null; then echo "❌ Firebase CLI not found"; exit 1; fi

# 2. Source Synchronization
echo -e "\033[1;34m[GIT]\033[0m Synchronizing source with GitHub main..."
git add .
COMMIT_MSG="deploy: mission update $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG" -m "Automated professional deployment sync." || echo "No changes to commit"
git push origin main

# 3. Clean Build Chain
echo -e "\033[1;34m[BUILD]\033[0m Executing unified build pipeline..."
rm -rf dist
mkdir -p dist/dashboard

# Build Dashboard
echo -e "\033[1;32m   -> Building Dashboard Module...\033[0m"
cd apps/dashboard
npm install --legacy-peer-deps --quiet
npm run build
cd ../..
cp -r apps/dashboard/dist/* dist/dashboard/

# Build Landing
echo -e "\033[1;32m   -> Building Landing Interface...\033[0m"
cd apps/landing
npm install --legacy-peer-deps --quiet
npm run build
cd ../..
cp -r apps/landing/dist/* dist/

# 4. Global Deployment
echo -e "\033[1;34m[CLOUD]\033[0m Deploying to Firebase Hosting..."
firebase deploy --only hosting --non-interactive

# 5. Final Confirmation
echo -e "\033[1;32m[SUCCESS]\033[0m Deployment complete."
echo -e "----------------------------------------------------------------"
echo -e "🚀 LIVE DASHBOARD: https://auto-notion.web.app/dashboard"
echo -e "📡 MISSION LOG   : https://opendev-labs.github.io/auto-notion"
echo -e "----------------------------------------------------------------"
echo -e "Institutional consciousness synchronized. Stand by for logic."
