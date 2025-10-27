<?php

namespace App\Modules\Registrar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReleaseDocumentRequest extends FormRequest
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
            'released_to' => ['required', 'string', 'max:100'],
            'released_id_type' => ['required', 'string', 'in:student_id,drivers_license,passport,others'],
            'released_id_number' => ['nullable', 'string', 'max:50'],
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
            'released_to.required' => 'Please specify who will receive the document.',
            'released_to.max' => 'Recipient name cannot exceed 100 characters.',
            'released_id_type.required' => 'Please select the type of ID presented.',
            'released_id_type.in' => 'Invalid ID type selected.',
            'released_id_number.max' => 'ID number cannot exceed 50 characters.',
        ];
    }
}
