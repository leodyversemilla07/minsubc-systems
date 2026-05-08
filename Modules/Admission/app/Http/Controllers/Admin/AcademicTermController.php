<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Enrollment;

class AcademicTermController extends Controller
{
    /**
     * Display a listing of academic terms.
     */
    public function index(Request $request): Response
    {
        $terms = AcademicTerm::query()
            ->when($request->search, fn ($q, $s) => $q->where('academic_year', 'like', "%{$s}%"))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderBy('academic_year', 'desc')
            ->orderByRaw("CASE semester WHEN '1st' THEN 1 WHEN '2nd' THEN 2 WHEN 'Summer' THEN 3 END")
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admission/admin/academic-terms/index', [
            'terms' => $terms,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new academic term.
     */
    public function create(): Response
    {
        return Inertia::render('admission/admin/academic-terms/create');
    }

    /**
     * Store a newly created academic term.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'academic_year' => 'required|string|max:20',
            'semester' => 'required|in:1st,2nd,Summer',
            'enrollment_start' => 'required|date',
            'enrollment_end' => 'required|date|after:enrollment_start',
            'classes_start' => 'nullable|date',
            'classes_end' => 'nullable|date|after:classes_start',
            'status' => 'required|in:upcoming,enrollment,ongoing,ended',
            'is_active' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        if (!empty($validated['is_active'])) {
            AcademicTerm::where('is_active', true)->update(['is_active' => false]);
        }

        AcademicTerm::create($validated);

        return redirect()
            ->route('admission.admin.terms.index')
            ->with('success', 'Academic term created successfully.');
    }

    /**
     * Display the specified academic term.
     */
    public function show(AcademicTerm $term): Response
    {
        $term->load(['sections.course', 'fees']);

        $stats = [
            'total_sections' => $term->sections->count(),
            'total_enrollments' => Enrollment::where('academic_term_id', $term->id)->count(),
            'active_enrollments' => Enrollment::where('academic_term_id', $term->id)->where('status', 'enrolled')->count(),
            'total_fees' => $term->fees->count(),
        ];

        return Inertia::render('admission/admin/academic-terms/show', [
            'term' => $term->toArray() + [
                'sections' => $term->sections->toArray(),
                'fees' => $term->fees->toArray(),
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing the specified academic term.
     */
    public function edit(AcademicTerm $term): Response
    {
        return Inertia::render('admission/admin/academic-terms/edit', [
            'term' => $term,
        ]);
    }

    /**
     * Update the specified academic term.
     */
    public function update(Request $request, AcademicTerm $term): RedirectResponse
    {
        $validated = $request->validate([
            'academic_year' => 'required|string|max:20',
            'semester' => 'required|in:1st,2nd,Summer',
            'enrollment_start' => 'required|date',
            'enrollment_end' => 'required|date|after:enrollment_start',
            'classes_start' => 'nullable|date',
            'classes_end' => 'nullable|date|after:classes_start',
            'status' => 'required|in:upcoming,enrollment,ongoing,ended',
            'is_active' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        if (!empty($validated['is_active'])) {
            AcademicTerm::where('id', '!=', $term->id)->update(['is_active' => false]);
        }

        $term->update($validated);

        return redirect()
            ->route('admission.admin.terms.show', $term)
            ->with('success', 'Academic term updated successfully.');
    }

    /**
     * Remove the specified academic term.
     */
    public function destroy(AcademicTerm $term): RedirectResponse
    {
        if ($term->sections()->exists() || Enrollment::where('academic_term_id', $term->id)->exists()) {
            return redirect()
                ->route('admission.admin.terms.show', $term)
                ->with('error', 'Cannot delete academic term with associated data.');
        }

        $term->delete();

        return redirect()
            ->route('admission.admin.terms.index')
            ->with('success', 'Academic term deleted successfully.');
    }

    /**
     * Set a term as active.
     */
    public function setActive(AcademicTerm $term): RedirectResponse
    {
        AcademicTerm::where('is_active', true)->update(['is_active' => false]);
        $term->update(['is_active' => true]);

        return redirect()
            ->route('admission.admin.terms.show', $term)
            ->with('success', 'Academic term set as active.');
    }
}