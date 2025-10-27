<?php

namespace App\Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'all_day' => ['boolean'],
            'category' => ['nullable', 'string', 'max:100'],
            'color' => ['nullable', 'string', 'max:20'],
            'organizer' => ['nullable', 'string', 'max:255'],
            'is_recurring' => ['boolean'],
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
            'title.required' => 'Event title is required.',
            'title.max' => 'Event title cannot exceed 255 characters.',
            'start_date.required' => 'Event start date is required.',
            'start_date.date' => 'Invalid start date format.',
            'end_date.date' => 'Invalid end date format.',
            'end_date.after_or_equal' => 'End date must be after or equal to start date.',
        ];
    }
}
