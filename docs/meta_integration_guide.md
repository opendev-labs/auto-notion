# Institutional Meta Integration Guide

To connect your **Auto-Notion** platform to the Meta Developer Dashboard (App ID: 689310950781431), follow these specific instructions for the **Advanced Settings** page.

![Integration Philosophy](integration_philosophy.jpg)

> "Insight opens the door. **Integration** makes you walk through it."

## 🛠 Advanced Settings Configuration

| Field | Action / Value | Rationale |
| :--- | :--- | :--- |
| **Authorize callback URL** | `https://auto-notion.web.app/auth/callback` | Required for the OAuth 2.0 token rotation flow. |
| **Data Deletion Callback** | `https://auto-notion.web.app/webhooks/deletion` | **Critical for GDPR**. Automates the deletion requests. |
| **Server IP allowlist** | `Your.Server.Static.IP` | **Institutional Security**. Restricts API calls. |
| **Update settings IP allowlist** | `Your.Admin.IP` | Prevents unauthorized changes. |
| **Require app secret** | **Set to YES** | Enforces `appsecret_proof` signature for every call (already built into our code). |
| **Require 2-factor** | **Set to YES** | Adds an institutional layer of protection for setting changes. |
| **Age restriction** | **Anyone (13+)** | Aligns with standard Instagram Business policies for consciousness content. |

---

## 🔒 Security Identifiers (Copy to `.secrets/production.env`)
- **Client Token**: `c1668ae918a78c66946cda97a2220ed7`
- **App ID**: `689310950781431`
- **Business ID**: `780866337893831`

---

## 📡 Webhook Setup (Webhooks Tab)
1. Select **Instagram** from the dropdown.
2. Click **Subscribe to this object**.
3. **Callback URL**: `https://auto-notion.web.app/webhooks/instagram`
4. **Verify Token**: (Set a random strong string, e.g., `LAKHAN_BHAI_VERIFY_2024`)
5. **Subscriptions**: Check `comments`, `mention`, `story_insights`.

---

## 🚀 GitHub Activation Sequence
To push your local code to the empty repository:
1. `git init`
2. `git remote add origin https://github.com/opendev-labs/auto-notion.git`
3. `git add .` (The `.gitignore` will automatically hide your secrets)
4. `git commit -m "Initialize Institutional Meta Business Stack"`
5. `git push -u origin main`
