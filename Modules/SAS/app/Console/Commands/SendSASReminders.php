<?php

namespace Modules\SAS\Console\Commands;

use Illuminate\Console\Command;
use Modules\SAS\Services\SASNotificationService;

class SendSASReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sas:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send SAS reminders for scholarships, insurance, and requirements';

    /**
     * Execute the console command.
     */
    public function handle(SASNotificationService $notificationService): int
    {
        $this->info('Sending SAS reminders...');

        // Send requirement deadline reminders (7 days before)
        $requirementCount = $notificationService->sendRequirementDeadlineReminders(7);
        $this->info("Sent {$requirementCount} requirement deadline reminders.");

        // Send insurance expiration warnings (30 and 7 days before)
        $insuranceCount = $notificationService->sendInsuranceExpirationWarnings();
        $this->info("Sent {$insuranceCount} insurance expiration warnings.");

        // Send scholarship renewal reminders (30 days before)
        $renewalCount = $notificationService->sendScholarshipRenewalReminders(30);
        $this->info("Sent {$renewalCount} scholarship renewal reminders.");

        $totalSent = $requirementCount + $insuranceCount + $renewalCount;
        $this->info("Total reminders sent: {$totalSent}");

        return Command::SUCCESS;
    }
}
