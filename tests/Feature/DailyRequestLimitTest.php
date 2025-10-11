<?php

use App\Models\SystemSetting;
use App\Models\User;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Student;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Daily Document Request Limit', function () {
    it('allows requests below the daily limit', function () {
        $this->seed(RolesAndPermissionsSeeder::class);
        SystemSetting::set('daily_document_request_limit', 3);

        $user = User::factory()->create();
        $student = Student::factory()->create(['user_id' => $user->id]);
        $user->assignRole('student');

        $this->actingAs($user);

        for ($i = 0; $i < 3; $i++) {
            $response = $this->post(route('registrar.document-requests.store'), [
                'document_type' => 'Transcript of Record',
                'quantity' => 1,
                'purpose' => 'Scholarship',
            ]);
            $response->assertRedirect(route('registrar.document-requests.index'));
            $response->assertSessionHas('success');
        }
    });

    it('blocks requests at the daily limit', function () {
        $this->seed(RolesAndPermissionsSeeder::class);
        SystemSetting::set('daily_document_request_limit', 2);

        $user = User::factory()->create();
        $student = Student::factory()->create(['user_id' => $user->id]);
        $user->assignRole('student');

        $this->actingAs($user);

        for ($i = 0; $i < 2; $i++) {
            $this->post(route('registrar.document-requests.store'), [
                'document_type' => 'Transcript of Record',
                'quantity' => 1,
                'purpose' => 'Scholarship',
            ])->assertRedirect(route('registrar.document-requests.index'))
                ->assertSessionHas('success');
        }

        // Verify that the daily limit has been reached
        expect(DocumentRequest::hasReachedDailyLimit($student->student_id))->toBeTrue();

        $response = $this->post(route('registrar.document-requests.store'), [
            'document_type' => 'Transcript of Record',
            'quantity' => 1,
            'purpose' => 'Scholarship',
        ]);

        $response->assertStatus(429);
    });

    it('shows correct remaining count', function () {
        $this->seed(RolesAndPermissionsSeeder::class);
        SystemSetting::set('daily_document_request_limit', 5);

        $user = User::factory()->create();
        $student = Student::factory()->create(['user_id' => $user->id]);
        $user->assignRole('student');

        $this->actingAs($user);

        for ($i = 0; $i < 3; $i++) {
            $this->post(route('registrar.document-requests.store'), [
                'document_type' => 'Transcript of Record',
                'quantity' => 1,
                'purpose' => 'Scholarship',
            ]);
        }

        $remaining = DocumentRequest::getRemainingDailyRequests($student->student_id);
        expect($remaining)->toBe(2);
    });
});
