#!/usr/bin/env python3
"""
Auto-Notion Notion Integration
Synchronizes Instagram content with Notion databases
"""

import os
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import requests
from dataclasses import dataclass, asdict
from enum import Enum
import logging

class NotionDatabase(Enum):
    """Notion database IDs for Auto-Notion"""
    CONTENT_CALENDAR = "content_calendar_db"
    PERFORMANCE_ANALYTICS = "performance_analytics_db"
    TEAM_COLLABORATION = "team_collaboration_db"
    POST_SCHEDULE = "post_schedule_db"
    CONTENT_LIBRARY = "content_library_db"

@dataclass
class NotionPage:
    """Notion page structure"""
    database_id: str
    properties: Dict[str, Any]
    content: Optional[List[Dict]] = None
    
    def to_notion_format(self) -> Dict:
        """Convert to Notion API format"""
        return {
            "parent": {"database_id": self.database_id},
            "properties": self.properties
        }

class NotionClient:
    """Notion API client for Auto-Notion"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.notion.com/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        self.logger = logging.getLogger(__name__)
    
    def create_page(self, page: NotionPage) -> Dict:
        """Create a new page in Notion database"""
        url = f"{self.base_url}/pages"
        data = page.to_notion_format()
        
        try:
            response = self.session.post(url, json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Failed to create Notion page: {e}")
            raise
    
    def update_page(self, page_id: str, properties: Dict) -> Dict:
        """Update existing Notion page"""
        url = f"{self.base_url}/pages/{page_id}"
        data = {"properties": properties}
        
        try:
            response = self.session.patch(url, json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Failed to update Notion page: {e}")
            raise
    
    def query_database(self, database_id: str, filter_obj: Dict = None) -> Dict:
        """Query Notion database"""
        url = f"{self.base_url}/databases/{database_id}/query"
        data = {}
        
        if filter_obj:
            data["filter"] = filter_obj
        
        try:
            response = self.session.post(url, json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Failed to query Notion database: {e}")
            raise
    
    def get_page_content(self, page_id: str) -> Dict:
        """Get page content blocks"""
        url = f"{self.base_url}/blocks/{page_id}/children"
        
        try:
            response = self.session.get(url)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Failed to get page content: {e}")
            raise

class AutoNotionSync:
    """Synchronization between Meta Instagram and Notion"""
    
    def __init__(self, meta_client, notion_client: NotionClient):
        self.meta_client = meta_client
        self.notion_client = notion_client
        self.logger = logging.getLogger(__name__)
    
    def sync_instagram_post_to_notion(self, page_id: str, access_token: str, 
                                    post_id: str, database_id: str) -> Dict:
        """Sync Instagram post to Notion database"""
        # Get post data from Instagram
        post_data = self._get_instagram_post_data(page_id, access_token, post_id)
        
        # Convert to Notion format
        notion_page = self._convert_post_to_notion_page(post_data, database_id)
        
        # Create in Notion
        result = self.notion_client.create_page(notion_page)
        
        # Log synchronization
        self._log_sync_activity("post_sync", post_id, result["id"])
        
        return result
    
    def sync_insights_to_notion(self, page_id: str, access_token: str,
                              database_id: str) -> Dict:
        """Sync Instagram insights to Notion analytics database"""
        # Get insights from Instagram
        metrics = ["impressions", "reach", "engagement", "saved"]
        insights = self.meta_client.get_instagram_insights(
            page_id, access_token, metrics, "week"
        )
        
        # Create analytics page in Notion
        analytics_page = self._create_analytics_page(insights, database_id)
        
        result = self.notion_client.create_page(analytics_page)
        
        self._log_sync_activity("insights_sync", page_id, result["id"])
        
        return result
    
    def sync_content_calendar(self, page_name: str, content_plan: List[Dict],
                            database_id: str) -> Dict:
        """Sync content calendar to Notion"""
        results = []
        
        for content_item in content_plan:
            # Create calendar entry
            calendar_page = self._create_calendar_entry(
                page_name, content_item, database_id
            )
            
            result = self.notion_client.create_page(calendar_page)
            results.append(result)
        
        return {"synced_items": len(results), "results": results}
    
    def _get_instagram_post_data(self, page_id: str, access_token: str, 
                               post_id: str) -> Dict:
        """Get Instagram post data"""
        # This would use Meta Graph API to get post details
        # For now, return sample data
        return {
            "id": post_id,
            "caption": "Sample post caption",
            "media_type": "IMAGE",
            "media_url": "https://example.com/image.jpg",
            "permalink": f"https://instagram.com/p/{post_id}",
            "timestamp": datetime.now().isoformat(),
            "metrics": {
                "likes": 150,
                "comments": 20,
                "shares": 5,
                "saves": 10
            }
        }
    
    def _convert_post_to_notion_page(self, post_data: Dict, 
                                   database_id: str) -> NotionPage:
        """Convert Instagram post to Notion page format"""
        properties = {
            "Title": {
                "title": [
                    {
                        "text": {
                            "content": f"Instagram Post: {post_data['id']}"
                        }
                    }
                ]
            },
            "Platform": {
                "select": {"name": "Instagram"}
            },
            "Post ID": {
                "rich_text": [
                    {
                        "text": {"content": post_data["id"]}
                    }
                ]
            },
            "Caption": {
                "rich_text": [
                    {
                        "text": {"content": post_data.get("caption", "No caption")[:2000]}
                    }
                ]
            },
            "Media Type": {
                "select": {"name": post_data.get("media_type", "IMAGE")}
            },
            "Posted Date": {
                "date": {
                    "start": post_data.get("timestamp", datetime.now().isoformat())
                }
            },
            "Likes": {
                "number": post_data.get("metrics", {}).get("likes", 0)
            },
            "Comments": {
                "number": post_data.get("metrics", {}).get("comments", 0)
            },
            "Status": {
                "status": {"name": "Published"}
            }
        }
        
        return NotionPage(
            database_id=database_id,
            properties=properties,
            content=self._create_post_content_blocks(post_data)
        )
    
    def _create_analytics_page(self, insights: Dict, database_id: str) -> NotionPage:
        """Create analytics page in Notion"""
        properties = {
            "Title": {
                "title": [
                    {
                        "text": {
                            "content": f"Weekly Insights: {datetime.now().strftime('%Y-%m-%d')}"
                        }
                    }
                ]
            },
            "Report Type": {
                "select": {"name": "Weekly Analytics"}
            },
            "Report Date": {
                "date": {"start": datetime.now().isoformat()}
            },
            # Note: This is a simplified extraction
            "Total Impressions": {
                "number": insights.get("data", [{}])[0].get("values", [{}])[0].get("value", 0) if insights.get("data") else 0
            }
        }
        
        return NotionPage(database_id=database_id, properties=properties)
    
    def _create_calendar_entry(self, page_name: str, content_item: Dict,
                             database_id: str) -> NotionPage:
        """Create content calendar entry"""
        properties = {
            "Title": {
                "title": [
                    {
                        "text": {
                            "content": f"{page_name}: {content_item.get('type', 'Post')}"
                        }
                    }
                ]
            },
            "Instagram Page": {
                "select": {"name": page_name}
            },
            "Content Type": {
                "select": {"name": content_item.get("type", "Post")}
            },
            "Scheduled Date": {
                "date": {
                    "start": content_item.get("scheduled_date", datetime.now().isoformat())
                }
            },
            "Status": {
                "status": {"name": content_item.get("status", "Planned")}
            },
            "Priority": {
                "select": {"name": content_item.get("priority", "Medium")}
            }
        }
        
        return NotionPage(database_id=database_id, properties=properties)
    
    def _create_post_content_blocks(self, post_data: Dict) -> List[Dict]:
        """Create Notion content blocks for post"""
        blocks = [
            {
                "object": "block",
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [{"type": "text", "text": {"content": "Post Details"}}]
                }
            },
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": f"Caption: {post_data.get('caption', 'No caption')}"
                            }
                        }
                    ]
                }
            }
        ]
        
        if post_data.get("media_url"):
            blocks.append({
                "object": "block",
                "type": "image",
                "image": {
                    "type": "external",
                    "external": {"url": post_data["media_url"]}
                }
            })
        
        return blocks
    
    def _log_sync_activity(self, sync_type: str, source_id: str, notion_id: str):
        """Log synchronization activity"""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "sync_type": sync_type,
            "source_id": source_id,
            "notion_page_id": notion_id,
            "status": "success"
        }
        
        log_file = f"logs/notion/sync_{datetime.now().strftime('%Y%m%d')}.json"
        try:
            os.makedirs(os.path.dirname(log_file), exist_ok=True)
            with open(log_file, 'a') as f:
                json.dump(log_entry, f)
                f.write('\n')
        except Exception as e:
            self.logger.error(f"Failed to log sync activity: {e}")

if __name__ == "__main__":
    # Example usage
    api_key = os.getenv("NOTION_API_KEY", "dummy_key")
    notion_client = NotionClient(api_key=api_key)
    print("Auto-Notion Integration initialized")
    
    # Test database query
    try:
        result = notion_client.query_database("content_calendar_db")
        print(f"Found {len(result.get('results', []))} pages")
    except Exception as e:
        print(f"No database configured yet or query failed: {e}")
