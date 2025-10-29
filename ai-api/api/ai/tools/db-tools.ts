import { z } from 'zod';

export const dbTools = {
  designDatabaseTable: {
    description: 'Design a database table with columns, relationships, and constraints',
    parameters: z.object({
      tableName: z.string().describe('Name of the table'),
      purpose: z.string().describe('Purpose/description of the table'),
      columns: z.array(z.object({
        name: z.string(),
        type: z.string(),
        nullable: z.boolean().default(false),
        primaryKey: z.boolean().default(false),
        unique: z.boolean().default(false),
        defaultValue: z.string().optional(),
        description: z.string().optional(),
        constraints: z.array(z.string()).optional()
      })).describe('Table columns'),
      relationships: z.array(z.object({
        type: z.enum(['one-to-one', 'one-to-many', 'many-to-many']),
        foreignTable: z.string(),
        foreignKey: z.string(),
        onDelete: z.enum(['cascade', 'set-null', 'restrict', 'no-action']).optional()
      })).optional().describe('Relationships to other tables'),
      indexes: z.array(z.object({
        columns: z.array(z.string()),
        unique: z.boolean().default(false),
        type: z.enum(['btree', 'hash', 'gist', 'gin']).optional()
      })).optional().describe('Database indexes')
    })
  },

  generateSQLSchema: {
    description: 'Generate complete SQL DDL for database schema',
    parameters: z.object({
      tables: z.array(z.object({
        name: z.string(),
        columns: z.array(z.any()),
        relationships: z.array(z.any()).optional(),
        indexes: z.array(z.any()).optional()
      })).describe('List of tables to generate'),
      databaseType: z.enum(['postgresql', 'mysql', 'sqlite', 'sql-server']).default('postgresql').describe('Target database'),
      includeConstraints: z.boolean().default(true).describe('Include foreign key constraints'),
      includeIndexes: z.boolean().default(true).describe('Include index definitions')
    })
  },

  optimizeDatabaseSchema: {
    description: 'Analyze and optimize database schema for performance',
    parameters: z.object({
      currentSchema: z.object({
        tables: z.array(z.any()),
        indexes: z.array(z.any()).optional(),
        relationships: z.array(z.any()).optional(),
        performanceIssues: z.array(z.string()).optional()
      }).describe('Current database schema'),
      optimizationGoals: z.array(z.enum([
        'query-performance',
        'storage-efficiency',
        'data-integrity',
        'scalability',
        'maintainability'
      ])).describe('Optimization objectives'),
      databaseType: z.enum(['postgresql', 'mysql', 'sqlite', 'sql-server']).default('postgresql')
    })
  },

  generateMigrationScript: {
    description: 'Generate database migration script for schema changes',
    parameters: z.object({
      fromSchema: z.array(z.any()).describe('Current database schema'),
      toSchema: z.array(z.any()).describe('Target database schema'),
      databaseType: z.enum(['postgresql', 'mysql', 'sqlite', 'sql-server']).default('postgresql'),
      includeRollback: z.boolean().default(true).describe('Include rollback script'),
      backupStrategy: z.enum(['full', 'incremental', 'none']).optional().describe('Backup strategy')
    })
  },

  suggestDatabaseArchitecture: {
    description: 'Suggest optimal database architecture based on requirements',
    parameters: z.object({
      applicationType: z.enum(['web-app', 'mobile-app', 'analytics', 'iot', 'e-commerce', 'social']).describe('Application type'),
      dataVolume: z.enum(['small', 'medium', 'large', 'big-data']).describe('Expected data volume'),
      readWriteRatio: z.number().min(0).max(100).describe('Read to write ratio (percentage reads)'),
      consistencyRequirement: z.enum(['strong', 'eventual', 'weak']).describe('Data consistency requirements'),
      scalingRequirements: z.enum(['vertical', 'horizontal', 'sharded', 'distributed']).optional().describe('Scaling strategy')
    })
  },

  generateSeedData: {
    description: 'Generate realistic seed data for testing and development',
    parameters: z.object({
      tables: z.array(z.object({
        name: z.string(),
        columns: z.array(z.string()),
        recordCount: z.number(),
        dataTypes: z.record(z.string()).optional()
      })).describe('Tables to generate data for'),
      dataRelationships: z.array(z.object({
        parentTable: z.string(),
        childTable: z.string(),
        relationship: z.string()
      })).optional().describe('Relationship constraints to maintain'),
      realismLevel: z.enum(['minimal', 'realistic', 'production-like']).default('realistic').describe('Level of data realism'),
      locale: z.string().default('en').describe('Locale for localized data')
    })
  },

  analyzeDatabasePerformance: {
    description: 'Analyze database performance and suggest improvements',
    parameters: z.object({
      queryStats: z.array(z.object({
        query: z.string(),
        executionTime: z.number(),
        frequency: z.number(),
        tableName: z.string().optional()
      })).optional().describe('Query performance statistics'),
      tableStats: z.array(z.object({
        tableName: z.string(),
        rowCount: z.number(),
        indexUsage: z.number().optional(),
        storageSize: z.number().optional()
      })).optional().describe('Table statistics'),
      slowQueries: z.array(z.string()).optional().describe('List of slow queries'),
      configuration: z.record(z.any()).optional().describe('Database configuration')
    })
  },

  designDatabaseSecurity: {
    description: 'Design database security and access control',
    parameters: z.object({
      userRoles: z.array(z.object({
        role: z.string(),
        description: z.string(),
        privileges: z.array(z.string())
      })).describe('User roles and privileges'),
      sensitiveData: z.array(z.object({
        table: z.string(),
        columns: z.array(z.string()),
        accessLevel: z.enum(['restricted', 'encrypted', 'masked', 'hidden'])
      })).optional().describe('Sensitive data handling'),
      auditRequirements: z.array(z.enum(['reads', 'writes', 'schema-changes', 'logins'])).optional().describe('Audit trail requirements'),
      encryptionLevel: z.enum(['none', 'at-rest', 'in-transit', 'end-to-end']).default('at-rest').describe('Encryption requirements')
    })
  }
};