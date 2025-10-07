<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        $role = $user->getRoleNames()->first();

        return Inertia::render('dashboard', [
            'userRole' => $role,
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Registrar Module Routes
require __DIR__.'/../app/Modules/Registrar/routes.php';
