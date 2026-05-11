<?php
$content = file_get_contents(__DIR__ . '/app/Http/Controllers/Admin/DashboardController.php');
$lines = file(__DIR__ . '/app/Http/Controllers/Admin/DashboardController.php');

// Extract use statements from header
$uses = [];
$inPhp = false;
foreach ($lines as $line) {
    $trimmed = trim($line);
    if (str_starts_with($trimmed, 'use ') && str_ends_with($trimmed, ';')) {
        $uses[] = $trimmed;
    }
}
$useBlock = implode("\n", $uses);

// Get class ranges
$classRanges = [];
$currentClass = null;
$currentStart = 0;
foreach ($lines as $i => $line) {
    if (preg_match('/^class ([a-zA-Z]+) extends/', $line, $m)) {
        if ($currentClass) {
            $classRanges[$currentClass] = ['start' => $currentStart, 'end' => $i - 1];
        }
        $currentClass = $m[1];
        $currentStart = $i;
    }
}
if ($currentClass) {
    $classRanges[$currentClass] = ['start' => $currentStart, 'end' => count($lines) - 1];
}

$namespace = "Modules\\Guidance\\Http\\Controllers\\Admin";
$baseDir = __DIR__ . '/app/Http/Controllers/Admin';

foreach ($classRanges as $name => $range) {
    if ($name === 'DashboardController') continue;
    $classContent = '';
    for ($i = $range['start']; $i <= $range['end']; $i++) {
        $classContent .= $lines[$i];
    }
    $fileContent = "<?php\n\nnamespace {$namespace};\n\n{$useBlock}\n\n{$classContent}";
    file_put_contents("{$baseDir}/{$name}.php", $fileContent);
    echo "Created: {$name}.php\n";
}
echo "Done\n";