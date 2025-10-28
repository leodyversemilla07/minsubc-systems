<?php

namespace App\Console\Commands;

use App\Modules\USG\Models\Announcement;
use App\Modules\USG\Models\Event;
use Illuminate\Console\Command;

class ArchiveExpiredContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usg:archive-expired {--dry-run : Run without making changes}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Archive expired announcements and past events in the USG module';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->info('🔍 Running in dry-run mode - no changes will be made');
            $this->newLine();
        }

        $this->info('🗄️  Archiving expired USG content...');
        $this->newLine();

        // Archive expired announcements
        $archivedAnnouncementsCount = $this->archiveExpiredAnnouncements($isDryRun);

        // Archive past events
        $archivedEventsCount = $this->archivePastEvents($isDryRun);

        // Display summary
        $this->newLine();
        $this->info('📊 Summary:');
        $this->table(
            ['Content Type', 'Archived Count'],
            [
                ['Announcements', $archivedAnnouncementsCount],
                ['Events', $archivedEventsCount],
                ['Total', $archivedAnnouncementsCount + $archivedEventsCount],
            ]
        );

        if ($isDryRun) {
            $this->warn('⚠️  This was a dry-run. No changes were made.');
            $this->info('Run without --dry-run to archive content.');
        } else {
            $this->info('✅ Archive process completed successfully!');
        }

        return self::SUCCESS;
    }

    /**
     * Archive expired announcements.
     */
    protected function archiveExpiredAnnouncements(bool $isDryRun): int
    {
        $expiredAnnouncements = Announcement::where('status', 'published')
            ->where('expiry_date', '<', now())
            ->whereNotNull('expiry_date')
            ->get();

        $count = $expiredAnnouncements->count();

        if ($count === 0) {
            $this->comment('📢 No expired announcements found.');

            return 0;
        }

        $this->info("📢 Found {$count} expired announcement(s):");

        foreach ($expiredAnnouncements as $announcement) {
            $this->line("   - {$announcement->title} (expired: {$announcement->expiry_date->diffForHumans()})");

            if (! $isDryRun) {
                $announcement->update(['status' => 'archived']);
            }
        }

        if (! $isDryRun) {
            $this->info("   ✓ Archived {$count} announcement(s)");
        }

        return $count;
    }

    /**
     * Archive past events.
     */
    protected function archivePastEvents(bool $isDryRun): int
    {
        $pastEvents = Event::whereIn('status', ['published', 'draft'])
            ->where('end_date', '<', now()->subDays(7)) // Archive events that ended more than 7 days ago
            ->get();

        $count = $pastEvents->count();

        if ($count === 0) {
            $this->comment('📅 No past events to archive.');

            return 0;
        }

        $this->info("📅 Found {$count} past event(s) (ended >7 days ago):");

        foreach ($pastEvents as $event) {
            $this->line("   - {$event->title} (ended: {$event->end_date->diffForHumans()})");

            if (! $isDryRun) {
                $event->update(['status' => 'archived']);
            }
        }

        if (! $isDryRun) {
            $this->info("   ✓ Archived {$count} event(s)");
        }

        return $count;
    }
}
