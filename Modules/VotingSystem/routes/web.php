<?php

use Illuminate\Support\Facades\Route;
use Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController;
use Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController;
use Modules\VotingSystem\Http\Controllers\Admin\CandidateController;
use Modules\VotingSystem\Http\Controllers\Admin\DashboardController;
use Modules\VotingSystem\Http\Controllers\Admin\ElectionController;
use Modules\VotingSystem\Http\Controllers\Admin\FeedbackController as AdminFeedbackController;
use Modules\VotingSystem\Http\Controllers\Admin\PartylistController;
use Modules\VotingSystem\Http\Controllers\Admin\PositionController;
use Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController;
use Modules\VotingSystem\Http\Controllers\BallotController;
use Modules\VotingSystem\Http\Controllers\FeedbackController;
use Modules\VotingSystem\Http\Controllers\ResultsController;
use Modules\VotingSystem\Http\Controllers\VoterAuthController;

/*
|--------------------------------------------------------------------------
| VotingSystem Routes
|--------------------------------------------------------------------------
|
| Routes for the Electronic Voting System module.
| This module provides secure voting functionality with voter authentication,
| ballot management, and real-time results.
|
*/

// Public Routes (No Authentication Required)
Route::prefix('voting')->name('voting.')->group(function () {
    // Landing page
    Route::get('/', function () {
        $activeElection = \Modules\VotingSystem\Models\Election::where('status', true)
            ->orWhere('end_time', '<', now())
            ->latest()
            ->first();

        return \Inertia\Inertia::render('voting/index', [
            'activeElection' => $activeElection,
        ]);
    })->name('index');

    // Voter Login & Authentication
    Route::get('/login', [VoterAuthController::class, 'showLogin'])->name('login');
    Route::post('/authenticate', [VoterAuthController::class, 'login'])->name('authenticate');

    // Vote Confirmation (accessible after logout)
    Route::get('/confirmation', [BallotController::class, 'confirmation'])->name('confirmation');

    // Printable Receipt
    Route::get('/receipt', [BallotController::class, 'receipt'])->name('receipt');

    // Feedback (accessible with token after voting or while authenticated)
    Route::get('/feedback', [FeedbackController::class, 'create'])->name('feedback.create');
    Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

    // Public Results
    Route::get('/results/{election}', [ResultsController::class, 'index'])->name('results');
});

// Voter Routes (Authenticated Voters)
Route::middleware([\Modules\VotingSystem\Http\Middleware\EnsureVoterAuthenticated::class])->prefix('voting')->name('voting.')->group(function () {
    Route::get('/ballot', [BallotController::class, 'show'])->name('ballot');
    Route::post('/preview', [BallotController::class, 'preview'])->name('preview');
    Route::post('/vote', [BallotController::class, 'submit'])->name('submit');
    Route::post('/logout', [VoterAuthController::class, 'logout'])->name('logout');
});

// Admin Routes (Authenticated Admins)
Route::middleware(['auth', 'verified', 'role:voting-admin|voting-manager|super-admin'])
    ->prefix('voting/admin')
    ->name('voting.admin.')
    ->group(function () {
        // Dashboard
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Analytics
        Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics');
        Route::get('analytics/export/pdf', [AnalyticsController::class, 'exportPdf'])->name('analytics.export.pdf');
        Route::get('analytics/export/excel', [AnalyticsController::class, 'exportExcel'])->name('analytics.export.excel');

        // Elections
        Route::get('elections', [ElectionController::class, 'index'])->middleware('permission:elections.view')->name('elections.index');
        Route::get('elections/create', [ElectionController::class, 'create'])->middleware('permission:elections.create')->name('elections.create');
        Route::post('elections', [ElectionController::class, 'store'])->middleware('permission:elections.create')->name('elections.store');
        Route::get('elections/{election}', [ElectionController::class, 'show'])->middleware('permission:elections.view')->name('elections.show');
        Route::get('elections/{election}/edit', [ElectionController::class, 'edit'])->middleware('permission:elections.edit')->name('elections.edit');
        Route::put('elections/{election}', [ElectionController::class, 'update'])->middleware('permission:elections.edit')->name('elections.update');
        Route::delete('elections/{election}', [ElectionController::class, 'destroy'])->middleware('permission:elections.delete')->name('elections.destroy');
        Route::post('elections/{election}/toggle-status', [ElectionController::class, 'toggleStatus'])->middleware('permission:elections.toggle-status')->name('elections.toggle-status');

        // Candidates
        Route::get('candidates', [CandidateController::class, 'index'])->middleware('permission:candidates.view')->name('candidates.index');
        Route::get('candidates/create', [CandidateController::class, 'create'])->middleware('permission:candidates.create')->name('candidates.create');
        Route::post('candidates', [CandidateController::class, 'store'])->middleware('permission:candidates.create')->name('candidates.store');
        Route::get('candidates/{candidate}', [CandidateController::class, 'show'])->middleware('permission:candidates.view')->name('candidates.show');
        Route::get('candidates/{candidate}/edit', [CandidateController::class, 'edit'])->middleware('permission:candidates.edit')->name('candidates.edit');
        Route::put('candidates/{candidate}', [CandidateController::class, 'update'])->middleware('permission:candidates.edit')->name('candidates.update');
        Route::delete('candidates/{candidate}', [CandidateController::class, 'destroy'])->middleware('permission:candidates.delete')->name('candidates.destroy');

        // Positions
        Route::get('positions', [PositionController::class, 'index'])->middleware('permission:positions.view')->name('positions.index');
        Route::get('positions/create', [PositionController::class, 'create'])->middleware('permission:positions.create')->name('positions.create');
        Route::post('positions', [PositionController::class, 'store'])->middleware('permission:positions.create')->name('positions.store');
        Route::get('positions/{position}', [PositionController::class, 'show'])->middleware('permission:positions.view')->name('positions.show');
        Route::get('positions/{position}/edit', [PositionController::class, 'edit'])->middleware('permission:positions.edit')->name('positions.edit');
        Route::put('positions/{position}', [PositionController::class, 'update'])->middleware('permission:positions.edit')->name('positions.update');
        Route::delete('positions/{position}', [PositionController::class, 'destroy'])->middleware('permission:positions.delete')->name('positions.destroy');
        Route::post('positions/{position}/move-up', [PositionController::class, 'moveUp'])->middleware('permission:positions.reorder')->name('positions.move-up');
        Route::post('positions/{position}/move-down', [PositionController::class, 'moveDown'])->middleware('permission:positions.reorder')->name('positions.move-down');

        // Partylists
        Route::get('partylists', [PartylistController::class, 'index'])->middleware('permission:partylists.view')->name('partylists.index');
        Route::get('partylists/create', [PartylistController::class, 'create'])->middleware('permission:partylists.create')->name('partylists.create');
        Route::post('partylists', [PartylistController::class, 'store'])->middleware('permission:partylists.create')->name('partylists.store');
        Route::get('partylists/{partylist}', [PartylistController::class, 'show'])->middleware('permission:partylists.view')->name('partylists.show');
        Route::get('partylists/{partylist}/edit', [PartylistController::class, 'edit'])->middleware('permission:partylists.edit')->name('partylists.edit');
        Route::put('partylists/{partylist}', [PartylistController::class, 'update'])->middleware('permission:partylists.edit')->name('partylists.update');
        Route::delete('partylists/{partylist}', [PartylistController::class, 'destroy'])->middleware('permission:partylists.delete')->name('partylists.destroy');

        // Voters
        Route::get('voters', [VoterManagementController::class, 'index'])->middleware('permission:voters.view')->name('voters.index');
        Route::get('voters/create', [VoterManagementController::class, 'create'])->middleware('permission:voters.create')->name('voters.create');
        Route::post('voters', [VoterManagementController::class, 'store'])->middleware('permission:voters.create')->name('voters.store');
        Route::get('voters/{voter}', [VoterManagementController::class, 'show'])->middleware('permission:voters.view')->name('voters.show');
        Route::put('voters/{voter}', [VoterManagementController::class, 'update'])->middleware('permission:voters.edit')->name('voters.update');
        Route::delete('voters/{voter}', [VoterManagementController::class, 'destroy'])->middleware('permission:voters.delete')->name('voters.destroy');
        Route::post('voters/{voter}/reset-vote', [VoterManagementController::class, 'resetVote'])->middleware('permission:voters.reset-vote')->name('voters.reset-vote');
        Route::get('voters/{election}/export', [VoterManagementController::class, 'export'])->middleware('permission:voters.export')->name('voters.export');

        // Activity Logs
        Route::get('activity-logs', [ActivityLogController::class, 'index'])->middleware('permission:activity-logs.view')->name('activity-logs.index');
        Route::get('activity-logs/{activityLog}', [ActivityLogController::class, 'show'])->middleware('permission:activity-logs.view')->name('activity-logs.show');

        // Feedback
        Route::get('feedback', [AdminFeedbackController::class, 'index'])->middleware('permission:feedback.view')->name('feedback.index');
        Route::get('feedback/{feedback}', [AdminFeedbackController::class, 'show'])->middleware('permission:feedback.view')->name('feedback.show');
    });
