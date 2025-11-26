@echo off
TITLE Student Registration System - Starting All Services

echo ==========================================
echo Student Registration System
echo ==========================================
echo.

echo Please ensure MongoDB is running before proceeding.
echo.
echo Starting all services...
echo.

REM Start all services using npm
npm start

echo.
echo Press any key to exit...
pause >nul