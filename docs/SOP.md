# Standard Operating Procedures (SOP) - Auto-Notion

## 1. Institutional Risk Guard
- **Zero-Trust Token Management**: All Meta and Notion tokens must be stored in the AES-256 Vault. Never hardcode secrets.
- **Audit Trails**: Every API call and webhook event must be logged in `logs/audit/` with HMAC-SHA256 signatures for verifiability.
- **Fail-Safe Mechanism**: If rate limits reach 90%, the platform must automatically enter "Conserve Mode" and notify the Command Deck.

## 2. Content Orchestration (48h Launch)
- **Asset Procurement**: Use ChatGPT for niche-specific captions and Canva/n8n for Reels automation.
- **Cosmic Alignment**: Posts must only be scheduled within the approved "Cosmic Windows" (Lunar cycles, Auspicious transits).
- **Compliance Check**: Every piece of content must pass the automated `ComplianceManager` check before publishing.

## 3. Cross-Audit Protocols
- **Developer Review**: All logic changes to `meta_client` or `intelligence_engine` must be audited by the secondary developer (Ali) for drift prevention.
- **SLA Maintenance**: Uptime must be verified daily. Any downtime exceeding 5 minutes triggers an immediate status report.

## 4. Disaster Recovery
- **Daily Backup**: Automated backup of `data/` and `configurations` at 03:00 UTC.
- **Recovery Time Objective**: Full platform restoration must be possible within 60 minutes using the `init_auto_notion.sh` script.
