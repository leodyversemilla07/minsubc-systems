<?php

use App\Models\User;
use Modules\Registrar\Enums\DocumentRequestStatus;
use Modules\Registrar\Models\DocumentRequest;
use Modules\Registrar\Models\Student;

describe('DocumentRequestStatus Enum', function () {
    it('has all required status values', function () {
        $statuses = DocumentRequestStatus::values();

        expect($statuses)->toContain('pending_payment')
            ->and($statuses)->toContain('payment_expired')
            ->and($statuses)->toContain('paid')
            ->and($statuses)->toContain('processing')
            ->and($statuses)->toContain('ready_for_claim')
            ->and($statuses)->toContain('claimed')
            ->and($statuses)->toContain('released')
            ->and($statuses)->toContain('cancelled')
            ->and($statuses)->toContain('rejected')
            ->and($statuses)->toHaveCount(9);
    });

    it('has correct labels for each status', function () {
        expect(DocumentRequestStatus::PendingPayment->label())->toBe('Pending Payment')
            ->and(DocumentRequestStatus::PaymentExpired->label())->toBe('Payment Expired')
            ->and(DocumentRequestStatus::Paid->label())->toBe('Paid')
            ->and(DocumentRequestStatus::Processing->label())->toBe('Processing')
            ->and(DocumentRequestStatus::ReadyForClaim->label())->toBe('Ready for Claim')
            ->and(DocumentRequestStatus::Claimed->label())->toBe('Claimed')
            ->and(DocumentRequestStatus::Released->label())->toBe('Released')
            ->and(DocumentRequestStatus::Cancelled->label())->toBe('Cancelled')
            ->and(DocumentRequestStatus::Rejected->label())->toBe('Rejected');
    });

    it('identifies final statuses correctly', function () {
        expect(DocumentRequestStatus::Released->isFinal())->toBeTrue()
            ->and(DocumentRequestStatus::Cancelled->isFinal())->toBeTrue()
            ->and(DocumentRequestStatus::Rejected->isFinal())->toBeTrue()
            ->and(DocumentRequestStatus::PendingPayment->isFinal())->toBeFalse()
            ->and(DocumentRequestStatus::Processing->isFinal())->toBeFalse();
    });

    it('identifies active statuses correctly', function () {
        expect(DocumentRequestStatus::PendingPayment->isActive())->toBeTrue()
            ->and(DocumentRequestStatus::Paid->isActive())->toBeTrue()
            ->and(DocumentRequestStatus::Processing->isActive())->toBeTrue()
            ->and(DocumentRequestStatus::ReadyForClaim->isActive())->toBeTrue()
            ->and(DocumentRequestStatus::Claimed->isActive())->toBeTrue()
            ->and(DocumentRequestStatus::Released->isActive())->toBeFalse()
            ->and(DocumentRequestStatus::Cancelled->isActive())->toBeFalse();
    });
});

describe('Status Transitions', function () {
    it('allows valid transitions from pending payment', function () {
        $status = DocumentRequestStatus::PendingPayment;

        expect($status->canTransitionTo(DocumentRequestStatus::Paid))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::PaymentExpired))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Cancelled))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Processing))->toBeFalse();
    });

    it('allows valid transitions from paid', function () {
        $status = DocumentRequestStatus::Paid;

        expect($status->canTransitionTo(DocumentRequestStatus::Processing))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Cancelled))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Released))->toBeFalse();
    });

    it('allows valid transitions from processing', function () {
        $status = DocumentRequestStatus::Processing;

        expect($status->canTransitionTo(DocumentRequestStatus::ReadyForClaim))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Rejected))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Cancelled))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Claimed))->toBeFalse();
    });

    it('allows valid transitions from ready for claim', function () {
        $status = DocumentRequestStatus::ReadyForClaim;

        expect($status->canTransitionTo(DocumentRequestStatus::Claimed))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Cancelled))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Released))->toBeFalse();
    });

    it('allows valid transitions from claimed', function () {
        $status = DocumentRequestStatus::Claimed;

        expect($status->canTransitionTo(DocumentRequestStatus::Released))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Cancelled))->toBeTrue()
            ->and($status->canTransitionTo(DocumentRequestStatus::Processing))->toBeFalse();
    });

    it('prevents transitions from final statuses', function () {
        expect(DocumentRequestStatus::Released->canTransitionTo(DocumentRequestStatus::Processing))->toBeFalse()
            ->and(DocumentRequestStatus::Cancelled->canTransitionTo(DocumentRequestStatus::Paid))->toBeFalse()
            ->and(DocumentRequestStatus::Rejected->canTransitionTo(DocumentRequestStatus::Processing))->toBeFalse();
    });
});

describe('DocumentRequest Model Status Methods', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();
        $this->student = Student::factory()->create(['user_id' => $this->user->id]);
    });

    it('transitions from pending payment to paid', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::PendingPayment,
        ]);

        $result = $request->markAsPaid('cash', 'REF123');

        expect($result)->toBeTrue()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Paid)
            ->and($request->fresh()->payment_method)->toBe('cash');
    });

    it('transitions through complete workflow', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::PendingPayment,
        ]);

        expect($request->markAsPaid('digital', 'PAY123'))->toBeTrue()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Paid);

        expect($request->markAsProcessing())->toBeTrue()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Processing);

        expect($request->markAsReadyForClaim())->toBeTrue()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::ReadyForClaim);

        expect($request->markAsClaimed())->toBeTrue()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Claimed)
            ->and($request->fresh()->claimed_at)->not->toBeNull()
            ->and($request->fresh()->claimed_by_student)->toBeTrue();

        expect($request->markAsReleased())->toBeTrue()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Released)
            ->and($request->fresh()->released_at)->not->toBeNull();
    });

    it('prevents invalid status transitions', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::PendingPayment,
        ]);

        $result = $request->transitionTo(DocumentRequestStatus::Released);

        expect($result)->toBeFalse()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::PendingPayment);
    });

    it('marks request as rejected with reason', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Processing,
        ]);

        $result = $request->reject('Missing required documents');

        expect($result)->toBeTrue()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Rejected)
            ->and($request->fresh()->rejection_reason)->toBe('Missing required documents');
    });

    it('prevents transitions from final statuses', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Released,
        ]);

        $result = $request->transitionTo(DocumentRequestStatus::Processing);

        expect($result)->toBeFalse()
            ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Released);
    });

    it('allows cancellation from active statuses', function () {
        $statuses = [
            DocumentRequestStatus::PendingPayment,
            DocumentRequestStatus::Paid,
            DocumentRequestStatus::Processing,
            DocumentRequestStatus::ReadyForClaim,
            DocumentRequestStatus::Claimed,
        ];

        foreach ($statuses as $status) {
            $request = DocumentRequest::factory()->create([
                'student_id' => $this->student->student_id,
                'status' => $status,
            ]);

            expect($request->cancel())->toBeTrue()
                ->and($request->fresh()->status)->toBe(DocumentRequestStatus::Cancelled);
        }
    });
});

describe('DocumentRequest Model Status Helpers', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();
        $this->student = Student::factory()->create(['user_id' => $this->user->id]);
    });

    it('checks if request is pending payment', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::PendingPayment,
        ]);

        expect($request->isPendingPayment())->toBeTrue()
            ->and($request->isPaid())->toBeFalse();
    });

    it('checks if request is paid', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Paid,
        ]);

        expect($request->isPaid())->toBeTrue()
            ->and($request->isPendingPayment())->toBeFalse();
    });

    it('checks if request is ready for claim', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::ReadyForClaim,
        ]);

        expect($request->isReadyForClaim())->toBeTrue()
            ->and($request->isClaimed())->toBeFalse();
    });

    it('checks if request is claimed', function () {
        $request = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Claimed,
        ]);

        expect($request->isClaimed())->toBeTrue()
            ->and($request->isReleased())->toBeFalse();
    });

    it('checks if request is in final state', function () {
        $finalRequest = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Released,
        ]);

        $activeRequest = DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Processing,
        ]);

        expect($finalRequest->isFinal())->toBeTrue()
            ->and($activeRequest->isFinal())->toBeFalse();
    });
});

describe('DocumentRequest Model Scopes', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();
        $this->student = Student::factory()->create(['user_id' => $this->user->id]);

        // Create requests with different statuses
        DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::PendingPayment,
        ]);

        DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Paid,
        ]);

        DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Processing,
        ]);

        DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::ReadyForClaim,
        ]);

        DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Claimed,
        ]);

        DocumentRequest::factory()->create([
            'student_id' => $this->student->student_id,
            'status' => DocumentRequestStatus::Released,
        ]);
    });

    it('filters active requests', function () {
        $activeRequests = DocumentRequest::active()->get();

        expect($activeRequests)->toHaveCount(5)
            ->and($activeRequests->pluck('status')->contains(DocumentRequestStatus::Released))->toBeFalse();
    });

    it('filters pending payment requests', function () {
        $pendingRequests = DocumentRequest::pendingPayment()->get();

        expect($pendingRequests)->toHaveCount(1)
            ->and($pendingRequests->first()->status)->toBe(DocumentRequestStatus::PendingPayment);
    });

    it('filters paid requests', function () {
        $paidRequests = DocumentRequest::paid()->get();

        expect($paidRequests)->toHaveCount(1)
            ->and($paidRequests->first()->status)->toBe(DocumentRequestStatus::Paid);
    });

    it('filters ready for claim requests', function () {
        $readyRequests = DocumentRequest::readyForClaim()->get();

        expect($readyRequests)->toHaveCount(1)
            ->and($readyRequests->first()->status)->toBe(DocumentRequestStatus::ReadyForClaim);
    });

    it('filters claimed requests', function () {
        $claimedRequests = DocumentRequest::claimed()->get();

        expect($claimedRequests)->toHaveCount(1)
            ->and($claimedRequests->first()->status)->toBe(DocumentRequestStatus::Claimed);
    });

    it('filters released requests', function () {
        $releasedRequests = DocumentRequest::released()->get();

        expect($releasedRequests)->toHaveCount(1)
            ->and($releasedRequests->first()->status)->toBe(DocumentRequestStatus::Released);
    });
});
