<?php

namespace Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVMGORequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['usg-admin', 'super-admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vision' => ['required', 'string'],
            'mission' => ['required', 'string'],
            'goals' => ['required', 'array', 'min:1'],
            'goals.*' => ['required', 'string'],
            'objectives' => ['required', 'array', 'min:1'],
            'objectives.*' => ['required', 'string'],
            'effective_date' => ['nullable', 'date'],
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
            'vision.required' => 'Vision statement is required.',
            'mission.required' => 'Mission statement is required.',
            'goals.required' => 'At least one goal is required.',
            'goals.*.required' => 'Each goal must have content.',
            'objectives.required' => 'At least one objective is required.',
            'objectives.*.required' => 'Each objective must have content.',
        ];
    }
}
