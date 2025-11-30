#!/bin/bash

echo "========================================="
echo "Testing i18n and Image Anonymization"
echo "========================================="
echo ""

# Test 1: Check English page
echo "Test 1: Checking English page..."
EN_RESPONSE=$(curl -s "http://localhost:3003/en/p/claude-31-movie-poster")
if echo "$EN_RESPONSE" | grep -q "Which image best matches this prompt"; then
    echo "✅ English UI text found"
else
    echo "❌ English UI text NOT found"
fi

# Test 2: Check Spanish page
echo ""
echo "Test 2: Checking Spanish page..."
ES_RESPONSE=$(curl -s "http://localhost:3003/es/p/claude-31-movie-poster")
if echo "$ES_RESPONSE" | grep -q "Qué imagen"; then
    echo "✅ Spanish UI text found"
else
    echo "❌ Spanish UI text NOT found"
    echo "Checking for any Spanish text..."
    if echo "$ES_RESPONSE" | grep -q "Español"; then
        echo "✅ Some Spanish text detected"
    fi
fi

# Test 3: Check image URLs are anonymized
echo ""
echo "Test 3: Checking image URL anonymization..."
if echo "$EN_RESPONSE" | grep -q "/api/image/"; then
    echo "✅ Anonymous image URLs found (/api/image/...)"
else
    echo "❌ Anonymous image URLs NOT found"
fi

# Check that model names are NOT in image URLs
if echo "$EN_RESPONSE" | grep -q "/images/.*ByteDance\|/images/.*ChatGPT\|/images/.*Flux"; then
    echo "❌ Model names found in image URLs (NOT anonymous!)"
else
    echo "✅ No model names in image URLs (properly anonymized)"
fi

# Test 4: Test language switcher navigation
echo ""
echo "Test 4: Testing locale detection..."
EN_REDIRECT=$(curl -s -o /dev/null -w "%{redirect_url}" "http://localhost:3003/")
if echo "$EN_REDIRECT" | grep -q "/en"; then
    echo "✅ Root redirects to locale path"
else
    echo "❌ Root redirect issue"
fi

echo ""
echo "========================================="
echo "Test Summary"
echo "========================================="
echo "Both i18n and image anonymization should be working."
echo "Open http://localhost:3003 in your browser to test manually."
echo ""
