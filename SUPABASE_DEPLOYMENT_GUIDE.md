# 🚀 Supabase Deployment Guide - DevViz Platform

This guide will help you deploy all necessary components to Supabase for your DevViz Platform.

## 📋 Deployment Checklist

### 1. Database Schema Deployment ✅

Your database schema has been prepared with:
- **5 main tables**: projects, diagrams, ai_conversations, ai_templates, project_members
- **Row Level Security (RLS)**: Data protection policies
- **Helper functions**: For project management operations
- **Performance indexes**: Optimized queries

### 2. Manual Deployment Steps

**Step 1: Go to Supabase Dashboard**
- Visit: https://supabase.com/dashboard
- Login with your account

**Step 2: Select or Create Project**
- Choose your existing project or create a new one
- Copy your project reference (looks like `abc123xyz.supabase.co`)

**Step 3: Deploy Database Schema**
- Navigate to **SQL Editor** in the sidebar
- Click **New query**
- Copy the entire contents of `supabase/supabase_migrations.sql`
- Paste into the editor and click **Run**

**Step 4: Configure Authentication**
- Go to **Authentication** > **Settings**
- Ensure **Enable email confirmations** is OFF (for development)
- Add your site URL to **Site URL** field:
  - Development: `http://localhost:4200`
  - Production: `https://your-domain.com`

**Step 5: Get API Keys**
- Navigate to **Settings** > **API**
- Copy the following:
  - **Project URL**: `https://your-project-ref.supabase.co`
  - **anon public**: `eyJ...` (starts with eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
  - **service_role**: `eyJ...` (starts with eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

### 3. Environment Configuration

Update your `.env.local` file with your actual values:

```bash
# Replace with your actual Supabase values
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key

# Add your AI API keys
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### 4. Verify Deployment

After deploying the schema, verify everything is working:

**Step 1: Check Tables**
```sql
-- Run this in Supabase SQL Editor to verify tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

You should see:
- projects
- diagrams
- ai_conversations
- ai_templates
- project_members

**Step 2: Check RLS Policies**
```sql
-- Verify Row Level Security is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('projects', 'diagrams', 'ai_conversations');
```

## 🎯 What's Been Deployed

### Database Tables

1. **projects** - Main project storage
   - UUID primary keys
   - User ownership via auth.users
   - Timestamps with auto-update

2. **diagrams** - Diagram data storage
   - JSONB for diagram data
   - Type constraints (git, api, db)
   - Project relationship

3. **ai_conversations** - AI chat history
   - JSONB message storage
   - Project and diagram relationships
   - Conversation persistence

4. **ai_templates** - Reusable AI prompts
   - Public/private templates
   - Category organization
   - User ownership

5. **project_members** - Multi-user collaboration
   - Role-based permissions (owner, editor, viewer)
   - Junction table for many-to-many

### Security Features

- **Row Level Security**: Users can only access their own data
- **Role-based Permissions**: Owner/Editor/Viewer access levels
- **Service Role Key**: Backend-only access for admin operations

### Helper Functions

- `create_project_with_owner()` - Create projects with automatic ownership
- `add_project_member()` - Add users to projects with roles
- `get_user_projects()` - Get user's projects with their roles

## 🚀 Next Steps

**1. Update Environment Variables**
```bash
# Install dependencies
npm run setup

# Start development servers
npm run dev
```

**2. Test Your Platform**
- Frontend: http://localhost:4200
- AI API: http://localhost:3001
- Create your first project
- Test AI features

**3. Try These AI Commands**
1. "Create a user authentication system"
2. "Design a REST API for a blog"
3. "Set up a database for an e-commerce platform"

## 🔧 Troubleshooting

**Issue: Migration fails**
- Check for syntax errors in the SQL
- Ensure you have sufficient permissions
- Try running sections individually

**Issue: Cannot connect from frontend**
- Verify SUPABASE_URL is correct
- Check that SUPABASE_ANON_KEY is valid
- Ensure CORS is configured correctly

**Issue: AI features not working**
- Verify OpenAI API key has credits
- Check that AI API server is running on port 3001
- Review console logs for errors

## 📞 Support

If you encounter issues:
1. Check the Supabase logs in Dashboard
2. Review browser console for frontend errors
3. Check terminal output for backend errors
4. Ensure all environment variables are set correctly

---

**Your DevViz Platform is ready for development!** 🎉