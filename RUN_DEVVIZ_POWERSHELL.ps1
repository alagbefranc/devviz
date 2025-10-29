# PowerShell script to run DevViz Platform with Node.js 18
Write-Host "🚀 Starting DevViz Platform with Node.js 18" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "⚠️  WARNING: Not running as Administrator!" -ForegroundColor Yellow
    Write-Host "   This may cause permission errors." -ForegroundColor Yellow
    Write-Host "   Please right-click PowerShell and 'Run as administrator'" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue anyway or Ctrl+C to exit"
}

# Set up Node.js 18 environment
$env:PATH = "D:\nodejs18;" + $env:PATH
$env:NODE_PATH = "D:\nodejs18\node_modules"

Write-Host "✅ Node.js version:" -ForegroundColor Green
& node --version

Write-Host "✅ npm version:" -ForegroundColor Green
& npm --version

Write-Host ""
Write-Host "🧹 Cleaning up previous installations..." -ForegroundColor Blue

# Clean up directories
if (Test-Path "node_modules") {
    Write-Host "   Removing node_modules..." -ForegroundColor Blue
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
}
if (Test-Path "frontend\node_modules") {
    Write-Host "   Removing frontend\node_modules..." -ForegroundColor Blue
    Remove-Item -Recurse -Force "frontend\node_modules" -ErrorAction SilentlyContinue
}
if (Test-Path "ai-api\node_modules") {
    Write-Host "   Removing ai-api\node_modules..." -ForegroundColor Blue
    Remove-Item -Recurse -Force "ai-api\node_modules" -ErrorAction SilentlyContinue
}

Write-Host "🧹 Clearing npm cache..." -ForegroundColor Blue
& npm cache clean --force

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue

# Install root dependencies
Write-Host "   Installing root dependencies..." -ForegroundColor Blue
try {
    & npm install --legacy-peer-deps --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw "Root installation failed" }
} catch {
    Write-Host "   ❌ Root installation failed, trying alternative..." -ForegroundColor Red
    Write-Host "   Installing with --force flag..." -ForegroundColor Blue
    & npm install --force --legacy-peer-deps --no-audit --no-fund
}

# Install frontend dependencies
Write-Host "   Installing frontend dependencies..." -ForegroundColor Blue
Set-Location "frontend"
try {
    & npm install --legacy-peer-deps --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw "Frontend installation failed" }
} catch {
    Write-Host "   ❌ Frontend installation failed, trying with --force..." -ForegroundColor Red
    & npm install --force --legacy-peer-deps --no-audit --no-fund
}
Set-Location ".."

# Install AI API dependencies
Write-Host "   Installing AI API dependencies..." -ForegroundColor Blue
Set-Location "ai-api"
try {
    & npm install --legacy-peer-deps --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw "AI API installation failed" }
} catch {
    Write-Host "   ❌ AI API installation failed, trying with --force..." -ForegroundColor Red
    & npm install --force --legacy-peer-deps --no-audit --no-fund
}
Set-Location ".."

Write-Host ""
Write-Host "🎉 Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting DevViz Platform..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 Your applications will be available at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:4200" -ForegroundColor Cyan
Write-Host "   AI API:   http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Database: https://pcdqhgcoklzyiugmfctv.supabase.co" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor Yellow
Write-Host ""

# Start development servers
try {
    & npm run dev
} catch {
    Write-Host ""
    Write-Host "❌ Failed to start servers" -ForegroundColor Red
    Write-Host "   Check the error messages above" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Make sure you're running as Administrator" -ForegroundColor Yellow
    Write-Host "   2. Try running: .\RUN_DEVVIZ_NOW.bat" -ForegroundColor Yellow
    Write-Host "   3. Check if ports 4200 and 3001 are available" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")