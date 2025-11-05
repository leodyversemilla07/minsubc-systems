<?php

namespace Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Services\AnnouncementService;
use Modules\USG\Services\EventService;
use Modules\USG\Services\OfficerService;
use Modules\USG\Services\ResolutionService;

class DashboardController extends Controller
{
    public function __construct(
        private AnnouncementService $announcementService,
        private EventService $eventService,
        private OfficerService $officerService,
        private ResolutionService $resolutionService
    ) {}

    public function index(): Response
    {
        $stats = [
            'announcements' => $this->announcementService->getStatistics(),
            'events' => $this->eventService->getStatistics(),
            'resolutions' => $this->resolutionService->getStatistics(),
        ];

        $recent = [
            'announcements' => $this->announcementService->getRecentAnnouncements(5),
            'events' => $this->eventService->getUpcomingEvents(5),
            'resolutions' => $this->resolutionService->getRecentResolutions(5),
        ];

        $pending = [
            'announcements' => $this->announcementService->getPendingAnnouncements(5),
            'events' => $this->eventService->getPendingEvents(5),
        ];

        return Inertia::render('usg/admin/dashboard', [
            'stats' => $stats,
            'recent' => $recent,
            'pending' => $pending,
        ]);
    }
}
