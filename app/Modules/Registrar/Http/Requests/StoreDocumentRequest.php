<?php

namespace App\Modules\Registrar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // For now, allow all authenticated users
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'document_type' => 'required|string|in:coe,cog,tor,honorable_dismissal,certificate_good_moral,cav,diploma,so,form_137',
            'processing_type' => 'required|string|in:regular,rush',
            'quantity' => 'required|integer|min:1|max:10',
            'purpose' => 'required|string|max:500',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'document_type.required' => 'Please select a document type.',
            'document_type.in' => 'Invalid document type selected.',
            'processing_type.required' => 'Please select a processing type.',
            'processing_type.in' => 'Invalid processing type selected.',
            'quantity.required' => 'Please specify the quantity.',
            'quantity.integer' => 'Quantity must be a number.',
            'quantity.min' => 'Quantity must be at least 1.',
            'quantity.max' => 'Quantity cannot exceed 10.',
            'purpose.required' => 'Please provide a purpose for the request.',
            'purpose.max' => 'Purpose cannot exceed 500 characters.',
        ];
    }
}
