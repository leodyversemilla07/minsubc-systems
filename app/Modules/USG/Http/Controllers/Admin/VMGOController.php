<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\VMGOService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VMGOController extends Controller
{
    public function __construct(private VMGOService $vmgoService) {}

    public function edit()
    {
        $vmgo = $this->vmgoService->getCurrent();

        return Inertia::render('usg/admin/vmgo/edit', [
            'vmgo' => $vmgo,
        ]);
    }

    public function update(Request $request)
    {
        $vmgo = $this->vmgoService->getCurrent();

        if ($vmgo) {
            $this->vmgoService->update($vmgo, $request->validated(), Auth::id());
        } else {
            $this->vmgoService->updateOrCreate($request->validated(), Auth::id());
        }

        return redirect()
            ->back()
            ->with('success', 'VMGO updated successfully.');
    }

    public function history()
    {
        $history = $this->vmgoService->getHistory();

        return Inertia::render('usg/admin/vmgo/history', [
            'history' => $history,
        ]);
    }
}
