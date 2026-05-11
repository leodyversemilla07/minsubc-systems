<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Services\CurriculumService;

class ReportController extends Controller
{
    public function __construct(protected CurriculumService $curriculumService) {}
    public function index(): InertiaResponse { return inertia('curriculum/admin/reports/index'); }
    public function curriculumMap(): InertiaResponse { $report = $this->curriculumService->getCurriculumMap(); return inertia('curriculum/admin/reports/curriculum-map', compact('report')); }
    public function syllabusStatus(): InertiaResponse { $report = $this->curriculumService->getSyllabusStatus(); return inertia('curriculum/admin/reports/syllabus-status', compact('report')); }
}
