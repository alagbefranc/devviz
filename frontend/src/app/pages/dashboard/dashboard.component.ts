import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="devviz-dashboard">
      <!-- Header -->
      <header class="devviz-header">
        <div class="devviz-container">
          <div class="devviz-header-content">
            <div class="devviz-logo">
              <div class="devviz-logo-icon">
                <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="devviz-logo-text">
                <h1>DevViz</h1>
                <span>AI Development Platform</span>
              </div>
            </div>

            <nav class="devviz-nav">
              <button class="devviz-nav-item active">
                <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </button>
              <button class="devviz-nav-item">
                <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Projects
              </button>
              <button class="devviz-nav-item">
                <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
            </nav>

            <button class="devviz-button devviz-button-primary">
              <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="devviz-main-content">
        <div class="devviz-container">
          <!-- Welcome Section -->
          <section class="devviz-welcome">
            <div class="devviz-welcome-content">
              <h2>Welcome back, Developer! 👋</h2>
              <p>Continue building amazing software with AI-powered visualization tools.</p>
            </div>
            <div class="devviz-welcome-stats">
              <div class="devviz-stat-card">
                <div class="devviz-stat-icon">
                  <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div class="devviz-stat-content">
                  <div class="devviz-stat-number">12</div>
                  <div class="devviz-stat-label">Projects</div>
                </div>
              </div>

              <div class="devviz-stat-card">
                <div class="devviz-stat-icon">
                  <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="devviz-stat-content">
                  <div class="devviz-stat-number">48</div>
                  <div class="devviz-stat-label">AI Generations</div>
                </div>
              </div>

              <div class="devviz-stat-card">
                <div class="devviz-stat-icon">
                  <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="devviz-stat-content">
                  <div class="devviz-stat-number">6</div>
                  <div class="devviz-stat-label">Team Members</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Quick Actions -->
          <section class="devviz-quick-actions">
            <h3>Quick Actions</h3>
            <div class="devviz-action-grid">
              <button class="devviz-action-card" (click)="createGitWorkflow()">
                <div class="devviz-action-icon">
                  <svg class="devviz-icon-lg icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div class="devviz-action-content">
                  <h4>Git Workflow</h4>
                  <p>Design branching strategies and visualize commit history</p>
                </div>
                <div class="devviz-action-arrow">
                  <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button class="devviz-action-card" (click)="createAPIDesign()">
                <div class="devviz-action-icon">
                  <svg class="devviz-icon-lg icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="devviz-action-content">
                  <h4>API Designer</h4>
                  <p>Create REST APIs with OpenAPI generation</p>
                </div>
                <div class="devviz-action-arrow">
                  <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button class="devviz-action-card" (click)="createDatabaseSchema()">
                <div class="devviz-action-icon">
                  <svg class="devviz-icon-lg icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div class="devviz-action-content">
                  <h4>Database Schema</h4>
                  <p>Visual database design with SQL generation</p>
                </div>
                <div class="devviz-action-arrow">
                  <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </section>

          <!-- Recent Projects -->
          <section class="devviz-recent-projects">
            <div class="devviz-section-header">
              <h3>Recent Projects</h3>
              <button class="devviz-button devviz-button-secondary">View All</button>
            </div>

            <div class="devviz-project-grid">
              <div class="devviz-project-card" *ngFor="let project of recentProjects">
                <div class="devviz-project-header">
                  <div class="devviz-project-icon">
                    <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div class="devviz-project-status active">Active</div>
                </div>

                <div class="devviz-project-content">
                  <h4>{{ project.name }}</h4>
                  <p>{{ project.description }}</p>

                  <div class="devviz-project-stats">
                    <div class="devviz-project-stat">
                      <svg class="devviz-icon-sm icon-tabler" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {{ project.diagrams }} diagrams
                    </div>
                    <div class="devviz-project-stat">
                      <svg class="devviz-icon-sm icon-tabler" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ project.lastUpdated }}
                    </div>
                  </div>
                </div>

                <div class="devviz-project-footer">
                  <button class="devviz-button devviz-button-primary">Open</button>
                  <button class="devviz-button devviz-button-secondary">Share</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .devviz-dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--devviz-blue-50) 0%, var(--devviz-blue-100) 100%);
    }

    .devviz-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--devviz-gray-200);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .devviz-header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--devviz-space-4) 0;
      gap: var(--devviz-space-6);
    }

    .devviz-logo {
      display: flex;
      align-items: center;
      gap: var(--devviz-space-3);
    }

    .devviz-logo-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, var(--devviz-blue-400) 0%, var(--devviz-blue-600) 100%);
      border-radius: var(--devviz-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .devviz-logo-text h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--devviz-gray-900);
      margin: 0;
    }

    .devviz-logo-text span {
      font-size: 0.875rem;
      color: var(--devviz-gray-600);
    }

    .devviz-nav {
      display: flex;
      gap: var(--devviz-space-1);
    }

    .devviz-nav-item {
      display: flex;
      align-items: center;
      gap: var(--devviz-space-2);
      padding: var(--devviz-space-3) var(--devviz-space-4);
      border-radius: var(--devviz-radius-lg);
      border: 1px solid transparent;
      background: transparent;
      color: var(--devviz-gray-600);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--devviz-transition-fast);
    }

    .devviz-nav-item:hover {
      background: var(--devviz-blue-50);
      color: var(--devviz-blue-700);
    }

    .devviz-nav-item.active {
      background: var(--devviz-blue-100);
      color: var(--devviz-blue-700);
    }

    .devviz-main-content {
      padding: var(--devviz-space-8) 0;
    }

    .devviz-welcome {
      margin-bottom: var(--devviz-space-8);
    }

    .devviz-welcome-content h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--devviz-gray-900);
      margin-bottom: var(--devviz-space-2);
    }

    .devviz-welcome-content p {
      font-size: 1.125rem;
      color: var(--devviz-gray-600);
    }

    .devviz-welcome-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--devviz-space-4);
      margin-top: var(--devviz-space-6);
    }

    .devviz-stat-card {
      background: white;
      padding: var(--devviz-space-6);
      border-radius: var(--devviz-radius-xl);
      box-shadow: var(--devviz-shadow-sm);
      border: 1px solid var(--devviz-gray-200);
      display: flex;
      align-items: center;
      gap: var(--devviz-space-4);
    }

    .devviz-stat-icon {
      width: 3rem;
      height: 3rem;
      background: var(--devviz-blue-50);
      border-radius: var(--devviz-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--devviz-blue-600);
    }

    .devviz-stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--devviz-gray-900);
    }

    .devviz-stat-label {
      font-size: 0.875rem;
      color: var(--devviz-gray-600);
    }

    .devviz-quick-actions {
      margin-bottom: var(--devviz-space-8);
    }

    .devviz-quick-actions h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--devviz-gray-900);
      margin-bottom: var(--devviz-space-4);
    }

    .devviz-action-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--devviz-space-4);
    }

    .devviz-action-card {
      background: white;
      padding: var(--devviz-space-6);
      border-radius: var(--devviz-radius-xl);
      box-shadow: var(--devviz-shadow-sm);
      border: 1px solid var(--devviz-gray-200);
      display: flex;
      align-items: flex-start;
      gap: var(--devviz-space-4);
      cursor: pointer;
      transition: all var(--devviz-transition-normal);
      text-align: left;
      width: 100%;
    }

    .devviz-action-card:hover {
      box-shadow: var(--devviz-shadow-lg);
      transform: translateY(-2px);
    }

    .devviz-action-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, var(--devviz-blue-400) 0%, var(--devviz-blue-600) 100%);
      border-radius: var(--devviz-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .devviz-action-content {
      flex: 1;
    }

    .devviz-action-content h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--devviz-gray-900);
      margin-bottom: var(--devviz-space-1);
    }

    .devviz-action-content p {
      font-size: 0.875rem;
      color: var(--devviz-gray-600);
      margin: 0;
    }

    .devviz-action-arrow {
      display: flex;
      align-items: center;
      color: var(--devviz-gray-400);
      flex-shrink: 0;
    }

    .devviz-recent-projects h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--devviz-gray-900);
      margin-bottom: var(--devviz-space-4);
    }

    .devviz-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--devviz-space-4);
    }

    .devviz-project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--devviz-space-4);
    }

    .devviz-project-card {
      background: white;
      border-radius: var(--devviz-radius-xl);
      box-shadow: var(--devviz-shadow-sm);
      border: 1px solid var(--devviz-gray-200);
      overflow: hidden;
      transition: all var(--devviz-transition-normal);
    }

    .devviz-project-card:hover {
      box-shadow: var(--devviz-shadow-lg);
      transform: translateY(-2px);
    }

    .devviz-project-header {
      padding: var(--devviz-space-4) var(--devviz-space-6);
      border-bottom: 1px solid var(--devviz-gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .devviz-project-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: var(--devviz-blue-50);
      border-radius: var(--devviz-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--devviz-blue-600);
    }

    .devviz-project-status {
      padding: var(--devviz-space-1) var(--devviz-space-3);
      border-radius: var(--devviz-radius-md);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .devviz-project-status.active {
      background: var(--devviz-success);
      color: white;
    }

    .devviz-project-content {
      padding: var(--devviz-space-6);
    }

    .devviz-project-content h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--devviz-gray-900);
      margin-bottom: var(--devviz-space-2);
    }

    .devviz-project-content p {
      font-size: 0.875rem;
      color: var(--devviz-gray-600);
      margin-bottom: var(--devviz-space-4);
    }

    .devviz-project-stats {
      display: flex;
      gap: var(--devviz-space-4);
      margin-bottom: var(--devviz-space-4);
    }

    .devviz-project-stat {
      display: flex;
      align-items: center;
      gap: var(--devviz-space-1);
      font-size: 0.875rem;
      color: var(--devviz-gray-600);
    }

    .devviz-project-footer {
      padding: var(--devviz-space-4) var(--devviz-space-6);
      border-top: 1px solid var(--devviz-gray-200);
      display: flex;
      gap: var(--devviz-space-2);
    }

    @media (max-width: 768px) {
      .devviz-header-content {
        flex-direction: column;
        align-items: stretch;
        gap: var(--devviz-space-4);
      }

      .devviz-nav {
        justify-content: center;
      }

      .devviz-welcome-stats {
        grid-template-columns: 1fr;
      }

      .devviz-action-grid {
        grid-template-columns: 1fr;
      }

      .devviz-project-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  recentProjects = [
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      diagrams: 8,
      lastUpdated: '2 hours ago',
      status: 'active'
    },
    {
      name: 'Mobile App API',
      description: 'RESTful API for mobile application backend',
      diagrams: 5,
      lastUpdated: '1 day ago',
      status: 'active'
    },
    {
      name: 'Analytics Dashboard',
      description: 'Data visualization and analytics platform',
      diagrams: 12,
      lastUpdated: '3 days ago',
      status: 'active'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  createGitWorkflow() {
    // Navigate to project creation with Git workflow mode
    console.log('Creating Git workflow...');
  }

  createAPIDesign() {
    // Navigate to project creation with API design mode
    console.log('Creating API design...');
  }

  createDatabaseSchema() {
    // Navigate to project creation with Database schema mode
    console.log('Creating database schema...');
  }
}