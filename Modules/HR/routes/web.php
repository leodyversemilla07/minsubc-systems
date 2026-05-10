<?php

use Illuminate\Support\Facades\Route;
use Modules\HR\Http\Controllers\Admin\DashboardController;
use Modules\HR\Http\Controllers\Admin\EmployeeController;
use Modules\HR\Http\Controllers\Admin\DepartmentController;
use Modules\HR\Http\Controllers\Admin\PositionController;
use Modules\HR\Http\Controllers\Admin\AttendanceController;
use Modules\HR\Http\Controllers\Admin\LeaveController;
use Modules\HR\Http\Controllers\Admin\EvaluationController;
use Modules\HR\Http\Controllers\Admin\ReportController;

Route::prefix('hr')->name('hr.')->group(function () {
    // Public directory
    Route::get('/', [\Modules\HR\Http\Controllers\HRController::class, 'index'])->name('index');
    Route::get('/directory', [\Modules\HR\Http\Controllers\HRController::class, 'directory'])->name('directory');
    Route::get('/employees/{employee}', [\Modules\HR\Http\Controllers\HRController::class, 'show'])->name('employees.show');

    // Employee self-service
    Route::middleware(['auth', 'verified'])->prefix('my')->name('my.')->group(function () {
        Route::get('/dashboard', [\Modules\HR\Http\Controllers\Employee\MyDashboardController::class, 'index'])->name('dashboard');
        Route::get('/attendance', [\Modules\HR\Http\Controllers\Employee\MyDashboardController::class, 'attendance'])->name('attendance');
        Route::post('/attendance/time-in', [\Modules\HR\Http\Controllers\Employee\MyDashboardController::class, 'timeIn'])->name('attendance.time-in');
        Route::post('/attendance/time-out', [\Modules\HR\Http\Controllers\Employee\MyDashboardController::class, 'timeOut'])->name('attendance.time-out');
        Route::get('/leave', [\Modules\HR\Http\Controllers\Employee\MyDashboardController::class, 'leaveRequests'])->name('leave.requests');
        Route::post('/leave', [\Modules\HR\Http\Controllers\Employee\MyDashboardController::class, 'submitLeave'])->name('leave.submit');
        Route::get('/evaluations', [\Modules\HR\Http\Controllers\Employee\MyDashboardController::class, 'evaluations'])->name('evaluations');
    });

    // Admin routes
    Route::middleware(['auth', 'role:hr-admin|hr-staff|super-admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Departments
        Route::resource('departments', DepartmentController::class);

        // Positions
        Route::resource('positions', PositionController::class);

        // Employees
        Route::resource('employees', EmployeeController::class);
        Route::post('employees/{employee}/upload-photo', [EmployeeController::class, 'uploadPhoto'])->name('employees.upload-photo');

        // Attendance
        Route::get('attendance', [AttendanceController::class, 'index'])->name('attendance.index');
        Route::get('attendance/report', [AttendanceController::class, 'report'])->name('attendance.report');
        Route::post('attendance/bulk', [AttendanceController::class, 'bulkUpdate'])->name('attendance.bulk');
        Route::get('attendance/{employee}', [AttendanceController::class, 'employeeAttendance'])->name('attendance.employee');

        // Leave
        Route::get('leave', [LeaveController::class, 'index'])->name('leave.index');
        Route::get('leave/{leaveRequest}', [LeaveController::class, 'show'])->name('leave.show');
        Route::post('leave/{leaveRequest}/approve', [LeaveController::class, 'approve'])->name('leave.approve');
        Route::post('leave/{leaveRequest}/reject', [LeaveController::class, 'reject'])->name('leave.reject');

        // Evaluations
        Route::get('evaluations', [EvaluationController::class, 'index'])->name('evaluations.index');
        Route::get('evaluations/create', [EvaluationController::class, 'create'])->name('evaluations.create');
        Route::post('evaluations', [EvaluationController::class, 'store'])->name('evaluations.store');
        Route::get('evaluations/{evaluation}', [EvaluationController::class, 'show'])->name('evaluations.show');

        // Reports
        Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('reports/attendance', [ReportController::class, 'attendanceReport'])->name('reports.attendance');
        Route::get('reports/leave', [ReportController::class, 'leaveReport'])->name('reports.leave');
    });
});