<?php

namespace Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UpdateOfficerRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'photo' => [
                'nullable',
                File::image()
                    ->max('2mb')
                    ->types(['jpg', 'jpeg', 'png', 'webp']),
            ],
            'bio' => ['nullable', 'string'],
            'term_start' => ['nullable', 'date'],
            'term_end' => ['nullable', 'date', 'after_or_equal:term_start'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
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
            'name.required' => 'Officer name is required.',
            'position.required' => 'Position is required.',
            'email.email' => 'Invalid email format.',
            'photo.image' => 'File must be an image.',
            'photo.max' => 'Photo size cannot exceed 2MB.',
            'term_end.after_or_equal' => 'Term end date must be after or equal to start date.',
        ];
    }
}
