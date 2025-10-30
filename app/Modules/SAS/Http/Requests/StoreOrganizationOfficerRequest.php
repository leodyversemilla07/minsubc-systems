<?php

namespace App\Modules\SAS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrganizationOfficerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create organization officers');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'organization_id' => ['required', 'exists:organizations,id'],
            'student_id' => ['required', 'exists:users,id'],
            'position' => ['required', 'string', 'max:100'],
            'term_start' => ['required', 'date'],
            'term_end' => ['nullable', 'date', 'after:term_start'],
            'responsibilities' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,jpg,png', 'max:5120'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
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
            'organization_id.required' => 'The organization is required.',
            'organization_id.exists' => 'The selected organization does not exist.',
            'student_id.required' => 'The student is required.',
            'student_id.exists' => 'The selected student does not exist.',
            'position.required' => 'The position is required.',
            'term_start.required' => 'The term start date is required.',
            'term_start.date' => 'The term start must be a valid date.',
            'term_end.date' => 'The term end must be a valid date.',
            'term_end.after' => 'The term end must be after the term start.',
            'photo.image' => 'The photo must be an image.',
            'photo.mimes' => 'The photo must be a JPEG, JPG, or PNG file.',
            'photo.max' => 'The photo may not be greater than 5MB.',
            'contact_email.email' => 'The contact email must be a valid email address.',
        ];
    }
}
