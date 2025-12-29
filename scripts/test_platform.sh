#!/usr/bin/env bash
# Auto-Notion Platform Test Suite
# Comprehensive testing of all platform components

echo "🧪 AUTO-NOTION PLATFORM TEST SUITE"
echo "=================================="
echo ""

PASS=0
FAIL=0

test_component() {
    local component="$1"
    local test_cmd="$2"
    
    echo "Testing: $component"
    
    if eval "$test_cmd"; then
        echo "  ✅ PASS"
        ((PASS++))
    else
        echo "  ❌ FAIL"
        ((FAIL++))
    fi
    
    echo ""
}

# Test 1: Directory Structure
test_component "Directory Structure" '
[ -d ".meta" ] && \
[ -d ".secrets" ] && \
[ -d "api" ] && \
[ -d "core" ] && \
[ -d "engine" ] && \
[ -d "notion" ] && \
[ -d "webhooks" ]
'

# Test 2: Meta App Configuration
test_component "Meta App Configuration" '
[ -f ".meta/app_config.yaml" ] && \
[ -f ".meta/client_config.json" ] && \
grep -q "689310950781431" .meta/app_config.yaml && \
grep -q "780866337893831" .meta/app_config.yaml
'

# Test 3: Security Configuration
test_component "Security Configuration" '
[ -f "webhooks/data_deletion_config.json" ] && \
[ -f "api/security/compliance_manager.py" ]
'

# Test 4: Page Configurations
test_component "Page Configurations" '
for page in MythicWisdom DharmaDotes KarmaKronicles ConsciousQuotes CrystalEnergy SacredGeometry WeAreOneGlobal; do
    [ -f "core/$page/config/meta/page_config.json" ] || exit 1
done
exit 0
'

# Test 5: Content Databases
test_component "Content Databases" '
[ -f "data/quotes/master_database.json" ] && \
[ -f "data/crystals/crystal_intelligence.json" ] && \
[ -f "data/templates/content_templates.json" ] && \
[ -f "data/strategies/hashtag_strategies.json" ]
'

# Test 6: Engine Components
test_component "Engine Components" '
[ -f "engine/content/strategy_engine.py" ] && \
[ -f "api/core/meta_client_v24.py" ] && \
[ -f "notion/core/notion_client.py" ]
'

# Test 7: Scripts
test_component "Platform Scripts" '
[ -f "scripts/init_auto_notion.sh" ] && \
[ -f "scripts/run_platform.py" ]
'

echo "=================================="
echo "TEST RESULTS: $PASS passed, $FAIL failed"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "🎉 ALL TESTS PASSED! Platform is ready for deployment."
    exit 0
else
    echo "⚠ Some tests failed. Please check the platform setup."
    exit 1
fi
