<?php
$file = 'vendor/composer/autoload_static.php';
$content = file_get_contents($file);

$new = <<<'EOT'
        'Modules\\Research\\Tests\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Modules/Research/tests',
        ),
        'Modules\\Research\\Database\\Seeders\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Modules/Research/database/seeders',
        ),
        'Modules\\Research\\Database\\Factories\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Modules/Research/database/factories',
        ),
        'Modules\\Research\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Modules/Research/app',
        ),
EOT;

$search = "'Modules\\Registrar\\' =>";
$pos = strpos($content, $search);
if ($pos !== false) {
    $insertPos = strpos($content, ')', $pos) + 3; // after the ")," for Registrar
    $content = substr($content, 0, $insertPos) . "\n" . $new . "\n" . substr($content, $insertPos);
    file_put_contents($file, $content);
    echo "Done\n";
} else {
    echo "Not found\n";
}