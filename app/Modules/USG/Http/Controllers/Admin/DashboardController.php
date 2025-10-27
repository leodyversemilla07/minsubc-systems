<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\AnnouncementService;
use App\Modules\USG\Services\EventService;
use App\Modules\USG\Services\OfficerService;
use App\Modules\USG\Services\ResolutionService;
use Inertia\Inertia;
use Inertia\Response;

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
            'resolutions' => $this->resolutionService->getPendingResolutions()->take(5),
        ];

        return Inertia::render('usg/admin/dashboard', [
            'stats' => $stats,
            'recent' => $recent,
            'pending' => $pending,
        ]);
    }
}
