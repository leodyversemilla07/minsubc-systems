<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('usg/admin/documents/index', [
            'documents' => [],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('usg/admin/documents/create');
    }

    public function store(Request $request): RedirectResponse
    {
        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document uploaded successfully.');
    }

    public function show(int $id): Response
    {
        return Inertia::render('usg/admin/documents/show', [
            'document' => null,
        ]);
    }

    public function edit(int $id): Response
    {
        return Inertia::render('usg/admin/documents/edit', [
            'document' => null,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }

    public function download(int $id): never
    {
        abort(404, 'Document not found');
    }
}
