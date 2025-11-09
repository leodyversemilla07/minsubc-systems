<?php

namespace Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UpdateTransparencyReportRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'type' => ['sometimes', 'required', 'string', 'max:100'],
            'status' => ['sometimes', 'required', 'string', 'in:draft,published'],
            'report_period_start' => ['sometimes', 'required', 'date'],
            'report_period_end' => ['sometimes', 'required', 'date', 'after_or_equal:report_period_start'],
            'file' => [
                'nullable',
                File::types(['pdf', 'doc', 'docx', 'xlsx', 'xls'])
                    ->max('20mb'),
            ],
            'data' => ['nullable', 'array'],
            'published_at' => ['nullable', 'date'],
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
            'title.required' => 'Transparency report title is required.',
            'title.max' => 'Title cannot exceed 255 characters.',
            'type.required' => 'Report type is required.',
            'type.max' => 'Report type cannot exceed 100 characters.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be either draft or published.',
            'report_period_start.required' => 'Report period start date is required.',
            'report_period_start.date' => 'Report period start must be a valid date.',
            'report_period_end.required' => 'Report period end date is required.',
            'report_period_end.date' => 'Report period end must be a valid date.',
            'report_period_end.after_or_equal' => 'Report period end must be after or equal to the start date.',
            'file.mimes' => 'File must be a PDF, Word document, or Excel spreadsheet.',
            'file.max' => 'File size cannot exceed 20MB.',
            'published_at.date' => 'Published date must be a valid date.',
        ];
    }
}
