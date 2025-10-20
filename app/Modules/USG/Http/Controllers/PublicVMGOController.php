<?php

namespace App\Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\VMGOService;
use Inertia\Inertia;

class PublicVMGOController extends Controller
{
    public function __construct(private VMGOService $vmgoService) {}

    public function index()
    {
        $vmgo = $this->vmgoService->getCurrent();

        return Inertia::render('usg/public/vmgo', [
            'vmgo' => $vmgo,
        ]);
    }

    public function show()
    {
        $vmgo = $this->vmgoService->getCurrent();

        return Inertia::render('usg/public/vmgo', [
            'vmgo' => $vmgo,
        ]);
    }
}
