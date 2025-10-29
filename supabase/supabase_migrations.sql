-- DevViz Platform Database Schema
-- Migration file for Supabase PostgreSQL database

-- ===================================================================
-- EXTENSIONS
-- ===================================================================

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================================================
-- HELPER FUNCTIONS
-- ===================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ===================================================================
-- TABLES
-- ===================================================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Diagrams table
CREATE TABLE IF NOT EXISTS diagrams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('git', 'api', 'db')),
    name TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- AI Conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    diagram_id UUID REFERENCES diagrams(id) ON DELETE CASCADE,
    messages JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- AI Templates table
CREATE TABLE IF NOT EXISTS ai_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('git', 'api', 'db')),
    description TEXT,
    template_data JSONB NOT NULL,
    is_public BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Project Members table (junction table for many-to-many relationship)
CREATE TABLE IF NOT EXISTS project_members (
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'editor', 'viewer')),
    joined_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (project_id, user_id)
);

-- ===================================================================
-- INDEXES
-- ===================================================================

-- Projects table indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_name ON projects USING gin(to_tsvector('english', name));

-- Diagrams table indexes
CREATE INDEX IF NOT EXISTS idx_diagrams_project_id ON diagrams(project_id);
CREATE INDEX IF NOT EXISTS idx_diagrams_type ON diagrams(type);
CREATE INDEX IF NOT EXISTS idx_diagrams_name ON diagrams USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_diagrams_created_at ON diagrams(created_at);

-- AI Conversations table indexes
CREATE INDEX IF NOT EXISTS idx_ai_conversations_project_id ON ai_conversations(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_diagram_id ON ai_conversations(diagram_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_created_at ON ai_conversations(created_at);

-- AI Templates table indexes
CREATE INDEX IF NOT EXISTS idx_ai_templates_category ON ai_templates(category);
CREATE INDEX IF NOT EXISTS idx_ai_templates_is_public ON ai_templates(is_public);
CREATE INDEX IF NOT EXISTS idx_ai_templates_created_by ON ai_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_ai_templates_name ON ai_templates USING gin(to_tsvector('english', name));

-- Project Members table indexes
CREATE INDEX IF NOT EXISTS idx_project_members_user_id ON project_members(user_id);
CREATE INDEX IF NOT EXISTS idx_project_members_role ON project_members(role);

-- ===================================================================
-- TRIGGERS
-- ===================================================================

-- Trigger for projects.updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for diagrams.updated_at
CREATE TRIGGER update_diagrams_updated_at
    BEFORE UPDATE ON diagrams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================================================

-- Enable RLS on protected tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- ===================================================================
-- RLS POLICIES
-- ===================================================================

-- Projects RLS policies
-- Users can view projects they are members of
CREATE POLICY "Users can view projects they are members of"
    ON projects FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = projects.id
            AND project_members.user_id = auth.uid()
        )
    );

-- Users can insert projects they will own
CREATE POLICY "Users can insert projects"
    ON projects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update projects they are editors or owners of
CREATE POLICY "Users can update projects they are editors or owners of"
    ON projects FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = projects.id
            AND project_members.user_id = auth.uid()
            AND project_members.role IN ('owner', 'editor')
        )
    );

-- Users can delete projects they own
CREATE POLICY "Users can delete projects they own"
    ON projects FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = projects.id
            AND project_members.user_id = auth.uid()
            AND project_members.role = 'owner'
        )
    );

-- Diagrams RLS policies
-- Users can view diagrams from projects they are members of
CREATE POLICY "Users can view diagrams from projects they are members of"
    ON diagrams FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = diagrams.project_id
            AND project_members.user_id = auth.uid()
        )
    );

-- Users can insert diagrams in projects they are editors or owners of
CREATE POLICY "Users can insert diagrams in projects they are editors or owners of"
    ON diagrams FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = diagrams.project_id
            AND project_members.user_id = auth.uid()
            AND project_members.role IN ('owner', 'editor')
        )
    );

-- Users can update diagrams in projects they are editors or owners of
CREATE POLICY "Users can update diagrams in projects they are editors or owners of"
    ON diagrams FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = diagrams.project_id
            AND project_members.user_id = auth.uid()
            AND project_members.role IN ('owner', 'editor')
        )
    );

-- Users can delete diagrams in projects they are owners of
CREATE POLICY "Users can delete diagrams in projects they are owners of"
    ON diagrams FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = diagrams.project_id
            AND project_members.user_id = auth.uid()
            AND project_members.role = 'owner'
        )
    );

-- AI Conversations RLS policies
-- Users can view conversations from projects they are members of
CREATE POLICY "Users can view conversations from projects they are members of"
    ON ai_conversations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = ai_conversations.project_id
            AND project_members.user_id = auth.uid()
        )
    );

-- Users can insert conversations in projects they are members of
CREATE POLICY "Users can insert conversations in projects they are members of"
    ON ai_conversations FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = ai_conversations.project_id
            AND project_members.user_id = auth.uid()
        )
    );

-- Users can update conversations in projects they are members of
CREATE POLICY "Users can update conversations in projects they are members of"
    ON ai_conversations FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = ai_conversations.project_id
            AND project_members.user_id = auth.uid()
        )
    );

-- Users can delete conversations in projects they are owners of
CREATE POLICY "Users can delete conversations in projects they are owners of"
    ON ai_conversations FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_members.project_id = ai_conversations.project_id
            AND project_members.user_id = auth.uid()
            AND project_members.role = 'owner'
        )
    );

-- ===================================================================
-- HELPER FUNCTIONS FOR APPLICATION
-- ===================================================================

-- Function to create a new project and assign owner role
CREATE OR REPLACE FUNCTION create_project_with_owner(
    project_name TEXT,
    project_description TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_project_id UUID;
BEGIN
    -- Create the project
    INSERT INTO projects (name, description, user_id)
    VALUES (project_name, project_description, auth.uid())
    RETURNING id INTO new_project_id;

    -- Add the creator as owner
    INSERT INTO project_members (project_id, user_id, role)
    VALUES (new_project_id, auth.uid(), 'owner');

    RETURN new_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add member to project
CREATE OR REPLACE FUNCTION add_project_member(
    target_project_id UUID,
    target_user_id UUID,
    member_role TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if the current user is an owner or editor of the project
    IF NOT EXISTS (
        SELECT 1 FROM project_members
        WHERE project_id = target_project_id
        AND user_id = auth.uid()
        AND role IN ('owner', 'editor')
    ) THEN
        RAISE EXCEPTION 'Permission denied: Only owners and editors can add members';
    END IF;

    -- Validate role
    IF member_role NOT IN ('owner', 'editor', 'viewer') THEN
        RAISE EXCEPTION 'Invalid role: must be owner, editor, or viewer';
    END IF;

    -- Add the member (or update their role if they already exist)
    INSERT INTO project_members (project_id, user_id, role)
    VALUES (target_project_id, target_user_id, member_role)
    ON CONFLICT (project_id, user_id)
    DO UPDATE SET role = member_role;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's projects with their role
CREATE OR REPLACE FUNCTION get_user_projects()
RETURNS TABLE (
    project_id UUID,
    project_name TEXT,
    project_description TEXT,
    user_role TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.name,
        p.description,
        pm.role,
        p.created_at,
        p.updated_at
    FROM projects p
    JOIN project_members pm ON p.id = pm.project_id
    WHERE pm.user_id = auth.uid()
    ORDER BY p.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===================================================================
-- SAMPLE DATA (Optional - for development)
-- ===================================================================

-- Comment out or remove for production
-- These will only work if you have existing users in auth.users

/*
-- Sample AI Templates
INSERT INTO ai_templates (name, category, description, template_data, is_public, created_by) VALUES
(
    'Git Repository Analysis',
    'git',
    'Analyze git repository structure and recent activity',
    '{"prompt": "Analyze this git repository and provide insights about its structure, recent commits, and development patterns.", "type": "analysis", "context_requirements": ["repository_url", "timeframe"]}',
    true,
    NULL
),
(
    'API Documentation Generator',
    'api',
    'Generate comprehensive API documentation from OpenAPI specs',
    '{"prompt": "Generate clear, comprehensive API documentation from this OpenAPI specification.", "type": "documentation", "context_requirements": ["openapi_spec"]}',
    true,
    NULL
),
(
    'Database Schema Optimizer',
    'db',
    'Analyze database schema and suggest optimizations',
    '{"prompt": "Analyze this database schema and provide optimization recommendations for performance and scalability.", "type": "optimization", "context_requirements": ["schema_definition", "query_patterns"]}',
    true,
    NULL
);
*/