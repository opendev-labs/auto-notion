
import os
import requests
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class N8nClient:
    """
    Client for interacting with local n8n instance.
    Acts as a bridge between Auto-Notion and n8n execution engine.
    """
    
    def __init__(self, base_url: str = "http://localhost:5678"):
        """
        Initialize n8n client.
        
        Args:
            base_url: Base URL for n8n instance (default: http://localhost:5678)
        """
        self.base_url = os.getenv("N8N_BASE_URL", base_url)
        self.webhook_base = f"{self.base_url}/webhook"
        
    def check_connection(self) -> bool:
        """
        Check if n8n instance is reachable.
        
        Returns:
            bool: True if connected, False otherwise
        """
        try:
            # Try to hit the n8n health check or root
            # n8n exposes /healthz for health checks
            response = requests.get(f"{self.base_url}/healthz", timeout=2)
            
            if response.status_code == 200:
                return True
                
            # Fallback: try root if healthz fails (older versions)
            response = requests.get(self.base_url, timeout=2)
            return response.status_code in [200, 401, 403, 404] # Any response means it's running
            
        except requests.exceptions.ConnectionError:
            logger.warning(f"Could not connect to n8n at {self.base_url}. Is it running?")
            return False
        except Exception as e:
            logger.error(f"Error checking n8n connection: {e}")
            return False

    def trigger_webhook(self, webhook_path: str, data: Dict[str, Any]) -> Optional[Dict]:
        """
        Trigger an n8n webhook.
        
        Args:
            webhook_path: The specific path suffix for the webhook (e.g., 'auto-notion')
            data: Payload to send
            
        Returns:
            Response JSON if successful, None otherwise
        """
        url = f"{self.webhook_base}/{webhook_path}"
        try:
            logger.info(f"Triggering n8n webhook: {url}")
            response = requests.post(url, json=data, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Failed to trigger webhook {webhook_path}: {e}")
            return None
