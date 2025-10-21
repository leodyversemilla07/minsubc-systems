<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\OfficerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficerController extends Controller
{
    public function __construct(private OfficerService $officerService) {}

    public function index()
    {
        $officers = $this->officerService->getPaginatedOfficers();

        return Inertia::render('usg/admin/officers/index', [
            'officers' => $officers,
        ]);
    }

    public function create()
    {
        return Inertia::render('usg/admin/officers/create', [
            'departments' => $this->officerService->getDepartments(),
            'positions' => $this->officerService->getPositions(),
        ]);
    }

    public function store(Request $request)
    {
        $officer = $this->officerService->create($request->validated());

        return redirect()
            ->route('usg.admin.officers.index')
            ->with('success', 'Officer added successfully.');
    }

    public function edit(int $id)
    {
        $officer = $this->officerService->getById($id);

        return Inertia::render('usg/admin/officers/edit', [
            'officer' => $officer,
            'departments' => $this->officerService->getDepartments(),
            'positions' => $this->officerService->getPositions(),
        ]);
    }

    public function update(Request $request, int $id)
    {
        $officer = $this->officerService->getById($id);
        $this->officerService->update($officer, $request->validated());

        return redirect()
            ->route('usg.admin.officers.index')
            ->with('success', 'Officer updated successfully.');
    }

    public function destroy(int $id)
    {
        $officer = $this->officerService->getById($id);
        $this->officerService->delete($officer);

        return redirect()
            ->route('usg.admin.officers.index')
            ->with('success', 'Officer deleted successfully.');
    }

    public function reorder(Request $request)
    {
        $this->officerService->reorder($request->get('officers', []));

        return back()->with('success', 'Officers reordered successfully.');
    }

    public function toggleActive(int $id)
    {
        $officer = $this->officerService->getById($id);
        $this->officerService->toggleActive($officer);

        return back()->with('success', 'Officer status updated successfully.');
    }
}
