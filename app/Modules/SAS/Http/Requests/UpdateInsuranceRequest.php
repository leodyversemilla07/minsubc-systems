<?php

namespace App\Modules\SAS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateInsuranceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update insurance records');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => ['required', 'exists:users,id'],
            'insurance_provider' => ['required', 'string', 'max:255'],
            'policy_number' => ['required', 'string', 'max:100'],
            'policy_type' => ['nullable', 'string', 'max:100'],
            'coverage_amount' => ['nullable', 'numeric', 'min:0', 'max:999999999999.99'],
            'effective_date' => ['required', 'date'],
            'expiration_date' => ['required', 'date', 'after:effective_date'],
            'status' => ['required', Rule::in(['Pending Review', 'Approved', 'Rejected', 'Expired', 'Renewed'])],
            'beneficiary_name' => ['nullable', 'string', 'max:255'],
            'beneficiary_relationship' => ['nullable', 'string', 'max:100'],
            'policy_document' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
            'review_notes' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'student_id.required' => 'The student is required.',
            'student_id.exists' => 'The selected student does not exist.',
            'insurance_provider.required' => 'The insurance provider is required.',
            'policy_number.required' => 'The policy number is required.',
            'coverage_amount.numeric' => 'The coverage amount must be a valid number.',
            'coverage_amount.min' => 'The coverage amount must be at least 0.',
            'effective_date.required' => 'The effective date is required.',
            'effective_date.date' => 'The effective date must be a valid date.',
            'expiration_date.required' => 'The expiration date is required.',
            'expiration_date.after' => 'The expiration date must be after the effective date.',
            'status.required' => 'The status is required.',
            'status.in' => 'The selected status is invalid.',
            'policy_document.file' => 'The policy document must be a file.',
            'policy_document.mimes' => 'The policy document must be a PDF, JPG, JPEG, or PNG file.',
            'policy_document.max' => 'The policy document may not be greater than 10MB.',
        ];
    }
}
