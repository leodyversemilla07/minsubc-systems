<?php

use App\Models\User;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Create roles if they don't exist
    Role::findOrCreate('sas-admin', 'web');
    Role::findOrCreate('sas-staff', 'web');
    Role::findOrCreate('student', 'web');
});

it('displays renewal management page for sas admin', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $response = $this->actingAs($admin)
        ->get('/sas/admin/renewals');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('sas/admin/renewals/index')
        ->has('eligibleScholars')
        ->has('scholarsNeedingRenewal')
        ->has('recentRenewals')
        ->has('stats')
        ->has('filters')
    );
});

it('allows filtering by academic year and semester', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $response = $this->actingAs($admin)
        ->get('/sas/admin/renewals?academic_year=2025-2026&semester=1st');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->where('filters.academic_year', '2025-2026')
        ->where('filters.semester', '1st')
    );
});

it('sends renewal reminders to eligible scholars', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    // Create an eligible scholar
    $student = User::factory()->create();
    $student->assignRole('student');

    $scholarship = Scholarship::factory()->create();

    ScholarshipRecipient::factory()->create([
        'student_id' => $student->id,
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2024-2025',
        'semester' => '2nd',
        'status' => 'Active',
    ]);

    $response = $this->actingAs($admin)
        ->post('/sas/admin/renewals/send-reminders', [
            'academic_year' => '2025-2026',
            'semester' => '1st',
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');
});

it('validates academic year and semester when sending reminders', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $response = $this->actingAs($admin)
        ->post('/sas/admin/renewals/send-reminders', [
            'academic_year' => '',
            'semester' => 'invalid',
        ]);

    $response->assertSessionHasErrors(['academic_year', 'semester']);
});

it('creates a single renewal application', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $student = User::factory()->create();
    $student->assignRole('student');

    $scholarship = Scholarship::factory()->create();

    $recipient = ScholarshipRecipient::factory()->create([
        'student_id' => $student->id,
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2024-2025',
        'semester' => '2nd',
        'status' => 'Active',
    ]);

    $response = $this->actingAs($admin)
        ->post("/sas/admin/renewals/{$recipient->id}/create", [
            'academic_year' => '2025-2026',
            'semester' => '1st',
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    // Verify the new renewal was created
    $this->assertDatabaseHas('scholarship_recipients', [
        'student_id' => $student->id,
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'renewal_status' => 'Approved',
    ]);
});

it('prevents duplicate renewal for same period', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $student = User::factory()->create();
    $student->assignRole('student');

    $scholarship = Scholarship::factory()->create();

    $recipient = ScholarshipRecipient::factory()->create([
        'student_id' => $student->id,
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2024-2025',
        'semester' => '2nd',
        'status' => 'Active',
    ]);

    // Create existing renewal for target period
    ScholarshipRecipient::factory()->create([
        'student_id' => $student->id,
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'status' => 'Active',
    ]);

    $response = $this->actingAs($admin)
        ->post("/sas/admin/renewals/{$recipient->id}/create", [
            'academic_year' => '2025-2026',
            'semester' => '1st',
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('error');
});

it('creates bulk renewals for selected scholars', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $scholarship = Scholarship::factory()->create();
    $recipients = [];

    for ($i = 0; $i < 3; $i++) {
        $student = User::factory()->create();
        $student->assignRole('student');

        $recipients[] = ScholarshipRecipient::factory()->create([
            'student_id' => $student->id,
            'scholarship_id' => $scholarship->id,
            'academic_year' => '2024-2025',
            'semester' => '2nd',
            'status' => 'Active',
        ]);
    }

    $response = $this->actingAs($admin)
        ->post('/sas/admin/renewals/bulk-renew', [
            'recipient_ids' => array_map(fn ($r) => $r->id, $recipients),
            'academic_year' => '2025-2026',
            'semester' => '1st',
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    // Verify all renewals were created
    foreach ($recipients as $recipient) {
        $this->assertDatabaseHas('scholarship_recipients', [
            'student_id' => $recipient->student_id,
            'scholarship_id' => $recipient->scholarship_id,
            'academic_year' => '2025-2026',
            'semester' => '1st',
        ]);
    }
});

it('validates bulk renewal request', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $response = $this->actingAs($admin)
        ->post('/sas/admin/renewals/bulk-renew', [
            'recipient_ids' => [],
            'academic_year' => '',
            'semester' => 'invalid',
        ]);

    $response->assertSessionHasErrors(['recipient_ids', 'academic_year', 'semester']);
});

it('requires authentication to access renewals page', function () {
    $response = $this->get('/sas/admin/renewals');

    $response->assertRedirect('/login');
});

it('requires sas admin or staff role to access renewals', function () {
    $user = User::factory()->create();
    $user->assignRole('student');

    $response = $this->actingAs($user)
        ->get('/sas/admin/renewals');

    $response->assertForbidden();
});

it('returns renewal history for a student', function () {
    $admin = User::factory()->create();
    $admin->assignRole('sas-admin');

    $student = User::factory()->create();
    $student->assignRole('student');

    $scholarship = Scholarship::factory()->create();

    // Create multiple renewals for the student
    ScholarshipRecipient::factory()->count(3)->create([
        'student_id' => $student->id,
        'scholarship_id' => $scholarship->id,
        'renewal_status' => 'Approved',
    ]);

    $response = $this->actingAs($admin)
        ->get("/sas/admin/renewals/history/{$student->id}");

    $response->assertSuccessful();
    $response->assertJson([
        'history' => [],
    ]);
});
