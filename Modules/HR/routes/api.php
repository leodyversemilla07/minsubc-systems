<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\HR\Http\Controllers\Admin\EmployeeController;

Route::get('/employees/search', [EmployeeController::class, 'search'])->name('hr.api.employees.search');
Route::get('/departments', [\Modules\HR\Http\Controllers\Admin\DepartmentController::class, 'list'])->name('hr.api.departments');