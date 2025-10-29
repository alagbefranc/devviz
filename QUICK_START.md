# 🚀 DevViz Platform - Quick Start Guide

## Current Status

✅ **Environment Configuration Complete**
- Supabase credentials configured
- OpenAI API key added
- Database schema ready

⚠️ **Windows Permission Issues**
- npm installation had file permission problems
- Need alternative approach for dependencies

## Step 1: Deploy Database Schema

**Go to your Supabase Dashboard:**
1. Visit: https://supabase.com/dashboard/project/pcdqhgcoklzyiugmfctv
2. Navigate to **SQL Editor** → **New query**
3. Copy the contents of `supabase/supabase_migrations.sql`
4. Paste into the editor and click **Run**

## Step 2: Alternative Installation Methods

### Option A: Use PowerShell as Administrator
```powershell
# Open PowerShell as Administrator
cd D:\devviz-platform
npm install --force
cd frontend
npm install --force
cd ../ai-api
npm install --force
cd ..
npm run dev
```

### Option B: Use Node Version Manager
```bash
# Install and use Node.js 18 LTS (more stable)
nvm install 18
nvm use 18
npm install
npm run dev
```

### Option C: Clean Installation
```bash
# Remove corrupted node_modules
rmdir /s /q node_modules
rmdir /s /q frontend\node_modules
rmdir /s /q ai-api\node_modules

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

## Step 3: Manual Setup

If npm continues to fail, you can:

1. **Use an online IDE** like StackBlitz or CodeSandbox
2. **Deploy to Vercel** directly from GitHub
3. **Use Docker** if available

## Step 4: Test Supabase Connection

Once database is deployed, test with:
```javascript
// Test connection in browser console
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pcdqhgcoklzyiugmfctv.supabase.co', 'your-anon-key');
```

## Next Steps

1. ✅ Deploy database schema to Supabase
2. 🔄 Fix dependency installation
3. ⏳ Start development servers
4. 🎯 Test AI features

Your DevViz Platform is ready - just need to resolve the Windows permission issues!