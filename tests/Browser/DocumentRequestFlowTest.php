<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Support\Facades\Event;
use Modules\Registrar\Models\DocumentRequest;

use function Pest\Laravel\actingAs;

describe('Document Request E2E Flow', function () {
    beforeEach(function () {
        $this->seed(RolesAndPermissionsSeeder::class);
    });

    it('student can submit a document request', function () {
        Event::fake();

        $student = User::factory()->create();
        $student->assignRole('student');

        actingAs($student);

        $page = visit('/document-requests/create')
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Request Document')
            ->assertSee('Document Type')
            ->assertSee('Purpose')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();

        // Select document type (Transcript of Records)
        $page->select('document_type', 'transcript_of_records')
            ->fill('purpose', 'Job Application')
            ->fill('quantity', '2')
            ->fill('notes', 'Please process this urgently.')
            ->assertNoJavascriptErrors();

        // Submit the form
        $page->click('Submit Request')
            ->wait(2000)
            ->assertPathIs('/document-requests')
            ->assertSee('Document request submitted successfully')
            ->assertNoJavascriptErrors();

        // Verify request was created in database
        expect(DocumentRequest::where('student_id', $student->student->student_id)->count())->toBe(1);

        $request = DocumentRequest::where('student_id', $student->student->student_id)->first();
        expect($request->document_type)->toBe('transcript_of_records')
            ->and($request->purpose)->toBe('Job Application')
            ->and($request->quantity)->toBe(2)
            ->and($request->status)->toBe('pending_payment');
    });

    it('student can view their document requests', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        // Create some requests for the student
        DocumentRequest::factory()->count(3)->create([
            'student_id' => $student->student->student_id,
        ]);

        actingAs($student);

        $page = visit('/document-requests')
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('My Document Requests')
            ->assertSee('Status')
            ->assertSee('Document Type')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();

        // Should see all 3 requests
        $page->assertCount('.request-row', 3);
    });

    it('student can select payment method for pending request', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        $request = DocumentRequest::factory()->create([
            'student_id' => $student->student->student_id,
            'status' => 'pending_payment',
        ]);

        actingAs($student);

        $page = visit("/document-requests/{$request->id}/payment/method")
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Select Payment Method')
            ->assertSee('Cash Payment')
            ->assertSee('Online Payment')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });

    it('complete flow: student submits request and views status', function () {
        Event::fake();

        $student = User::factory()->create();
        $student->assignRole('student');

        actingAs($student);

        // Step 1: Create request
        $createPage = visit('/document-requests/create')
            ->on()->desktop();

        $createPage->select('document_type', 'certificate_of_enrollment')
            ->fill('purpose', 'Scholarship Application')
            ->fill('quantity', '1')
            ->click('Submit Request')
            ->wait(2000);

        // Step 2: View requests list
        $listPage = visit('/document-requests');

        $listPage->assertSee('My Document Requests')
            ->assertSee('certificate_of_enrollment')
            ->assertSee('pending_payment')
            ->assertNoJavascriptErrors();

        // Step 3: Click on the request to view details
        $request = DocumentRequest::where('student_id', $student->student->student_id)->first();

        $detailPage = visit("/document-requests/{$request->id}");

        $detailPage->assertSee('Request Details')
            ->assertSee('Scholarship Application')
            ->assertSee('Pending Payment')
            ->assertSee('Select Payment Method')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });

    it('mobile: student can submit document request on mobile device', function () {
        Event::fake();

        $student = User::factory()->create();
        $student->assignRole('student');

        actingAs($student);

        $page = visit('/document-requests/create')
            ->on()->mobile()
            ->inLightMode();

        $page->assertSee('Request Document')
            ->select('document_type', 'diploma')
            ->fill('purpose', 'Employment')
            ->fill('quantity', '1')
            ->assertNoJavascriptErrors();

        $page->click('Submit Request')
            ->wait(2000)
            ->assertPathIs('/document-requests')
            ->assertSee('Document request submitted successfully')
            ->assertNoJavascriptErrors();

        expect(DocumentRequest::where('student_id', $student->student->student_id)->count())->toBe(1);
    });

    it('dark mode: form works correctly in dark mode', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        actingAs($student);

        $page = visit('/document-requests/create')
            ->on()->desktop()
            ->inDarkMode();

        $page->assertSee('Request Document')
            ->assertSee('Document Type')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();

        $page->select('document_type', 'certificate_of_grades')
            ->fill('purpose', 'Transfer')
            ->assertNoJavascriptErrors();
    });

    it('validation: shows errors for empty required fields', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        actingAs($student);

        $page = visit('/document-requests/create')
            ->on()->desktop();

        // Try to submit without filling required fields
        $page->click('Submit Request')
            ->wait(1000)
            ->assertSee('document_type')
            ->assertNoJavascriptErrors();
    });
});
