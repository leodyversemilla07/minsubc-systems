<?php

namespace Modules\SAS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrganizationRequest extends FormRequest
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
        return [
            'organization_name' => ['required', 'string', 'max:255'],
            'organization_code' => ['required', 'string', 'max:50', 'unique:organizations,organization_code'],
            'organization_type' => ['required', Rule::in(['Major', 'Minor'])],
            'category' => ['nullable', 'string', 'max:100'],
            'mission' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'establishment_date' => ['nullable', 'date'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,jpg,png', 'max:5120'], // 5MB max
            'adviser_id' => ['nullable', 'exists:users,id'],
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
            'organization_name.required' => 'The organization name is required.',
            'organization_name.max' => 'The organization name may not be greater than 255 characters.',
            'organization_code.required' => 'The organization code is required.',
            'organization_code.unique' => 'This organization code is already in use.',
            'organization_type.required' => 'The organization type is required.',
            'organization_type.in' => 'The selected organization type is invalid.',
            'logo.image' => 'The logo must be an image.',
            'logo.mimes' => 'The logo must be a JPEG, JPG, or PNG file.',
            'logo.max' => 'The logo may not be greater than 5MB.',
            'adviser_id.exists' => 'The selected adviser does not exist.',
            'contact_email.email' => 'The contact email must be a valid email address.',
        ];
    }
}
