<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'student_id' => [
                'required',
                'string',
                'regex:/^(2018|2019)-(000[1-9]|00[1-9][0-9]|0[1-9][0-9]{2}|[1-2][0-9]{3}|3000)$|^MBC(2020|2021|2022|2023|2024|2025)-\d{4}$/',
                'unique:students,student_id',
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'course' => ['nullable', 'string', 'max:100'],
            'year_level' => ['nullable', 'integer', 'min:1', 'max:4'],
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
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email address is required.',
            'email.unique' => 'This email address is already registered.',
            'password.required' => 'Password is required.',
            'password.confirmed' => 'Password confirmation does not match.',
            'student_id.required' => 'Student ID is required.',
            'student_id.unique' => 'This student ID is already registered.',
            'student_id.regex' => 'Invalid student ID format.',
            'year_level.min' => 'Year level must be between 1 and 4.',
            'year_level.max' => 'Year level must be between 1 and 4.',
        ];
    }
}
