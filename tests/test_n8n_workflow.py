import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.integration.n8n_client import get_n8n_client
import json

def test_n8n_connection():
    client = get_n8n_client()
    status = client.get_status()
    print(f"n8n Status: {json.dumps(status, indent=2)}")
    
    if status['connected']:
        print("✅ n8n is online!")
    else:
        print("❌ n8n is offline. Make sure it's running at http://localhost:5678")

def simulate_workflow_trigger():
    client = get_n8n_client()
    print("\nSimulating Instagram Post Trigger...")
    result = client.trigger_instagram_post(
        content="Hello from Auto-Notion!",
        media_url="https://example.com/image.jpg"
    )
    print(f"Result: {result}")

if __name__ == "__main__":
    test_n8n_connection()
    # Uncomment to test actual trigger if n8n is running
    # simulate_workflow_trigger()
