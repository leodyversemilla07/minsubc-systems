<?php

namespace App\Modules\SAS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSASActivityRequest extends FormRequest
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
            'activity_title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'all_day' => ['boolean'],
            'location' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'organizer' => ['nullable', 'string', 'max:255'],
            'organization_id' => ['nullable', 'exists:organizations,id'],
            'color' => ['nullable', 'string', 'max:20'],
            'is_recurring' => ['boolean'],
            'recurrence_rule' => ['nullable', 'string'],
            'target_participants' => ['nullable', 'integer', 'min:0'],
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
            'activity_title.required' => 'The activity title is required.',
            'activity_title.max' => 'The activity title may not be greater than 255 characters.',
            'start_date.required' => 'The start date is required.',
            'start_date.date' => 'The start date must be a valid date.',
            'end_date.required' => 'The end date is required.',
            'end_date.date' => 'The end date must be a valid date.',
            'end_date.after_or_equal' => 'The end date must be on or after the start date.',
            'organization_id.exists' => 'The selected organization does not exist.',
            'target_participants.integer' => 'The target participants must be a number.',
            'target_participants.min' => 'The target participants must be at least 0.',
        ];
    }
}
