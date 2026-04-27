#!/usr/bin/env pwsh

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Full Stack Portfolio Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "[✓] Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed." -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Backend setup
Write-Host ""
Write-Host "Setting up backend..." -ForegroundColor Yellow
Set-Location backend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[✓] Backend dependencies already installed" -ForegroundColor Green
}

# Check MongoDB
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $conn = New-Object System.Net.Sockets.TcpClient('localhost', 27017)
    $conn.Close()
    Write-Host "[✓] MongoDB is running" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] MongoDB doesn't seem to be running on localhost:27017" -ForegroundColor Yellow
    Write-Host "Please make sure MongoDB is installed and running." -ForegroundColor Yellow
    Write-Host "Or update MONGODB_URI in backend/.env to use MongoDB Atlas." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
}

# Seed database
Write-Host ""
Write-Host "Seeding database with sample data..." -ForegroundColor Yellow
npm run seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to seed database" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Frontend setup
Write-Host ""
Write-Host "Setting up frontend..." -ForegroundColor Yellow
Set-Location frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[✓] Frontend dependencies already installed" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Start MongoDB (if using local):" -ForegroundColor White
Write-Host "   - Windows: net start MongoDB" -ForegroundColor Gray
Write-Host "   - Or run: mongod" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start backend server:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. In a new terminal, start frontend:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Access your portfolio at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to continue..."
