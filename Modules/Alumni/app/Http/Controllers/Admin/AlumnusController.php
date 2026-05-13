<?php

namespace Modules\Alumni\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Models\Alumnus;

class AlumnusController extends Controller
{
    public function index()
    {
        $alumni = Alumnus::withCount(['employmentRecords', 'donations'])
            ->orderBy('last_name')
            ->paginate(15);
        return Inertia::render('alumni/admin/alumni/index', ['alumni' => $alumni]);
    }

    public function create()
    {
        return Inertia::render('alumni/admin/alumni/create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:alm_alumni,email',
            'student_id' => 'nullable|string|unique:alm_alumni,student_id',
            'graduation_year' => 'nullable|integer|min:1950|max:2099',
            'degree_program' => 'nullable|string|max:255',
            'college' => 'nullable|string|max:255',
        ]);
        Alumnus::create($validated);
        return redirect()->route('alumni.admin.alumni.index')->with('success', 'Alumnus created.');
    }

    public function show(Alumnus $alumnus)
    {
        $alumnus->load(['employmentRecords', 'educations', 'donations']);
        return Inertia::render('alumni/admin/alumni/show', ['alumnus' => $alumnus]);
    }

    public function edit(Alumnus $alumnus)
    {
        return Inertia::render('alumni/admin/alumni/edit', ['alumnus' => $alumnus]);
    }

    public function update(\Illuminate\Http\Request $request, Alumnus $alumnus)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:alm_alumni,email,' . $alumnus->id,
            'is_verified' => 'boolean',
            'is_employed' => 'boolean',
        ]);
        $alumnus->update($validated);
        return redirect()->route('alumni.admin.alumni.index')->with('success', 'Alumnus updated.');
    }

    public function destroy(Alumnus $alumnus)
    {
        $alumnus->delete();
        return redirect()->route('alumni.admin.alumni.index')->with('success', 'Alumnus deleted.');
    }
}