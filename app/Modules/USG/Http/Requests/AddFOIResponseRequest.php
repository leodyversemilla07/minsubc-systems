<?php

namespace App\Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddFOIResponseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['usg-officer', 'usg-admin', 'super-admin']);
    }

    public function rules(): array
    {
        return [
            'response_text' => ['nullable', 'string', 'max:5000'],
            'document' => ['nullable', 'file', 'mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'max:10240'],
        ];
    }

    public function messages(): array
    {
        return [
            'response_text.max' => 'The response text cannot exceed 5000 characters.',
            'document.mimes' => 'The document must be a PDF, DOC, XLS, JPG, or PNG file.',
            'document.max' => 'The document must not be larger than 10MB.',
        ];
    }

    public function attributes(): array
    {
        return [
            'response_text' => 'response text',
        ];
    }
}
