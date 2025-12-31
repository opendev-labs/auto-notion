# Auto-Notion Technical Setup & Deployment

This document contains the detailed technical instructions for setting up the Auto-Notion platform.

## Prerequisites
- Node.js 18+ and npm
- Python 3.13+
- Firebase CLI (`npm install -g firebase-tools`)
- Meta Developer Account ([Create App](https://developers.facebook.com/))

## Installation

```bash
# Clone repository
git clone https://github.com/opendev-labs/auto-notion.git
cd auto-notion

# Install dependencies (landing + dashboard)
npm install --legacy-peer-deps

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your Meta/Notion credentials
```

## Local Development

```bash
# Build and run unified platform
./build_platform.sh

# Or run individual apps:

# Landing Page (http://localhost:3000)
cd apps/landing && npm run dev

# Dashboard (http://localhost:5173)
cd apps/dashboard && npm run dev

# Backend API (http://localhost:5000)
python api/main.py
```

## Deployment

```bash
# Build production bundles
./build_platform.sh

# Deploy to Firebase
firebase deploy --only hosting
```

## Project Structure
- `apps/dashboard`: Missions Control (Vite + React + TS)
- `apps/landing`: Marketing Site (Vite + React)
- `api/`: Flask backend
- `engine/`: Automation core
- `notion/`: Notion API integration
- `webhooks/`: Meta webhook handlers
