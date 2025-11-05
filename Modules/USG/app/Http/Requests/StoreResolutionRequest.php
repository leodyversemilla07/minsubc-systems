<?php

namespace Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreResolutionRequest extends FormRequest
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
        return [
            'title' => ['required', 'string', 'max:255'],
            'resolution_number' => ['nullable', 'string', 'max:50', 'unique:resolutions,resolution_number'],
            'description' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'string', 'in:published,archived'],
            'date_passed' => ['required', 'date'],
            'file' => [
                'required',
                File::types(['pdf'])
                    ->max('10mb'),
            ],
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
            'description.required' => 'Resolution description is required.',
            'date_passed.required' => 'Date passed is required.',
            'date_passed.date' => 'Invalid date format.',
            'file.required' => 'Resolution PDF document is required.',
            'file.file' => 'Invalid file.',
            'file.mimes' => 'File must be a PDF document.',
            'file.max' => 'File size cannot exceed 10MB.',
            'status.in' => 'Invalid status value.',
        ];
    }
}
