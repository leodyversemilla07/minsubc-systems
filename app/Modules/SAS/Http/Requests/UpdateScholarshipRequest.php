<?php

namespace App\Modules\SAS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateScholarshipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow if user is authenticated (middleware already checks roles)
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $scholarshipId = $this->route('scholarship');

        return [
            'scholarship_name' => ['required', 'string', 'max:255'],
            'scholarship_code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('scholarships', 'scholarship_code')->ignore($scholarshipId),
            ],
            'scholarship_type' => ['required', Rule::in(['TES', 'TDP', 'CHED Merit', 'Private', 'University', 'Other'])],
            'description' => ['nullable', 'string'],
            'provider' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
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
            'scholarship_name.required' => 'The scholarship name is required.',
            'scholarship_name.max' => 'The scholarship name may not be greater than 255 characters.',
            'scholarship_code.required' => 'The scholarship code is required.',
            'scholarship_code.unique' => 'This scholarship code is already in use.',
            'scholarship_type.required' => 'The scholarship type is required.',
            'scholarship_type.in' => 'The selected scholarship type is invalid.',
            'is_active.boolean' => 'The is active field must be true or false.',
        ];
    }
}
