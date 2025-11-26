Write-Host "==========================================" -ForegroundColor Green
Write-Host "Student Registration System" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Please ensure MongoDB is running before proceeding." -ForegroundColor Yellow
Write-Host ""

Write-Host "Starting all services..." -ForegroundColor Cyan
Write-Host ""

# Start all services using npm
npm start

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")