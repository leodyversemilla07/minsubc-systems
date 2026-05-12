<?php

// Extract admin controllers from DashboardController.php into individual files
$baseDir = __DIR__ . '/app/Http/Controllers/Admin';
$content = file_get_contents($baseDir . '/DashboardController.php');

$modelImports = [
    'ResearchTypeController' => "use Modules\\Research\\Models\\ResearchType;",
    'ProposalController' => "use Modules\\Research\\Models\\Proposal;\nuse Modules\\Research\\Models\\Author;\nuse Modules\\Research\\Models\\ResearchType;",
    'PanelController' => "use Modules\\Research\\Models\\Panel;",
    'DefenseController' => "use Modules\\Research\\Models\\Defense;\nuse Modules\\Research\\Models\\DefenseScore;\nuse Modules\\Research\\Models\\Proposal;",
    'GradeReportController' => "use Modules\\Research\\Models\\GradeReport;\nuse Modules\\Research\\Models\\Proposal;",
    'PublicationController' => "use Modules\\Research\\Models\\Publication;\nuse Modules\\Research\\Models\\PublicationAuthor;\nuse Modules\\Research\\Models\\Proposal;",
    'JournalController' => "use Modules\\Research\\Models\\Journal;\nuse Modules\\Research\\Models\\JournalIssue;",
    'JournalIssueController' => "use Modules\\Research\\Models\\JournalIssue;",
    'ReportController' => "use Modules\\Research\\Services\\ResearchService;",
];

preg_match_all('/^(class \w+ .*?)(?=^class |\z)/ms', $content, $matches);

foreach ($matches[1] as $classCode) {
    preg_match('/^class (\w+)/', $classCode, $nameMatch);
    $className = $nameMatch[1];

    $imports = "use App\\Http\\Controllers\\Controller;\nuse Illuminate\\Http\\RedirectResponse;\nuse Illuminate\\Http\\Request;\nuse Inertia\\Response as InertiaResponse;\n";
    if (isset($modelImports[$className])) {
        $imports .= $modelImports[$className] . "\n";
    }

    $newContent = "<?php\n\nnamespace Modules\\Research\\Http\\Controllers\\Admin;\n\n" . $imports . $classCode . "\n";
    file_put_contents($baseDir . '/' . $className . '.php', $newContent);
    echo "Created: $className.php\n";
}

echo "Done\n";