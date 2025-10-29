@echo off
echo 🚀 Installing REAL DevViz Platform
echo =====================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ Running with Administrator privileges
) else (
    echo ❌ NOT running as Administrator!
    echo.
    echo 💡 You MUST run this as Administrator:
    echo    1. Right-click this file
    echo    2. Select "Run as administrator"
    echo    3. Click "Yes" on the UAC prompt
    echo.
    echo 🔧 This is required because Windows blocks npm
    echo    from creating the deep directory structures
    echo    needed for Node.js packages.
    echo.
    pause
    exit /b 1
)

echo ✅ Administrator privileges confirmed
echo.

REM Set Node.js 18 environment
set "PATH=D:\nodejs18;D:\nodejs18\node_modules\.bin;%PATH%"
set "NODE_PATH=D:\nodejs18\node_modules"

echo 🔧 Environment Setup:
echo    Node.js:
node --version
echo    npm:
npm --version

echo.
echo 🗑️ Cleaning up any existing installations...

REM Clean up directories
if exist "node_modules" (
    echo    Removing node_modules...
    rmdir /s /q node_modules >nul 2>&1
)
if exist "frontend\node_modules" (
    echo    Removing frontend\node_modules...
    rmdir /s /q frontend\node_modules >nul 2>&1
)
if exist "ai-api\node_modules" (
    echo    Removing ai-api\node_modules...
    rmdir /s /q ai-api\node_modules >nul 2>&1
)

echo 🧹 Clearing npm cache...
npm cache clean --force >nul 2>&1

echo.
echo 📦 Installing ROOT dependencies...
echo    This may take 2-3 minutes...
npm install --legacy-peer-deps --no-audit --no-fund

if %errorLevel% neq 0 (
    echo    ❌ Root installation failed
    echo    Trying with --force flag...
    npm install --force --legacy-peer-deps --no-audit --no-fund
)

echo.
echo 📦 Installing FRONTEND dependencies...
cd frontend
echo    Installing Angular packages...
npm install --legacy-peer-deps --no-audit --no-fund

if %errorLevel% neq 0 (
    echo    ❌ Frontend installation failed
    echo    Trying with --force flag...
    npm install --force --legacy-peer-deps --no-audit --no-fund
)
cd ..

echo.
echo 📦 Installing AI API dependencies...
cd ai-api
echo    Installing Next.js packages...
npm install --legacy-peer-deps --no-audit --no-fund

if %errorLevel% neq 0 (
    echo    ❌ AI API installation failed
    echo    Trying with --force flag...
    npm install --force --legacy-peer-deps --no-audit --no-fund
)
cd ..

echo.
echo ✅ Dependencies installed!
echo.
echo 🚀 Starting the REAL DevViz Platform...
echo.

REM Start the development servers
npm run dev

if %errorLevel% neq 0 (
    echo.
    echo ❌ Failed to start servers
    echo.
    echo 🔧 Troubleshooting:
    echo    1. Make sure ports 4200 and 3001 are available
    echo    2. Check if Node.js 18 is properly installed
    echo    3. Try running: node --version (should show v18.20.4)
    echo.
    echo 💾 Your database is already deployed at:
    echo    https://pcdqhgcoklzyiugmfctv.supabase.co
)

pause