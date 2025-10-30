# Fix parameterized routes

$baseDir = "c:\Users\rheam\XAMPP\htdocs\minsubc-systems\"

# Fix student scholarships show - upload-requirement
$file = Join-Path $baseDir "resources\js\pages\sas\student\scholarships\show.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\('sas\.student\.scholarships\.upload-requirement',\s*recipient\.id\)", "sasRoutes.student.scholarships.uploadRequirement.url({ scholarshipRecipient: recipient.id })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: student/scholarships/show.tsx"

# Fix student scholarships index - show link
$file = Join-Path $baseDir "resources\js\pages\sas\student\scholarships\index.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.student\.scholarships\.show',\s*scholarship\.id\s*\)", "sasRoutes.student.scholarships.show.url({ scholarshipRecipient: scholarship.id })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: student/scholarships/index.tsx"

# Fix student insurance index - show link
$file = Join-Path $baseDir "resources\js\pages\sas\student\insurance\index.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.student\.insurance\.show',\s*insurance\.id\s*\)", "sasRoutes.student.insurance.show.url({ insurance: insurance.id })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: student/insurance/index.tsx"

# Fix public activities calendar - show link
$file = Join-Path $baseDir "resources\js\pages\sas\public\activities\calendar.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\('sas\.activities\.show',\s*activity\.slug\)", "sasRoutes.activities.show.url({ slug: activity.slug })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: public/activities/calendar.tsx"

# Fix public activities index - show links  
$file = Join-Path $baseDir "resources\js\pages\sas\public\activities\index.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.activities\.show',\s*activity\.slug\s*\)", "sasRoutes.activities.show.url({ slug: activity.slug })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: public/activities/index.tsx"

# Fix public activities show - calendar link
$file = Join-Path $baseDir "resources\js\pages\sas\public\activities\show.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.activities\.show',\s*doc\.activity\.slug\s*\)", "sasRoutes.activities.show.url({ slug: doc.activity.slug })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: public/activities/show.tsx"

# Fix admin dashboard - task.url
$file = Join-Path $baseDir "resources\js\pages\sas\admin\dashboard.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\(task\.url\)", "task.url"
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.admin\.scholarship-recipients\.index'\s*\)", "sasRoutes.admin.scholarshipRecipients.index.url()"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: admin/dashboard.tsx"

# Fix admin scholarships index - edit and recipients links
$file = Join-Path $baseDir "resources\js\pages\sas\admin\scholarships\index.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarships\.destroy',\s*id\)", "sasRoutes.admin.scholarships.destroy.url({ scholarship: id })"
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.admin\.scholarships\.edit',\s*scholarship\.id\s*\)", "sasRoutes.admin.scholarships.edit.url({ scholarship: scholarship.id })"
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.admin\.scholarship-recipients\.index',\s*\{.*\}\s*\)", "sasRoutes.admin.scholarshipRecipients.index.url({ scholarship_id: scholarship.id })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: admin/scholarships/index.tsx"

# Fix admin scholarships edit - update route
$file = Join-Path $baseDir "resources\js\pages\sas\admin\scholarships\edit.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarships\.update',\s*scholarship\.id\)", "sasRoutes.admin.scholarships.update.url({ scholarship: scholarship.id })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: admin/scholarships/edit.tsx"

# Fix admin scholarship-recipients index
$file = Join-Path $baseDir "resources\js\pages\sas\admin\scholarship-recipients\index.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\(window as any\)\.route\('sas\.admin\.scholarship-recipients\.destroy',\s*id\)", "sasRoutes.admin.scholarshipRecipients.destroy.url({ scholarshipRecipient: id })"
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.admin\.scholarship-recipients\.create'\s*\)", "sasRoutes.admin.scholarshipRecipients.create.url()"
$content = $content -replace "\(window as any\)\.route\(\s*'sas\.admin\.scholarship-recipients\.edit',\s*recipient\.id\s*\)", "sasRoutes.admin.scholarshipRecipients.edit.url({ scholarshipRecipient: recipient.id })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: admin/scholarship-recipients/index.tsx"

Write-Host ""
Write-Host "All parameterized routes fixed!"
