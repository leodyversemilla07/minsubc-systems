<?php

use Illuminate\Support\Facades\Route;
use Modules\Research\Http\Controllers\Admin\DashboardController;
use Modules\Research\Http\Controllers\Admin\ResearchTypeController;
use Modules\Research\Http\Controllers\Admin\ProposalController;
use Modules\Research\Http\Controllers\Admin\PanelController;
use Modules\Research\Http\Controllers\Admin\DefenseController;
use Modules\Research\Http\Controllers\Admin\PublicationController;
use Modules\Research\Http\Controllers\Admin\JournalController;
use Modules\Research\Http\Controllers\Admin\GradeReportController;
use Modules\Research\Http\Controllers\Admin\ReportController;

Route::prefix('research')->name('research.')->group(function () {
    Route::get('/', [\Modules\Research\Http\Controllers\ResearchController::class, 'index'])->name('index');
    Route::get('/proposals', [\Modules\Research\Http\Controllers\ResearchController::class, 'proposals'])->name('proposals');
    Route::get('/publications', [\Modules\Research\Http\Controllers\ResearchController::class, 'publications'])->name('publications');
    Route::get('/theses/{proposal}', [\Modules\Research\Http\Controllers\ResearchController::class, 'viewThesis'])->name('theses.view');

    Route::middleware(['auth', 'role:research-admin|research-panelist|research-adviser|super-admin'])
        ->prefix('admin')->name('admin.')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Research Types
        Route::resource('research-types', ResearchTypeController::class);

        // Proposals / Theses
        Route::resource('proposals', ProposalController::class);
        Route::post('proposals/{proposal}/submit', [ProposalController::class, 'submit'])->name('proposals.submit');
        Route::post('proposals/{proposal}/approve', [ProposalController::class, 'approve'])->name('proposals.approve');
        Route::post('proposals/{proposal}/assign-adviser', [ProposalController::class, 'assignAdviser'])->name('proposals.assign-adviser');
        Route::post('proposals/{proposal}/authors', [ProposalController::class, 'addAuthor'])->name('proposals.add-author');
        Route::delete('proposals/{proposal}/authors/{author}', [ProposalController::class, 'removeAuthor'])->name('proposals.remove-author');

        // Panels
        Route::resource('proposals.panels', PanelController::class)->shallow();
        Route::post('panels/{panel}/assign-chair', [PanelController::class, 'assignChair'])->name('panels.assign-chair');

        // Defenses
        Route::resource('defenses', DefenseController::class);
        Route::post('defenses/{defense}/score', [DefenseController::class, 'score'])->name('defenses.score');
        Route::post('defenses/{defense}/complete', [DefenseController::class, 'complete'])->name('defenses.complete');

        // Grade Reports
        Route::resource('grade-reports', GradeReportController::class);

        // Publications
        Route::resource('publications', PublicationController::class);
        Route::post('publications/{publication}/authors', [PublicationController::class, 'addAuthor'])->name('publications.add-author');
        Route::delete('publications/{publication}/authors/{author}', [PublicationController::class, 'removeAuthor'])->name('publications.remove-author');

        // Journals
        Route::resource('journals', JournalController::class);
        Route::resource('journals.issues', \Modules\Research\Http\Controllers\Admin\JournalIssueController::class)->shallow();

        // Reports
        Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('reports/proposals-status', [ReportController::class, 'proposalsStatus'])->name('reports.proposals-status');
        Route::get('reports/panel-summary', [ReportController::class, 'panelSummary'])->name('reports.panel-summary');
    });
});