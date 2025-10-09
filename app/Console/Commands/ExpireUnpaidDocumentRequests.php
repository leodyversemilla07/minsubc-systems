<?php

namespace App\Console\Commands;

use App\Modules\Registrar\Models\DocumentRequest;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ExpireUnpaidDocumentRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:expire-unpaid-document-requests {--dry-run : Show what would be expired without actually expiring}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Expire unpaid document requests that have passed their payment deadline';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');

        // Find all pending payment requests where deadline has passed
        $expiredRequests = DocumentRequest::where('status', 'pending_payment')
            ->where('payment_deadline', '<', now())
            ->with('student.user')
            ->get();

        if ($expiredRequests->isEmpty()) {
            $this->info('No expired unpaid document requests found.');

            return;
        }

        $this->info("Found {$expiredRequests->count()} expired unpaid document requests.");

        if ($isDryRun) {
            $this->warn('DRY RUN MODE - No changes will be made.');
            $this->table(
                ['Request #', 'Student', 'Deadline', 'Created'],
                $expiredRequests->map(function ($request) {
                    return [
                        $request->request_number,
                        $request->student->user->full_name ?? 'Unknown',
                        $request->payment_deadline->format('Y-m-d H:i'),
                        $request->created_at->format('Y-m-d H:i'),
                    ];
                })
            );

            return;
        }

        $expiredCount = 0;
        foreach ($expiredRequests as $request) {
            $request->update(['status' => 'payment_expired']);

            Log::info('Document request expired due to payment deadline', [
                'request_id' => $request->id,
                'request_number' => $request->request_number,
                'student_id' => $request->student_id,
                'payment_deadline' => $request->payment_deadline,
            ]);

            $expiredCount++;
        }

        $this->info("Successfully expired {$expiredCount} document requests.");
    }
}
