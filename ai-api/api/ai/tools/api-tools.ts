import { z } from 'zod';

export const apiTools = {
  generateAPIEndpoint: {
    description: 'Generate API endpoint with HTTP method, path, and implementation details',
    parameters: z.object({
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).describe('HTTP method'),
      path: z.string().describe('API endpoint path'),
      description: z.string().describe('Description of what the endpoint does'),
      requestBody: z.object({
        contentType: z.string().optional(),
        schema: z.any().optional()
      }).optional().describe('Request body structure'),
      responses: z.record(z.any()).optional().describe('Response schemas by status code'),
      authentication: z.enum(['none', 'jwt', 'oauth', 'api-key', 'basic']).optional().describe('Authentication type'),
      rateLimiting: z.object({
        requests: z.number(),
        window: z.string()
      }).optional().describe('Rate limiting configuration')
    })
  },

  generateOpenAPISpec: {
    description: 'Generate complete OpenAPI 3.0 specification from API design',
    parameters: z.object({
      title: z.string().describe('API title'),
      version: z.string().describe('API version'),
      description: z.string().describe('API description'),
      servers: z.array(z.object({
        url: z.string(),
        description: z.string().optional()
      })).optional().describe('API servers'),
      endpoints: z.array(z.object({
        path: z.string(),
        method: z.string(),
        summary: z.string(),
        description: z.string().optional(),
        parameters: z.array(z.any()).optional(),
        requestBody: z.any().optional(),
        responses: z.record(z.any())
      })).describe('List of endpoints to include')
    })
  },

  designAuthenticationFlow: {
    description: 'Design authentication and authorization flow for APIs',
    parameters: z.object({
      authType: z.enum(['jwt', 'oauth2', 'api-key', 'session-based', 'magic-link']).describe('Authentication type'),
      userRoles: z.array(z.string()).optional().describe('List of user roles'),
      permissions: z.array(z.object({
        role: z.string(),
        resources: z.array(z.string()),
        actions: z.array(z.string())
      })).optional().describe('Permission matrix'),
      securityFeatures: z.array(z.enum([
        'rate-limiting',
        'cors',
        'input-validation',
        'sql-injection-prevention',
        'xss-protection',
        'csrf-protection'
      ])).optional().describe('Security features to implement')
    })
  },

  optimizeAPIDesign: {
    description: 'Analyze and optimize API design for performance and usability',
    parameters: z.object({
      currentAPI: z.object({
        endpoints: z.array(z.any()),
        averageResponseTime: z.number().optional(),
        authenticationMethod: z.string().optional(),
        documentationStatus: z.enum(['none', 'partial', 'complete']).optional()
      }).describe('Current API state'),
      optimizationGoals: z.array(z.enum([
        'performance',
        'security',
        'usability',
        'maintainability',
        'scalability'
      ])).describe('What aspects to optimize')
    })
  },

  generateAPIDocumentation: {
    description: 'Generate comprehensive API documentation',
    parameters: z.object({
      apiSpec: z.any().describe('OpenAPI specification or API description'),
      includeExamples: z.boolean().default(true).describe('Include code examples'),
      languages: z.array(z.enum(['javascript', 'python', 'curl', 'java', 'csharp'])).default(['curl', 'javascript']),
      outputFormat: z.enum(['markdown', 'html', 'pdf']).default('markdown')
    })
  },

  createAPIGatewayConfig: {
    description: 'Generate API gateway configuration for routing and middleware',
    parameters: z.object({
      services: z.array(z.object({
        name: z.string(),
        baseUrl: z.string(),
        endpoints: z.array(z.string()),
        healthCheck: z.string().optional()
      })).describe('Backend services'),
      routing: z.array(z.object({
        path: z.string(),
        service: z.string(),
        method: z.string().optional(),
        middleware: z.array(z.string()).optional()
      })).describe('Routing rules'),
      middleware: z.array(z.enum([
        'authentication',
        'rate-limiting',
        'logging',
        'caching',
        'cors',
        'validation'
      ])).optional().describe('Global middleware')
    })
  },

  suggestAPIPatterns: {
    description: 'Suggest API design patterns based on requirements',
    parameters: z.object({
      useCase: z.enum(['crud', 'microservices', 'real-time', 'file-upload', 'search', 'analytics']).describe('Primary use case'),
      scale: z.enum(['small', 'medium', 'large', 'enterprise']).describe('Expected scale'),
      constraints: z.array(z.enum(['low-latency', 'high-throughput', 'data-consistency', 'offline-support'])).optional().describe('Technical constraints'),
      teamSize: z.number().optional().describe('Development team size')
    })
  }
};