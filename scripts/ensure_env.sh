#!/bin/bash
# ensure_env.sh
# Checks if apps/dashboard/.env exists and has VITE_GEMINI_API_KEY

ENV_FILE="apps/dashboard/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: $ENV_FILE not found."
  echo "Please create it and add VITE_GEMINI_API_KEY=your_key_here"
  exit 1
fi

if ! grep -q "VITE_GEMINI_API_KEY" "$ENV_FILE"; then
  echo "❌ Error: VITE_GEMINI_API_KEY not found in $ENV_FILE."
  exit 1
fi

echo "✅ Environment check passed."
exit 0
