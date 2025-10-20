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

    public function category(string $category)
    {
        $announcements = $this->announcementService->searchAnnouncements('', [
            'category' => $category,
        ]);

        $categories = $this->announcementService->getCategories();
        $featured = $this->announcementService->getFeaturedAnnouncements(3);

        return Inertia::render('usg/public/announcements/index', [
            'announcements' => $announcements,
            'categories' => $categories,
            'featured' => $featured,
            'filters' => [
                'category' => $category,
            ],
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->get('q', '');

        $announcements = $this->announcementService->searchAnnouncements($query, [
            'limit' => 20,
        ]);

        $categories = $this->announcementService->getCategories();

        return Inertia::render('usg/public/search', [
            'query' => $query,
            'announcements' => $announcements,
            'categories' => $categories,
        ]);
    }

    public function searchSuggestions(Request $request)
    {
        $query = $request->get('q', '');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $suggestions = $this->announcementService->searchAnnouncements($query, [
            'limit' => 5,
        ]);

        return response()->json(
            $suggestions->map(function ($announcement) {
                return [
                    'id' => $announcement->id,
                    'title' => $announcement->title,
                    'slug' => $announcement->slug,
                    'category' => $announcement->category,
                ];
            })
        );
    }
}
