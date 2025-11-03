<?php

namespace Modules\Registrar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
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
            'student_id' => [
                'required',
                'string',
                'regex:/^MBC2025-\d{4}$/',
                'unique:students,student_id',
            ],
            'phone' => ['required', 'string', 'max:20'],
            'course' => ['required', 'string', 'max:100'],
            'year_level' => ['required', 'integer', 'min:1', 'max:4'],
            'campus' => ['required', 'string', 'max:50'],
            'status' => ['required', 'in:active,inactive,graduated'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'student_id.required' => 'Student ID is required.',
            'student_id.regex' => 'Student ID must be in the format MBC2025-XXXX (e.g., MBC2025-0001).',
            'student_id.unique' => 'This student ID is already taken.',
            'phone.required' => 'Phone number is required.',
            'course.required' => 'Course is required.',
            'year_level.required' => 'Year level is required.',
            'year_level.min' => 'Year level must be between 1 and 4.',
            'year_level.max' => 'Year level must be between 1 and 4.',
            'campus.required' => 'Campus is required.',
            'status.required' => 'Status is required.',
            'status.in' => 'Invalid status selected.',
        ];
    }
}
