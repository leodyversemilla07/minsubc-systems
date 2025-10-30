# Fix import placement - move sasRoutes import to proper location

$baseDir = "c:\Users\rheam\XAMPP\htdocs\minsubc-systems\"

$files = @(
    "resources\js\pages\sas\student\scholarships\index.tsx",
    "resources\js\pages\sas\student\scholarships\show.tsx",
    "resources\js\pages\sas\student\insurance\index.tsx",
    "resources\js\pages\sas\student\insurance\create.tsx",
    "resources\js\pages\sas\student\insurance\show.tsx",
    "resources\js\pages\sas\public\organizations\show.tsx",
    "resources\js\pages\sas\public\activities\index.tsx",
    "resources\js\pages\sas\public\activities\calendar.tsx",
    "resources\js\pages\sas\public\activities\show.tsx",
    "resources\js\pages\sas\admin\dashboard.tsx",
    "resources\js\pages\sas\admin\scholarships\index.tsx",
    "resources\js\pages\sas\admin\scholarships\create.tsx",
    "resources\js\pages\sas\admin\scholarships\edit.tsx",
    "resources\js\pages\sas\admin\scholarship-recipients\index.tsx"
)

foreach ($file in $files) {
    $fullPath = Join-Path $baseDir $file
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Remove the import if it's at line 2 (wrong place)
        $content = $content -replace "^(import .+;\r?\n)import sasRoutes from '@/routes/sas';\r?\n", "`$1"
        
        # Add it back in the right place (after all other imports, before first blank line or type/interface)
        if ($content -notmatch "import sasRoutes from '@/routes/sas'") {
            # Find the last import statement
            $content = $content -replace "(import[^;]+;\r?\n)(\r?\n)", "`$1import sasRoutes from '@/routes/sas';`r`n`$2"
        }
        
        Set-Content $fullPath -Value $content -NoNewline
        Write-Host "Fixed imports: $file"
    }
}

Write-Host ""
Write-Host "Import placement fixed!"
