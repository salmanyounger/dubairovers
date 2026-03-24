# ================================================
# PASTE THIS IN GIT BASH:
# powershell -ExecutionPolicy Bypass -File FIX_ALL.ps1
# ================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " FIXING ALL ERRORS AUTOMATICALLY" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan

# ── FIX 1: Walking admin import ──
Write-Host "`nFix 1: Walking admin import..." -ForegroundColor Yellow
$file1 = "app\tours\walking\admin\page.js"
if (Test-Path $file1) {
    $content = Get-Content $file1 -Raw
    $fixed = $content -replace "from '../../data/walking-routes'", "from '../data/walking-routes'"
    $fixed = $fixed -replace 'from "../../data/walking-routes"', 'from "../data/walking-routes"'
    Set-Content $file1 -Value $fixed -NoNewline
    Write-Host "  FIXED: $file1" -ForegroundColor Green
}

# ── FIX 2: Properties [id] syntax error - missing </> ──
Write-Host "`nFix 2: Properties [id] syntax error..." -ForegroundColor Yellow
$file2 = "app\properties\[id]\page.js"
if (Test-Path $file2) {
    $content = Get-Content $file2 -Raw
    # Fix missing </> closing fragment tag
    $fixed = $content -replace "    </div>`n  \);`n`n  const unit", "    </div>`n    </>`n  );`n`n  const unit"
    Set-Content $file2 -Value $fixed -NoNewline
    Write-Host "  FIXED: $file2" -ForegroundColor Green
}

# ── FIX 3: Delete remaining duplicate folders ──
Write-Host "`nFix 3: Deleting duplicate folders..." -ForegroundColor Yellow

$toDelete = @(
    "app\properties\properties",
    "app\properties\archai",
    "app\properties\salmanfx",
    "app\properties\webbuilder",
    "app\properties\hire",
    "app\properties\components",
    "app\salmanfx\salmanfx",
    "app\salmanfx\archai",
    "app\salmanfx\webbuilder",
    "app\components\archai",
    "app\components\salmanfx",
    "app\components\webbuilder",
    "app\components\hire",
    "app\components\components"
)

foreach ($path in $toDelete) {
    if (Test-Path $path) {
        Remove-Item -Recurse -Force $path
        Write-Host "  DELETED: $path" -ForegroundColor Green
    }
}

# Delete any curly brace folders
Get-ChildItem -Path "app" -Recurse -Directory -ErrorAction SilentlyContinue | 
    Where-Object { $_.Name -match "^\{" } | 
    ForEach-Object {
        Remove-Item -Recurse -Force $_.FullName -ErrorAction SilentlyContinue
        Write-Host "  DELETED bad folder: $($_.Name)" -ForegroundColor Green
    }

# ── PUSH TO GITHUB ──
Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "fix all vercel build errors final"
git push

Write-Host "`n========================================" -ForegroundColor Green
Write-Host " ALL DONE! Check Vercel now!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
