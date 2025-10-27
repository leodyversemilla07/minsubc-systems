<?php

namespace App\Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateResolutionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['usg-officer', 'usg-admin', 'super-admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $resolutionId = $this->route('id');

        return [
            'title' => ['required', 'string', 'max:255'],
            'resolution_number' => ['nullable', 'string', 'max:50', Rule::unique('usg_resolutions', 'resolution_number')->ignore($resolutionId)],
            'description' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'type' => ['nullable', 'string', 'max:100'],
            'author' => ['nullable', 'string', 'max:255'],
            'resolution_date' => ['required', 'date'],
            'file_path' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'status' => ['nullable', 'string', 'in:draft,pending,published,archived'],
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
            'status.in' => 'Invalid resolution status.',
        ];
    }
}
