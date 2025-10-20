<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Http\Requests\StoreAnnouncementRequest;
use App\Modules\USG\Http\Requests\UpdateAnnouncementRequest;
use App\Modules\USG\Services\AnnouncementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function __construct(private AnnouncementService $announcementService) {}

    public function index(Request $request)
    {
        $search = $request->get('search');
        $status = $request->get('status');
        $category = $request->get('category');

        if ($search || $status || $category) {
            $announcements = $this->announcementService->searchAnnouncements($search ?? '', [
                'status' => $status,
                'category' => $category,
            ]);
        } else {
            $announcements = $this->announcementService->getAllPaginated(15);
        }

        $categories = $this->announcementService->getCategories();
        $statistics = $this->announcementService->getStatistics();

        return Inertia::render('usg/admin/announcements/index', [
            'announcements' => $announcements,
            'categories' => $categories,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'category' => $category,
            ],
        ]);
    }

    public function create()
    {
        $categories = $this->announcementService->getCategories();

        return Inertia::render('usg/admin/announcements/create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreAnnouncementRequest $request)
    {
        $announcement = $this->announcementService->create(
            $request->validated(),
            Auth::id()
        );

        return redirect()
            ->route('usg.admin.announcements.index')
            ->with('success', 'Announcement created successfully.');
    }

    public function show(int $id)
    {
        $announcement = $this->announcementService->getById($id);

        return Inertia::render('usg/admin/announcements/show', [
            'announcement' => $announcement,
        ]);
    }

    public function edit(int $id)
    {
        $announcement = $this->announcementService->getById($id);
        $categories = $this->announcementService->getCategories();

        return Inertia::render('usg/admin/announcements/edit', [
            'announcement' => $announcement,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateAnnouncementRequest $request, int $id)
    {
        $announcement = $this->announcementService->getById($id);

        $this->announcementService->update(
            $announcement,
            $request->validated()
        );

        return redirect()
            ->route('usg.admin.announcements.index')
            ->with('success', 'Announcement updated successfully.');
    }

    public function destroy(int $id)
    {
        $announcement = $this->announcementService->getById($id);
        $this->announcementService->delete($announcement);

        return redirect()
            ->route('usg.admin.announcements.index')
            ->with('success', 'Announcement deleted successfully.');
    }

    public function publish(int $id)
    {
        $announcement = $this->announcementService->getById($id);
        $this->announcementService->publish($announcement);

        return back()->with('success', 'Announcement published successfully.');
    }

    public function unpublish(int $id)
    {
        $announcement = $this->announcementService->getById($id);
        $this->announcementService->unpublish($announcement);

        return back()->with('success', 'Announcement unpublished successfully.');
    }
}
