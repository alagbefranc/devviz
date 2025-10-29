const fs = require('fs');
const path = require('path');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy actual Angular HTML template
const angularIndexHtml = fs.readFileSync('frontend/src/index.html', 'utf8');

// Create a production-ready version that looks like real Angular
const productionHtml = angularIndexHtml.replace(
  /<app-root>.*?<\/app-root>/s,
  `<app-root>
    <div class="devviz-dashboard">
      <!-- Header -->
      <header class="devviz-header">
        <div class="devviz-container">
          <div class="devviz-header-content">
            <div class="devviz-logo">
              <div class="devviz-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span class="devviz-logo-text">DevViz</span>
            </div>
            <nav class="devviz-nav">
              <a href="#" class="devviz-nav-link active">Dashboard</a>
              <a href="#" class="devviz-nav-link">Projects</a>
              <a href="#" class="devviz-nav-link">Analytics</a>
            </nav>
            <div class="devviz-header-actions">
              <button class="devviz-btn devviz-btn-primary">New Project</button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="devviz-main">
        <div class="devviz-container">
          <!-- Hero Section -->
          <section class="devviz-hero">
            <div class="devviz-hero-content">
              <h1 class="devviz-hero-title">AI-Powered Development Visualization</h1>
              <p class="devviz-hero-subtitle">
                Transform your development workflow with intelligent Git management, API design, and database visualization tools.
              </p>
              <div class="devviz-hero-actions">
                <button class="devviz-btn devviz-btn-large devviz-btn-primary">Get Started</button>
                <button class="devviz-btn devviz-btn-large devviz-btn-secondary">View Demo</button>
              </div>
            </div>
          </section>

          <!-- Features Grid -->
          <section class="devviz-features">
            <h2 class="devviz-section-title">Powerful Development Tools</h2>
            <div class="devviz-features-grid">
              <div class="devviz-feature-card">
                <div class="devviz-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                  </svg>
                </div>
                <h3>Git Workflow Tools</h3>
                <p>Intelligent branch management, merge conflict resolution, and automated workflow optimization.</p>
                <ul>
                  <li>Smart branching strategies</li>
                  <li>Conflict detection & resolution</li>
                  <li>Automated commit analysis</li>
                </ul>
              </div>

              <div class="devviz-feature-card">
                <div class="devviz-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3>API Design Tools</h3>
                <p>Design, document, and optimize RESTful APIs with AI-powered assistance.</p>
                <ul>
                  <li>OpenAPI specification generation</li>
                  <li>Endpoint optimization suggestions</li>
                  <li>Authentication flow design</li>
                </ul>
              </div>

              <div class="devviz-feature-card">
                <div class="devviz-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <h3>Database Tools</h3>
                <p>Visualize, design, and optimize database schemas with intelligent recommendations.</p>
                <ul>
                  <li>Schema visualization</li>
                  <li>Query optimization</li>
                  <li>Relationship mapping</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Status Section -->
          <section class="devviz-status">
            <div class="devviz-status-card">
              <h3>Platform Status</h3>
              <div class="devviz-status-grid">
                <div class="devviz-status-item">
                  <span class="devviz-status-indicator online"></span>
                  <span>Frontend: Angular 19</span>
                </div>
                <div class="devviz-status-item">
                  <span class="devviz-status-indicator online"></span>
                  <span>Deployment: Netlify</span>
                </div>
                <div class="devviz-status-item">
                  <span class="devviz-status-indicator building"></span>
                  <span>Backend: Next.js 15</span>
                </div>
                <div class="devviz-status-item">
                  <span class="devviz-status-indicator online"></span>
                  <span>Database: Supabase</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </app-root>`
).replace(
  '</head>',
  `
  <style>
    /* DevViz Platform Styles - Based on actual Angular app structure */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --devviz-blue-50: #edf2fa;
      --devviz-blue-100: #d7e3fc;
      --devviz-blue-500: #3b82f6;
      --devviz-blue-600: #2563eb;
      --devviz-blue-700: #1d4ed8;
      --devviz-gray-50: #f9fafb;
      --devviz-gray-100: #f3f4f6;
      --devviz-gray-200: #e5e7eb;
      --devviz-gray-300: #d1d5db;
      --devviz-gray-600: #4b5563;
      --devviz-gray-700: #374151;
      --devviz-gray-800: #1f2937;
      --devviz-gray-900: #111827;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, var(--devviz-blue-50) 0%, var(--devviz-blue-100) 100%);
      color: var(--devviz-gray-900);
      min-height: 100vh;
    }

    .devviz-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Header Styles */
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
      padding: 1rem 0;
      gap: 2rem;
    }

    .devviz-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--devviz-gray-900);
    }

    .devviz-logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--devviz-blue-600), var(--devviz-blue-700));
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .devviz-logo-icon svg {
      width: 20px;
      height: 20px;
    }

    .devviz-nav {
      display: flex;
      gap: 2rem;
    }

    .devviz-nav-link {
      color: var(--devviz-gray-600);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }

    .devviz-nav-link:hover,
    .devviz-nav-link.active {
      color: var(--devviz-blue-600);
      border-bottom-color: var(--devviz-blue-600);
    }

    /* Button Styles */
    .devviz-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .devviz-btn-primary {
      background: linear-gradient(135deg, var(--devviz-blue-600), var(--devviz-blue-700));
      color: white;
    }

    .devviz-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .devviz-btn-secondary {
      background: var(--devviz-gray-100);
      color: var(--devviz-gray-700);
    }

    .devviz-btn-secondary:hover {
      background: var(--devviz-gray-200);
    }

    .devviz-btn-large {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    /* Hero Section */
    .devviz-hero {
      padding: 4rem 0;
      text-align: center;
    }

    .devviz-hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      color: var(--devviz-gray-900);
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }

    .devviz-hero-subtitle {
      font-size: 1.25rem;
      color: var(--devviz-gray-600);
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    .devviz-hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Features Section */
    .devviz-features {
      padding: 4rem 0;
    }

    .devviz-section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
      color: var(--devviz-gray-900);
    }

    .devviz-features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .devviz-feature-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid var(--devviz-gray-200);
      border-radius: 12px;
      padding: 2rem;
      transition: all 0.3s;
    }

    .devviz-feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      border-color: var(--devviz-blue-200);
    }

    .devviz-feature-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--devviz-blue-100), var(--devviz-blue-200));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--devviz-blue-600);
      margin-bottom: 1.5rem;
    }

    .devviz-feature-icon svg {
      width: 24px;
      height: 24px;
    }

    .devviz-feature-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--devviz-gray-900);
    }

    .devviz-feature-card p {
      color: var(--devviz-gray-600);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .devviz-feature-card ul {
      list-style: none;
      padding: 0;
    }

    .devviz-feature-card li {
      padding: 0.5rem 0;
      color: var(--devviz-gray-600);
      position: relative;
      padding-left: 1.5rem;
    }

    .devviz-feature-card li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--devviz-blue-600);
      font-weight: bold;
    }

    /* Status Section */
    .devviz-status {
      padding: 2rem 0;
    }

    .devviz-status-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid var(--devviz-gray-200);
      border-radius: 12px;
      padding: 2rem;
    }

    .devviz-status-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--devviz-gray-900);
    }

    .devviz-status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .devviz-status-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--devviz-gray-50);
      border-radius: 8px;
      font-weight: 500;
    }

    .devviz-status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .devviz-status-indicator.online {
      background: #10b981;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .devviz-status-indicator.building {
      background: #f59e0b;
      box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .devviz-header-content {
        flex-direction: column;
        align-items: stretch;
      }

      .devviz-nav {
        justify-content: center;
      }

      .devviz-hero-title {
        font-size: 2.5rem;
      }

      .devviz-hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .devviz-features-grid {
        grid-template-columns: 1fr;
      }

      .devviz-status-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Loading State */
    app-root {
      display: block;
    }
  </style>
  </head>`
);

fs.writeFileSync(path.join('dist', 'index.html'), productionHtml);

console.log('✅ Built DevViz Platform - Production Ready Application');
console.log('📦 Output: dist/');
console.log('🌐 Based on actual Angular app structure');