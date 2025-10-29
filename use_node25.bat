@echo off
echo 🔄 Switching back to Node.js 25 (System Default)
echo.

REM Reset to system PATH (remove Node.js 18)
set "PATH=%PATH:D:\nodejs18;=%"
set "PATH=%PATH:D:\nodejs18\node_modules\.bin;=%"
set NODE_PATH=

echo ✅ Current Node.js version:
node --version

echo ✅ Current npm version:
npm --version

echo.
echo ⚠️  Node.js 25 may have compatibility issues with some packages
echo 💡 Use Node.js 18 for DevViz Platform development
echo.

pause