<?php

use Modules\Curriculum\Models\Program;
use Modules\Curriculum\Models\Course;
use Modules\Curriculum\Models\Syllabus;

test('curriculum module is enabled', function () {
    expect(app('modules')->isEnabled('Curriculum'))->toBeTrue();
});

// ─── Model Creation ────────────────────────────────────────

test('can create a program', function () {
    $program = Program::factory()->create();
    expect($program->exists)->toBeTrue();
    expect($program->code)->not->toBeEmpty();
});

test('can create a course', function () {
    $course = Course::factory()->create();
    expect($course->exists)->toBeTrue();
    expect($course->code)->not->toBeEmpty();
});

test('can create a curriculum', function () {
    $curriculum = \Modules\Curriculum\Models\Curriculum::factory()
        ->for(Program::factory(), 'program')
        ->create();
    expect($curriculum->exists)->toBeTrue();
    expect($curriculum->program->exists)->toBeTrue();
});

test('can create a syllabus', function () {
    $syllabus = \Modules\Curriculum\Models\Syllabus::factory()
        ->for(Course::factory(), 'course')
        ->create();
    expect($syllabus->exists)->toBeTrue();
    expect($syllabus->course->exists)->toBeTrue();
});

test('can create program outcomes', function () {
    $program = Program::factory()->create();
    $outcome = \Modules\Curriculum\Models\ProgramOutcome::create([
        'program_id' => $program->id,
        'code' => 'PO1',
        'description' => 'Apply knowledge of computing',
        'domain' => 'knowledge',
    ]);
    expect($outcome->exists)->toBeTrue();
    expect($outcome->program->id)->toBe($program->id);
});

test('can create course outcomes on a syllabus', function () {
    $syllabus = \Modules\Curriculum\Models\Syllabus::factory()
        ->for(Course::factory(), 'course')
        ->create();
    $co = \Modules\Curriculum\Models\CourseOutcome::create([
        'syllabus_id' => $syllabus->id,
        'code' => 'CO1',
        'description' => 'Analyze algorithms',
        'domain' => 'skills',
    ]);
    expect($co->exists)->toBeTrue();
    expect($co->syllabus->id)->toBe($syllabus->id);
});

test('can create textbooks', function () {
    $textbook = \Modules\Curriculum\Models\Textbook::factory()->create();
    expect($textbook->exists)->toBeTrue();
    expect($textbook->title)->not->toBeEmpty();
});

// ─── Relationships ──────────────────────────────────────────

test('program has many curricula', function () {
    $program = Program::factory()->create();
    \Modules\Curriculum\Models\Curriculum::factory()->count(2)->create(['program_id' => $program->id]);
    expect($program->curricula()->count())->toBe(2);
});

test('program has many outcomes', function () {
    $program = Program::factory()->create();
    \Modules\Curriculum\Models\ProgramOutcome::create(['program_id' => $program->id, 'code' => 'PO1', 'description' => 'Test PO']);
    \Modules\Curriculum\Models\ProgramOutcome::create(['program_id' => $program->id, 'code' => 'PO2', 'description' => 'Test PO 2']);
    expect($program->outcomes()->count())->toBe(2);
});

test('course has many syllabi', function () {
    $course = Course::factory()->create();
    \Modules\Curriculum\Models\Syllabus::factory()->count(3)->create(['course_id' => $course->id]);
    expect($course->syllabi()->count())->toBe(3);
});

test('curriculum course belongs to course and curriculum', function () {
    $curriculum = \Modules\Curriculum\Models\Curriculum::factory()
        ->for(Program::factory(), 'program')
        ->create();
    $course = Course::factory()->create();
    $cc = \Modules\Curriculum\Models\CurriculumCourse::create([
        'curriculum_id' => $curriculum->id,
        'course_id' => $course->id,
        'year_level' => 1,
        'semester' => '1st',
    ]);
    expect($cc->curriculum->id)->toBe($curriculum->id);
    expect($cc->course->id)->toBe($course->id);
});

test('syllabus can have textbooks', function () {
    $syllabus = \Modules\Curriculum\Models\Syllabus::factory()
        ->for(Course::factory(), 'course')
        ->create();
    $textbook = \Modules\Curriculum\Models\Textbook::factory()->create();
    $syllabus->textbooks()->attach($textbook->id, ['type' => 'required']);
    expect($syllabus->textbooks()->count())->toBe(1);
});

// ─── RBAC ─────────────────────────────────────────────────

test('unauthenticated cannot access admin dashboard', function () {
    $response = $this->get(route('curriculum.admin.dashboard'));
    $response->assertRedirect(route('login'));
});

test('student role cannot access admin dashboard', function () {
    $student = \App\Models\User::factory()->create()->assignRole('student');
    $response = $this->actingAs($student)->get(route('curriculum.admin.dashboard'));
    expect(in_array($response->status(), [302, 403]))->toBeTrue();
});

// ─── Admin CRUD: Programs ──────────────────────────────────

test('admin can view programs list', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    Program::factory()->count(3)->create();
    $response = $this->actingAs($admin)->get(route('curriculum.admin.programs.index'));
    expect($response->status())->toBe(200);
});

test('admin can create a program', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $response = $this->actingAs($admin)->post(route('curriculum.admin.programs.store'), [
        'code' => 'BSIT',
        'name' => 'Bachelor of Science in Information Technology',
        'level' => 'undergraduate',
        'college' => 'College of Information Technology',
        'years' => 4,
        'description' => 'A four-year degree program',
    ]);
    $response->assertRedirect(route('curriculum.admin.programs.index'));
    expect(Program::where('code', 'BSIT')->exists())->toBeTrue();
});

test('admin can update a program', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $program = Program::factory()->create(['name' => 'Old Name']);
    $response = $this->actingAs($admin)->put(route('curriculum.admin.programs.update', $program), [
        'code' => $program->code,
        'name' => 'Updated Program Name',
        'level' => 'undergraduate',
        'years' => 4,
    ]);
    $response->assertRedirect(route('curriculum.admin.programs.index'));
    expect($program->fresh()->name)->toBe('Updated Program Name');
});

test('admin can delete a program', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $program = Program::factory()->create();
    $response = $this->actingAs($admin)->delete(route('curriculum.admin.programs.destroy', $program));
    $response->assertRedirect(route('curriculum.admin.programs.index'));
    expect(Program::find($program->id))->toBeNull();
});

// ─── Admin CRUD: Courses ────────────────────────────────────

test('admin can create a course', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $response = $this->actingAs($admin)->post(route('curriculum.admin.courses.store'), [
        'code' => 'IT 101',
        'name' => 'Introduction to Computing',
        'description' => 'Fundamentals of computing',
        'units' => 3.0,
        'lecture_hours' => 3.0,
        'category' => 'major',
    ]);
    $response->assertRedirect(route('curriculum.admin.courses.index'));
    expect(Course::where('code', 'IT 101')->exists())->toBeTrue();
});

test('admin can update a course', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $course = Course::factory()->create(['name' => 'Old Course']);
    $response = $this->actingAs($admin)->put(route('curriculum.admin.courses.update', $course), [
        'code' => $course->code,
        'name' => 'Updated Course',
        'units' => 3.0,
        'category' => 'major',
    ]);
    $response->assertRedirect(route('curriculum.admin.courses.index'));
    expect($course->fresh()->name)->toBe('Updated Course');
});

test('admin can add prerequisites to a course', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $course = Course::factory()->create();
    $prereq = Course::factory()->create();
    $response = $this->actingAs($admin)->post(route('curriculum.admin.courses.add-prerequisite', $course), [
        'prerequisite_id' => $prereq->id,
        'type' => 'required',
    ]);
    $response->assertRedirect(route('curriculum.admin.courses.edit', $course));
    expect($course->prerequisites()->count())->toBe(1);
});

// ─── Admin CRUD: Curricula ──────────────────────────────────

test('admin can create a curriculum', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $program = Program::factory()->create();
    $response = $this->actingAs($admin)->post(route('curriculum.admin.curricula.store'), [
        'program_id' => $program->id,
        'version_name' => '2025 Curriculum',
        'academic_year' => '2025-2026',
    ]);
    $response->assertRedirect(route('curriculum.admin.curricula.index'));
    expect(\Modules\Curriculum\Models\Curriculum::where('version_name', '2025 Curriculum')->exists())->toBeTrue();
});

test('admin can add courses to a curriculum', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $curriculum = \Modules\Curriculum\Models\Curriculum::factory()
        ->for(Program::factory(), 'program')
        ->create();
    $course = Course::factory()->create();
    $response = $this->actingAs($admin)->post(route('curriculum.admin.curricula.add-course', $curriculum), [
        'course_id' => $course->id,
        'year_level' => 1,
        'semester' => '1st',
    ]);
    $response->assertRedirect(route('curriculum.admin.curricula.show', $curriculum));
    expect($curriculum->courses()->count())->toBe(1);
});

test('admin can publish a curriculum', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $curriculum = \Modules\Curriculum\Models\Curriculum::factory()
        ->for(Program::factory(), 'program')
        ->create(['status' => 'draft']);
    $response = $this->actingAs($admin)->post(route('curriculum.admin.curricula.publish', $curriculum));
    $response->assertRedirect(route('curriculum.admin.curricula.show', $curriculum));
    expect($curriculum->fresh()->status)->toBe('published');
});

// ─── Admin CRUD: Syllabi ────────────────────────────────────

test('admin can create a syllabus', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $course = Course::factory()->create();
    $response = $this->actingAs($admin)->post(route('curriculum.admin.syllabi.store'), [
        'course_id' => $course->id,
        'version' => '1.0',
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'course_description' => 'Course description here',
    ]);
    $response->assertRedirect(route('curriculum.admin.syllabi.index'));
    expect(Syllabus::where('course_id', $course->id)->exists())->toBeTrue();
});

test('admin can add course outcomes to a syllabus', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $syllabus = \Modules\Curriculum\Models\Syllabus::factory()
        ->for(Course::factory(), 'course')
        ->create();
    $response = $this->actingAs($admin)->post(route('curriculum.admin.syllabi.add-course-outcome', $syllabus), [
        'code' => 'CO1',
        'description' => 'Analyze and design algorithms',
        'domain' => 'skills',
    ]);
    $response->assertRedirect(route('curriculum.admin.syllabi.show', $syllabus));
    expect($syllabus->courseOutcomes()->count())->toBe(1);
});

test('admin can publish a syllabus', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $syllabus = \Modules\Curriculum\Models\Syllabus::factory()
        ->for(Course::factory(), 'course')
        ->create(['status' => 'draft']);
    $response = $this->actingAs($admin)->post(route('curriculum.admin.syllabi.publish', $syllabus));
    $response->assertRedirect(route('curriculum.admin.syllabi.show', $syllabus));
    expect($syllabus->fresh()->status)->toBe('published');
});

test('admin can add textbooks to a syllabus', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $syllabus = \Modules\Curriculum\Models\Syllabus::factory()
        ->for(Course::factory(), 'course')
        ->create();
    $textbook = \Modules\Curriculum\Models\Textbook::factory()->create();
    $response = $this->actingAs($admin)->post(route('curriculum.admin.syllabi.add-textbook', $syllabus), [
        'textbook_id' => $textbook->id,
        'type' => 'required',
    ]);
    $response->assertRedirect(route('curriculum.admin.syllabi.show', $syllabus));
    expect($syllabus->textbooks()->count())->toBe(1);
});

// ─── Admin CRUD: Textbooks ──────────────────────────────────

test('admin can create a textbook', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $response = $this->actingAs($admin)->post(route('curriculum.admin.textbooks.store'), [
        'title' => 'Introduction to Algorithms',
        'author' => 'Thomas Cormen',
        'isbn' => '978-0-262-04630-5',
        'publisher' => 'MIT Press',
        'year' => 2022,
        'type' => 'textbook',
    ]);
    $response->assertRedirect(route('curriculum.admin.textbooks.index'));
    expect(\Modules\Curriculum\Models\Textbook::where('title', 'Introduction to Algorithms')->exists())->toBeTrue();
});

test('admin can update a textbook', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $textbook = \Modules\Curriculum\Models\Textbook::factory()->create(['title' => 'Old Title']);
    $response = $this->actingAs($admin)->put(route('curriculum.admin.textbooks.update', $textbook), [
        'title' => 'Updated Textbook Title',
        'author' => $textbook->author,
        'type' => 'textbook',
    ]);
    $response->assertRedirect(route('curriculum.admin.textbooks.index'));
    expect($textbook->fresh()->title)->toBe('Updated Textbook Title');
});

// ─── Program Outcomes ───────────────────────────────────────

test('admin can manage program outcomes', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('curriculum-admin');
    $program = Program::factory()->create();
    $response = $this->actingAs($admin)->post(route('curriculum.admin.program-outcomes.store'), [
        'program_id' => $program->id,
        'code' => 'PO1',
        'description' => 'Apply knowledge of computing',
        'domain' => 'knowledge',
    ]);
    $response->assertRedirect(route('curriculum.admin.program-outcomes.index'));
    expect(\Modules\Curriculum\Models\ProgramOutcome::where('code', 'PO1')->exists())->toBeTrue();
});