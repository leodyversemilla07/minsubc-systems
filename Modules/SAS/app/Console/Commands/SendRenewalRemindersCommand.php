<?php

declare(strict_types=1);

namespace Modules\SAS\Console\Commands;

use Illuminate\Console\Command;
use Modules\SAS\Services\ScholarshipRenewalService;

class SendRenewalRemindersCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'sas:send-renewal-reminders
                            {academic_year : The target academic year for renewal}
                            {semester : The target semester for renewal}';

    /**
     * The console command description.
     */
    protected $description = 'Send scholarship renewal reminders to eligible scholars';

    /**
     * Execute the console command.
     */
    public function handle(ScholarshipRenewalService $service): int
    {
        $academicYear = $this->argument('academic_year');
        $semester = $this->argument('semester');

        $this->info("Sending renewal reminders for {$academicYear}, {$semester}...");

        $count = $service->sendRenewalReminders($academicYear, $semester);

        $this->info("Sent {$count} renewal reminders successfully.");

        return self::SUCCESS;
    }
}
