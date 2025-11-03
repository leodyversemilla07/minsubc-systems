<?php

namespace Modules\Registrar\Services;

use Modules\Registrar\Models\DocumentRequest;
use Modules\Registrar\Models\Payment;

class PaymentService
{
    public function __construct(
        private RegistrarNotificationService $notificationService
    ) {}

    /**
     * Generate a unique payment reference number for cash payments
     */
    public function generatePaymentReference(DocumentRequest $request): string
    {
        do {
            $prn = 'PRN-'.now()->format('Ymd').'-'.str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (Payment::where('payment_reference_number', $prn)->exists());

        return $prn;
    }
}
