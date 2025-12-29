#!/usr/bin/env bash
# Auto-Notion Platform Initialization
# Meta App ID: 689310950781431 | Business ID: 780866337893831

set -euo pipefail

SYSTEM_ROOT="/home/cube/Lakhan-Bhai/auto-notion"
BASE_DOMAIN="https://opendev-labs.github.io/auto-notion"

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                 AUTO-NOTION PLATFORM INITIALIZATION              ║"
echo "║           Meta App: 689310950781431 | API: v24.0                ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Check system requirements
check_requirements() {
    echo "🔍 Checking system requirements..."
    
    local missing=()
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        missing+=("python3")
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        missing+=("git")
    fi
    
    # Check curl
    if ! command -v curl &> /dev/null; then
        missing+=("curl")
    fi
    
    if [ ${#missing[@]} -gt 0 ]; then
        echo "❌ Missing requirements: ${missing[*]}"
        echo "Please install missing packages and try again."
        exit 1
    fi
    
    echo "✅ System requirements met"
}

# Create Python virtual environment
setup_python_env() {
    echo "🐍 Setting up Python environment..."
    
    cd "$SYSTEM_ROOT"
    if [ ! -d "venv" ]; then
        python3 -m venv venv --prompt="auto-notion"
    fi
    
    source venv/bin/activate
    
    # Install dependencies
    pip install --upgrade pip
    pip install requests python-dotenv pandas schedule cryptography
    pip install notion-client
    
    echo "✅ Python environment ready"
}

# Configure Meta App credentials
setup_meta_credentials() {
    echo "🔐 Configuring Meta App credentials..."
    
    if [ ! -f ".secrets/production.env" ]; then
        echo "⚠ No production credentials found"
        echo "Creating from template..."
        
        # Create template if not exists
        if [ ! -f ".secrets/template.env" ]; then
            cat > ".secrets/template.env" << 'ENV'
# AUTO-NOTION META APP CREDENTIALS
# App ID: 689310950781431
# DO NOT COMMIT THIS FILE TO VERSION CONTROL

# Meta App Credentials
META_APP_ID="689310950781431"
META_APP_SECRET="your_app_secret_here"
META_CLIENT_TOKEN="c1668ae918a78c66946cda97a2220ed7"
META_BUSINESS_ID="780866337893831"
META_REDIRECT_URI="https://opendev-labs.github.io/auto-notion/auth/callback"

# Notion Integration
NOTION_API_KEY="your_notion_integration_token"
NOTION_DATABASE_CONTENT="your_content_database_id"
NOTION_DATABASE_SCHEDULE="your_schedule_database_id"
ENV
        fi
        
        cp .secrets/template.env .secrets/production.env
        
        echo ""
        echo "IMPORTANT: Edit .secrets/production.env with your credentials."
    fi
    
    # Set secure permissions
    chmod 600 .secrets/production.env 2>/dev/null || true
    
    echo "✅ Credentials configured"
}

# Initialize content databases
init_databases() {
    echo "🗃️ Initializing content databases..."
    
    # Initialize logs
    mkdir -p logs/{system,compliance,notion,api}
    touch logs/system/init.log
    
    echo "✅ Databases initialized"
}

# Set up webhook endpoints
setup_webhooks() {
    echo "🌐 Setting up webhook endpoints..."
    
    # Create webhook configuration
    cat > webhooks/endpoints.json << WEBHOOKS
{
  "endpoints": {
    "data_deletion": {
      "url": "${BASE_DOMAIN}/webhooks/data-deletion",
      "verification_token": "auto-notion-data-deletion-2024",
      "active": true
    },
    "page_events": {
      "url": "${BASE_DOMAIN}/webhooks/page-events",
      "verification_token": "auto-notion-page-events-2024",
      "active": true
    }
  },
  "security": {
    "ip_whitelist": ["127.0.0.1", "::1"],
    "signature_verification": true,
    "rate_limiting": true
  }
}
WEBHOOKS
    
    echo "✅ Webhook endpoints configured"
}

# Create startup services
create_services() {
    echo "⚙️ Creating startup services..."
    
    # Startup script
    cat > scripts/start_platform.sh << STARTUP
#!/usr/bin/env bash
# Auto-Notion Platform Startup Script

cd "$SYSTEM_ROOT"
source venv/bin/activate

echo "🚀 Starting Auto-Notion Platform..."
echo "Meta App ID: 689310950781431"
echo "Business ID: 780866337893831"
echo ""

# Start core services
python scripts/run_platform.py
STARTUP
    
    chmod +x scripts/start_platform.sh
    
    echo "✅ Startup services created"
}

# Main initialization sequence
main() {
    check_requirements
    setup_python_env
    setup_meta_credentials
    init_databases
    setup_webhooks
    create_services
    
    echo ""
    echo "🎉 AUTO-NOTION PLATFORM INITIALIZATION COMPLETE!"
    echo ""
}

main "$@"
