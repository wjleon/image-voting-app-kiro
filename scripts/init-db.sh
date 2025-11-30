#!/bin/bash

# Database initialization script for AI Image Voting App

echo "🚀 Initializing database..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please update .env with your database credentials before continuing."
    exit 1
fi

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Push schema to database (for development)
echo "🗄️  Pushing schema to database..."
npx prisma db push

# Optional: Run seed
read -p "Do you want to run the database seed? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npx prisma db seed
fi

echo "✅ Database initialization complete!"
echo "💡 Run 'npx prisma studio' to view your database"
