@echo off
echo 🚀 Installing REAL DevViz Platform
echo ===============================
echo.

REM Check administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Run as Administrator required!
    echo Right-click this file and "Run as administrator"
    pause
    exit /b 1
)

echo ✅ Administrator confirmed
echo.

REM Set Node.js 18
set "PATH=D:\nodejs18;%PATH%"
set "NODE_PATH=D:\nodejs18\node_modules"

echo 🔧 Using Node.js:
node --version
echo.

REM Use Windows-specific approach
echo 📦 Installing with Windows compatibility...
echo.

REM Try installing with Windows-specific workarounds
npm install --legacy-peer-deps --force --no-audit --no-fund --no-package-lock

if %errorLevel% neq 0 (
    echo ⚠️ Standard install failed, trying alternative...

    REM Try installing globally first
    npm install --global --force concurrently

    REM Try installing key packages individually
    echo Installing core packages...
    npm install --no-save express
    npm install --no-save @supabase/supabase-js

    REM Try Angular CLI
    npm install --no-save @angular/cli
    npm install --no-save @angular/core
    npm install --no-save @angular/common

    REM Try Next.js
    npm install --no-save next
    npm install --no-save react

    echo 🔧 Attempting to start app...
    call npm start
) else (
    echo ✅ Installation successful!
    echo.
    echo 🚀 Starting DevViz Platform...
    call npm run dev
)

pause