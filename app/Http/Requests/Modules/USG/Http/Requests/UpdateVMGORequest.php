<?php

namespace App\Http\Requests\Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVMGORequest extends FormRequest
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
            'vision' => ['required', 'string', 'max:5000'],
            'mission' => ['required', 'string', 'max:5000'],
            'goals' => ['required', 'array', 'min:1'],
            'goals.*' => ['required', 'string', 'max:1000'],
            'objectives' => ['required', 'array', 'min:1'],
            'objectives.*' => ['required', 'string', 'max:1000'],
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
            'goals.*' => 'goal',
            'objectives.*' => 'objective',
        ];
    }
}
