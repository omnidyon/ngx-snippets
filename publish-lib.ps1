# Simple Angular Library Publisher
Write-Host "🚀 Publishing Angular Library..." -ForegroundColor Blue

# Update version and build
npm version patch --no-git-tag-version
npm run build

# Publish
cd dist/ngx-snippets
npm publish --access public
cd ../..

# Commit
$version = (Get-Content "package.json" | ConvertFrom-Json).version
git add package.json
git commit -m "chore: release v$version"
git tag "v$version"
git push
git push --tags

Write-Host "✅ Library v$version published!" -ForegroundColor Green