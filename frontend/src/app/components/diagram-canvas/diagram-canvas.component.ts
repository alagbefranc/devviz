import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Temporary ng-diagram interface (we'll replace with actual ng-diagram later)
export interface DiagramNode {
  id: string;
  type: 'git-branch' | 'git-commit' | 'api-endpoint' | 'db-table' | 'annotation';
  position: { x: number; y: number };
  data: {
    label: string;
    category: 'git' | 'api' | 'db';
    metadata?: Record<string, any>;
  };
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  data?: any;
}

export interface DiagramModel {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

@Component({
  selector: 'app-diagram-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="devviz-diagram-workspace">
      <!-- Toolbar -->
      <div class="devviz-toolbar">
        <div class="devviz-mode-section">
          <button
            *ngFor="let mode of diagramModes"
            class="devviz-mode-button"
            [class.active]="currentMode() === mode.id"
            (click)="switchMode(mode.id)"
          >
            <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="mode.icon" />
            </svg>
            {{ mode.label }}
          </button>
        </div>

        <div class="devviz-toolbar-actions">
          <button class="devviz-button devviz-button-secondary" (click)="askAIForHelp()">
            <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Ask AI
          </button>

          <button class="devviz-button devviz-button-primary" (click)="addNode()">
            <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Node
          </button>
        </div>
      </div>

      <!-- Main Canvas Area -->
      <div class="devviz-main-content">
        <!-- Diagram Canvas -->
        <div class="devviz-canvas-container"
             [class.expanded]="!showAIChat()"
             (drop)="onDrop($event)"
             (dragover)="onDragOver($event)">

          <!-- SVG Canvas for Diagram -->
          <svg class="devviz-canvas"
               [attr.viewBox]="getViewBox()"
               @mousedown="onCanvasMouseDown($event)"
               @mousemove="onCanvasMouseMove($event)"
               @mouseup="onCanvasMouseUp($event)"
               @wheel="onCanvasWheel($event)">

            <!-- Grid Background -->
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--devviz-gray-200)" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            <!-- Edges -->
            <g class="devviz-edges">
              <svg:path *ngFor="let edge of diagramModel().edges"
                       [attr.d]="calculateEdgePath(edge)"
                       class="devviz-edge"
                       [attr.data-edge-id]="edge.id" />
            </g>

            <!-- Nodes -->
            <g class="devviz-nodes">
              <g *ngFor="let node of diagramModel().nodes"
                 class="devviz-node"
                 [class.selected]="selectedNodes().has(node.id)"
                 [attr.data-node-id]="node.id"
                 [attr.transform]="getNodeTransform(node)"
                 @mousedown="onNodeMouseDown($event, node)"
                 (click)="selectNode(node)">

                <!-- Node Background -->
                <rect class="devviz-node-rect"
                      [attr.rx]="getNodeStyle(node).borderRadius"
                      [attr.fill]="getNodeStyle(node).fill"
                      [attr.stroke]="getNodeStyle(node).stroke"
                      [attr.stroke-width]="2" />

                <!-- Node Icon -->
                <foreignObject [attr.x]="-15" [attr.y]="-15" width="30" height="30">
                  <div class="devviz-node-icon" [style.background]="getNodeStyle(node).iconBg">
                    <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            [attr.d]="getNodeIcon(node)" />
                    </svg>
                  </div>
                </foreignObject>

                <!-- Node Label -->
                <text class="devviz-node-label"
                      [attr.y]="25"
                      text-anchor="middle">
                  {{ node.data.label }}
                </text>

                <!-- Node Ports -->
                <g *ngIf="node.type !== 'annotation'" class="devviz-node-ports">
                  <!-- Left Port -->
                  <circle class="devviz-port" cx="-40" cy="0" r="4" />
                  <!-- Right Port -->
                  <circle class="devviz-port" cx="40" cy="0" r="4" />
                </g>
              </g>
            </g>

            <!-- Selection Box -->
            <rect *ngIf="selectionBox()"
                  class="devviz-selection-box"
                  [attr.x]="selectionBox()!.x"
                  [attr.y]="selectionBox()!.y"
                  [attr.width]="selectionBox()!.width"
                  [attr.height]="selectionBox()!.height" />
          </svg>

          <!-- Canvas Controls -->
          <div class="devviz-canvas-controls">
            <button class="devviz-canvas-control" (click)="zoomIn()" title="Zoom In">
              <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            <button class="devviz-canvas-control" (click)="zoomOut()" title="Zoom Out">
              <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <button class="devviz-canvas-control" (click)="resetView()" title="Reset View">
              <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <!-- AI Chat Panel -->
        <div class="devviz-chat-panel" [class.expanded]="showAIChat()">
          <div class="devviz-chat-header">
            <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            DevBot AI Assistant
            <button class="devviz-chat-close" (click)="toggleAIChat()">
              <svg class="devviz-icon icon-tabler" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="devviz-chat-messages">
            <div *ngFor="let message of aiMessages()"
                 class="devviz-message"
                 [class.user]="message.role === 'user'"
                 [class.assistant]="message.role === 'assistant'">
              <div class="devviz-message-content">
                {{ message.content }}
              </div>
              <div class="devviz-message-time">
                {{ message.timestamp | date:'short' }}
              </div>
            </div>
          </div>

          <div class="devviz-suggestions">
            <button *ngFor="let suggestion of aiSuggestions()"
                    class="devviz-suggestion-btn"
                    (click)="sendAIMessage(suggestion.text)">
              💡 {{ suggestion.text }}
            </button>
          </div>

          <div class="devviz-chat-input">
            <input type="text"
                   [(ngModel)]="currentMessage"
                   (keyup.enter)="sendAIMessage(currentMessage)"
                   placeholder="Ask DevBot about your diagram..."
                   class="devviz-input" />
            <button class="devviz-button devviz-button-primary"
                    (click)="sendAIMessage(currentMessage)"
                    [disabled]="!currentMessage.trim()">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .devviz-diagram-workspace {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, var(--devviz-blue-50) 0%, var(--devviz-blue-100) 100%);
    }

    .devviz-toolbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--devviz-gray-200);
      padding: var(--devviz-space-4) var(--devviz-space-6);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--devviz-space-4);
    }

    .devviz-mode-section {
      display: flex;
      gap: var(--devviz-space-2);
    }

    .devviz-mode-button {
      display: flex;
      align-items: center;
      gap: var(--devviz-space-2);
      padding: var(--devviz-space-3) var(--devviz-space-4);
      border-radius: var(--devviz-radius-lg);
      border: 1px solid var(--devviz-gray-300);
      background: white;
      color: var(--devviz-gray-600);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--devviz-transition-fast);
    }

    .devviz-mode-button:hover {
      background: var(--devviz-blue-50);
      color: var(--devviz-blue-700);
      border-color: var(--devviz-blue-300);
    }

    .devviz-mode-button.active {
      background: var(--devviz-blue-500);
      color: white;
      border-color: var(--devviz-blue-600);
    }

    .devviz-toolbar-actions {
      display: flex;
      gap: var(--devviz-space-2);
    }

    .devviz-main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .devviz-canvas-container {
      flex: 1;
      position: relative;
      transition: width var(--devviz-transition-normal);
    }

    .devviz-canvas-container.expanded {
      width: calc(100% - 400px);
    }

    .devviz-canvas {
      width: 100%;
      height: 100%;
      cursor: grab;
    }

    .devviz-canvas:active {
      cursor: grabbing;
    }

    .devviz-node {
      cursor: pointer;
      transition: all var(--devviz-transition-fast);
    }

    .devviz-node:hover {
      filter: brightness(0.95);
    }

    .devviz-node.selected {
      filter: brightness(0.9);
    }

    .devviz-node-rect {
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
      transition: all var(--devviz-transition-fast);
    }

    .devviz-node-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .devviz-node-label {
      font-size: 12px;
      font-weight: 500;
      fill: var(--devviz-gray-800);
      pointer-events: none;
    }

    .devviz-port {
      fill: var(--devviz-blue-500);
      stroke: white;
      stroke-width: 2;
      cursor: crosshair;
      transition: all var(--devviz-transition-fast);
    }

    .devviz-port:hover {
      r: 6;
      fill: var(--devviz-blue-600);
    }

    .devviz-edge {
      fill: none;
      stroke: var(--devviz-gray-400);
      stroke-width: 2;
      marker-end: url(#arrowhead);
    }

    .devviz-canvas-controls {
      position: absolute;
      bottom: var(--devviz-space-4);
      right: var(--devviz-space-4);
      display: flex;
      flex-direction: column;
      gap: var(--devviz-space-2);
      background: white;
      padding: var(--devviz-space-2);
      border-radius: var(--devviz-radius-lg);
      box-shadow: var(--devviz-shadow-lg);
    }

    .devviz-canvas-control {
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      color: var(--devviz-gray-600);
      border-radius: var(--devviz-radius-md);
      cursor: pointer;
      transition: all var(--devviz-transition-fast);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .devviz-canvas-control:hover {
      background: var(--devviz-blue-50);
      color: var(--devviz-blue-700);
    }

    .devviz-selection-box {
      fill: rgba(171, 196, 255, 0.1);
      stroke: var(--devviz-blue-500);
      stroke-width: 1;
      stroke-dasharray: 5,5;
    }

    @media (max-width: 768px) {
      .devviz-toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .devviz-mode-section {
        justify-content: center;
      }

      .devviz-toolbar-actions {
        justify-content: center;
      }

      .devviz-canvas-container.expanded {
        width: 100%;
        height: 50vh;
      }
    }
  `]
})
export class DiagramCanvasComponent implements OnInit {
  // Signals for reactive state
  currentMode = signal<'git' | 'api' | 'db'>('git');
  diagramModel = signal<DiagramModel>({ nodes: [], edges: [] });
  selectedNodes = signal<Set<string>>(new Set());
  showAIChat = signal(false);
  aiMessages = signal<Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>>([]);
  currentMessage = '';

  // Canvas state
  viewport = signal({ x: 0, y: 0, zoom: 1 });
  isDragging = signal(false);
  dragStart = signal({ x: 0, y: 0 });
  selectionBox = signal<{x: number, y: number, width: number, height: number} | null>(null);

  // Diagram modes
  diagramModes = [
    { id: 'git', label: 'Git Workflow', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { id: 'api', label: 'API Designer', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'db', label: 'Database', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' }
  ];

  // AI suggestions
  aiSuggestions = signal([
    { id: '1', text: 'Create a user authentication flow' },
    { id: '2', text: 'Design a REST API for blog posts' },
    { id: '3', text: 'Create a database schema for e-commerce' },
    { id: '4', text: 'Suggest Git workflow for our team' }
  ]);

  ngOnInit() {
    this.initializeDiagram();
  }

  private initializeDiagram() {
    // Initialize with some default nodes based on current mode
    const initialNodes: DiagramNode[] = [
      {
        id: 'welcome',
        type: 'annotation',
        position: { x: 400, y: 300 },
        data: {
          label: `Welcome to ${this.currentMode().toUpperCase()} Designer!`,
          category: this.currentMode()
        }
      }
    ];

    this.diagramModel.set({ nodes: initialNodes, edges: [] });
  }

  switchMode(mode: 'git' | 'api' | 'db') {
    this.currentMode.set(mode);
    this.initializeDiagram();
    this.updateAISuggestions();
  }

  addNode() {
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      type: this.getDefaultNodeType(),
      position: { x: 200 + Math.random() * 400, y: 200 + Math.random() * 300 },
      data: {
        label: this.getDefaultNodeLabel(),
        category: this.currentMode()
      }
    };

    this.diagramModel.update(model => ({
      ...model,
      nodes: [...model.nodes, newNode]
    }));
  }

  private getDefaultNodeType(): DiagramNode['type'] {
    switch (this.currentMode()) {
      case 'git': return 'git-branch';
      case 'api': return 'api-endpoint';
      case 'db': return 'db-table';
      default: return 'annotation';
    }
  }

  private getDefaultNodeLabel(): string {
    switch (this.currentMode()) {
      case 'git': return 'New Branch';
      case 'api': return 'New Endpoint';
      case 'db': return 'New Table';
      default: return 'New Node';
    }
  }

  // Canvas interaction methods
  onCanvasMouseDown(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.isDragging.set(true);
      this.dragStart.set({ x: event.clientX, y: event.clientY });
    }
  }

  onCanvasMouseMove(event: MouseEvent) {
    if (this.isDragging()) {
      const dx = event.clientX - this.dragStart().x;
      const dy = event.clientY - this.dragStart().y;

      this.viewport.update(vp => ({
        ...vp,
        x: vp.x + dx / vp.zoom,
        y: vp.y + dy / vp.zoom
      }));

      this.dragStart.set({ x: event.clientX, y: event.clientY });
    }
  }

  onCanvasMouseUp() {
    this.isDragging.set(false);
  }

  onCanvasWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    this.viewport.update(vp => ({
      ...vp,
      zoom: Math.max(0.1, Math.min(3, vp.zoom * delta))
    }));
  }

  onNodeMouseDown(event: MouseEvent, node: DiagramNode) {
    event.stopPropagation();
    // Future: implement node dragging
  }

  selectNode(node: DiagramNode) {
    const selected = new Set(this.selectedNodes());
    if (selected.has(node.id)) {
      selected.delete(node.id);
    } else {
      selected.add(node.id);
    }
    this.selectedNodes.set(selected);
  }

  // Canvas controls
  zoomIn() {
    this.viewport.update(vp => ({ ...vp, zoom: Math.min(3, vp.zoom * 1.2) }));
  }

  zoomOut() {
    this.viewport.update(vp => ({ ...vp, zoom: Math.max(0.1, vp.zoom / 1.2) }));
  }

  resetView() {
    this.viewport.set({ x: 0, y: 0, zoom: 1 });
  }

  // Helper methods
  getViewBox(): string {
    const vp = this.viewport();
    return `${vp.x} ${vp.y} ${800 / vp.zoom} ${600 / vp.zoom}`;
  }

  getNodeTransform(node: DiagramNode): string {
    return `translate(${node.position.x}, ${node.position.y})`;
  }

  getNodeStyle(node: DiagramNode) {
    const styles = {
      'git-branch': { fill: '#10b981', stroke: '#059669', iconBg: '#10b981', borderRadius: 8 },
      'git-commit': { fill: '#3b82f6', stroke: '#2563eb', iconBg: '#3b82f6', borderRadius: 50 },
      'api-endpoint': { fill: '#f59e0b', stroke: '#d97706', iconBg: '#f59e0b', borderRadius: 8 },
      'db-table': { fill: '#8b5cf6', stroke: '#7c3aed', iconBg: '#8b5cf6', borderRadius: 4 },
      'annotation': { fill: '#6b7280', stroke: '#4b5563', iconBg: '#6b7280', borderRadius: 12 }
    };
    return styles[node.type] || styles.annotation;
  }

  getNodeIcon(node: DiagramNode): string {
    const icons = {
      'git-branch': 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      'git-commit': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      'api-endpoint': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'db-table': 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
      'annotation': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
    };
    return icons[node.type] || icons.annotation;
  }

  calculateEdgePath(edge: DiagramEdge): string {
    const sourceNode = this.diagramModel().nodes.find(n => n.id === edge.source);
    const targetNode = this.diagramModel().nodes.find(n => n.id === edge.target);

    if (!sourceNode || !targetNode) return '';

    const x1 = sourceNode.position.x + 40;
    const y1 = sourceNode.position.y;
    const x2 = targetNode.position.x - 40;
    const y2 = targetNode.position.y;

    return `M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`;
  }

  // AI Chat methods
  askAIForHelp() {
    this.showAIChat.set(true);
    if (!this.aiMessages().length) {
      this.sendAIMessage(`I'm working on a ${this.currentMode()} diagram. Can you suggest some best practices?`);
    }
  }

  toggleAIChat() {
    this.showAIChat.set(!this.showAIChat());
  }

  sendAIMessage(message: string) {
    if (!message.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    this.aiMessages.update(msgs => [...msgs, userMessage]);
    this.currentMessage = '';

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = this.generateAIResponse(message);
      this.aiMessages.update(msgs => [...msgs, aiResponse]);
    }, 1000);
  }

  private generateAIResponse(userMessage: string): {role: 'assistant', content: string, timestamp: Date} {
    const responses = {
      'git': 'For Git workflows, I recommend using GitFlow or GitHub Flow depending on your team size. Start with main branch, create feature branches for new work, and use pull requests for code review.',
      'api': 'For API design, follow REST principles: use nouns for resources, HTTP verbs for actions, proper status codes, and consider OpenAPI specification for documentation.',
      'db': 'For database design, normalize your tables to reduce redundancy, use proper indexing for performance, and establish foreign key relationships for data integrity.'
    };

    const defaultResponse = "I'd be happy to help! Based on your current diagram, I can suggest improvements, help generate code, or provide best practices for your specific use case.";

    return {
      role: 'assistant',
      content: responses[this.currentMode()] || defaultResponse,
      timestamp: new Date()
    };
  }

  private updateAISuggestions() {
    const suggestions = {
      'git': [
        { id: '1', text: 'Create feature branch structure' },
        { id: '2', text: 'Set up pull request template' },
        { id: '3', text: 'Design release workflow' },
        { id: '4', text: 'Analyze merge conflicts' }
      ],
      'api': [
        { id: '1', text: 'Design authentication endpoints' },
        { id: '2', text: 'Create API documentation' },
        { id: '3', text: 'Set up rate limiting' },
        { id: '4', text: 'Generate OpenAPI spec' }
      ],
      'db': [
        { id: '1', text: 'Design user management schema' },
        { id: '2', text: 'Create relationship diagram' },
        { id: '3', text: 'Generate migration scripts' },
        { id: '4', text: 'Optimize database indexes' }
      ]
    };

    this.aiSuggestions.set(suggestions[this.currentMode()] || []);
  }

  // Drag and drop
  onDrop(event: DragEvent) {
    event.preventDefault();
    // Future: implement drop handling
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}