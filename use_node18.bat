@echo off
echo 🚀 Switching to Node.js 18 LTS for DevViz Platform
echo.

REM Set Node.js 18 environment
set "PATH=D:\nodejs18;D:\nodejs18\node_modules\.bin;%PATH%"
set "NODE_PATH=D:\nodejs18\node_modules"

echo ✅ Node.js version:
node --version

echo ✅ npm version:
npm --version

echo.
echo 🎯 Now installing dependencies with Node.js 18...
echo.

REM Clean existing node_modules if they exist
if exist "node_modules" (
    echo 🗑️ Cleaning existing node_modules...
    rmdir /s /q node_modules
)

if exist "frontend\node_modules" (
    echo 🗑️ Cleaning frontend node_modules...
    rmdir /s /q frontend\node_modules
)

if exist "ai-api\node_modules" (
    echo 🗑️ Cleaning ai-api node_modules...
    rmdir /s /q ai-api\node_modules
)

REM Clear npm cache
echo 🧹 Clearing npm cache...
npm cache clean --force

REM Install dependencies
echo 📦 Installing root dependencies...
call npm install --legacy-peer-deps

echo 📦 Installing frontend dependencies...
cd frontend
call npm install --legacy-peer-deps
cd ..

echo 📦 Installing AI API dependencies...
cd ai-api
call npm install --legacy-peer-deps
cd ..

echo.
echo 🎉 Dependencies installed successfully!
echo.
echo 🚀 Starting DevViz Platform...
echo 📱 Frontend: http://localhost:4200
echo 🤖 AI API: http://localhost:3001
echo.

REM Start the development servers
call npm run dev

pause