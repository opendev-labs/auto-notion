# Auto-Notion Connection & Activation Guide 🚀

To "Break the Matrix" and scale to millions, your infrastructure must be rock-solid. Follow this definitive guide to connect all components of the Auto-Notion Institutional Engine.

---

## 1. Meta Developer App (The Gateway)
Your AI Agents live on the Meta Graph API.
1.  **Create App**: Go to [Meta for Developers](https://developers.facebook.com/) and create a "Business" app.
2.  **Add Products**:
    *   **Instagram Graph API**: For comment and DM automation.
    *   **Facebook Login**: For secure authentication.
3.  **Permissions**: Request and verify the following:
    *   `instagram_basic`, `instagram_manage_messages`, `instagram_manage_comments`
    *   `pages_manage_metadata`, `pages_read_engagement`
4.  **Connect Page**: Link your Professional Instagram account to a Facebook Page.
5.  **Get Credentials**: Copy **App ID** and **App Secret** to your `.env` file.

## 2. Firebase Infrastructure (The Database & Auth)
The WebApp Auth relies on Firebase.
1.  **Authorized Domains**: 
    *   Go to Firebase Console > Authentication > Settings > Authorized Domains.
    *   Add `auto-notion.web.app` and `localhost`.
2.  **Auth Providers**: Enable **Google**, **GitHub**, and **Facebook** in the Sign-in methods.
3.  **OAuth Redirect URLs**: For Google Cloud, Facebook, and GitHub, use this exact URL as the **OAuth Redirect URI** or **Callback URL**:
    *   `https://meta-auto-notion.firebaseapp.com/__/auth/handler`
4.  **Firestore**: Create a "Production Mode" database in the `us-central1` or your preferred region.
5.  **Security Rules**: Ensure your rules allow authenticated users to read/write their own mission data.

## 3. Notion Integration (The Intelligence Layer)
Auto-Notion syncs all leads to Notion.
1.  **Create Integration**: Go to [Notion Integrations](https://www.notion.so/my-integrations).
2.  **Access Token**: Copy the **Internal Integration Token**.
3.  **Database ID**: Open your Notion CRM database, copy the ID from the URL (the string after the slash, before the question mark).
4.  **Share**: Press "Connect to" in the Notion Database and select your integration.

## 4. Python Backend (The Engine)
The processing engine that runs the AI logic.
1.  **Environment**: 
    ```bash
    cp .env.example .env
    # Fill in META_APP_ID, NOTION_API_KEY, etc.
    ```
2.  **Installation**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Launch**:
    ```bash
    python api/main.py
    ```

## 5. Deployment (Institutional Stability)
1.  **Build**: Run `./build_platform.sh` to compile the Landing and Dashboard.
2.  **Deploy**: `firebase deploy --only hosting` to push the frontends live.

---

> [!TIP]
> **Real-Time Data**: Once connected, the Dashboard will pull live socket events from the Python Engine. Ensure your `api` is reachable by the WebApp (CORS must be configured in `api/main.py`).

**Status**: SYSTEM READY for Million-Dollar Orchestration.
