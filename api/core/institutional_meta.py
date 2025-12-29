#!/usr/bin/env python3
"""
Auto-Notion Meta Business Graph API v24.0 Client
Optimized for Institutional-Grade Reels & Story Automation
"""

import os
import json
import logging
import requests
from typing import Dict, List, Optional
from datetime import datetime
from .meta_client_v24 import MetaGraphClient, MetaAppConfig, MetaAPIError

class InstitutionalMetaClient(MetaGraphClient):
    """
    Advanced Meta Client for Auto-Notion Missions Control.
    Implements Reels upload, Story automation, and long-lived token rotation.
    """
    
    def __init__(self, config: MetaAppConfig):
        super().__init__(config)
        self.logger = logging.getLogger(__name__)

    def upload_reel(self, page_id: str, access_token: str, 
                   video_url: str, caption: str, 
                   thumb_url: Optional[str] = None) -> Dict:
        """
        Upload an Instagram Reel via /{ig-user-id}/media
        """
        endpoint = f"{page_id}/media"
        params = {
            'media_type': 'REELS',
            'video_url': video_url,
            'caption': caption[:2100],
            'share_to_feed': 'true'
        }
        
        if thumb_url:
            params['thumb_url'] = thumb_url
            
        self.logger.info(f"Initiating Reel upload for {page_id}")
        return self._make_request('POST', endpoint, access_token, page_id, params=params)

    def upload_story(self, page_id: str, access_token: str, 
                    image_url: str) -> Dict:
        """
        Upload an Instagram Story via /{ig-user-id}/media
        """
        endpoint = f"{page_id}/media"
        params = {
            'media_type': 'STORIES',
            'image_url': image_url
        }
        
        self.logger.info(f"Initiating Story upload for {page_id}")
        return self._make_request('POST', endpoint, access_token, page_id, params=params)

    def check_upload_status(self, container_id: str, access_token: str) -> str:
        """Check the status of a media container upload"""
        endpoint = f"{container_id}"
        params = {'fields': 'status_code,status'}
        
        result = self._make_request('GET', endpoint, access_token, params=params)
        return result.get('status_code', 'UNKNOWN')

    def publish_container(self, page_id: str, access_token: str, 
                         creation_id: str) -> Dict:
        """Publish a successfully uploaded media container"""
        endpoint = f"{page_id}/media_publish"
        params = {'creation_id': creation_id}
        
        self.logger.info(f"Publishing container {creation_id} for {page_id}")
        return self._make_request('POST', endpoint, access_token, page_id, params=params)

    def rotate_token(self, old_token: str) -> str:
        """Implement 60-day long-lived token rotation flow"""
        endpoint = "oauth/access_token"
        params = {
            'grant_type': 'fb_exchange_token',
            'client_id': self.config.app_id,
            'client_secret': self.config.app_secret,
            'fb_exchange_token': old_token
        }
        
        result = self._make_request('GET', endpoint, old_token, params=params)
        new_token = result.get('access_token')
        
        if new_token:
            self.logger.info("Access token rotated successfully")
            return new_token
        else:
            raise MetaAPIError("Token rotation failed: No token in response")

if __name__ == "__main__":
    # Integration test stub
    print("Institutional Meta Client Loaded")
