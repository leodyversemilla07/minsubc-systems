<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Http\Requests\UpdateVMGORequest;
use App\Modules\USG\Services\VMGOService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VMGOController extends Controller
{
    public function __construct(private VMGOService $vmgoService) {}

    public function edit(): Response
    {
        $vmgo = $this->vmgoService->getCurrent();

        return Inertia::render('usg/admin/vmgo/edit', [
            'vmgo' => $vmgo,
        ]);
    }

    public function update(UpdateVMGORequest $request): RedirectResponse
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

    public function history(): Response
    {
        $history = $this->vmgoService->getHistory();

        return Inertia::render('usg/admin/vmgo/history', [
            'history' => $history,
        ]);
    }
}
