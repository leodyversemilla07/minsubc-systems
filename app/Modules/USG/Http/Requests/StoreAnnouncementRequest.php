<?php

namespace App\Modules\USG\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnnouncementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['usg-officer', 'usg-admin', 'system-admin']);
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
            'content' => ['required', 'string'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'category' => ['nullable', 'string', 'max:100'],
            'featured_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'], // 5MB
            'attachments.*' => ['nullable', 'file', 'mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png', 'max:10240'], // 10MB
            'tags' => ['nullable', 'json'],
            'publish_at' => ['required', 'date'],
            'expires_at' => ['nullable', 'date', 'after:publish_at'],
            'is_published' => ['required', 'boolean'],
            'is_pinned' => ['required', 'boolean'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Convert string boolean values to actual booleans
        $isPublished = filter_var($this->is_published, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        $isPinned = filter_var($this->is_pinned, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

        $this->merge([
            'is_published' => $isPublished,
            'is_pinned' => $isPinned,
            // Convert is_published boolean to status enum
            'status' => $isPublished ? 'published' : 'draft',
            // Convert is_pinned boolean to priority enum
            'priority' => $isPinned ? 'high' : 'normal',
            // Map frontend field names to database field names
            'publish_date' => $this->publish_at,
            'expiry_date' => $this->expires_at,
        ]);
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'publish_at' => 'publish date',
            'expires_at' => 'expiration date',
            'is_published' => 'publication status',
            'is_pinned' => 'priority status',
            'featured_image' => 'featured image',
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
            'title.required' => 'Please enter an announcement title.',
            'title.max' => 'The title cannot exceed 255 characters.',
            'content.required' => 'Please enter the announcement content.',
            'excerpt.max' => 'The excerpt cannot exceed 500 characters.',
            'featured_image.image' => 'The featured image must be a valid image file.',
            'featured_image.mimes' => 'The featured image must be a JPG, JPEG, PNG, or WebP file.',
            'featured_image.max' => 'The featured image must not be larger than 5MB.',
            'attachments.*.mimes' => 'Attachments must be PDF, DOC, XLS, PPT, JPG, or PNG files.',
            'attachments.*.max' => 'Each attachment must not be larger than 10MB.',
            'publish_at.required' => 'Please select a publish date.',
            'expires_at.after' => 'The expiration date must be after the publish date.',
        ];
    }
}
