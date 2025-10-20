<?php

namespace App\Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\AnnouncementService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicAnnouncementController extends Controller
{
    public function __construct(private AnnouncementService $announcementService) {}

    public function index(Request $request)
    {
        $search = $request->get('search');
        $category = $request->get('category');

        if ($search || $category) {
            $announcements = $this->announcementService->searchAnnouncements($search ?? '', [
                'category' => $category,
            ]);
        } else {
            $announcements = $this->announcementService->getPublishedAnnouncements(12);
        }

        $categories = $this->announcementService->getCategories();
        $featured = $this->announcementService->getFeaturedAnnouncements(3);

        return Inertia::render('usg/public/announcements/index', [
            'announcements' => $announcements,
            'categories' => $categories,
            'featured' => $featured,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    public function show(string $slug)
    {
        $announcement = $this->announcementService->getBySlug($slug);

        if (! $announcement) {
            abort(404, 'Announcement not found');
        }

        // Increment view count
        $this->announcementService->incrementViewsById($announcement->id);

        $related = $this->announcementService->getRelatedAnnouncements($announcement, 3);

        return Inertia::render('usg/public/announcements/show', [
            'announcement' => $announcement,
            'related' => $related,
        ]);
    }
}
