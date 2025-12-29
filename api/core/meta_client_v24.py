#!/usr/bin/env python3
"""
Auto-Notion Meta Graph API v24.0 Client
App ID: 689310950781431 | Business ID: 780866337893831
Fully compliant with Meta Platform Terms and Security Requirements
"""

import os
import json
import hmac
import hashlib
import base64
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Union
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import logging
from dataclasses import dataclass, asdict
from enum import Enum
import time

class MetaAPIError(Exception):
    """Custom exception for Meta API errors"""
    pass

class ContentType(Enum):
    """Instagram content types supported by API v24.0"""
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"
    CAROUSEL = "CAROUSEL"
    REELS = "REELS"
    STORIES = "STORIES"

@dataclass
class MetaAppConfig:
    """Meta App configuration for Auto-Notion"""
    app_id: str
    app_secret: str
    client_token: str
    business_id: str
    api_version: str = "v24.0"
    ip_whitelist: List[str] = None
    require_app_secret_proof: bool = True
    
    def __post_init__(self):
        if self.ip_whitelist is None:
            self.ip_whitelist = ["127.0.0.1", "::1"]

class MetaGraphClient:
    """
    Enterprise-grade Meta Graph API client for Auto-Notion
    Includes all security requirements for App ID 689310950781431
    """
    
    def __init__(self, config: MetaAppConfig):
        self.config = config
        self.base_url = f"https://graph.facebook.com/{config.api_version}"
        self.session = self._create_secure_session()
        self.logger = logging.getLogger(__name__)
        
        # Rate limiting tracking
        self.calls_made = 0
        self.calls_reset_at = datetime.now() + timedelta(hours=1)
        self.page_calls = {}
        
    def _create_secure_session(self) -> requests.Session:
        """Create secure HTTP session with retry logic"""
        session = requests.Session()
        
        # Configure retry strategy
        retry_strategy = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET", "POST", "DELETE"]
        )
        
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("https://", adapter)
        session.mount("http://", adapter)
        
        # Set security headers
        session.headers.update({
            "User-Agent": "Auto-Notion/2.0.0 (Meta-Graph-API-Client)",
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate"
        })
        
        return session
    
    def _generate_appsecret_proof(self, access_token: str) -> str:
        """Generate appsecret_proof for API calls"""
        if not self.config.require_app_secret_proof:
            return None
            
        h = hmac.new(
            self.config.app_secret.encode('utf-8'),
            msg=access_token.encode('utf-8'),
            digestmod=hashlib.sha256
        )
        return h.hexdigest()
    
    def _check_rate_limit(self, page_id: str = None) -> bool:
        """Check and enforce rate limits"""
        now = datetime.now()
        
        # Reset hourly counter
        if now > self.calls_reset_at:
            self.calls_made = 0
            self.calls_reset_at = now + timedelta(hours=1)
            self.page_calls = {}
        
        # App-level rate limit (200 calls/hour)
        if self.calls_made >= 180:  # Leave 10% buffer
            wait_time = (self.calls_reset_at - now).seconds
            self.logger.warning(f"App rate limit approaching. Waiting {wait_time} seconds")
            time.sleep(wait_time)
            return self._check_rate_limit(page_id)
        
        # Page-level rate limit (50 calls/hour per page)
        if page_id:
            page_calls = self.page_calls.get(page_id, 0)
            if page_calls >= 45:  # Leave 10% buffer
                self.logger.warning(f"Page {page_id} rate limit approaching")
                return False
        
        return True
    
    def _make_request(self, method: str, endpoint: str, access_token: str, 
                     page_id: str = None, **kwargs) -> Dict:
        """Make secure API request with error handling"""
        
        # Check rate limits
        if not self._check_rate_limit(page_id):
            raise MetaAPIError("Rate limit exceeded for page")
        
        url = f"{self.base_url}/{endpoint}"
        params = kwargs.get('params', {})
        
        # Add authentication parameters
        params['access_token'] = access_token
        
        # Add appsecret_proof if required
        if self.config.require_app_secret_proof:
            proof = self._generate_appsecret_proof(access_token)
            if proof:
                params['appsecret_proof'] = proof
        
        # Add client token for app-level calls
        if endpoint.startswith(f"{self.config.app_id}"):
            params['client_token'] = self.config.client_token
        
        try:
            response = self.session.request(
                method=method,
                url=url,
                params=params,
                json=kwargs.get('json'),
                files=kwargs.get('files'),
                timeout=30
            )
            
            # Update rate limit counters
            self.calls_made += 1
            if page_id:
                self.page_calls[page_id] = self.page_calls.get(page_id, 0) + 1
            
            # Handle Meta API errors
            if response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', 3600))
                self.logger.warning(f"Rate limited. Retrying after {retry_after} seconds")
                time.sleep(retry_after)
                return self._make_request(method, endpoint, access_token, page_id, **kwargs)
            
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.HTTPError as e:
            error_data = {}
            try:
                error_data = response.json().get('error', {})
            except:
                pass
            
            error_msg = error_data.get('message', str(e))
            error_code = error_data.get('code', 'UNKNOWN')
            
            self.logger.error(f"Meta API Error {error_code}: {error_msg}")
            
            # Handle specific error codes
            if error_code == 190:  # Invalid OAuth access token
                raise MetaAPIError("Access token expired or invalid")
            elif error_code == 4:   # Application request limit reached
                raise MetaAPIError("Application rate limit reached")
            elif error_code == 32:  # Page request limit reached
                raise MetaAPIError("Page rate limit reached")
            else:
                raise MetaAPIError(f"API Error {error_code}: {error_msg}")
                
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Request failed: {e}")
            raise MetaAPIError(f"Network error: {e}")
    
    # ==================== INSTAGRAM BUSINESS API METHODS ====================
    
    def upload_media(self, page_id: str, access_token: str, 
                    media_path: str, media_type: ContentType,
                    caption: str = None, **kwargs) -> Dict:
        """
        Upload media to Instagram using API v24.0
        Supports: IMAGE, VIDEO, CAROUSEL, REELS
        """
        endpoint = f"{page_id}/media"
        
        params = {
            'caption': caption[:2200] if caption else '',
            'published': 'false'
        }
        
        # Add media type specific parameters
        if media_type == ContentType.IMAGE:
            params['image_url'] = media_path
        elif media_type == ContentType.VIDEO:
            params['video_url'] = media_path
            params['media_type'] = 'VIDEO'
        elif media_type == ContentType.REELS:
            params['video_url'] = media_path
            params['media_type'] = 'REELS'
            params['share_to_feed'] = 'true'
        elif media_type == ContentType.CAROUSEL:
            if 'children' in kwargs:
                params['children'] = ','.join(kwargs['children'])
                params['media_type'] = 'CAROUSEL'
        
        # Add thumb for videos
        if media_type in [ContentType.VIDEO, ContentType.REELS] and 'thumb_url' in kwargs:
            params['thumb_url'] = kwargs['thumb_url']
        
        return self._make_request('POST', endpoint, access_token, page_id, params=params)
    
    def publish_media(self, page_id: str, access_token: str, 
                     creation_id: str) -> Dict:
        """Publish uploaded media"""
        endpoint = f"{page_id}/media_publish"
        params = {'creation_id': creation_id}
        
        return self._make_request('POST', endpoint, access_token, page_id, params=params)
    
    def get_instagram_insights(self, page_id: str, access_token: str,
                              metrics: List[str], period: str = 'day') -> Dict:
        """Get Instagram insights data"""
        endpoint = f"{page_id}/insights"
        params = {
            'metric': ','.join(metrics),
            'period': period,
            'since': int((datetime.now() - timedelta(days=30)).timestamp()),
            'until': int(datetime.now().timestamp())
        }
        
        return self._make_request('GET', endpoint, access_token, page_id, params=params)
    
    def get_instagram_media(self, page_id: str, access_token: str,
                           fields: List[str] = None) -> Dict:
        """Get Instagram media objects"""
        endpoint = f"{page_id}/media"
        
        if fields is None:
            fields = ['id', 'caption', 'media_type', 'media_url', 
                     'permalink', 'timestamp', 'like_count', 
                     'comments_count']
        
        params = {
            'fields': ','.join(fields),
            'limit': 25
        }
        
        return self._make_request('GET', endpoint, access_token, page_id, params=params)
    
    def comment_on_media(self, page_id: str, access_token: str,
                        media_id: str, message: str) -> Dict:
        """Comment on Instagram media"""
        endpoint = f"{media_id}/comments"
        params = {'message': message[:250]}
        
        return self._make_request('POST', endpoint, access_token, page_id, params=params)
    
    # ==================== APP MANAGEMENT METHODS ====================
    
    def validate_app_access_token(self, access_token: str) -> Dict:
        """Validate app access token"""
        endpoint = "debug_token"
        params = {
            'input_token': access_token,
            'access_token': f"{self.config.app_id}|{self.config.app_secret}"
        }
        
        return self._make_request('GET', endpoint, access_token, params=params)
    
    def get_app_roles(self) -> Dict:
        """Get app roles and permissions"""
        endpoint = f"{self.config.app_id}/roles"
        access_token = f"{self.config.app_id}|{self.config.app_secret}"
        
        return self._make_request('GET', endpoint, access_token)
    
    def subscribe_to_webhooks(self, page_id: str, access_token: str,
                            subscription_fields: List[str]) -> Dict:
        """Subscribe to page webhooks"""
        # Note: BASE_DOMAIN would be imported or passed in a real scenario
        base_domain = "https://opendev-labs.github.io/auto-notion"
        endpoint = f"{self.config.app_id}/subscriptions"
        
        params = {
            'object': 'page',
            'callback_url': f"{base_domain}/webhooks/page-events",
            'fields': ','.join(subscription_fields),
            'verify_token': 'auto-notion-webhook-verify',
            'access_token': access_token
        }
        
        return self._make_request('POST', endpoint, access_token, params=params)
    
    # ==================== BUSINESS MANAGEMENT METHODS ====================
    
    def get_business_accounts(self) -> Dict:
        """Get business accounts"""
        endpoint = f"{self.config.business_id}/owned_ad_accounts"
        access_token = f"{self.config.app_id}|{self.config.app_secret}"
        
        return self._make_request('GET', endpoint, access_token)
    
    def get_page_access_tokens(self, page_id: str) -> Dict:
        """Get page access tokens"""
        endpoint = f"{page_id}"
        access_token = f"{self.config.app_id}|{self.config.app_secret}"
        
        params = {
            'fields': 'access_token,name,id',
            'access_token': access_token
        }
        
        return self._make_request('GET', endpoint, access_token, params=params)
    
    # ==================== SECURITY METHODS ====================
    
    def generate_long_lived_token(self, short_lived_token: str) -> Dict:
        """Generate long-lived access token (60 days)"""
        endpoint = "oauth/access_token"
        
        params = {
            'grant_type': 'fb_exchange_token',
            'client_id': self.config.app_id,
            'client_secret': self.config.app_secret,
            'fb_exchange_token': short_lived_token
        }
        
        return self._make_request('GET', endpoint, short_lived_token, params=params)
    
    def refresh_long_lived_token(self, long_lived_token: str) -> Dict:
        """Refresh long-lived token before expiration"""
        # In v24.0, long-lived tokens don't need refresh but can be extended
        endpoint = "oauth/access_token"
        
        params = {
            'grant_type': 'fb_exchange_token',
            'client_id': self.config.app_id,
            'client_secret': self.config.app_secret,
            'fb_exchange_token': long_lived_token
        }
        
        return self._make_request('GET', endpoint, long_lived_token, params=params)

class AutoNotionSecurity:
    """Security layer for Auto-Notion Meta App"""
    
    @staticmethod
    def encrypt_token(token: str, key: str) -> str:
        """Encrypt token using Fernet symmetric encryption"""
        from cryptography.fernet import Fernet
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
        
        salt = os.urandom(16)
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        derived_key = base64.urlsafe_b64encode(kdf.derive(key.encode()))
        f = Fernet(derived_key)
        
        encrypted = f.encrypt(token.encode())
        return base64.urlsafe_b64encode(salt + encrypted).decode()
    
    @staticmethod
    def verify_webhook_signature(payload: bytes, signature: str, secret: str) -> bool:
        """Verify webhook signature"""
        expected_signature = hmac.new(
            secret.encode('utf-8'),
            msg=payload,
            digestmod=hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(expected_signature, signature)
    
    @staticmethod
    def validate_ip_address(ip_address: str, whitelist: List[str]) -> bool:
        """Validate IP address against whitelist"""
        import ipaddress
        
        try:
            ip = ipaddress.ip_address(ip_address)
            for allowed_ip in whitelist:
                if ip == ipaddress.ip_address(allowed_ip):
                    return True
            return False
        except ValueError:
            return False

if __name__ == "__main__":
    # Example usage
    config = MetaAppConfig(
        app_id="689310950781431",
        app_secret=os.getenv("META_APP_SECRET", "dummy_secret"),
        client_token="c1668ae918a78c66946cda97a2220ed7",
        business_id="780866337893831"
    )
    
    client = MetaGraphClient(config)
    print("Auto-Notion Meta Graph API Client initialized")
    print(f"App ID: {config.app_id}")
    print(f"API Version: {config.api_version}")
