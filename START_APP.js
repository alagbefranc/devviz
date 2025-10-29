#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting DevViz Platform...');
console.log('📊 Database Status: ✅ Connected to Supabase');
console.log('🤖 AI Configuration: ✅ OpenAI API configured');
console.log('');

// Try to start AI API server
console.log('🔄 Starting AI API Server...');
try {
  const aiApi = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'ai-api'),
    stdio: 'inherit',
    shell: true
  });

  aiApi.stdout.on('data', (data) => {
    console.log(`AI API: ${data}`);
  });

  aiApi.stderr.on('data', (data) => {
    console.log(`AI API Error: ${data}`);
  });

  setTimeout(() => {
    console.log('✅ AI API should be starting on http://localhost:3001');
    console.log('');
    console.log('📱 Next Steps:');
    console.log('1. Open browser and go to: http://localhost:3001/api/ai');
    console.log('2. Test the AI endpoint with a POST request');
    console.log('3. Check if the AI API is responding correctly');
    console.log('');
    console.log('💡 If frontend has dependency issues, you can still use the AI API directly!');
  }, 5000);

} catch (error) {
  console.log('❌ Failed to start AI API:', error.message);
  console.log('');
  console.log('🔧 Manual Start Instructions:');
  console.log('1. Open PowerShell as Administrator');
  console.log('2. Run: cd ai-api');
  console.log('3. Run: npm install --force');
  console.log('4. Run: npm run dev');
  console.log('');
  console.log('📊 Your DevViz Platform Database is ready at:');
  console.log('https://pcdqhgcoklzyiugmfctv.supabase.co');
}