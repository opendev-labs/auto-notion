#!/usr/bin/env python3
"""
Auto-Notion Missions Control Runner
Deterministic | Cosmic | Institutional-Grade
"""

import os
import sys
import logging
import time
from datetime import datetime
from dotenv import load_dotenv

# Path alignment
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.core.institutional_meta import InstitutionalMetaClient, MetaAppConfig
from api.security.vault_manager import InstitutionalVault
from api.security.risk_guard import RiskGuard
from engine.scheduler.cosmic_scheduler import CosmicScheduler
from engine.ai.deterministic_engine import DeterministicEngine
from engine.ai.psych_layer import PsychLayer
from engine.media.media_processor import MediaProcessor

def setup_institutional_logging():
    os.makedirs("logs/audit", exist_ok=True)
    os.makedirs("logs/system", exist_ok=True)
    
    log_file = f"logs/system/missions_control_{datetime.now().strftime('%Y%m%d')}.log"
    
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - [INSTITUTIONAL] - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )
    return logging.getLogger("MissionsControl")

class MissionsControl:
    """
    Fleet Commander for Auto-Notion Institutional Stack.
    Executes the 48-hour launch sequence with 365-day deterministic reach.
    """
    
    def __init__(self):
        self.logger = setup_institutional_logging()
        self.vault = InstitutionalVault()
        self.risk_guard = RiskGuard(threshold=0.85)
        self.cosmic = CosmicScheduler()
        self.psych = PsychLayer()
        self.media = MediaProcessor()
        
        self.fleet_manifest = {
            "MythicWisdom": {"category": "Mythology", "id": "123456789"},
            "DharmaDotes": {"category": "Dharma", "id": "234567890"},
            "KarmaKronicles": {"category": "Karma", "id": "345678901"},
            "ConsciousQuotes": {"category": "Consciousness", "id": "456789012"},
            "CrystalVibesHub": {"category": "Crystals", "id": "567890123"},
            "WeAreOneGlobal": {"category": "Global Unity", "id": "678901234"},
            "SacredGeometry": {"category": "Sacred Geometry", "id": "789012345"}
        }
        
        self.engine = DeterministicEngine(self.fleet_manifest)
        self._init_meta_client()
        
    def _init_meta_client(self):
        load_dotenv(".secrets/production.env")
        config = MetaAppConfig(
            app_id=os.getenv("META_APP_ID", "689310950781431"),
            app_secret=os.getenv("META_APP_SECRET"),
            client_token=os.getenv("META_CLIENT_TOKEN", "c1668ae918a78c66946cda97a2220ed7"),
            business_id=os.getenv("META_BUSINESS_ID", "780866337893831")
        )
        self.meta = InstitutionalMetaClient(config)

    def execute_launch_sequence(self, days=1):
        """Execute the deterministic launch sequence for the whole fleet"""
        self.logger.info("🚀 INITIALIZING MISSIONS CONTROL LAUNCH SEQUENCE")
        
        for page_name, page_info in self.fleet_manifest.items():
            self.logger.info(f"--- Processing Fleet Node: {page_name} ---")
            
            # 1. Deterministic Content Generation
            content_plan = []
            for d in range(days):
                post = self.engine.generate_institutional_content(page_name, d)
                
                # 2. Risk Guard Audit
                if not self.risk_guard.audit_content(post):
                    self.logger.error(f"ABORTING Mission for {page_name} Due to Risk Violation")
                    continue
                
                # 3. Psychological Anchoring
                post['final_caption'] = self.psych.embed_sublime_messaging(
                    post['anchor_message'], post['psych_vector']
                )
                
                # 4. Media Processing (Simulated for Reels)
                post['media_manifest'] = self.media.process_reel("REEL_001", post)
                
                content_plan.append(post)
                
            # 5. Cosmic Timing Alignment
            aligned_plan = self.cosmic.align_schedule(content_plan)
            
            # 6. Verifiable Logging
            for item in aligned_plan:
                self.risk_guard.log_verifiable_event("MISSION_PREPARED", {
                    "page": page_name,
                    "mission_id": item['mission_id'],
                    "cosmic_window": item['scheduled_time'],
                    "z_score": item['z_score_baseline']
                })
                
            self.logger.info(f"✅ Mission Ready for {page_name}: {len(aligned_plan)} items aligned.")

    def run_command_deck(self):
        """Main operational loop"""
        self.logger.info("🛰️ Command Deck Online. Monitoring Cosmic Windows...")
        
        try:
            self.execute_launch_sequence(days=1)
            self.logger.info("🏁 48-Hour Integration Phase 1 Complete.")
        except Exception as e:
            self.logger.critical(f"FATAL SYSTEM ERROR: {e}", exc_info=True)
            self.risk_guard.trigger_kill_switch(str(e))

if __name__ == "__main__":
    commander = MissionsControl()
    commander.run_command_deck()
