#!/bin/bash

# Auto-Notion Institutional - Startup Orchestrator
# This script manages the execution of the dashboard and agentic layers.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DASHBOARD_DIR="$ROOT_DIR/apps/dashboard-nuxt"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

function show_help() {
    echo -e "${BLUE}Auto-Notion Startup Script${NC}"
    echo "Usage: ./run-auto-notion.sh [flag]"
    echo ""
    echo "Flags:"
    echo "  --dev, --development    Run the Nuxt dashboard in development mode"
    echo "  --help                  Show this help message"
}

function run_dev() {
    echo -e "${GREEN}[INFO]${NC} Optimizing Environment & Clearing Ports..."
    
    # Kill process on port 3000 (Nuxt)
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${BLUE}[PORT]${NC} Freeing up port 3000..."
        fuser -k 3000/tcp >/dev/null 2>&1
    fi

    # Kill process on port 24678 (Vite HMR)
    if lsof -Pi :24678 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${BLUE}[PORT]${NC} Freeing up port 24678 (HMR)..."
        fuser -k 24678/tcp >/dev/null 2>&1
    fi

    echo -e "${GREEN}[INFO]${NC} Starting Auto-Notion Institutional Dashboard in Development Mode..."
    
    if [ ! -d "$DASHBOARD_DIR" ]; then
        echo -e "${RED}[ERROR]${NC} Dashboard directory not found at $DASHBOARD_DIR"
        exit 1
    fi

    cd "$DASHBOARD_DIR" || exit 1

    # Check for node_modules
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}[SETUP]${NC} node_modules not found. Installing dependencies..."
        npm install
    fi

    echo -e "${GREEN}[SUCCESS]${NC} Launching Nuxt Dev Server..."
    npm run dev
}

# Parse arguments
if [[ $# -eq 0 ]]; then
    show_help
    exit 0
fi

case "$1" in
    --dev|--development)
        run_dev
        ;;
    --help)
        show_help
        ;;
    *)
        echo -e "${RED}[ERROR]${NC} Unknown argument: $1"
        show_help
        exit 1
        ;;
esac
