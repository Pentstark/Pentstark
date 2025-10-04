#!/bin/bash

# Hostinger Deployment Setup Script

echo "🚀 Setting up Hostinger deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Add dist to git
echo "📤 Adding dist folder to git..."
git add dist/

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing build files..."
    git commit -m "Build: Update dist folder for Hostinger deployment"
fi

echo "🎉 Ready for Hostinger deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Set up Git deployment in Hostinger control panel"
echo "3. Add environment variable: VITE_CLERK_PUBLISHABLE_KEY"
echo "4. Your site will be live!"
