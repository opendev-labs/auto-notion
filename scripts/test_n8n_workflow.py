#!/usr/bin/env python3
"""
Test n8n Workflow Trigger
Sends a test payload to the Auto-Notion Hub workflow.

Usage:
    python scripts/test_n8n_workflow.py [action]

Actions:
    instagram_post - Test Instagram posting
    notion_sync    - Test Notion sync
    test           - Basic connectivity test (default)
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.integration.n8n_client import N8nClient

def main():
    action = sys.argv[1] if len(sys.argv) > 1 else "test"
    
    client = N8nClient()
    
    print("=" * 50)
    print(f"🧪 Testing n8n Workflow: {action}")
    print("=" * 50)
    
    if not client.check_connection():
        print("❌ n8n is not running. Start with: docker compose up -d")
        return 1
    
    payloads = {
        "test": {
            "action": "test",
            "payload": {"message": "Hello from Auto-Notion!", "timestamp": "2026-01-02T10:00:00Z"}
        },
        "instagram_post": {
            "action": "instagram_post",
            "payload": {
                "content": "Test post from Auto-Notion 🚀",
                "media_url": "https://example.com/image.jpg"
            }
        },
        "notion_sync": {
            "action": "notion_sync",
            "payload": {
                "data": {
                    "name": "Test Lead",
                    "ig_handle": "@test_user",
                    "source": "Auto-Notion Test",
                    "message": "This is a test lead entry"
                }
            }
        }
    }
    
    payload = payloads.get(action, payloads["test"])
    
    print(f"\n📤 Sending to /webhook/auto-notion:")
    print(f"   Action: {payload['action']}")
    
    result = client.trigger_webhook("auto-notion", payload)
    
    if result:
        print("\n✅ SUCCESS!")
        print(f"   Response: {result}")
        return 0
    else:
        print("\n⚠️  Webhook returned no response.")
        print("   Check if the workflow is activated in n8n UI.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
