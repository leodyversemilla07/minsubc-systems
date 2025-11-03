<?php

namespace Modules\Registrar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmCashPaymentRequest extends FormRequest
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
            'payment_reference_number' => ['required', 'string'],
            'official_receipt_number' => ['required', 'string', 'unique:payments,official_receipt_number'],
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
            'payment_reference_number.required' => 'Payment reference number is required.',
            'official_receipt_number.required' => 'Official receipt number is required.',
            'official_receipt_number.unique' => 'This official receipt number has already been used.',
        ];
    }
}
