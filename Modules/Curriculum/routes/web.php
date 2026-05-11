<?php

use Illuminate\Support\Facades\Route;
use Modules\Curriculum\Http\Controllers\Admin\DashboardController;
use Modules\Curriculum\Http\Controllers\Admin\ProgramController;
use Modules\Curriculum\Http\Controllers\Admin\CurriculumController;
use Modules\Curriculum\Http\Controllers\Admin\CourseController;
use Modules\Curriculum\Http\Controllers\Admin\SyllabusController;
use Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController;
use Modules\Curriculum\Http\Controllers\Admin\TextbookController;
use Modules\Curriculum\Http\Controllers\Admin\ReportController;

Route::prefix('curriculum')->name('curriculum.')->group(function () {
    Route::get('/', [\Modules\Curriculum\Http\Controllers\CurriculumController::class, 'index'])->name('index');
    Route::get('/programs', [\Modules\Curriculum\Http\Controllers\CurriculumController::class, 'programs'])->name('programs');
    Route::get('/courses', [\Modules\Curriculum\Http\Controllers\CurriculumController::class, 'courses'])->name('courses');
    Route::get('/syllabi/{syllabus}', [\Modules\Curriculum\Http\Controllers\CurriculumController::class, 'viewSyllabus'])->name('syllabi.view');

    Route::middleware(['auth', 'role:curriculum-admin|curriculum-staff|super-admin'])
        ->prefix('admin')->name('admin.')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Programs
        Route::resource('programs', ProgramController::class);

        // Program Outcomes
        Route::resource('program-outcomes', ProgramOutcomeController::class)->except(['create', 'edit']);

        // Curriculum Versions
        Route::resource('curricula', CurriculumController::class);
        Route::post('curricula/{curriculum}/publish', [CurriculumController::class, 'publish'])->name('curricula.publish');
        Route::post('curricula/{curriculum}/courses', [CurriculumController::class, 'addCourse'])->name('curricula.add-course');
        Route::delete('curricula/{curriculum}/courses/{curriculumCourse}', [CurriculumController::class, 'removeCourse'])->name('curricula.remove-course');

        // Courses
        Route::resource('courses', CourseController::class);
        Route::post('courses/{course}/prerequisites', [CourseController::class, 'addPrerequisite'])->name('courses.add-prerequisite');
        Route::delete('courses/{course}/prerequisites/{prerequisite}', [CourseController::class, 'removePrerequisite'])->name('courses.remove-prerequisite');

        // Syllabi
        Route::resource('syllabi', SyllabusController::class);
        Route::post('syllabi/{syllabus}/publish', [SyllabusController::class, 'publish'])->name('syllabi.publish');
        Route::post('syllabi/{syllabus}/course-outcomes', [SyllabusController::class, 'addCourseOutcome'])->name('syllabi.add-course-outcome');
        Route::delete('syllabi/{syllabus}/course-outcomes/{courseOutcome}', [SyllabusController::class, 'removeCourseOutcome'])->name('syllabi.remove-course-outcome');
        Route::post('syllabi/{syllabus}/map-outcomes', [SyllabusController::class, 'mapOutcomes'])->name('syllabi.map-outcomes');
        Route::post('syllabi/{syllabus}/textbooks', [SyllabusController::class, 'addTextbook'])->name('syllabi.add-textbook');
        Route::delete('syllabi/{syllabus}/textbooks/{syllabusTextbook}', [SyllabusController::class, 'removeTextbook'])->name('syllabi.remove-textbook');

        // Textbooks
        Route::resource('textbooks', TextbookController::class);

        // Reports
        Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('reports/curriculum-map', [ReportController::class, 'curriculumMap'])->name('reports.curriculum-map');
        Route::get('reports/syllabus-status', [ReportController::class, 'syllabusStatus'])->name('reports.syllabus-status');
    });
});