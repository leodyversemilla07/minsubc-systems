<?php

namespace App\Modules\Registrar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
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
        $student = $this->route('student');

        return [
            'student_id' => [
                'required',
                'string',
                Rule::unique('students', 'student_id')->ignore($student->student_id, 'student_id'),
            ],
            'user_id' => ['required', 'exists:users,id'],
            'phone' => ['nullable', 'string', 'max:20'],
            'course' => ['nullable', 'string', 'max:100'],
            'year_level' => ['nullable', 'integer', 'min:1', 'max:6'],
            'campus' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:active,inactive,graduated'],
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
            'student_id.required' => 'Student ID is required.',
            'student_id.unique' => 'This student ID is already taken by another student.',
            'user_id.required' => 'User account is required.',
            'user_id.exists' => 'Selected user does not exist.',
            'year_level.min' => 'Year level must be at least 1.',
            'year_level.max' => 'Year level cannot exceed 6.',
            'status.in' => 'Status must be active, inactive, or graduated.',
        ];
    }
}
