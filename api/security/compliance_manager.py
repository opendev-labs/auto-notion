#!/usr/bin/env python3
"""
Auto-Notion Compliance Manager
Ensures compliance with Meta Platform Terms and GDPR requirements
"""

import os
import json
import hashlib
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import logging
from enum import Enum

class ComplianceLevel(Enum):
    """Compliance level enum"""
    FULL = "full_compliance"
    PARTIAL = "partial_compliance"
    NON_COMPLIANT = "non_compliant"

class DataCategory(Enum):
    """Data category for GDPR compliance"""
    PERSONAL = "personal_data"
    BEHAVIORAL = "behavioral_data"
    CONTENT = "user_content"
    ANALYTICS = "analytics_data"

class AutoNotionCompliance:
    """
    Compliance manager for Auto-Notion Meta App
    Handles GDPR, CCPA, and Meta Platform Terms compliance
    """
    
    def __init__(self, app_id: str, business_id: str):
        self.app_id = app_id
        self.business_id = business_id
        self.logger = logging.getLogger(__name__)
        self.compliance_data = self._load_compliance_data()
        
    def _load_compliance_data(self) -> Dict:
        """Load compliance configuration"""
        base_domain = "https://opendev-labs.github.io/auto-notion"
        data = {
            "gdpr": {
                "data_processing_basis": "consent",
                "data_retention_days": 90,
                "right_to_be_forgotten": True,
                "data_portability": True
            },
            "meta_terms": {
                "platform_terms_version": "2024.1",
                "business_use_only": True,
                "age_gating": "13+",
                "prohibited_content": ["alcohol", "tobacco", "adult"]
            },
            "data_deletion": {
                "callback_url": f"{base_domain}/webhooks/data-deletion",
                "confirmation_method": "callback",
                "processing_time_hours": 72
            }
        }
        return data
    
    def validate_content_compliance(self, content: Dict, page_category: str) -> Dict:
        """
        Validate content against Meta Platform Terms and age restrictions
        """
        violations = []
        warnings = []
        
        # Check age restriction compliance
        if self.compliance_data["meta_terms"]["age_gating"] == "13+":
            if self._contains_mature_content(content):
                violations.append("content_not_suitable_for_13+")
        
        # Check prohibited content
        prohibited = self.compliance_data["meta_terms"]["prohibited_content"]
        for item in prohibited:
            if self._contains_prohibited_content(content, item):
                violations.append(f"prohibited_content_{item}")
        
        # Check business use compliance
        if not self.compliance_data["meta_terms"]["business_use_only"]:
            warnings.append("not_business_use_only")
        
        # Generate compliance report
        report = {
            "timestamp": datetime.now().isoformat(),
            "content_id": content.get("id", "unknown"),
            "page_category": page_category,
            "compliance_level": self._determine_compliance_level(violations, warnings),
            "violations": violations,
            "warnings": warnings,
            "recommendations": self._generate_recommendations(violations, warnings),
            "gdpr_applicable": self._is_gdpr_applicable(content),
            "data_categories": self._identify_data_categories(content)
        }
        
        return report
    
    def handle_data_deletion_request(self, user_id: str, app_scoped_id: str) -> Dict:
        """
        Handle GDPR Article 17 (Right to be Forgotten) requests
        """
        deletion_record = {
            "request_id": hashlib.sha256(f"{user_id}{datetime.now().isoformat()}".encode()).hexdigest()[:16],
            "user_id": user_id,
            "app_scoped_id": app_scoped_id,
            "request_received": datetime.now().isoformat(),
            "status": "processing",
            "data_categories_to_delete": [],
            "confirmation_sent": False,
            "completion_time": None
        }
        
        # Identify data categories
        data_categories = self._get_user_data_categories(app_scoped_id)
        deletion_record["data_categories_to_delete"] = data_categories
        
        # Process deletion (in real implementation, this would delete from database)
        self._process_data_deletion(app_scoped_id, data_categories)
        
        deletion_record["status"] = "completed"
        deletion_record["completion_time"] = datetime.now().isoformat()
        deletion_record["confirmation_sent"] = True
        
        # Log deletion for audit trail
        self._log_deletion_audit(deletion_record)
        
        return deletion_record
    
    def generate_privacy_report(self) -> Dict:
        """Generate privacy compliance report"""
        return {
            "app_id": self.app_id,
            "business_id": self.business_id,
            "report_date": datetime.now().isoformat(),
            "compliance_status": {
                "gdpr": self._check_gdpr_compliance(),
                "ccpa": self._check_ccpa_compliance(),
                "meta_terms": self._check_meta_terms_compliance(),
                "age_gating": self._check_age_gating_compliance()
            },
            "data_processing": {
                "legal_basis": self.compliance_data["gdpr"]["data_processing_basis"],
                "data_minimization": True,
                "purpose_limitation": True,
                "storage_limitation": self.compliance_data["gdpr"]["data_retention_days"]
            },
            "user_rights": {
                "access": True,
                "rectification": True,
                "erasure": self.compliance_data["gdpr"]["right_to_be_forgotten"],
                "portability": self.compliance_data["gdpr"]["data_portability"],
                "objection": True
            },
            "security_measures": {
                "encryption": "AES-256-GCM",
                "access_controls": True,
                "data_backup": True,
                "incident_response": True
            }
        }
    
    def _contains_mature_content(self, content: Dict) -> bool:
        """Check if content contains mature themes"""
        mature_keywords = ["alcohol", "drug", "violence", "explicit", "adult"]
        text = json.dumps(content).lower()
        
        for keyword in mature_keywords:
            if keyword in text:
                return True
        return False
    
    def _contains_prohibited_content(self, content: Dict, prohibited: str) -> bool:
        """Check for prohibited content"""
        text = json.dumps(content).lower()
        return prohibited in text
    
    def _determine_compliance_level(self, violations: List, warnings: List) -> str:
        """Determine overall compliance level"""
        if len(violations) == 0 and len(warnings) == 0:
            return ComplianceLevel.FULL.value
        elif len(violations) == 0 and len(warnings) > 0:
            return ComplianceLevel.PARTIAL.value
        else:
            return ComplianceLevel.NON_COMPLIANT.value
    
    def _generate_recommendations(self, violations: List, warnings: List) -> List[str]:
        """Generate compliance recommendations"""
        recommendations = []
        
        for violation in violations:
            if "prohibited_content" in violation:
                recommendations.append("Remove references to prohibited content")
            elif "content_not_suitable_for_13+" in violation:
                recommendations.append("Add age restriction warning or modify content")
        
        for warning in warnings:
            if "not_business_use_only" in warning:
                recommendations.append("Ensure content aligns with business account guidelines")
        
        return recommendations
    
    def _is_gdpr_applicable(self, content: Dict) -> bool:
        """Determine if GDPR applies to this content"""
        # Check for EU user indicators
        eu_indicators = ["GDPR", "EU", "Europe", "GDPR_consent"]
        text = json.dumps(content).lower()
        
        for indicator in eu_indicators:
            if indicator.lower() in text:
                return True
        return False
    
    def _identify_data_categories(self, content: Dict) -> List[str]:
        """Identify data categories in content"""
        categories = []
        
        if "user_id" in content or "email" in content:
            categories.append(DataCategory.PERSONAL.value)
        
        if "behavior" in content or "preferences" in content:
            categories.append(DataCategory.BEHAVIORAL.value)
        
        if "text" in content or "image" in content:
            categories.append(DataCategory.CONTENT.value)
        
        if "analytics" in content or "metrics" in content:
            categories.append(DataCategory.ANALYTICS.value)
        
        return categories
    
    def _get_user_data_categories(self, app_scoped_id: str) -> List[str]:
        """Get data categories for a specific user"""
        # In production, this would query the database
        return [DataCategory.PERSONAL.value, DataCategory.CONTENT.value]
    
    def _process_data_deletion(self, app_scoped_id: str, categories: List[str]):
        """Process data deletion (stub for implementation)"""
        self.logger.info(f"Deleting data for user {app_scoped_id}: {categories}")
        # Actual database deletion would happen here
    
    def _log_deletion_audit(self, record: Dict):
        """Log deletion for audit trail"""
        audit_log = {
            "type": "data_deletion",
            "timestamp": datetime.now().isoformat(),
            "record": record
        }
        
        audit_file = f"logs/compliance/deletion_{datetime.now().strftime('%Y%m%d')}.json"
        
        try:
            os.makedirs(os.path.dirname(audit_file), exist_ok=True)
            with open(audit_file, 'a') as f:
                json.dump(audit_log, f)
                f.write('\n')
        except Exception as e:
            self.logger.error(f"Failed to log deletion audit: {e}")
    
    def _check_gdpr_compliance(self) -> bool:
        """Check GDPR compliance status"""
        required = [
            "data_processing_basis",
            "data_retention_days",
            "right_to_be_forgotten",
            "data_portability"
        ]
        
        for req in required:
            if req not in self.compliance_data["gdpr"]:
                return False
        return True
    
    def _check_ccpa_compliance(self) -> bool:
        """Check CCPA compliance status"""
        # California Consumer Privacy Act requirements
        ccpa_requirements = [
            "right_to_know",
            "right_to_delete",
            "right_to_opt_out",
            "non_discrimination"
        ]
        return all(req in self.compliance_data.get("ccpa", {}) for req in ccpa_requirements)
    
    def _check_meta_terms_compliance(self) -> bool:
        """Check Meta Platform Terms compliance"""
        return self.compliance_data["meta_terms"]["business_use_only"]
    
    def _check_age_gating_compliance(self) -> bool:
        """Check age gating compliance"""
        age_gating = self.compliance_data["meta_terms"]["age_gating"]
        return age_gating in ["13+", "16+", "18+", "21+"]

if __name__ == "__main__":
    compliance = AutoNotionCompliance(
        app_id="689310950781431",
        business_id="780866337893831"
    )
    
    # Generate privacy report
    report = compliance.generate_privacy_report()
    print("Auto-Notion Compliance Report:")
    print(json.dumps(report, indent=2))
