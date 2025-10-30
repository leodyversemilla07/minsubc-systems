<?php

namespace App\Modules\SAS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDigitalizedDocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update digitalized documents');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'document_title' => ['required', 'string', 'max:255'],
            'document_category' => ['required', Rule::in(['Scholarship', 'Insurance', 'Organization', 'Activity', 'Administrative', 'Other'])],
            'document_type' => ['nullable', 'string', 'max:100'],
            'file' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,doc,docx,xls,xlsx', 'max:10240'],
            'reference_number' => ['nullable', 'string', 'max:100'],
            'original_date' => ['nullable', 'date'],
            'academic_year' => ['nullable', 'string', 'max:20'],
            'related_entity_type' => ['nullable', 'string', 'max:100'],
            'related_entity_id' => ['nullable', 'integer'],
            'physical_location' => ['nullable', 'string', 'max:255'],
            'disposal_status' => ['nullable', Rule::in(['Physical Copy Exists', 'Pending Disposal Approval', 'Approved for Disposal', 'Disposed'])],
            'disposal_permit_number' => ['nullable', 'string', 'max:100'],
            'disposal_date' => ['nullable', 'date'],
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
            'document_title.required' => 'The document title is required.',
            'document_title.max' => 'The document title may not be greater than 255 characters.',
            'document_category.required' => 'The document category is required.',
            'document_category.in' => 'The selected document category is invalid.',
            'file.file' => 'The upload must be a valid file.',
            'file.mimes' => 'The file must be a PDF, JPG, JPEG, PNG, DOC, DOCX, XLS, or XLSX file.',
            'file.max' => 'The file may not be greater than 10MB.',
            'original_date.date' => 'The original date must be a valid date.',
            'related_entity_id.integer' => 'The related entity ID must be a number.',
            'disposal_status.in' => 'The selected disposal status is invalid.',
            'disposal_date.date' => 'The disposal date must be a valid date.',
        ];
    }
}
