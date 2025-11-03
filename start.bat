@echo off

echo Starting backend server...
cd backend
start /B cmd /c "npm run dev"

timeout /t 2 /nobreak >nul

echo Starting frontend server...
cd ..\frontend
start /B cmd /c "npm run dev"

echo.
echo =========================================
echo Image Chatroom Application Started!
echo =========================================
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo =========================================
echo.
echo Press Ctrl+C to stop both servers
echo.

pause
