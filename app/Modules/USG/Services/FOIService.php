<?php

namespace App\Modules\USG\Services;

use App\Enums\FOIRequestStatus;
use App\Modules\USG\Models\FOIRequest;
use App\Modules\USG\Models\FOIResponse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FOIService
{
    public function submitRequest(int $userId, array $data): FOIRequest
    {
        return DB::transaction(function () use ($userId, $data) {
            return FOIRequest::create([
                'user_id' => $userId,
                'title' => $data['title'],
                'description' => $data['description'],
                'request_type' => $data['request_type'] ?? 'information',
                'priority' => $data['priority'] ?? 'medium',
                'status' => FOIRequestStatus::Pending->value,
                'submitted_at' => now(),
            ]);
        });
    }

    public function updateStatus(
        int $requestId,
        FOIRequestStatus $status,
        int $reviewerId,
        ?string $reason = null
    ): FOIRequest {
        return DB::transaction(function () use ($requestId, $status, $reviewerId, $reason) {
            $request = FOIRequest::findOrFail($requestId);

            $updateData = [
                'status' => $status->value,
                'reviewer_id' => $reviewerId,
            ];

            if ($status === FOIRequestStatus::UnderReview && ! $request->reviewed_at) {
                $updateData['reviewed_at'] = now();
            } elseif ($status === FOIRequestStatus::Completed) {
                $updateData['completed_at'] = now();
            } elseif ($status === FOIRequestStatus::Rejected) {
                $updateData['rejected_at'] = now();
                $updateData['rejection_reason'] = $reason;
            }

            $request->update($updateData);

            return $request->fresh();
        });
    }

    public function addResponse(
        int $requestId,
        int $responderId,
        ?string $responseText = null,
        mixed $document = null
    ): FOIResponse {
        return DB::transaction(function () use ($requestId, $responderId, $responseText, $document) {
            $documentPath = null;

            if ($document) {
                $documentPath = $document->store('foi_responses', 'public');
            }

            return FOIResponse::create([
                'foi_request_id' => $requestId,
                'response_text' => $responseText,
                'document_path' => $documentPath,
                'responder_id' => $responderId,
            ]);
        });
    }

    public function deleteResponse(int $responseId): bool
    {
        return DB::transaction(function () use ($responseId) {
            $response = FOIResponse::findOrFail($responseId);

            if ($response->document_path) {
                Storage::disk('public')->delete($response->document_path);
            }

            return $response->delete();
        });
    }

    public function getPendingRequests(): Collection
    {
        return FOIRequest::with(['user', 'reviewer'])
            ->pending()
            ->orderBy('submitted_at', 'asc')
            ->get();
    }

    public function getRequestsUnderReview(): Collection
    {
        return FOIRequest::with(['user', 'reviewer'])
            ->underReview()
            ->orderBy('reviewed_at', 'asc')
            ->get();
    }

    public function getUserRequests(int $userId): Collection
    {
        return FOIRequest::with(['responses.responder', 'reviewer'])
            ->forUser($userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getRequestById(int $requestId): FOIRequest
    {
        return FOIRequest::with(['user', 'reviewer', 'responses.responder'])
            ->findOrFail($requestId);
    }

    public function addInternalNote(int $requestId, string $note): FOIRequest
    {
        $request = FOIRequest::findOrFail($requestId);
        $request->update(['internal_notes' => $note]);

        return $request->fresh();
    }
}
