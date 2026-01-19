#!/bin/bash
# ==============================================================================
# INSTITUTIONAL DEPLOYMENT PIPELINE v2.1 (Nuxt 4 Edition)
# © 2026 OpenDev-Labs
# Stack: Nuxt 4 (SSG) + Vite → Firebase Hosting + HuggingFace Spaces
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
echo -e "${GREEN}AGENCY DEPLOYMENT CONTROL${RESET}"
echo -e "${GRAY}GitHub • Firebase • HuggingFace${RESET}"
echo -e "${DIVIDER}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 1. ENVIRONMENT CHECK
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[CHECK]${RESET} Validating system requirements..."

command -v node >/dev/null || { echo -e "${RED}✖ Node.js missing${RESET}"; exit 1; }
command -v git >/dev/null || { echo -e "${RED}✖ Git missing${RESET}"; exit 1; }

echo -e "${GREEN}✔ Environment ready${RESET}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 2. VERSION CONTROL (INTERACTIVE)
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[SOURCE]${RESET} Preparing inputs..."

# Prompt for Commit Message
echo -e "${YELLOW}Enter commit message for opendev-labs.github.io/auto-notion:${RESET}"
read -p "Type your message > " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="update: routine optimization"
    echo -e "${GRAY}Using default: $COMMIT_MSG${RESET}"
fi

TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")

# Sync and Push to GitHub
echo -e "${BLUE}[GITHUB]${RESET} Pushing source code..."
git add .
git commit -m "$COMMIT_MSG" -m "Timestamp: $TIMESTAMP" || echo -e "${GRAY}No changes detected${RESET}"
git pull --rebase origin main || true
git push origin main

echo -e "${GREEN}✔ GitHub synchronized${RESET}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 3. BUILD PIPELINE (Nuxt 4 + Vite)
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[BUILD]${RESET} Compiling production bundles..."
echo -e "${DIVIDER}"

START_TIME=$(date +%s)

# Clean previous build
rm -rf dist
mkdir -p dist

# Build Nuxt 4 Dashboard
echo -e "${GRAY}→ Building Nuxt 4 Dashboard (SSG Mode)...${RESET}"
cd apps/dashboard-nuxt

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dashboard dependencies...${RESET}"
    npm install --legacy-peer-deps
fi

# Generate static site
npm run generate

cd ../..

# Copy Nuxt output to dist/dashboard
mkdir -p dist/dashboard
cp -r apps/dashboard-nuxt/.output/public/* dist/dashboard/

echo -e "${GREEN}✔ Dashboard built successfully${RESET}"

# Build Landing Page
echo -e "${GRAY}→ Building Landing Page (Vite)...${RESET}"
cd apps/landing

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing landing dependencies...${RESET}"
    npm install --legacy-peer-deps
fi

npm run build
cd ../..

# Copy landing to dist root
cp -r apps/landing/dist/* dist/

echo -e "${GREEN}✔ Landing page built successfully${RESET}"

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "${GREEN}✔ All builds complete in ${DURATION}s${RESET}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 4. DEPLOYMENT (FIREBASE)
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[FIREBASE]${RESET} Deploying to Global CDN (auto-notion.web.app)..."
npx firebase-tools deploy --only hosting --non-interactive

echo -e "${GREEN}✔ Firebase deployment active${RESET}"
echo ""

# ──────────────────────────────────────────────────────────────────────────────
# 5. DEPLOYMENT (HUGGING FACE SPACES)
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[HUGGINGFACE]${RESET} Deploying Agency Brain to Spaces..."

HF_SPACE_DIR="hf_deploy"
HF_REPO_URL="https://huggingface.co/spaces/opendev-labs/auto-notion"

# Clone if not exists
if [ ! -d "$HF_SPACE_DIR" ]; then
    echo -e "${GRAY}Initializing Space clone...${RESET}"
    git clone "$HF_REPO_URL" "$HF_SPACE_DIR"
fi

# Update Space files
echo -e "${GRAY}Syncing Agency Files...${RESET}"
cp -r hf_template/* "$HF_SPACE_DIR/"

# Push to Space
cd "$HF_SPACE_DIR"
git add .
git commit -m "Agency Update: $COMMIT_MSG" || echo -e "${GRAY}No space changes${RESET}"
git push || echo -e "${RED}⚠ Failed to push to Hugging Face. Check tokens?${RESET}"
cd ..

echo -e "${GREEN}✔ Hugging Face Space synchronized${RESET}"

# ──────────────────────────────────────────────────────────────────────────────
# 6. FINAL STATUS
# ──────────────────────────────────────────────────────────────────────────────
echo -e "${DIVIDER}"
echo -e "${GREEN}DEPLOYMENT COMPLETE${RESET}"
echo ""
echo "🚀 Nuxt Dashboard: https://auto-notion.web.app/dashboard"
echo "🏠 Landing Page:   https://auto-notion.web.app"
echo "🧠 HF Brain:       https://huggingface.co/spaces/opendev-labs/auto-notion"
echo "💻 Source Code:    https://github.com/opendev-labs/auto-notion"
echo -e "${DIVIDER}"
echo -e "${GRAY}All systems deployed and live.${RESET}"

