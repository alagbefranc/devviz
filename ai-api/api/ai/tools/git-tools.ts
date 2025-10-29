import { z } from 'zod';

export const gitTools = {
  createBranch: {
    description: 'Create a new git branch with proper naming and base branch selection',
    parameters: z.object({
      branchName: z.string().describe('The name of the new branch'),
      baseBranch: z.string().optional().describe('The base branch to branch from'),
      branchType: z.enum(['feature', 'hotfix', 'release', 'bugfix']).describe('Type of branch'),
      description: z.string().describe('Description of what this branch will contain'),
      jiraTicket: z.string().optional().describe('Related Jira ticket number')
    })
  },

  analyzeMergeConflicts: {
    description: 'Analyze potential merge conflicts between branches',
    parameters: z.object({
      sourceBranch: z.string().describe('The source branch to merge'),
      targetBranch: z.string().describe('The target branch to merge into'),
      changedFiles: z.array(z.string()).optional().describe('List of changed files for analysis')
    })
  },

  suggestBranchingStrategy: {
    description: 'Suggest optimal branching strategy based on project needs',
    parameters: z.object({
      teamSize: z.number().describe('Number of developers on the team'),
      releaseFrequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly']).describe('How often releases are made'),
      projectType: z.enum(['web-app', 'mobile-app', 'api', 'library', 'microservices']).describe('Type of project'),
      complianceRequirements: z.boolean().optional().describe('Whether strict compliance/auditing is required')
    })
  },

  generateCommitMessage: {
    description: 'Generate conventional commit message based on changes',
    parameters: z.object({
      changes: z.array(z.object({
        file: z.string(),
        type: z.enum(['added', 'modified', 'deleted', 'renamed']),
        description: z.string()
      })).describe('List of changes made'),
      style: z.enum(['conventional', 'simple', 'detailed']).default('conventional').describe('Style of commit message')
    })
  },

  createReleasePlan: {
    description: 'Create a release plan with version bump and changelog',
    parameters: z.object({
      version: z.string().describe('New version number'),
      features: z.array(z.string()).describe('List of new features'),
      bugFixes: z.array(z.string()).optional().describe('List of bug fixes'),
      breakingChanges: z.array(z.string()).optional().describe('List of breaking changes'),
      releaseNotes: z.string().optional().describe('Additional release notes')
    })
  },

  optimizeGitHistory: {
    description: 'Suggest git history optimizations',
    parameters: z.object({
      currentHistory: z.object({
        totalCommits: z.number(),
        branchCount: z.number(),
        mergeComplexity: z.enum(['simple', 'moderate', 'complex']),
        issues: z.array(z.string()).optional()
      }).describe('Current git history state'),
      goals: z.array(z.enum(['cleanliness', 'traceability', 'performance', 'maintainability'])).describe('Optimization goals')
    })
  }
};