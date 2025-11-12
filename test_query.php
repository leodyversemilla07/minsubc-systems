<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo 'Testing Organization query...'.PHP_EOL;

try {
    $orgs = \Modules\SAS\app\Models\Organization::where('status', 'Active')
        ->withCount(['members', 'officers'])
        ->orderBy('organization_name')
        ->limit(6)
        ->get();

    echo '✓ Success! Found '.$orgs->count().' organizations.'.PHP_EOL;
    echo '✓ The database issue has been resolved!'.PHP_EOL;
} catch (\Exception $e) {
    echo '✗ Error: '.$e->getMessage().PHP_EOL;
}
