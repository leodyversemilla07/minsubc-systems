<?php

// Regenerate all admin controllers from DashboardController.php with proper model imports
// Run: php Modules/Curriculum/split_controllers.php

$baseDir = __DIR__ . '/app/Http/Controllers/Admin';
$content = file_get_contents($baseDir . '/DashboardController.php');

// Map controller class names to the model imports they need
$modelImports = [
    'ProgramController' => "use Modules\\Curriculum\\Models\\Program;",
    'CurriculumController' => "use Modules\\Curriculum\\Models\\Curriculum;\nuse Modules\\Curriculum\\Models\\CurriculumCourse;\nuse Modules\\Curriculum\\Models\\Course;\nuse Modules\\Curriculum\\Models\\Program;",
    'CourseController' => "use Modules\\Curriculum\\Models\\Course;\nuse Modules\\Curriculum\\Models\\Prerequisite;",
    'SyllabusController' => "use Modules\\Curriculum\\Models\\Syllabus;\nuse Modules\\Curriculum\\Models\\CourseOutcome;\nuse Modules\\Curriculum\\Models\\CoPoMapping;\nuse Modules\\Curriculum\\Models\\ProgramOutcome;\nuse Modules\\Curriculum\\Models\\SyllabusTextbook;\nuse Modules\\Curriculum\\Models\\Textbook;\nuse Modules\\Curriculum\\Models\\Course;",
    'TextbookController' => "use Modules\\Curriculum\\Models\\Textbook;",
    'ProgramOutcomeController' => "use Modules\\Curriculum\\Models\\ProgramOutcome;\nuse Modules\\Curriculum\\Models\\Program;",
    'ReportController' => "use Modules\\Curriculum\\Services\\CurriculumService;",
];

preg_match_all('/^(class \w+ .*?)(?=^class |\z)/ms', $content, $matches);

foreach ($matches[1] as $classCode) {
    preg_match('/^class (\w+)/', $classCode, $nameMatch);
    $className = $nameMatch[1];

    $imports = "use App\\Http\\Controllers\\Controller;\nuse Illuminate\\Http\\RedirectResponse;\nuse Illuminate\\Http\\Request;\nuse Inertia\\Response as InertiaResponse;\n";
    if (isset($modelImports[$className])) {
        $imports .= $modelImports[$className] . "\n";
    }

    $newContent = "<?php\n\nnamespace Modules\\Curriculum\\Http\\Controllers\\Admin;\n\n" . $imports . $classCode . "\n";
    file_put_contents($baseDir . '/' . $className . '.php', $newContent);
    echo "Regenerated: $className.php\n";
}

echo "Done\n";