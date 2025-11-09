<?php

namespace Modules\VotingSystem\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VoterLoginRequest extends FormRequest
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
            'election_id' => ['required', 'exists:elections,id'],
            'voters_id' => ['required', 'string'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'election_id.required' => 'Please select an election.',
            'election_id.exists' => 'The selected election is not valid.',
            'voters_id.required' => 'Please enter your voter ID.',
            'password.required' => 'Please enter your password.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'voters_id' => 'voter ID',
            'election_id' => 'election',
        ];
    }
}
