<?php

namespace Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Http\Requests\UpdateVMGORequest;
use Modules\USG\Services\VMGOService;

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
            $this->vmgoService->update($vmgo, $request->validated(), $request->user()->id);
        } else {
            $this->vmgoService->updateOrCreate($request->validated(), $request->user()->id);
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
