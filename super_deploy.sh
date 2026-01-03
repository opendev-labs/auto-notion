#!/bin/bash
# ==============================================================================
# INSTITUTIONAL DEPLOYMENT PIPELINE
# © 2026 OpenDev-Labs
# Purpose: Build → Commit → Deploy (Deterministic & Fully Automated)
# ==============================================================================

set -e

# ──────────────────────────────────────────────────────────────────────────────
# UI CONSTANTS
# ──────────────────────────────────────────────────────────────────────────────
GREEN="\033[1;32m"
BLUE="\033[1;34m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
GRAY="\033[1;90m"
RESET="\033[0m"

DIVIDER="${GRAY}────────────────────────────────────────────────────────${RESET}"

# ──────────────────────────────────────────────────────────────────────────────
# HEADER
# ──────────────────────────────────────────────────────────────────────────────
clear
echo -e "${DIVIDER}"
echo -e "${GREEN}DEPLOYMENT CONTROL (AUTOMATED MODE)${RESET}"
echo -e "${GRAY}Build • Version • Release • Publish${RESET}"
echo -e "${DIVIDER}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 1. ENVIRONMENT CHECK
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[CHECK]${RESET} Validating system requirements..."

command -v node >/dev/null || { echo -e "${RED}✖ Node.js missing${RESET}"; exit 1; }
command -v git >/dev/null || { echo -e "${RED}✖ Git missing${RESET}"; exit 1; }
command -v firebase >/dev/null || { echo -e "${RED}✖ Firebase CLI missing${RESET}"; exit 1; }

echo -e "${GREEN}✔ Environment ready${RESET}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 2. VERSION CONTROL (AUTOMATED)
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[SOURCE]${RESET} Synchronizing mission intelligence..."

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
SUMMARY="Institutional synchronization [${TIMESTAMP}]"
# Intelligent Detail Extraction (Non-Developer Friendly)
WALKTHROUGH_PATH="/home/cube/.gemini/antigravity/brain/02728b33-2dc2-46a5-8d8e-3ec045f718d1/walkthrough.md"
DETAILS="Standard mission update and performance optimization. Auto-deply active."

if [ -f "$WALKTHROUGH_PATH" ]; then
    # Extract mission summary from walkthrough.md
    # We look for content between <!-- MISSION_SUMMARY_START --> and <!-- MISSION_SUMMARY_END -->
    # Fallback to the first 10 significant lines if tags are missing
    if grep -q "<!-- MISSION_SUMMARY_START -->" "$WALKTHROUGH_PATH"; then
        EXTRACTED_SUMMARY=$(sed -n '/<!-- MISSION_SUMMARY_START -->/,/<!-- MISSION_SUMMARY_END -->/p' "$WALKTHROUGH_PATH" | grep -v "<!--")
    else
        EXTRACTED_SUMMARY=$(grep -v '^#' "$WALKTHROUGH_PATH" | grep -v '^$' | head -n 12)
    fi

    if [ ! -z "$EXTRACTED_SUMMARY" ]; then
        # Escape any special characters for the -m flag
        DETAILS=$(echo "$EXTRACTED_SUMMARY" | sed 's/"/\\"/g')
    fi
fi

# Sync and Push
git add .
git commit -m "feat: ${SUMMARY}" -m "Client Log: ${DETAILS}" -m "Metadata: Pipeline Automated" \
  || echo -e "${GRAY}No changes detected${RESET}"
git pull --rebase origin main
git push origin main

echo -e "${GREEN}✔ Source synchronized${RESET}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 3. BUILD PIPELINE
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[BUILD]${RESET} Executing pipeline"
echo -e "${DIVIDER}"

START_TIME=$(date +%s)

rm -rf dist
mkdir -p dist/dashboard

echo -e "${GRAY}→ Dashboard${RESET}"
cd apps/dashboard
npm install --legacy-peer-deps
npm run build
cd ../..
cp -r apps/dashboard/dist/* dist/dashboard/

echo -e "${GRAY}→ Landing${RESET}"
cd apps/landing
npm install --legacy-peer-deps
npm run build
cd ../..
cp -r apps/landing/dist/* dist/

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "${GREEN}✔ Build complete in ${DURATION}s${RESET}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 4. DEPLOYMENT
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[DEPLOY]${RESET} Publishing to hosting"
firebase deploy --only hosting --non-interactive

echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 5. FINAL STATUS
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${DIVIDER}"
echo -e "${GREEN}DEPLOYMENT SUCCESSFUL${RESET}"
echo ""
echo "Dashboard : https://auto-notion.web.app/dashboard"
echo "Repository: https://opendev-labs.github.io/auto-notion"
echo -e "${DIVIDER}"
echo -e "${GRAY}Pipeline complete. System stable.${RESET}"
