import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { gitTools } from './tools/git-tools';
import { apiTools } from './tools/api-tools';
import { dbTools } from './tools/db-tools';

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Request schema
const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })),
  diagramContext: z.object({
    currentMode: z.enum(['git', 'api', 'db']).optional(),
    nodes: z.array(z.any()).optional(),
    connections: z.array(z.any()).optional(),
    projectId: z.string().optional(),
    userId: z.string().optional()
  }),
  userIntent: z.string().optional(),
  provider: z.enum(['openai', 'anthropic']).default('openai'),
  model: z.string().default('gpt-4-turbo')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, diagramContext, provider, model } = requestSchema.parse(body);

    // Select AI provider
    const aiModel = provider === 'anthropic'
      ? anthropic(model || 'claude-3-sonnet-20241022')
      : openai(model || 'gpt-4-turbo');

    // Enhanced system prompt
    const systemPrompt = `You are DevBot, an intelligent development assistant for the DevViz platform. You help developers with:

🌿 **Git Workflow Design**: Branching strategies, commit analysis, merge conflict prediction
🔌 **API Design**: RESTful APIs, OpenAPI generation, authentication flows
🗄️ **Database Design**: Schema optimization, relationship modeling, SQL generation

You have access to specialized tools for each domain. Always consider the user's current context and provide practical, actionable assistance.

Key Guidelines:
- Ask clarifying questions when requirements are unclear
- Suggest best practices and potential improvements
- Consider security, performance, and maintainability
- Provide code examples when helpful
- Be conversational but professional

Current Context:
- Mode: ${diagramContext.currentMode || 'none'}
- Project: ${diagramContext.projectId || 'new project'}
- Existing Nodes: ${diagramContext.nodes?.length || 0}`;

    const result = await streamText({
      model: aiModel,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      tools: {
        ...gitTools,
        ...apiTools,
        ...dbTools,
        // Cross-domain tools
        generateFullStackProject: {
          description: 'Generate a complete full-stack project with Git, API, and database components',
          parameters: z.object({
            projectName: z.string(),
            description: z.string(),
            features: z.array(z.string()).optional(),
            techStack: z.object({
              frontend: z.string().optional(),
              backend: z.string().optional(),
              database: z.string().optional()
            }).optional()
          })
        },
        optimizeArchitecture: {
          description: 'Analyze current architecture and suggest optimizations',
          parameters: z.object({
            architectureType: z.enum(['performance', 'security', 'scalability', 'maintainability']),
            currentSetup: z.object({
              apiEndpoints: z.array(z.any()).optional(),
              databaseSchema: z.array(z.any()).optional(),
              gitWorkflow: z.any().optional()
            })
          })
        }
      },
      toolChoice: 'auto',
      maxSteps: 5
    });

    // Log AI usage for analytics
    if (diagramContext.userId && diagramContext.projectId) {
      try {
        await supabase
          .from('ai_usage_analytics')
          .insert({
            user_id: diagramContext.userId,
            project_id: diagramContext.projectId,
            provider,
            model,
            messages_count: messages.length,
            context_mode: diagramContext.currentMode,
            created_at: new Date().toISOString()
          });
      } catch (error) {
        console.error('Failed to log AI usage:', error);
      }
    }

    return result.toAIStreamResponse();

  } catch (error) {
    console.error('AI API Error:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request', details: error.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Health check endpoint
export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}