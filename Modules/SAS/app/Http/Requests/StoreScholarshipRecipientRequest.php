<?php

namespace Modules\SAS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreScholarshipRecipientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create scholarship recipients');
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
            'scholarship_id' => ['required', 'exists:scholarships,id'],
            'academic_year' => ['required', 'string', 'max:20'],
            'semester' => ['required', Rule::in(['1st', '2nd', 'Summer'])],
            'amount' => ['nullable', 'numeric', 'min:0', 'max:999999999.99'],
            'status' => ['required', Rule::in(['Active', 'Suspended', 'Completed', 'Cancelled'])],
            'date_awarded' => ['nullable', 'date'],
            'expiration_date' => ['nullable', 'date', 'after:date_awarded'],
            'remarks' => ['nullable', 'string'],
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
            'scholarship_id.required' => 'The scholarship is required.',
            'scholarship_id.exists' => 'The selected scholarship does not exist.',
            'academic_year.required' => 'The academic year is required.',
            'semester.required' => 'The semester is required.',
            'semester.in' => 'The selected semester is invalid.',
            'amount.numeric' => 'The amount must be a valid number.',
            'amount.min' => 'The amount must be at least 0.',
            'status.required' => 'The status is required.',
            'status.in' => 'The selected status is invalid.',
            'expiration_date.after' => 'The expiration date must be after the date awarded.',
        ];
    }
}
