<?php

namespace Modules\Alumni\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Models\Survey;

class SurveyController extends Controller
{
    public function index()
    {
        $surveys = Survey::withCount('responses')->orderBy('created_at', 'desc')->paginate(15);
        return Inertia::render('alumni/admin/surveys/index', ['surveys' => $surveys]);
    }

    public function create()
    {
        return Inertia::render('alumni/admin/surveys/create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'survey_type' => 'required|string',
            'target_year' => 'nullable|integer',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after:starts_at',
        ]);
        Survey::create($validated);
        return redirect()->route('alumni.admin.surveys.index')->with('success', 'Survey created.');
    }

    public function show(Survey $survey)
    {
        $survey->load('questions');
        return Inertia::render('alumni/admin/surveys/show', ['survey' => $survey]);
    }

    public function edit(Survey $survey)
    {
        return Inertia::render('alumni/admin/surveys/edit', ['survey' => $survey]);
    }

    public function update(\Illuminate\Http\Request $request, Survey $survey)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'is_active' => 'boolean',
            'ends_at' => 'nullable|date',
        ]);
        $survey->update($validated);
        return redirect()->route('alumni.admin.surveys.index')->with('success', 'Survey updated.');
    }

    public function destroy(Survey $survey)
    {
        $survey->delete();
        return redirect()->route('alumni.admin.surveys.index')->with('success', 'Survey deleted.');
    }
}