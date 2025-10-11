<?php

namespace App\Modules\Registrar\Http\Requests;

use App\Enums\DocumentType;
use App\Modules\Registrar\Models\DocumentRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        $student = $user?->student;

        if (! $student) {
            return false;
        }

        // Check if daily limit has been reached for this student
        if (DocumentRequest::hasReachedDailyLimit($student->student_id)) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $purposeOptions = [
            'Scholarship',
            'Provincial scholarship',
            'Municipal scholarship',
            'Educational assistance',
            'Financial assistance',
            'Other (please specify)',
        ];

        return [
            'document_type' => ['required', 'string', Rule::enum(DocumentType::class)],
            'quantity' => 'required|integer|min:1|max:10',
            'purpose' => ['required', 'string', Rule::in($purposeOptions)],
            'custom_purpose' => 'required_if:purpose,Other (please specify)|nullable|string|max:500',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'document_type.required' => 'Please select a document type.',
            'quantity.required' => 'Please specify the quantity.',
            'quantity.integer' => 'Quantity must be a number.',
            'quantity.min' => 'Quantity must be at least 1.',
            'quantity.max' => 'Quantity cannot exceed 10.',
            'purpose.required' => 'Please select a purpose for the request.',
            'purpose.in' => 'Invalid purpose selected.',
            'custom_purpose.required_if' => 'Please specify your custom purpose.',
            'custom_purpose.max' => 'Custom purpose cannot exceed 500 characters.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // If purpose is "Other", combine it with custom_purpose for storage
        if ($this->purpose === 'Other (please specify)' && $this->custom_purpose) {
            $this->merge([
                'purpose' => 'Other: '.$this->custom_purpose,
            ]);
        }
    }

    /**
     * Handle a failed authorization attempt.
     */
    protected function failedAuthorization(): void
    {
        $user = $this->user();
        $student = $user?->student;

        if (! $student) {
            abort(403, 'Student record not found. Please contact the registrar.');
        }

        $remaining = DocumentRequest::getRemainingDailyRequests($student->student_id);
        $dailyLimit = \App\Models\SystemSetting::getDailyLimit();

        abort(429, "Daily document request limit has been reached. You have submitted {$dailyLimit} requests today. Please try again tomorrow.");
    }
}
