@echo off
echo ============================================
echo   Full Stack Portfolio Setup
echo ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js found

:: Navigate to backend
echo.
echo Setting up backend...
cd backend

:: Install dependencies
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo [✓] Backend dependencies already installed
)

:: Check if MongoDB is running
echo Checking MongoDB connection...
powershell -Command "try { \$conn = New-Object System.Net.Sockets.TcpClient('localhost',27017); \$conn.Close(); exit 0 } catch { exit 1 }"
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MongoDB doesn't seem to be running on localhost:27017
    echo Please make sure MongoDB is installed and running.
    echo Or update MONGODB_URI in .env to use MongoDB Atlas.
    echo.
    timeout /t 3 >nul
) else (
    echo [✓] MongoDB is running
)

:: Seed database
echo.
echo Seeding database with sample data...
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to seed database
    pause
    exit /b 1
)

cd ..

:: Navigate to frontend
echo.
echo Setting up frontend...
cd frontend

:: Install dependencies
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo [✓] Frontend dependencies already installed
)

cd ..

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo To start the application:
echo.
echo 1. Start MongoDB (if using local):
echo    - Windows: net start MongoDB
echo    - Or run: mongod
echo.
echo 2. Start backend server:
echo    cd backend
echo    npm run dev
echo.
echo 3. In a new terminal, start frontend:
echo    cd frontend
echo    npm run dev
echo.
echo Access your portfolio at: http://localhost:5173
echo.
pause
