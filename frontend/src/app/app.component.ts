import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">🚀 DevViz Platform</h1>
        <h2 style="font-size: 2rem; margin-bottom: 2rem;">AI-Powered Development Visualization</h2>

        <div style="background: rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 10px; backdrop-filter: blur(10px); margin-bottom: 2rem;">
          <h3 style="margin-bottom: 1rem;">✅ Real Angular Application Deployed!</h3>
          <p style="font-size: 1.2rem; margin-bottom: 1rem;">Welcome to your DevViz Platform!</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; text-align: left;">
          <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(5px);">
            <h4>🔧 Git Workflow Tools</h4>
            <p>Branch management, merge conflict analysis, and Git strategy assistance.</p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(5px);">
            <h4>🛠️ API Design Tools</h4>
            <p>RESTful API design, OpenAPI generation, and authentication flows.</p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(5px);">
            <h4>🗄️ Database Tools</h4>
            <p>Schema design, relationship modeling, and SQL generation.</p>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; border-radius: 8px;">
          <p style="margin: 0;"><strong>Status:</strong> Angular Frontend ✅ | Next.js API 🚧 | Supabase Database ✅</p>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'devviz-platform';
}