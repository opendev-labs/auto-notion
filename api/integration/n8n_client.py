
import os
import requests
import logging
from typing import Dict, Any, Optional, List

logger = logging.getLogger(__name__)

class N8nClient:
    """
    Client for interacting with local n8n instance.
    Acts as a bridge between Auto-Notion and n8n execution engine.
    
    Architecture:
        Auto-Notion (AI Agent) → n8n (Webhook) → Instagram/Notion/APIs
    """
    
    def __init__(self, base_url: str = "http://localhost:5678"):
        """
        Initialize n8n client.
        
        Args:
            base_url: Base URL for n8n instance (default: http://localhost:5678)
        """
        self.base_url = os.getenv("N8N_BASE_URL", base_url)
        self.webhook_base = f"{self.base_url}/webhook"
        self.api_key = os.getenv("N8N_API_KEY")  # Optional: for n8n API access
        self._is_connected = None
        
    @property
    def headers(self) -> Dict[str, str]:
        """Get headers for API requests."""
        h = {"Content-Type": "application/json"}
        if self.api_key:
            h["X-N8N-API-KEY"] = self.api_key
        return h
        
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
                self._is_connected = True
                return True
                
            # Fallback: try root if healthz fails (older versions)
            response = requests.get(self.base_url, timeout=2)
            self._is_connected = response.status_code in [200, 401, 403, 404]
            return self._is_connected
            
        except requests.exceptions.ConnectionError:
            logger.warning(f"Could not connect to n8n at {self.base_url}. Is it running?")
            self._is_connected = False
            return False
        except Exception as e:
            logger.error(f"Error checking n8n connection: {e}")
            self._is_connected = False
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
            response = requests.post(url, json=data, headers=self.headers, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.Timeout:
            logger.error(f"Webhook {webhook_path} timed out after 30s")
            return None
        except Exception as e:
            logger.error(f"Failed to trigger webhook {webhook_path}: {e}")
            return None

    # ========================================
    # Auto-Notion Specific Webhooks
    # ========================================
    
    def trigger_instagram_post(self, content: str, media_url: Optional[str] = None, 
                                scheduled_time: Optional[str] = None) -> Optional[Dict]:
        """
        Trigger Instagram post workflow via n8n.
        
        Args:
            content: Post caption/text
            media_url: URL to media (image/video)
            scheduled_time: ISO timestamp for scheduled posting
            
        Returns:
            Workflow execution result
        """
        return self.trigger_webhook("instagram-post", {
            "action": "create_post",
            "content": content,
            "media_url": media_url,
            "scheduled_time": scheduled_time,
            "source": "auto-notion"
        })
    
    def trigger_dm_response(self, user_id: str, message: str, 
                            context: Optional[Dict] = None) -> Optional[Dict]:
        """
        Trigger Instagram DM response workflow.
        
        Args:
            user_id: Instagram user ID to respond to
            message: Response message
            context: Additional context for AI response
        """
        return self.trigger_webhook("instagram-dm", {
            "action": "send_dm",
            "user_id": user_id,
            "message": message,
            "context": context or {},
            "source": "auto-notion"
        })
    
    def sync_to_notion(self, data_type: str, data: Dict[str, Any]) -> Optional[Dict]:
        """
        Sync data to Notion database via n8n.
        
        Args:
            data_type: Type of data (e.g., 'content', 'analytics', 'lead')
            data: Data to sync
        """
        return self.trigger_webhook("notion-sync", {
            "action": "sync",
            "data_type": data_type,
            "data": data,
            "source": "auto-notion"
        })
    
    def get_status(self) -> Dict[str, Any]:
        """
        Get n8n connection status summary.
        
        Returns:
            Status dictionary with connection info
        """
        connected = self.check_connection()
        return {
            "connected": connected,
            "base_url": self.base_url,
            "webhook_base": self.webhook_base,
            "status": "ONLINE" if connected else "OFFLINE"
        }


# Singleton instance for easy import
_client_instance: Optional[N8nClient] = None

def get_n8n_client() -> N8nClient:
    """Get or create singleton n8n client instance."""
    global _client_instance
    if _client_instance is None:
        _client_instance = N8nClient()
    return _client_instance

