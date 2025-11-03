<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Modules\SAS\Models\InsuranceRecord;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $this->student = User::factory()->create();
    $this->student->assignRole('student');

    $this->admin = User::factory()->create();
    $this->admin->assignRole('sas-admin');
});

describe('Student Insurance Management', function () {
    it('allows authenticated student to view their insurance records', function () {
        actingAs($this->student);

        InsuranceRecord::factory()->create([
            'student_id' => $this->student->id,
            'insurance_provider' => 'Test Provider',
            'policy_number' => 'TEST123',
            'effective_date' => now(),
            'expiration_date' => now()->addYear(),
        ]);

        $response = get(route('sas.student.insurance.index'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/student/insurance/index')
            ->has('insuranceRecords')
        );
    });

    it('displays insurance creation form for students', function () {
        actingAs($this->student);

        $response = get(route('sas.student.insurance.create'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/student/insurance/create')
        );
    });

    it('allows student to submit insurance record', function () {
        actingAs($this->student);

        $insuranceData = [
            'insurance_provider' => 'PhilHealth',
            'policy_number' => 'PH-2025-001',
            'policy_type' => 'Health',
            'coverage_amount' => 50000.00,
            'effective_date' => now()->format('Y-m-d'),
            'expiration_date' => now()->addYear()->format('Y-m-d'),
            'beneficiary_name' => 'John Doe',
            'beneficiary_relationship' => 'Parent',
        ];

        $response = post(route('sas.student.insurance.store'), $insuranceData);

        $response->assertRedirect(route('sas.student.insurance.index'));
        $response->assertSessionHas('success', 'Insurance record submitted successfully.');

        assertDatabaseHas('insurance_records', [
            'student_id' => $this->student->id,
            'policy_number' => 'PH-2025-001',
            'status' => 'Pending Review',
        ]);
    });

    it('validates required fields when submitting insurance', function () {
        actingAs($this->student);

        $response = post(route('sas.student.insurance.store'), []);

        $response->assertSessionHasErrors([
            'insurance_provider',
            'policy_number',
            'effective_date',
            'expiration_date',
        ]);
    });

    it('allows student to view their insurance details', function () {
        actingAs($this->student);

        $insurance = InsuranceRecord::factory()->create([
            'student_id' => $this->student->id,
        ]);

        $response = get(route('sas.student.insurance.show', $insurance->id));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/student/insurance/show')
            ->has('insurance')
        );
    });

    it('prevents student from viewing another students insurance', function () {
        actingAs($this->student);

        $otherStudent = User::factory()->create();
        $otherStudent->assignRole('student');

        $insurance = InsuranceRecord::factory()->create([
            'student_id' => $otherStudent->id,
        ]);

        $response = get(route('sas.student.insurance.show', $insurance->id));

        $response->assertForbidden();
    });
});

describe('Admin Insurance Management', function () {
    it('allows admin to view all insurance records', function () {
        actingAs($this->admin);

        InsuranceRecord::factory()->count(5)->create();

        $response = get(route('sas.admin.insurance.index'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/insurance/index')
            ->has('insuranceRecords')
        );
    });

    it('filters insurance records by status', function () {
        actingAs($this->admin);

        InsuranceRecord::factory()->create(['status' => 'Pending Review']);
        InsuranceRecord::factory()->create(['status' => 'Approved']);

        $response = get(route('sas.admin.insurance.index', ['status' => 'Pending Review']));

        $response->assertSuccessful();
    });

    it('allows admin to approve insurance record', function () {
        actingAs($this->admin);

        $insurance = InsuranceRecord::factory()->create(['status' => 'Pending Review']);

        $response = post(route('sas.admin.insurance.approve', $insurance->id));

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Insurance record approved.');

        assertDatabaseHas('insurance_records', [
            'id' => $insurance->id,
            'status' => 'Approved',
            'reviewed_by' => $this->admin->id,
        ]);
    });

    it('allows admin to reject insurance record with notes', function () {
        actingAs($this->admin);

        $insurance = InsuranceRecord::factory()->create(['status' => 'Pending Review']);

        $response = post(route('sas.admin.insurance.reject', $insurance->id), [
            'review_notes' => 'Incomplete documentation provided',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Insurance record rejected.');

        assertDatabaseHas('insurance_records', [
            'id' => $insurance->id,
            'status' => 'Rejected',
            'review_notes' => 'Incomplete documentation provided',
            'reviewed_by' => $this->admin->id,
        ]);
    });

    it('requires review notes when rejecting insurance', function () {
        actingAs($this->admin);

        $insurance = InsuranceRecord::factory()->create(['status' => 'Pending Review']);

        $response = post(route('sas.admin.insurance.reject', $insurance->id), []);

        $response->assertSessionHasErrors(['review_notes']);
    });

    it('allows admin to delete insurance record', function () {
        actingAs($this->admin);

        $insurance = InsuranceRecord::factory()->create();

        $response = delete(route('sas.admin.insurance.destroy', $insurance->id));

        $response->assertRedirect(route('sas.admin.insurance.index'));
        $response->assertSessionHas('success', 'Insurance record deleted successfully.');

        assertDatabaseMissing('insurance_records', ['id' => $insurance->id]);
    });
});

describe('Insurance Model Scopes and Methods', function () {
    it('identifies expired insurance records', function () {
        $expiredInsurance = InsuranceRecord::factory()->create([
            'expiration_date' => now()->subDays(10),
        ]);

        expect($expiredInsurance->isExpired())->toBeTrue();
    });

    it('identifies non-expired insurance records', function () {
        $activeInsurance = InsuranceRecord::factory()->create([
            'expiration_date' => now()->addDays(10),
        ]);

        expect($activeInsurance->isExpired())->toBeFalse();
    });

    it('calculates days until expiration', function () {
        $insurance = InsuranceRecord::factory()->create([
            'expiration_date' => now()->addDays(30),
        ]);

        $days = $insurance->daysUntilExpiration();

        expect($days)->toBe(30);
    });

    it('filters insurance expiring soon', function () {
        InsuranceRecord::factory()->create(['expiration_date' => now()->addDays(15)]);
        InsuranceRecord::factory()->create(['expiration_date' => now()->addDays(60)]);

        $expiringSoon = InsuranceRecord::expiringSoon(30)->get();

        expect($expiringSoon)->toHaveCount(1);
    });

    it('filters insurance by status', function () {
        InsuranceRecord::factory()->count(3)->create(['status' => 'Approved']);
        InsuranceRecord::factory()->count(2)->create(['status' => 'Pending Review']);

        $approved = InsuranceRecord::byStatus('Approved')->get();

        expect($approved)->toHaveCount(3);
    });
});
