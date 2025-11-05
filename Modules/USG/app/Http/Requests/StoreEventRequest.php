<?php

namespace Modules\USG\Http\Requests;

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
            'description' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'event_date' => ['required', 'date'],
            'event_time' => ['required', 'date_format:H:i'],
            'end_date' => ['nullable', 'date', 'after_or_equal:event_date'],
            'end_time' => ['nullable', 'date_format:H:i'],
            'location' => ['required', 'string', 'max:255'],
            'venue_details' => ['nullable', 'string'],
            'featured_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'], // 5MB max
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
            'description.required' => 'Event description is required.',
            'event_date.required' => 'Event date is required.',
            'event_date.date' => 'Invalid event date format.',
            'event_time.required' => 'Event time is required.',
            'event_time.date_format' => 'Invalid time format. Use HH:MM format.',
            'end_date.date' => 'Invalid end date format.',
            'end_date.after_or_equal' => 'End date must be after or equal to event date.',
            'end_time.date_format' => 'Invalid time format. Use HH:MM format.',
            'location.required' => 'Event location is required.',
            'featured_image.image' => 'The file must be an image.',
            'featured_image.mimes' => 'The image must be a JPEG, PNG, JPG, or WebP file.',
            'featured_image.max' => 'The image must not be larger than 5MB.',
        ];
    }
}
