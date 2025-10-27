<?php

namespace App\Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResolutionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['usg-officer', 'usg-admin', 'system-admin']);
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
            'resolution_number' => ['nullable', 'string', 'max:50', 'unique:resolutions,resolution_number'],
            'description' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'type' => ['nullable', 'string', 'max:100'],
            'author' => ['nullable', 'string', 'max:255'],
            'resolution_date' => ['required', 'date'],
            'file_path' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
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
            'title.required' => 'Resolution title is required.',
            'resolution_number.unique' => 'This resolution number already exists.',
            'content.required' => 'Resolution content is required.',
            'resolution_date.required' => 'Resolution date is required.',
            'resolution_date.date' => 'Invalid date format.',
            'file_path.file' => 'Invalid file.',
            'file_path.mimes' => 'File must be PDF or Word document.',
            'file_path.max' => 'File size cannot exceed 10MB.',
        ];
    }
}
