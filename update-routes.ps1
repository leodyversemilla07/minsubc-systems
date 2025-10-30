# Bulk update SAS pages to use Wayfinder routes instead of Ziggy

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
        Write-Host "Processing: $file"
        
        # Read file
        $content = Get-Content $fullPath -Raw
        
        # Add import if not already present
        if ($content -notmatch "import sasRoutes from '@/routes/sas'") {
            # Find first import line and add after it
            $content = $content -replace "^(import .+;\r?\n)", "`$1import sasRoutes from '@/routes/sas';`r`n"
        }
        
        # Replace route patterns - use simpler replacements
        $content = $content -replace "\(window as any\)\.route\('sas\.index'\)", "sasRoutes.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.organizations\.index'\)", "sasRoutes.organizations.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.activities\.index'\)", "sasRoutes.activities.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.activities\.calendar'\)", "sasRoutes.activities.calendar.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.student\.scholarships\.index'\)", "sasRoutes.student.scholarships.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.student\.insurance\.index'\)", "sasRoutes.student.insurance.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.student\.insurance\.create'\)", "sasRoutes.student.insurance.create.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.student\.insurance\.store'\)", "sasRoutes.student.insurance.store.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarships\.index'\)", "sasRoutes.admin.scholarships.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarships\.create'\)", "sasRoutes.admin.scholarships.create.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarships\.store'\)", "sasRoutes.admin.scholarships.store.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarship-recipients\.index'\)", "sasRoutes.admin.scholarshipRecipients.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarship-recipients\.create'\)", "sasRoutes.admin.scholarshipRecipients.create.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.insurance\.index'\)", "sasRoutes.admin.insurance.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.organizations\.create'\)", "sasRoutes.admin.organizations.create.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.activities\.create'\)", "sasRoutes.admin.activities.create.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.documents\.index'\)", "sasRoutes.admin.documents.index.url()"
        $content = $content -replace "\(window as any\)\.route\('sas\.admin\.documents\.upload'\)", "sasRoutes.admin.documents.upload()"
        
        # Write back
        Set-Content $fullPath -Value $content -NoNewline
        Write-Host "  Updated"
    } else {
        Write-Host "  File not found: $fullPath"
    }
}

Write-Host ""
Write-Host "All files processed!"
