<?php

namespace Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDocumentRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx,xlsx,xls,txt', 'max:10240'], // 10MB max
            'category' => ['nullable', 'string', 'max:100'],
            'is_public' => ['boolean'],
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
            'title.required' => 'Document title is required.',
            'title.max' => 'Document title cannot exceed 255 characters.',
            'file.file' => 'The uploaded item must be a file.',
            'file.mimes' => 'File must be a PDF, Word document, Excel spreadsheet, or text file.',
            'file.max' => 'File size cannot exceed 10MB.',
            'category.max' => 'Category cannot exceed 100 characters.',
        ];
    }
}
