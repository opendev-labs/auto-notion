#!/usr/bin/env python3
"""
Auto-Notion Institutional Risk Guard
Monitors mission-drift and provides automated kill-switch capabilities
"""

import logging
import json
from datetime import datetime
from typing import Dict, List

class RiskGuard:
    """
    Protects the organization from 'Mission Drift' and 'Low Frequency' automation.
    Implements cryptographically verifiable event logs.
    """
    
    def __init__(self, threshold: float = 0.85):
        self.drift_threshold = threshold
        self.is_active = True
        self.logger = logging.getLogger(__name__)
        
    def audit_content(self, content: Dict) -> bool:
        """
        Audit content for mission alignment.
        Returns True if safe, False if drift detected.
        """
        z_score = content.get('z_score_baseline', 0.0)
        
        if z_score < self.drift_threshold:
            self.logger.critical(f"RISK ALERT: Mission drift detected in mission {content.get('mission_id')}")
            self.trigger_kill_switch("Low frequency alignment detected (Z-Score: {z_score})")
            return False
            
        # Check for prohibited patterns (Institutional Audit)
        if self._contains_impulsive_patterns(content):
            self.logger.critical("RISK ALERT: Impulsive behavior pattern detected")
            self.trigger_kill_switch("Impulsive pattern violation")
            return False
            
        return True
    
    def trigger_kill_switch(self, reason: str):
        """Emergency shutdown of automation"""
        self.is_active = False
        message = f"🚨 INSTITUTIONAL KILL-SWITCH ACTIVATED: {reason}"
        self.logger.error(message)
        
        # In a real system, this would write to a shared state (Firebase/Redis)
        with open("logs/audit/kill_switch.log", "a") as f:
            f.write(f"{datetime.now().isoformat()} - {reason}\n")
            
        # Critical: Stop all execution
        import sys
        # sys.exit(1) # Commented out for demonstration during development
        
    def log_verifiable_event(self, action: str, metadata: Dict):
        """Create a verifiable audit log entry"""
        import hmac
        import hashlib
        
        # Use a secret key for institutional signing (would be in Vault)
        key = "LAKHAN-BHAI-INSTITUTIONAL-SECRET"
        
        payload = json.dumps(metadata, sort_keys=True)
        signature = hmac.new(key.encode(), payload.encode(), hashlib.sha256).hexdigest()
        
        event = {
            "timestamp": datetime.now().isoformat(),
            "action": action,
            "metadata": metadata,
            "signature": f"sha256={signature}",
            "institutional_status": "VERIFIED" if self.is_active else "HALTED"
        }
        
        log_file = f"logs/audit/events_{datetime.now().strftime('%Y%m%d')}.json"
        try:
            import os
            os.makedirs(os.path.dirname(log_file), exist_ok=True)
            with open(log_file, "a") as f:
                f.write(json.dumps(event) + "\n")
        except Exception as e:
            self.logger.error(f"Failed to log verifiable event: {e}")

    def _contains_impulsive_patterns(self, content: Dict) -> bool:
        """Detect low-frequency, impulsive keywords or structures"""
        prohibited = ["buy now", "hurry", "exclusive offer", "click link", "don't miss"]
        text = json.dumps(content).lower()
        for p in prohibited:
            if p in text: return True
        return False

if __name__ == "__main__":
    guard = RiskGuard()
    
    # Test safe content
    safe = {"mission_id": "M-001", "z_score_baseline": 1.2, "text": "Observe your breath."}
    print(f"Audit Safe: {guard.audit_content(safe)}")
    
    # Test drift
    unsafe = {"mission_id": "M-999", "z_score_baseline": 0.5, "text": "Hurry, limited time!"}
    print(f"Audit Unsafe: {guard.audit_content(unsafe)}")
    
    guard.log_verifiable_event("CONTENT_AUDIT", {"id": "M-001", "status": "APPROVED"})
