<?php

namespace App\Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\OfficerService;
use Inertia\Inertia;

class PublicOfficerController extends Controller
{
    public function __construct(private OfficerService $officerService) {}

    public function index()
    {
        $officers = $this->officerService->getActiveOfficers();
        $officersByDepartment = $this->officerService->getOfficersByDepartment();

        return Inertia::render('usg/public/officers/index', [
            'officers' => $officers,
            'officersByDepartment' => $officersByDepartment,
        ]);
    }
}
