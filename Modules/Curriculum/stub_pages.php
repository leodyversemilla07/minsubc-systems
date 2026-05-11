<?php

$paths = [
    'curriculum/index',
    'curriculum/programs',
    'curriculum/courses',
    'curriculum/syllabi/view',
    'curriculum/admin/dashboard/index',
    'curriculum/admin/programs/index',
    'curriculum/admin/programs/create',
    'curriculum/admin/programs/edit',
    'curriculum/admin/courses/index',
    'curriculum/admin/courses/create',
    'curriculum/admin/courses/edit',
    'curriculum/admin/curricula/index',
    'curriculum/admin/curricula/create',
    'curriculum/admin/curricula/show',
    'curriculum/admin/syllabi/index',
    'curriculum/admin/syllabi/create',
    'curriculum/admin/syllabi/show',
    'curriculum/admin/textbooks/index',
    'curriculum/admin/textbooks/create',
    'curriculum/admin/textbooks/edit',
    'curriculum/admin/learning-outcomes/index',
    'curriculum/admin/reports/index',
    'curriculum/admin/reports/curriculum-map',
    'curriculum/admin/reports/syllabus-status',
];

$base = 'resources/js/pages/';
foreach ($paths as $path) {
    $parts = explode('/', $path);
    $last = array_pop($parts);
    $segment = end($parts);
    $name = end($parts) ?: 'Index';
    $title = ucwords(str_replace(['-', '_'], ' ', basename($path)));

    $dir = dirname($base . $path);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $componentName = $title === 'Index' ? ucwords(str_replace(['-', '_'], ' ', $segment)) . 'Page' : str_replace(' ', '', $title);
    $heading = $title;

    $code = "import React from 'react';\n\nexport default function {$componentName}() {\n  return (\n    <div className=\"p-6\">\n      <h1 className=\"text-2xl font-bold\">{$heading}</h1>\n    </div>\n  );\n}\n";
    file_put_contents($base . $path . '.tsx', $code);
    echo "Created: $path.tsx\n";
}
echo "Done\n";