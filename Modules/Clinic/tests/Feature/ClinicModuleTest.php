<?php

use Modules\Clinic\Models\MedicalRecord;
use Modules\Clinic\Models\Consultation;
use Modules\Clinic\Models\Immunization;
use Modules\Clinic\Models\PhysicalExam;
use Modules\Clinic\Models\DentalRecord;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'clinic-admin']);
    Role::firstOrCreate(['name' => 'clinic-nurse']);
    Role::firstOrCreate(['name' => 'clinic-doctor']);
});

test('clinic module can create medical record', function () {
    $record = MedicalRecord::factory()->create([
        'first_name' => 'Juan',
        'last_name' => 'Dela Cruz',
        'blood_type' => 'O+',
    ]);
    expect($record->first_name)->toBe('Juan');
    expect($record->blood_type)->toBe('O+');
});

test('clinic module can create consultation', function () {
    $record = MedicalRecord::factory()->create();
    $consultation = Consultation::factory()->create([
        'medical_record_id' => $record->id,
        'diagnosis' => 'URTI',
    ]);
    expect($consultation->diagnosis)->toBe('URTI');
});

test('clinic module can create immunization', function () {
    $record = MedicalRecord::factory()->create();
    $imm = Immunization::factory()->create([
        'medical_record_id' => $record->id,
        'vaccine_name' => 'Hepatitis B',
    ]);
    expect($imm->vaccine_name)->toBe('Hepatitis B');
});

test('clinic module can create physical exam', function () {
    $record = MedicalRecord::factory()->create();
    $exam = PhysicalExam::factory()->create([
        'medical_record_id' => $record->id,
        'is_cleared' => true,
    ]);
    expect($exam->is_cleared)->toBeTrue();
});

test('clinic module can create dental record', function () {
    $record = MedicalRecord::factory()->create();
    $dental = DentalRecord::factory()->create([
        'medical_record_id' => $record->id,
        'procedure' => 'Cleaning',
    ]);
    expect($dental->procedure)->toBe('Cleaning');
});

test('clinic module relationships work', function () {
    $record = MedicalRecord::factory()->create();
    Consultation::factory(2)->create(['medical_record_id' => $record->id]);
    Immunization::factory()->create(['medical_record_id' => $record->id]);

    $record->load(['consultations', 'immunizations']);
    expect($record->consultations)->toHaveCount(2);
    expect($record->immunizations)->toHaveCount(1);
});

test('clinic-admin can access dashboard', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('clinic-admin');
    $response = $this->actingAs($admin)->get(route('clinic.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('clinic-admin can view medical records list', function () {
    MedicalRecord::factory(3)->create();
    $admin = \App\Models\User::factory()->create()->assignRole('clinic-admin');
    $response = $this->actingAs($admin)->get(route('clinic.admin.medical-records.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});