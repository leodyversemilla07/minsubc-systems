<?php

use Illuminate\Support\Facades\Route;
use Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController;
use Modules\VotingSystem\Http\Controllers\Admin\CandidateController;
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

    // Public Results
    Route::get('/results/{election}', [ResultsController::class, 'index'])->name('results');
});

// Voter Routes (Authenticated Voters)
Route::middleware(['auth:voter'])->prefix('voting')->name('voting.')->group(function () {
    Route::get('/ballot', [BallotController::class, 'show'])->name('ballot');
    Route::post('/preview', [BallotController::class, 'preview'])->name('preview');
    Route::post('/vote', [BallotController::class, 'submit'])->name('submit');
    Route::post('/logout', [VoterAuthController::class, 'logout'])->name('logout');

    // Feedback
    Route::get('/feedback', [FeedbackController::class, 'create'])->name('feedback.create');
    Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');
});

// Admin Routes (Authenticated Admins)
Route::middleware(['auth', 'verified'])->prefix('voting/admin')->name('voting.admin.')->group(function () {
    // Elections
    Route::resource('elections', ElectionController::class);
    Route::post('elections/{election}/toggle-status', [ElectionController::class, 'toggleStatus'])->name('elections.toggle-status');

    // Candidates
    Route::resource('candidates', CandidateController::class);

    // Positions
    Route::resource('positions', PositionController::class);
    Route::post('positions/{position}/move-up', [PositionController::class, 'moveUp'])->name('positions.move-up');
    Route::post('positions/{position}/move-down', [PositionController::class, 'moveDown'])->name('positions.move-down');

    // Partylists
    Route::resource('partylists', PartylistController::class);

    // Voters
    Route::resource('voters', VoterManagementController::class)->except(['edit']);
    Route::post('voters/{voter}/reset-password', [VoterManagementController::class, 'resetPassword'])->name('voters.reset-password');
    Route::post('voters/{voter}/reset-vote', [VoterManagementController::class, 'resetVote'])->name('voters.reset-vote');
    Route::get('voters/{election}/export', [VoterManagementController::class, 'export'])->name('voters.export');

    // Activity Logs
    Route::resource('activity-logs', ActivityLogController::class)->only(['index', 'show']);

    // Feedback
    Route::resource('feedback', AdminFeedbackController::class)->only(['index', 'show']);
});
