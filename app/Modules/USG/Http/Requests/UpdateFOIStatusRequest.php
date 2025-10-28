<?php

namespace App\Modules\USG\Http\Requests;

use App\Enums\FOIRequestStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFOIStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['usg-officer', 'usg-admin', 'super-admin']);
    }

    public function rules(): array
    {
        return [
            'status' => ['required', 'string', Rule::in(FOIRequestStatus::values())],
            'rejection_reason' => ['required_if:status,rejected', 'nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'status.required' => 'Please select a status.',
            'status.in' => 'The selected status is invalid.',
            'rejection_reason.required_if' => 'Please provide a reason for rejection.',
            'rejection_reason.max' => 'The rejection reason cannot exceed 1000 characters.',
        ];
    }

    public function attributes(): array
    {
        return [
            'rejection_reason' => 'rejection reason',
        ];
    }
}
