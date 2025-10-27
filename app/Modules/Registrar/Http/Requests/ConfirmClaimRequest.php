<?php

namespace App\Modules\Registrar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmClaimRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'confirmation' => ['required', 'boolean'],
            'claim_notes' => ['nullable', 'string', 'max:500'],
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
            'confirmation.required' => 'Please confirm the claim.',
            'confirmation.boolean' => 'Invalid confirmation value.',
            'claim_notes.max' => 'Claim notes cannot exceed 500 characters.',
        ];
    }
}
