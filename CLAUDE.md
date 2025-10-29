# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevViz Platform is an AI-Powered Development Visualization Platform that combines Git workflows, API design, and database schema visualization with intelligent AI assistance.

## Technology Stack

- **Frontend**: Angular 19.2.7 + TypeScript + ng-diagram (custom diagram library)
- **Backend AI API**: Next.js 15.1.0 + Vercel AI SDK + TypeScript
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Architecture**: Monorepo with npm workspaces

## Development Commands

### Root Level Commands
```bash
npm run setup              # Install all dependencies for all packages
npm run dev                # Start all services concurrently (Supabase + Frontend + AI API)
npm run dev:frontend       # Start Angular dev server on port 4200
npm run dev:ai-api         # Start Next.js dev server on port 3001
npm run dev:supabase       # Start Supabase local development
npm run build              # Build both frontend and AI API
npm run build:frontend     # Build Angular application
npm run build:ai-api       # Build Next.js API
npm run test               # Run tests for both packages
npm run test:frontend      # Run Angular tests
npm run test:ai-api        # Run Next.js tests
```

### Frontend Specific Commands
```bash
cd frontend
npm run ng serve           # Development server (alias for dev)
npm run ng build           # Build Angular app
npm run ng build:prod      # Production build
npm run ng test            # Run tests
npm run ng lint            # Run linting
npm run ng lint:fix        # Fix linting issues
```

### AI API Specific Commands
```bash
cd ai-api
npm run dev                # Development server
npm run build              # Production build
npm run start              # Start production server
npm run lint               # Run linting
```

## Project Structure

```
D:\devviz-platform\
├── package.json              # Root workspace configuration
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── pages/        # Main application pages (Home, Dashboard, Auth, Project)
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   ├── services/     # Angular services
│   │   │   └── shared/       # Shared utilities
│   │   └── styles.scss       # Custom branding styles
│   └── package.json
├── ai-api/                  # Next.js AI API
│   ├── api/ai/
│   │   ├── route.ts          # Main AI endpoint
│   │   └── tools/           # AI tool implementations
│   └── package.json
└── supabase/                # Database setup
    └── supabase_migrations.sql  # Complete database schema
```

## Key Architecture Components

### AI Tools Implementation
The AI API implements specialized tools for three domains:

1. **Git Workflow Tools** (`ai-api/api/ai/tools/git-tools.ts`):
   - Branch creation and management
   - Merge conflict analysis
   - Branching strategy suggestions
   - Conventional commit message generation

2. **API Design Tools** (`ai-api/api/ai/tools/api-tools.ts`):
   - RESTful API design
   - OpenAPI specification generation
   - Authentication flow design

3. **Database Tools** (`ai-api/api/ai/tools/db-tools.ts`):
   - Schema design and optimization
   - Relationship modeling
   - SQL generation

### Database Schema
The Supabase database includes 5 main tables with Row Level Security:
- **projects**: Project management with user ownership
- **diagrams**: Git, API, and DB diagram data stored as JSONB
- **ai_conversations**: Chat history with AI assistant
- **ai_templates**: Reusable AI prompts and templates
- **project_members**: Multi-user project collaboration with role-based access

### Frontend Architecture
- **Components**: Reusable Angular components with TypeScript interfaces
- **Services**: Angular services for data management and Supabase operations
- **Pages**: Main application pages (Home, Dashboard, Auth, Project)
- **Styling**: SCSS with custom blue gradient branding

## Environment Setup

Required environment variables (create from `.env.example`):
```bash
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_AI_API_URL=http://localhost:3001
```

## Development Workflow

1. **Initial Setup**: Run `npm run setup` to install all dependencies
2. **Development**: Use `npm run dev` to start all services concurrently
3. **Building**: Use `npm run build` to create production builds
4. **Testing**: Run `npm run test` to execute all test suites

## Key Files for Development

- `package.json` - Root workspace configuration and scripts
- `ai-api/api/ai/route.ts` - Main AI API endpoint with tool integration
- `supabase/supabase_migrations.sql` - Database schema and RLS policies
- `frontend/angular.json` - Angular application configuration
- `.env.example` - Environment variables template

## Testing Setup

- **Frontend**: Uses AnalogJS Vitest for Angular testing
- **Backend**: ESLint for code quality
- **Linting**: ESLint + Prettier with Angular-specific rules
- **Type Checking**: TypeScript strict mode enabled

## Security Implementation

- Row Level Security (RLS) on all database tables
- User-based access control for projects and diagrams
- Role-based permissions (owner, editor, viewer)
- Service role key for backend operations