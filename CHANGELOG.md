# Changelog

All notable changes to the **Auto-Notion** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.0] - 2026-01-02

### Added
- **Compliance Module**:
    - Added `Cancellation & Refund Policy` page.
    - Added `Shipping & Delivery Policy` (Digital Goods) page.
    - Added `Contact Us` page with support definitions.
    - **Verification**: Cross-linked all policies in Privacy/Terms footers.
- **Payment Infrastructure**:
    - Integrated **Razorpay** (Live Mode) for subscription processing.
    - Added `PaymentService` utility to handle order creation and mock success flows.
    - Added `SubscriptionPage` with 3 tiers: Starter, Professional, Agency.
    - Added "Upgrade Node" navigation to the Dashboard Sidebar.
- **Access Control**:
    - Added **"Login as Demo User"** button for simplified app review.
    - hardcoded demo credentials for reviewer ease of access.

### Changed
- **Dashboard**:
    - Refactored `App.tsx` routing to support new subscription paths.
    - Updated `Sidebar` visuals to include the "Upgrade Node" spark icon.
- **Login**:
    - Enhanced Login UI with "Institutional Grade" status indicators.
    - Fixed layout issues on mobile devices for the auth form.

### Security
- **Payment**: All payments mock-processed in client-side (Serverless architecture readiness).
- **Auth**: Enforced "One-Time" login session persistence for demo users.

---

## [4.0.0] - 2025-12-31

### Added
- **Core Engine**: Initial release of the Auto-Notion "Institutional Zen" Dashboard.
- **Instagram Integration**: Basic Graph API connection portals.
- **Agent Manager**: Placeholder for AI Agent configuration.

### Fixed
- Resolved "Black Screen" deployment issues on Firebase Hosting.
- Fixed `framer-motion` easing type errors in build pipeline.

---

> **opendev-labs**  
> *Democratizing Intelligence, One Node at a Time.*
