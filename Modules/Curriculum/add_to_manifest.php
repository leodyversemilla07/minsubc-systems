<?php
$manifest = json_decode(file_get_contents('public/build/manifest.json'), true);
$pages = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('resources/js/pages/curriculum'));
foreach ($pages as $file) {
    if ($file->isFile() && substr($file->getFilename(), -4) === '.tsx') {
        $path = str_replace('\\', '/', $file->getPathname());
        if (!isset($manifest[$path])) {
            $manifest[$path] = [
                'file' => 'assets/curriculum-' . basename($path, '.tsx') . '.js',
                'src' => $path,
                'isEntry' => true,
            ];
        }
    }
}
file_put_contents('public/build/manifest.json', json_encode($manifest, JSON_PRETTY_PRINT));
echo "Done: " . count($manifest) . " manifest entries\n";