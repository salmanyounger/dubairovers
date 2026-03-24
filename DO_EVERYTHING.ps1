# ============================================================
# RUN THIS IN POWERSHELL INSIDE YOUR ROVERS FOLDER
# Right-click ROVERS folder -> Open PowerShell window here
# Then type:  .\DO_EVERYTHING.ps1
# ============================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " FIXING ALL VERCEL BUILD ERRORS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1 - Delete ALL duplicate folders
Write-Host "STEP 1: Deleting duplicate folders..." -ForegroundColor Yellow

$toDelete = @(
    "app\properties\archai",
    "app\properties\salmanfx",
    "app\properties\webbuilder",
    "app\properties\properties",
    "app\properties\hire",
    "app\properties\components",
    "app\salmanfx\archai",
    "app\salmanfx\salmanfx",
    "app\salmanfx\webbuilder",
    "app\components\archai",
    "app\components\salmanfx",
    "app\components\webbuilder",
    "app\components\hire",
    "app\components\components",
    "app\components\page.js"
)

foreach ($path in $toDelete) {
    if (Test-Path $path) {
        Remove-Item -Recurse -Force $path
        Write-Host "  DELETED: $path" -ForegroundColor Green
    }
}

# Delete ALL curly brace folders anywhere in app
Write-Host ""
Write-Host "Deleting curly brace folders..." -ForegroundColor Yellow
Get-ChildItem -Path "app" -Recurse -Directory -ErrorAction SilentlyContinue | 
    Where-Object { $_.Name -match "^\{" } | 
    ForEach-Object {
        Remove-Item -Recurse -Force $_.FullName -ErrorAction SilentlyContinue
        Write-Host "  DELETED: $($_.Name)" -ForegroundColor Green
    }

Write-Host ""
Write-Host "STEP 2: Pushing to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "fix all vercel errors - remove duplicates"
git push

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " ALL DONE! Check Vercel now!" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
