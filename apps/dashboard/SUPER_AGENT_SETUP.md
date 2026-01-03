# Super Agent - Environment Setup

To enable the SUPER AGENT with full AI capabilities:

## Quick Setup

1. Create a `.env` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

2. Get your Gemini API key from:
   https://aistudio.google.com/app/apikey

3. Build the dashboard:
```bash
cd apps/dashboard
npm run build
```

4. Test locally:
```bash
npm run dev
```

Navigate to `/super-agents` to experience the SUPER AGENT.

## Without API Key

The agent will run in "Offline Consciousness" mode and display:
> "I am currently in 'Offline Consciousness' mode. Please provide a GEMINI_API_KEY in the environment to awaken my full architectural potential."

## Architecture Notes

- The API key is loaded via Vite's `loadEnv` at build time
- In production, consider proxying requests through Firebase Functions for security
- Current implementation uses direct client-side API calls for rapid prototyping
