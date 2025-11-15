#!/bin/bash
set -e

echo "🚀 Publishing Angular Library..."

# Update version
npm version patch --no-git-tag-version

# Build
npm run build

# Publish
cd dist/ngx-snippets
npm publish --access public
cd ../..

# Commit
VERSION=$(node -p "require('./package.json').version")
git add package.json
git commit -m "chore: release v$VERSION"
git tag "v$VERSION"
git push && git push --tags

echo "✅ Library v$VERSION published successfully!"