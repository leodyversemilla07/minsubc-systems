# Fix parameter names to use snake_case as required by Wayfinder

$baseDir = "c:\Users\rheam\XAMPP\htdocs\minsubc-systems\"

# Fix scholarship_recipient parameters (not scholarshipRecipient)
$file = Join-Path $baseDir "resources\js\pages\sas\admin\scholarship-recipients\index.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "scholarshipRecipient: id", "scholarship_recipient: id"
$content = $content -replace "scholarshipRecipient: recipient\.id", "scholarship_recipient: recipient.id"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: scholarship-recipients/index.tsx parameter names"

# Fix query parameter in scholarships index (should use query not object key)
$file = Join-Path $baseDir "resources\js\pages\sas\admin\scholarships\index.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "sasRoutes\.admin\.scholarshipRecipients\.index\.url\(\{ scholarship_id: scholarship\.id \}\)", "sasRoutes.admin.scholarshipRecipients.index.url({ query: { scholarship_id: scholarship.id } })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed: scholarships/index.tsx query parameter"

Write-Host ""
Write-Host "Parameter names fixed!"
