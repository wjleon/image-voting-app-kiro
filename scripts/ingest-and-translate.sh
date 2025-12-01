#!/bin/bash

# AI Image Voting App - Complete Ingestion and Translation Script
# This script runs all necessary steps to ingest images and generate translations

set -e  # Exit on any error

echo "🚀 Starting complete ingestion and translation process..."
echo ""

# Step 1: Run ingestion
echo "📁 Step 1/4: Running image ingestion..."
echo "   Scanning images folder and generating seed file..."
npx tsx scripts/run-ingestion.ts
echo "✅ Ingestion complete!"
echo ""

# Step 2: Seed database
echo "💾 Step 2/4: Seeding database..."
echo "   ⚠️  This will clear existing votes!"
read -p "   Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Aborted by user"
    exit 1
fi

npm run db:seed
echo "✅ Database seeded!"
echo ""

# Step 3: Generate translations
echo "🌍 Step 3/4: Generating Spanish translations..."
echo "   Using OpenAI to translate all prompts..."
npx tsx scripts/translate-openai.ts
echo "✅ Translations complete!"
echo ""

# Step 4: Verify
echo "📊 Step 4/4: Verifying translation coverage..."
npx tsx scripts/check-translations.ts
echo ""

echo "============================================================"
echo "✨ Complete! Your app is ready with:"
echo "   - All images ingested and organized"
echo "   - Database populated with prompts and images"
echo "   - Spanish translations generated"
echo "============================================================"
echo ""
echo "🎯 Next steps:"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Visit http://localhost:3000 to test"
echo "   3. Switch language to verify translations"
echo ""
