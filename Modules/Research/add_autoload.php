<?php
$file = 'vendor/composer/autoload_psr4.php';
$content = file_get_contents($file);

$newEntries = <<<'EOT'
    'Modules\\Research\\Tests\\' => array($baseDir . '/Modules/Research/tests'),
    'Modules\\Research\\Database\\Seeders\\' => array($baseDir . '/Modules/Research/database/seeders'),
    'Modules\\Research\\Database\\Factories\\' => array($baseDir . '/Modules/Research/database/factories'),
    'Modules\\Research\\' => array($baseDir . '/Modules/Research/app'),

EOT;

$content = str_replace(
    "'Modules\\Registrar\\' => array(\$baseDir . '/Modules/Registrar/app'),\n    'Modules\\Library\\Tests\\' => array(\$baseDir . '/Modules/Library/tests'),",
    "'Modules\\Registrar\\' => array(\$baseDir . '/Modules/Registrar/app'),\n" . $newEntries . "    'Modules\\Library\\Tests\\' => array(\$baseDir . '/Modules/Library/tests'),",
    $content
);

file_put_contents($file, $content);
echo "Done\n";