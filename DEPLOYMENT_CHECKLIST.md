# 🚀 DevViz Platform Deployment Checklist

## ✅ Pre-Deployment Status

### Database Schema
- [x] Complete migration file ready (`supabase/supabase_migrations.sql`)
- [x] 5 tables with proper relationships
- [x] Row Level Security (RLS) policies
- [x] Helper functions for project management
- [x] Performance indexes

### Frontend & Backend
- [x] Angular frontend configured
- [x] Next.js AI API ready
- [x] Environment template created
- [x] Dependencies installing...

## 🔄 Manual Deployment Steps

### 1. Supabase Database Setup
**Go to: https://supabase.com/dashboard**

- [ ] **Select/Create Project**
  - Choose existing project or create new one
  - Copy project reference (e.g., `abc123xyz.supabase.co`)

- [ ] **Deploy Database Schema**
  1. Navigate to **SQL Editor** → **New query**
  2. Copy contents of `supabase/supabase_migrations.sql`
  3. Paste into editor and click **Run**
  4. Wait for migration to complete

- [ ] **Verify Tables Created**
  - Run: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
  - Should see: projects, diagrams, ai_conversations, ai_templates, project_members

### 2. Authentication Configuration
- [ ] **Configure Auth Settings**
  - Go to **Authentication** → **Settings**
  - Site URL: `http://localhost:4200`
  - Redirect URLs: `http://localhost:4200/auth/callback`
  - Enable email confirmations: OFF (for development)

### 3. Get API Credentials
- [ ] **Navigate to Settings** → **API**
- [ ] **Copy the following:**
  ```
  SUPABASE_URL=https://your-project-ref.supabase.co
  SUPABASE_ANON_KEY=eyJ... (anon public key)
  SUPABASE_SERVICE_ROLE_KEY=eyJ... (service_role key)
  ```

### 4. Update Environment File
- [ ] **Edit `.env.local`**
- [ ] **Replace placeholders with actual values:**
  ```bash
  # Supabase Configuration
  SUPABASE_URL=https://your-actual-project-ref.supabase.co
  SUPABASE_ANON_KEY=your-actual-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key

  # AI Configuration
  OPENAI_API_KEY=your-openai-api-key
  ANTHROPIC_API_KEY=your-anthropic-api-key
  ```

### 5. Start Development Environment
- [ ] **Wait for npm setup to complete**
- [ ] **Start all services:**
  ```bash
  npm run dev
  ```

## 🎯 Post-Deployment Verification

### Frontend Testing
- [ ] **Visit:** http://localhost:4200
- [ ] **Check for authentication page**
- [ ] **Test user registration/login**

### AI API Testing
- [ ] **Visit:** http://localhost:3001
- [ ] **Test AI endpoint:** POST to `/api/ai`
- [ ] **Check for proper AI responses**

### Database Testing
- [ ] **Create a test project**
- [ ] **Create a diagram**
- [ ] **Test AI conversation feature**

## 🚨 Troubleshooting

### Common Issues

**Database Connection Failed**
- [ ] Verify SUPABASE_URL is correct
- [ ] Check SUPABASE_ANON_KEY is valid
- [ ] Ensure database migration ran successfully

**Authentication Not Working**
- [ ] Check auth settings in Supabase dashboard
- [ ] Verify redirect URLs are configured
- [ ] Check browser console for errors

**AI Features Not Working**
- [ ] Verify OpenAI API key has credits
- [ ] Check AI API server is running
- [ ] Review console logs for error messages

**Build Errors**
- [ ] Ensure all dependencies installed
- [ ] Check Node.js version compatibility
- [ ] Clear node_modules and reinstall if needed

## 📞 Support Resources

1. **Supabase Dashboard:** https://supabase.com/dashboard
2. **Supabase Docs:** https://supabase.com/docs
3. **Vercel AI SDK:** https://sdk.vercel.ai
4. **Angular Docs:** https://angular.io/docs

## 🎉 Success Indicators

When everything is working, you should see:
- ✅ Frontend loads at http://localhost:4200
- ✅ Authentication pages functional
- ✅ Project creation works
- ✅ Diagram designer loads
- ✅ AI assistant responds to queries
- ✅ Data persists in Supabase

---

**Your DevViz Platform will be ready once these steps are completed!** 🚀