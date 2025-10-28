<?php

namespace App\Modules\USG\Http\Requests;

use App\Enums\FOIPriority;
use App\Enums\FOIRequestType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFOIRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:5000'],
            'request_type' => ['required', 'string', Rule::in(FOIRequestType::values())],
            'priority' => ['nullable', 'string', Rule::in(FOIPriority::values())],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a title for your request.',
            'title.max' => 'The title cannot exceed 255 characters.',
            'description.required' => 'Please describe what you are requesting.',
            'description.max' => 'The description cannot exceed 5000 characters.',
            'request_type.required' => 'Please select a request type.',
            'request_type.in' => 'The selected request type is invalid.',
            'priority.in' => 'The selected priority is invalid.',
        ];
    }

    public function attributes(): array
    {
        return [
            'request_type' => 'request type',
        ];
    }
}
