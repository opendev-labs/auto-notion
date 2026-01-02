# n8n Automation Workflows for Auto-Notion

This directory contains pre-configured n8n workflows for Auto-Notion.

## 🚀 Getting Started

1. **Install n8n**: Run `npx n8n` or use Docker.
2. **Import Workflows**: Open n8n, go to "Workflows" -> "Import from File" and select the JSON files.
3. **Setup Logic**:
   - `auto_notion_hub.json`: The central router for all Auto-Notion requests.
   - `instagram_post.json`: Handles posting and scheduling to Instagram.
   - `notion_sync.json`: Synchronizes CRM data, leads, or analytics to Notion.

## 🛠 Webhook Endpoints

All webhooks are configured to listen on the local instance:
- `POST http://localhost:5678/webhook/auto-notion`
- `POST http://localhost:5678/webhook/instagram-post`
- `POST http://localhost:5678/webhook/notion-sync`

## 🧪 Testing

You can test the connection using the provided test script:
```bash
python tests/test_n8n_workflow.py
```

## 📝 Configuration

- Ensure you update the **Credentials** in the Notion and Instagram nodes after importing.
- Update the **Database ID** in the Notion sync workflow.
