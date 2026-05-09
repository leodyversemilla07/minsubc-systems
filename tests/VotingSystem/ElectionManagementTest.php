<?php

use App\Models\User;
use Modules\VotingSystem\Models\Candidate;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Partylist;
use Modules\VotingSystem\Models\Position;
use Modules\VotingSystem\Models\Vote;
use Modules\VotingSystem\Models\Voter;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->artisan('migrate:fresh');
    $this->seed(\Modules\VotingSystem\Database\Seeders\VotingSystemPermissionsSeeder::class);

    $adminRole = Role::where('name', 'voting-admin')->first();
    if ($adminRole) {
        $adminRole->givePermissionTo(Permission::all());
    }
});

// ─── Election Management ───────────────────────────────────────

test('admin can create an election', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');

    $response = $this->actingAs($admin)->post(route('voting.admin.elections.store'), [
        'name' => 'SSG Election 2025',
    ]);

    $response->assertSessionHas('success');
    expect(Election::where('name', 'SSG Election 2025')->exists())->toBeTrue();
});

test('admin can view elections list', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    Election::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('voting.admin.elections.index'));

    $response->assertInertia(fn ($page) => $page->component('voting/admin/elections/index'));
});

test('admin can view single election', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create();

    $response = $this->actingAs($admin)->get(route('voting.admin.elections.show', $election));

    $response->assertInertia(fn ($page) => $page->component('voting/admin/elections/show'));
});

test('admin can update an election', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create(['name' => 'Original Name']);

    $response = $this->actingAs($admin)->put(route('voting.admin.elections.update', $election), [
        'name' => 'Updated Election Name',
    ]);

    $response->assertSessionHas('success');
    expect($election->fresh()->name)->toBe('Updated Election Name');
});

test('admin can delete an election', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create();

    $response = $this->actingAs($admin)->delete(route('voting.admin.elections.destroy', $election));

    $response->assertSessionHas('success');
    expect(Election::find($election->id))->toBeNull();
});

test('admin can toggle election status', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create(['status' => false]);

    $response = $this->actingAs($admin)->post(route('voting.admin.elections.toggle-status', $election));

    $response->assertSessionHas('success');
    expect($election->fresh()->status)->toBeTrue();
});

test('election validation requires name', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');

    $response = $this->actingAs($admin)->post(route('voting.admin.elections.store'), [
        'name' => '',
    ]);

    $response->assertSessionHasErrors('name');
});

// ─── Candidate Management ──────────────────────────────────────

test('admin can create a candidate', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->active()->create();
    $position = Position::factory()->create(['election_id' => $election->id]);

    $response = $this->actingAs($admin)->post(route('voting.admin.candidates.store'), [
        'election_id' => $election->id,
        'position_id' => $position->position_id,
        'firstname' => 'Juan',
        'lastname' => 'Dela Cruz',
    ]);

    $response->assertSessionHas('success');
    expect(Candidate::where('firstname', 'Juan')->where('lastname', 'Dela Cruz')->exists())->toBeTrue();
});

test('admin can view candidates list', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create();
    Candidate::factory()->count(3)->create(['election_id' => $election->id]);

    $response = $this->actingAs($admin)->get(route('voting.admin.candidates.index'));

    $response->assertInertia(fn ($page) => $page->component('voting/admin/candidates/index'));
});

test('admin can update a candidate', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $candidate = Candidate::factory()->create(['firstname' => 'Old']);

    $response = $this->actingAs($admin)->put(route('voting.admin.candidates.update', $candidate), [
        'firstname' => 'New',
        'lastname' => $candidate->lastname,
        'election_id' => $candidate->election_id,
        'position_id' => $candidate->position_id,
    ]);

    $response->assertSessionHas('success');
    expect($candidate->fresh()->firstname)->toBe('New');
});

test('admin can delete a candidate', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $candidate = Candidate::factory()->create();

    $response = $this->actingAs($admin)->delete(route('voting.admin.candidates.destroy', $candidate));

    $response->assertSessionHas('success');
    expect(Candidate::find($candidate->id))->toBeNull();
});

// ─── Position Management ───────────────────────────────────────

test('admin can create a position', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create();

    $response = $this->actingAs($admin)->post(route('voting.admin.positions.store'), [
        'election_id' => $election->id,
        'description' => 'President',
        'max_vote' => 1,
        'priority' => 1,
    ]);

    $response->assertSessionHas('success');
    expect(Position::where('description', 'President')->exists())->toBeTrue();
});

test('admin can reorder positions', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create();
    $pos1 = Position::factory()->create(['election_id' => $election->id, 'priority' => 1]);
    $pos2 = Position::factory()->create(['election_id' => $election->id, 'priority' => 2]);

    $response = $this->actingAs($admin)->post(route('voting.admin.positions.move-up', $pos2));

    $response->assertSessionHas('success');
    expect($pos2->fresh()->priority)->toBeLessThan($pos1->fresh()->priority);
});

// ─── Partylist Management ──────────────────────────────────────

test('admin can create a partylist', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->create();

    $response = $this->actingAs($admin)->post(route('voting.admin.partylists.store'), [
        'election_id' => $election->id,
        'name' => 'Team Unity',
    ]);

    $response->assertSessionHas('success');
    expect(Partylist::where('name', 'Team Unity')->exists())->toBeTrue();
});

test('admin can delete a partylist', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $partylist = Partylist::factory()->create();

    $response = $this->actingAs($admin)->delete(route('voting.admin.partylists.destroy', $partylist));

    $response->assertSessionHas('success');
    expect(Partylist::find($partylist->partylist_id))->toBeNull();
});

// ─── Voter Management ──────────────────────────────────────────

test('admin can view voters list', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    Election::factory()->create();

    $response = $this->actingAs($admin)->get(route('voting.admin.voters.index'));

    $response->assertInertia(fn ($page) => $page->component('voting/admin/voters/index'));
});

test('admin can reset a voter vote', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $voter = Voter::factory()->voted()->create();

    $response = $this->actingAs($admin)->post(route('voting.admin.voters.reset-vote', $voter));

    $response->assertSessionHas('success');
    expect($voter->fresh()->has_voted)->toBeFalse();
});

// ─── Authorization / Permissions ───────────────────────────────

test('unauthorized user cannot access voting admin', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('voting.admin.elections.index'));

    $response->assertForbidden();
});

test('voting-manager has read-only access', function () {
    $manager = User::factory()->create()->assignRole('voting-manager');
    $election = Election::factory()->create();

    // Can view
    $this->actingAs($manager)->get(route('voting.admin.elections.index'))->assertInertia(fn ($p) => $p->component('voting/admin/elections/index'));
    $this->actingAs($manager)->get(route('voting.admin.elections.show', $election))->assertInertia(fn ($p) => $p->component('voting/admin/elections/show'));

    // Cannot create
    $this->actingAs($manager)->post(route('voting.admin.elections.store'), ['name' => 'Test'])->assertForbidden();

    // Cannot delete
    $this->actingAs($manager)->delete(route('voting.admin.elections.destroy', $election))->assertForbidden();
});

test('guest cannot access voting pages', function () {
    $response = $this->get(route('voting.admin.elections.index'));
    $response->assertRedirect(route('login'));
});

// ─── Analytics ─────────────────────────────────────────────────

test('admin can view analytics', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');

    $response = $this->actingAs($admin)->get(route('voting.admin.analytics'));

    $response->assertInertia(fn ($page) => $page->component('voting/admin/analytics/index'));
});

// ─── Model Logic ───────────────────────────────────────────────

test('election has correct computed status', function () {
    $activeElection = Election::factory()->active()->create(['end_time' => now()->addDays(7)]);
    $endedElection = Election::factory()->ended()->create(['end_time' => now()->subDays(1)]);

    expect($activeElection->computed_status)->toBe('active');
    expect($activeElection->isActive())->toBeTrue();
    expect($endedElection->computed_status)->toBe('ended');
    expect($endedElection->hasEnded())->toBeTrue();
});

test('election deletes cascading data', function () {
    $admin = User::factory()->create()->assignRole('voting-admin');
    $election = Election::factory()->active()->create();
    $position = Position::factory()->create(['election_id' => $election->id]);
    $candidate = Candidate::factory()->create(['election_id' => $election->id, 'position_id' => $position->position_id]);
    $voter = Voter::factory()->create(['election_id' => $election->id]);

    $this->actingAs($admin)->delete(route('voting.admin.elections.destroy', $election));

    expect(Position::where('election_id', $election->id)->count())->toBe(0);
    expect(Candidate::where('election_id', $election->id)->count())->toBe(0);
    expect(Voter::where('election_id', $election->id)->count())->toBe(0);
});