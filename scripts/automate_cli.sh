#!/bin/bash
# Auto-Notion Institutional CLI Automation
# Automates GitHub Secrets, Firebase Project Sync, and Deployment

echo "🚀 Starting Institutional CLI Automation..."

# 1. GitHub CLI Automation
echo "📡 Automating GitHub Secrets..."
if [ -f ".secrets/firebase_service_account.json" ]; then
    gh secret set FIREBASE_SERVICE_ACCOUNT_META_AUTO_NOTION < .secrets/firebase_service_account.json
    echo "✅ GitHub Secret 'FIREBASE_SERVICE_ACCOUNT_META_AUTO_NOTION' injected."
else
    echo "⚠️  Requirement: Place your Firebase Service Account JSON in .secrets/firebase_service_account.json to automate GitHub Secrets."
fi

# 2. Firebase Project Sync
echo "🛰️  Synchronizing Firebase Project..."
# Get the first project from the list to suggest if mismatch occurs
SUGGESTED_PROJECT=$(firebase projects:list --json | jq -r '.result[0].projectId' 2>/dev/null)

if [ "$SUGGESTED_PROJECT" == "null" ] || [ -z "$SUGGESTED_PROJECT" ]; then
    echo "❌ Error: No Firebase projects found on this account. Please create one at https://console.firebase.google.com"
    exit 1
fi

echo "Found Project: $SUGGESTED_PROJECT"
firebase use --add $SUGGESTED_PROJECT --alias default

# 3. Update Configurations
echo "📝 Updating institutional configurations..."
sed -i "s/meta-auto-notion/$SUGGESTED_PROJECT/g" firebase.json
sed -i "s/meta-auto-notion/$SUGGESTED_PROJECT/g" .firebaserc
sed -i "s/meta-auto-notion/$SUGGESTED_PROJECT/g" .github/workflows/deploy.yml

echo "✅ Institutional Sync Complete."
echo "🔄 Run './scripts/deploy_dashboard.sh' to go live on your active project."
