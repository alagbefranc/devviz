@echo off
echo 🔧 Node.js Version Manager for DevViz Platform
echo =====================================
echo.
echo Available Node.js versions:
echo   1. Node.js v18.20.4 (LTS) - Recommended for DevViz
echo   2. Node.js v25.0.0 (Current) - May have compatibility issues
echo.
echo Current versions:
echo   System Node.js:
node --version 2>nul || echo     Not available
echo   System npm:
npm --version 2>nul || echo     Not available
echo   Node.js 18: D:\nodejs18\node.exe
"D:\nodejs18\node.exe" --version 2>nul || echo     Not available
echo   npm 18: D:\nodejs18\npm.cmd
"D:\nodejs18\npm.cmd" --version 2>nul || echo     Not available
echo.
echo Usage:
echo   use_node18.bat    - Switch to Node.js 18 and start DevViz
echo   use_node25.bat    - Switch back to Node.js 25 (system default)
echo.

pause