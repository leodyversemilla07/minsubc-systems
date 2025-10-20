<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('usg/admin/documents/index', [
            'documents' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('usg/admin/documents/create');
    }

    public function store(Request $request)
    {
        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document uploaded successfully.');
    }

    public function show(int $id)
    {
        return Inertia::render('usg/admin/documents/show', [
            'document' => null,
        ]);
    }

    public function edit(int $id)
    {
        return Inertia::render('usg/admin/documents/edit', [
            'document' => null,
        ]);
    }

    public function update(Request $request, int $id)
    {
        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    public function destroy(int $id)
    {
        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }

    public function download(int $id)
    {
        abort(404, 'Document not found');
    }
}
