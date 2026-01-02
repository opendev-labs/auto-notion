#!/usr/bin/env python3
"""
Auto-Notion n8n Connection Test
Verifies connectivity to local n8n instance.

Usage:
    python scripts/test_n8n_connection.py

Requirements:
    - n8n running at localhost:5678
    - Start with: cd ~/n8n-local && docker compose up -d
"""

import sys
import os

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.integration.n8n_client import N8nClient

def main():
    print("=" * 50)
    print("🔗 Auto-Notion → n8n Connection Test")
    print("=" * 50)
    
    client = N8nClient()
    print(f"\n📍 Target: {client.base_url}")
    
    print("\n⏳ Testing connection...")
    if client.check_connection():
        print("✅ SUCCESS: n8n is running and accessible!")
        print(f"\n🌐 n8n UI: {client.base_url}")
        print(f"📡 Webhook Base: {client.webhook_base}")
        
        print("\n" + "=" * 50)
        print("NEXT STEPS:")
        print("=" * 50)
        print("1. Create a webhook in n8n (e.g., /webhook/auto-notion)")
        print("2. Use client.trigger_webhook('auto-notion', data) to trigger it")
        print("3. Build your automation workflows in n8n")
        return 0
    else:
        print("❌ FAILED: Cannot connect to n8n")
        print("\n🛠️  TROUBLESHOOTING:")
        print("   1. Start n8n: cd ~/n8n-local && docker compose up -d")
        print("   2. Check Docker: docker ps | grep n8n")
        print("   3. View logs: docker logs -f n8n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
