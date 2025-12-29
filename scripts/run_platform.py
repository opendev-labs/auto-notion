#!/usr/bin/env python3
"""
Auto-Notion Platform Runner
Main entry point for the automation platform
"""

import os
import sys
import logging
from datetime import datetime
from dotenv import load_dotenv

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.core.meta_client_v24 import MetaGraphClient, MetaAppConfig
from notion.core.notion_client import NotionClient
from engine.content.strategy_engine import ContentIntelligence
from api.security.compliance_manager import AutoNotionCompliance

def setup_logging():
    """Setup comprehensive logging"""
    log_dir = "logs/system"
    os.makedirs(log_dir, exist_ok=True)
    
    log_file = os.path.join(log_dir, f"platform_{datetime.now().strftime('%Y%m%d')}.log")
    
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )
    
    return logging.getLogger(__name__)

def load_configuration():
    """Load platform configuration"""
    # Load environment variables
    env_file = ".secrets/production.env"
    if os.path.exists(env_file):
        load_dotenv(env_file)
        logger.info(f"Loaded environment from {env_file}")
    else:
        logger.warning(f"Production environment file not found: {env_file}")
        logger.info("Using template environment")
        load_dotenv(".secrets/template.env")
    
    # Meta App configuration
    meta_config = MetaAppConfig(
        app_id=os.getenv("META_APP_ID", "689310950781431"),
        app_secret=os.getenv("META_APP_SECRET", "dummy_secret"),
        client_token=os.getenv("META_CLIENT_TOKEN", "c1668ae918a78c66946cda97a2220ed7"),
        business_id=os.getenv("META_BUSINESS_ID", "780866337893831"),
        api_version="v24.0"
    )
    
    return meta_config

def initialize_services(meta_config):
    """Initialize all platform services"""
    logger.info("Initializing Auto-Notion services...")
    
    # Initialize Meta Graph API client
    meta_client = MetaGraphClient(meta_config)
    logger.info("Meta Graph API client initialized")
    
    # Initialize Notion client
    notion_api_key = os.getenv("NOTION_API_KEY")
    if notion_api_key:
        notion_client = NotionClient(notion_api_key)
        logger.info("Notion client initialized")
    else:
        notion_client = None
        logger.warning("Notion API key not configured")
    
    # Initialize content intelligence
    content_engine = ContentIntelligence(data_root="data")
    logger.info("Content intelligence engine initialized")
    
    # Initialize compliance manager
    compliance = AutoNotionCompliance(
        app_id=meta_config.app_id,
        business_id=meta_config.business_id
    )
    logger.info("Compliance manager initialized")
    
    return {
        "meta": meta_client,
        "notion": notion_client,
        "content": content_engine,
        "compliance": compliance
    }

def run_daily_workflow(services):
    """Run daily automation workflow"""
    logger.info("Starting daily workflow...")
    
    pages = [
        "MythicWisdom",
        "DharmaDotes", 
        "KarmaKronicles",
        "ConsciousQuotes",
        "CrystalEnergy",
        "SacredGeometry",
        "WeAreOneGlobal"
    ]
    
    total_posts = 0
    
    for page in pages:
        logger.info(f"Processing page: {page}")
        
        try:
            # Generate content plan
            content_plan = services["content"].generate_content_plan(page, days=1)
            total_posts += len(content_plan)
            
            logger.info(f"Generated {len(content_plan)} posts for {page}")
            
            # Sync to Notion if configured
            if services["notion"]:
                # This would sync to Notion in production
                logger.info(f"Content ready for Notion sync: {page}")
            
        except Exception as e:
            logger.error(f"Error processing page {page}: {e}")
    
    logger.info(f"Daily workflow complete. Generated {total_posts} total posts.")
    return total_posts

def main():
    """Main platform runner"""
    global logger
    logger = setup_logging()
    
    logger.info("╔══════════════════════════════════════════════════════════════════╗")
    logger.info("║                    AUTO-NOTION PLATFORM v2.0.0                   ║")
    logger.info("║           Meta App: 689310950781431 | Business: 780866337893831 ║")
    logger.info("╚══════════════════════════════════════════════════════════════════╝")
    
    try:
        # Load configuration
        meta_config = load_configuration()
        
        # Initialize services
        services = initialize_services(meta_config)
        
        # Run daily workflow
        posts_generated = run_daily_workflow(services)
        
        # Generate compliance report
        compliance_report = services["compliance"].generate_privacy_report()
        logger.info("Compliance report generated")
        
        # Platform status
        logger.info(f"Platform running successfully. Posts generated: {posts_generated}")
        logger.info(f"Next run scheduled for: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
    except Exception as e:
        logger.error(f"Platform error: {e}", exc_info=True)
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
