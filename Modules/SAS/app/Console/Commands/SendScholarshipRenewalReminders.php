<?php

namespace Modules\SAS\Console\Commands;

use Illuminate\Console\Command;
use Modules\SAS\Services\ScholarshipRenewalService;

class SendScholarshipRenewalReminders extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'sas:send-renewal-reminders {academic_year} {semester}';

    /**
     * The console command description.
     */
    protected $description = 'Send scholarship renewal reminders to eligible students';

    /**
     * Execute the console command.
     */
    public function handle(ScholarshipRenewalService $service): int
    {
        $academicYear = $this->argument('academic_year');
        $semester = $this->argument('semester');

        $this->info("Finding eligible scholars for {$semester} {$academicYear}...");

        $count = $service->sendRenewalReminders($academicYear, $semester);

        if ($count > 0) {
            $this->info("✓ Sent renewal reminders to {$count} scholars");
        } else {
            $this->warn('No eligible scholars found for renewal');
        }

        return self::SUCCESS;
    }
}
