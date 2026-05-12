<?php

use Modules\Research\Models\ResearchType;
use Modules\Research\Models\Proposal;
use Modules\Research\Models\Author;
use Modules\Research\Models\Panel;
use Modules\Research\Models\Defense;
use Modules\Research\Models\GradeReport;
use Modules\Research\Models\Publication;
use Modules\Research\Models\Journal;

// ─── Model Creation ────────────────────────────────────────

test('can create a research type', function () {
    $type = ResearchType::factory()->create();
    expect($type->exists)->toBeTrue();
});

test('can create a proposal', function () {
    $proposal = Proposal::factory()->create();
    expect($proposal->exists)->toBeTrue();
    expect($proposal->proposal_code)->not->toBeEmpty();
});

test('can create authors on a proposal', function () {
    $proposal = Proposal::factory()->create();
    $author = Author::create([
        'proposal_id' => $proposal->id,
        'student_id' => \App\Models\Student::factory()->create()->student_id,
        'role' => 'leader',
    ]);
    expect($author->exists)->toBeTrue();
    expect($proposal->authors()->count())->toBe(1);
});

test('can add panel members to a proposal', function () {
    $proposal = Proposal::factory()->create();
    $panelist = \App\Models\User::factory()->create();
    $panel = Panel::create([
        'proposal_id' => $proposal->id,
        'panelist_id' => $panelist->id,
        'role' => 'member',
    ]);
    expect($panel->exists)->toBeTrue();
    expect($proposal->panels()->count())->toBe(1);
});

test('can schedule a defense', function () {
    $proposal = Proposal::factory()->create();
    $defense = Defense::create([
        'proposal_id' => $proposal->id,
        'stage' => 'proposal',
        'scheduled_date' => now()->addDays(7),
        'start_time' => '09:00',
        'venue' => 'Room 101',
        'status' => 'scheduled',
    ]);
    expect($defense->exists)->toBeTrue();
});

test('can create a publication', function () {
    $publication = Publication::factory()->create();
    expect($publication->exists)->toBeTrue();
});

test('can create a journal', function () {
    $journal = Journal::factory()->create();
    expect($journal->exists)->toBeTrue();
});

test('can create a grade report', function () {
    $proposal = Proposal::factory()->create();
    $report = GradeReport::create([
        'proposal_id' => $proposal->id,
        'student_id' => $proposal->student_id,
        'final_grade' => 88.5,
        'remarks' => 'passed',
    ]);
    expect($report->exists)->toBeTrue();
});

// ─── Relationships ──────────────────────────────────────────

test('proposal has many authors', function () {
    $proposal = Proposal::factory()->create();
    Author::create(['proposal_id' => $proposal->id, 'student_id' => \App\Models\Student::factory()->create()->student_id, 'role' => 'leader']);
    Author::create(['proposal_id' => $proposal->id, 'student_id' => \App\Models\Student::factory()->create()->student_id, 'role' => 'member']);
    expect($proposal->authors()->count())->toBe(2);
});

test('proposal has research type', function () {
    $type = ResearchType::factory()->create();
    $proposal = Proposal::factory()->create(['research_type_id' => $type->id]);
    expect($proposal->researchType->id)->toBe($type->id);
});

// ─── RBAC ─────────────────────────────────────────────────

test('unauthenticated cannot access admin dashboard', function () {
    $response = $this->get(route('research.admin.dashboard'));
    $response->assertRedirect(route('login'));
});