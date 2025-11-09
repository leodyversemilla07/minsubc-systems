<?php

use Illuminate\Support\Facades\Route;
use Modules\VotingSystem\Http\Controllers\VotingSystemController;

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
    // Voter Login & Authentication
    Route::get('/', [VotingSystemController::class, 'index'])->name('index');
    Route::get('/login', [VotingSystemController::class, 'login'])->name('login');
    Route::post('/authenticate', [VotingSystemController::class, 'authenticate'])->name('authenticate');
    
    // Public Results (after election ends)
    Route::get('/results', [VotingSystemController::class, 'results'])->name('results');
});

// Voter Routes (Authenticated Voters)
Route::middleware(['auth:voter'])->prefix('voting')->name('voting.')->group(function () {
    Route::get('/ballot', [VotingSystemController::class, 'ballot'])->name('ballot');
    Route::post('/vote', [VotingSystemController::class, 'vote'])->name('vote');
    Route::get('/confirmation', [VotingSystemController::class, 'confirmation'])->name('confirmation');
    Route::post('/logout', [VotingSystemController::class, 'logout'])->name('logout');
});

// Admin Routes (Authenticated Admins)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('voting/admin')->name('voting.admin.')->group(function () {
        // Dashboard - accessible to voting admins and system admins
        Route::middleware(['role:voting-admin|super-admin'])->group(function () {
            Route::get('/', [VotingSystemController::class, 'dashboard'])->name('dashboard');
            
            // Voter Management
            Route::get('/voters', [VotingSystemController::class, 'voters'])->name('voters.index');
            Route::post('/voters', [VotingSystemController::class, 'storeVoter'])->name('voters.store');
            Route::get('/voters/{voter}', [VotingSystemController::class, 'showVoter'])->name('voters.show');
            Route::patch('/voters/{voter}', [VotingSystemController::class, 'updateVoter'])->name('voters.update');
            Route::delete('/voters/{voter}', [VotingSystemController::class, 'destroyVoter'])->name('voters.destroy');
            Route::get('/voters/export', [VotingSystemController::class, 'exportVoters'])->name('voters.export');
            
            // Candidate Management
            Route::get('/candidates', [VotingSystemController::class, 'candidates'])->name('candidates.index');
            Route::post('/candidates', [VotingSystemController::class, 'storeCandidate'])->name('candidates.store');
            Route::get('/candidates/{candidate}', [VotingSystemController::class, 'showCandidate'])->name('candidates.show');
            Route::patch('/candidates/{candidate}', [VotingSystemController::class, 'updateCandidate'])->name('candidates.update');
            Route::delete('/candidates/{candidate}', [VotingSystemController::class, 'destroyCandidate'])->name('candidates.destroy');
            
            // Position Management
            Route::get('/positions', [VotingSystemController::class, 'positions'])->name('positions.index');
            Route::post('/positions', [VotingSystemController::class, 'storePosition'])->name('positions.store');
            Route::patch('/positions/{position}', [VotingSystemController::class, 'updatePosition'])->name('positions.update');
            Route::delete('/positions/{position}', [VotingSystemController::class, 'destroyPosition'])->name('positions.destroy');
            Route::post('/positions/reorder', [VotingSystemController::class, 'reorderPositions'])->name('positions.reorder');
            
            // Party List Management
            Route::get('/parties', [VotingSystemController::class, 'parties'])->name('parties.index');
            Route::post('/parties', [VotingSystemController::class, 'storeParty'])->name('parties.store');
            Route::patch('/parties/{party}', [VotingSystemController::class, 'updateParty'])->name('parties.update');
            Route::delete('/parties/{party}', [VotingSystemController::class, 'destroyParty'])->name('parties.destroy');
            
            // Election Management
            Route::get('/elections', [VotingSystemController::class, 'elections'])->name('elections.index');
            Route::post('/elections', [VotingSystemController::class, 'storeElection'])->name('elections.store');
            Route::patch('/elections/{election}', [VotingSystemController::class, 'updateElection'])->name('elections.update');
            Route::post('/elections/{election}/start', [VotingSystemController::class, 'startElection'])->name('elections.start');
            Route::post('/elections/{election}/stop', [VotingSystemController::class, 'stopElection'])->name('elections.stop');
            Route::delete('/elections/{election}', [VotingSystemController::class, 'destroyElection'])->name('elections.destroy');
            
            // Results & Analytics
            Route::get('/results', [VotingSystemController::class, 'adminResults'])->name('results');
            Route::get('/results/{election}', [VotingSystemController::class, 'electionResults'])->name('results.election');
            Route::get('/results/{election}/export', [VotingSystemController::class, 'exportResults'])->name('results.export');
            
            // Vote History & Audit
            Route::get('/history', [VotingSystemController::class, 'history'])->name('history');
            Route::get('/history/{voter}', [VotingSystemController::class, 'voterHistory'])->name('history.voter');
            
            // Settings
            Route::get('/settings', [VotingSystemController::class, 'settings'])->name('settings');
            Route::patch('/settings', [VotingSystemController::class, 'updateSettings'])->name('settings.update');
            
            // Votes Management (Super Admin only)
            Route::middleware(['role:super-admin'])->group(function () {
                Route::post('/votes/reset', [VotingSystemController::class, 'resetVotes'])->name('votes.reset');
            });
        });
    });
});
