# Supabase Database Setup Guide for DevViz Platform

This guide will help you set up the Supabase database for the DevViz platform using the provided SQL migration file.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Basic understanding of SQL and database concepts
- Node.js installed (for local development with Supabase CLI)

## Setup Instructions

### 1. Create a New Supabase Project

1. Go to https://supabase.com and sign in to your account
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Project Name**: `devviz-platform` (or your preferred name)
   - **Database Password**: Choose a strong password and save it securely
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be provisioned (usually takes 1-2 minutes)

### 2. Run the Migration

You have two options to run the migration:

#### Option A: Using Supabase Dashboard (Recommended for simplicity)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** from the left sidebar
3. Click **New query**
4. Copy the entire contents of `supabase_migrations.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the migration
7. Wait for the migration to complete (you should see "Success" message)

#### Option B: Using Supabase CLI (Recommended for development)

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your local project to your Supabase project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```
   (Find your project reference in the Supabase dashboard URL: `https://app.supabase.com/project/YOUR_PROJECT_REF`)

4. Run the migration:
   ```bash
   supabase db push
   ```

### 3. Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure the following settings:
   - **Site URL**: Your application URL (e.g., `http://localhost:3000` for development)
   - **Redirect URLs**: Add your application URLs
   - **Enable email confirmations**: Based on your preference

3. Enable any additional authentication providers you need:
   - Google, GitHub, etc. (in **Authentication** → **Providers**)

### 4. Set Up API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Save the following keys in your environment variables:
   - **Project URL** (public)
   - **anon key** (public)
   - **service_role key** (secret - never expose in client-side code)

### 5. Test Your Setup

#### Create a Test User (Optional)

```sql
-- Test creating a user (run in SQL Editor)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  phone,
  phone_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_current,
  email_change,
  email_change_token_new,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  app_metadata
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  NULL,
  NULL,
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  '',
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  false,
  '{"provider": "email", "providers": ["email"]}'
);
```

#### Test Database Functions

```sql
-- Test the helper functions (run in SQL Editor with a real user ID)
SELECT get_user_projects();

-- Test creating a project (you need to be authenticated)
SELECT create_project_with_owner('Test Project', 'A test project for development');
```

## Environment Variables

Add these to your application's `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Database Schema Overview

### Tables Created

1. **projects** - Core project information
2. **diagrams** - Diagram data (git, api, db types)
3. **ai_conversations** - AI chat history
4. **ai_templates** - Reusable AI prompt templates
5. **project_members** - Project access control

### Security Features

- **Row Level Security (RLS)** enabled on all main tables
- **Granular permissions** based on user roles (owner, editor, viewer)
- **Automatic timestamp updates** with triggers
- **Secure foreign key relationships** with proper cascade deletes

### Performance Features

- **Optimized indexes** for common query patterns
- **Full-text search** indexes on name fields
- **Efficient join operations** for user-project relationships

## Usage Examples

### Creating a Project

```javascript
import { supabase } from './supabaseClient';

// Using the helper function
const { data, error } = await supabase.rpc('create_project_with_owner', {
  project_name: 'My DevViz Project',
  project_description: 'A sample project for demonstration'
});
```

### Adding Team Members

```javascript
const { data, error } = await supabase.rpc('add_project_member', {
  target_project_id: 'project-uuid-here',
  target_user_id: 'user-uuid-here',
  member_role: 'editor'
});
```

### Fetching User Projects

```javascript
const { data: projects, error } = await supabase.rpc('get_user_projects');
```

## Security Notes

- **Never expose** the `service_role_key` in client-side code
- **Always validate** user permissions on the server-side
- **Use RLS policies** to ensure data security
- **Implement proper error handling** for database operations

## Troubleshooting

### Common Issues

1. **Migration Fails**
   - Check for syntax errors in the SQL
   - Ensure you have the correct project permissions
   - Verify your Supabase project is active

2. **RLS Policy Errors**
   - Ensure users are authenticated before accessing protected tables
   - Check that auth.uid() returns a valid UUID
   - Verify RLS policies match your application logic

3. **Connection Issues**
   - Verify your API keys are correct
   - Check that your network allows connections to Supabase
   - Ensure your project URL is properly configured

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [SQL Editor logs](https://app.supabase.com/project/YOUR_PROJECT_REF/logs/sql)
- Join the [Supabase Discord community](https://discord.supabase.com)

## Next Steps

1. **Implement authentication** in your frontend application
2. **Set up API routes** for CRUD operations
3. **Configure real-time subscriptions** for live updates
4. **Set up database backups** for production
5. **Monitor database performance** and optimize as needed

## Production Considerations

- **Enable point-in-time recovery** in Supabase dashboard
- **Set up automated backups**
- **Monitor database usage** and set up alerts
- **Implement proper error logging**
- **Configure CDN** for static assets
- **Set up custom domains** for branding

The database is now ready for your DevViz platform! The schema includes all necessary tables, security measures, and performance optimizations to support a collaborative development visualization platform.