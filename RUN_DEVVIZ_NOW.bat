@echo off
echo 🚀 Starting DevViz Platform with Node.js 18
echo ==========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ Running with Administrator privileges
) else (
    echo ⚠️  WARNING: Not running as Administrator!
    echo    This may cause permission errors.
    echo    Please right-click and "Run as administrator"
    echo.
    pause
    exit /b 1
)

REM Set up Node.js 18 environment
set "ORIGINAL_PATH=%PATH%"
set "PATH=D:\nodejs18;D:\nodejs18\node_modules\.bin;%PATH%"
set "NODE_PATH=D:\nodejs18\node_modules"

echo ✅ Node.js version:
node --version

echo ✅ npm version:
npm --version

echo.
echo 🧹 Cleaning up previous installations...

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
echo 📦 Installing dependencies...

REM Install root dependencies
echo    Installing root dependencies...
npm install --legacy-peer-deps --no-audit --no-fund
if %errorLevel% neq 0 (
    echo    ❌ Root installation failed, trying alternative...
    goto :alternative
)

REM Install frontend dependencies
echo    Installing frontend dependencies...
cd frontend
npm install --legacy-peer-deps --no-audit --no-fund
if %errorLevel% neq 0 (
    echo    ❌ Frontend installation failed
    cd ..
    goto :alternative
)
cd ..

REM Install AI API dependencies
echo    Installing AI API dependencies...
cd ai-api
npm install --legacy-peer-deps --no-audit --no-fund
if %errorLevel% neq 0 (
    echo    ❌ AI API installation failed
    cd ..
    goto :alternative
)
cd ..

goto :success

:alternative
echo.
echo 🔄 Trying alternative installation method...
echo    This may take longer but often bypasses permission issues.

REM Try using --force flag
echo    Installing with --force flag...
npm install --force --legacy-peer-deps

cd frontend
echo    Installing frontend with --force...
npm install --force --legacy-peer-deps
cd ..

cd ai-api
echo    Installing AI API with --force...
npm install --force --legacy-peer-deps
cd ..

:success
echo.
echo 🎉 Dependencies installed successfully!
echo.
echo 🚀 Starting DevViz Platform...
echo.
echo 📱 Your applications will be available at:
echo    Frontend: http://localhost:4200
echo    AI API:   http://localhost:3001
echo    Database: https://pcdqhgcoklzyiugmfctv.supabase.co
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start development servers
npm run dev

if %errorLevel% neq 0 (
    echo.
    echo ❌ Failed to start servers
    echo    Check the error messages above
    echo.
    echo 🔧 Troubleshooting:
    echo    1. Make sure you're running as Administrator
    echo    2. Try running: use_node18.bat
    echo    3. Check if ports 4200 and 3001 are available
    echo.
)

REM Restore original PATH
set "PATH=%ORIGINAL_PATH%"

pause