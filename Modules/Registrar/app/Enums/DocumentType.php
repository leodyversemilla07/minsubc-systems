<?php

namespace Modules\Registrar\Enums;

enum DocumentType: string
{
    case TranscriptOfRecord = 'Transcript of Record';
    case CertificateOfGrades = 'Certificate of Grades';
    case CertificateOfEnrolment = 'Certificate of Enrolment';
    case CertificateOfGraduation = 'Certificate of Graduation';
    case CertificateOfGWA = 'Certificate of GWA';
    case CAV = 'Certification, Authentication, and Verification (CAV)';
    case ModeOfInstruction = 'Mode of Instruction Certificate';
    case CertificateOfUpper25 = 'Certificate of Upper 25%';
    case AuthenticationCertifyTrueCopy = 'Authentication / Certify True Copy';

    /**
     * Get the label for the document type
     */
    public function label(): string
    {
        return $this->value;
    }

    /**
     * Get the base price for the document type
     */
    public function basePrice(): float
    {
        return match ($this) {
            self::TranscriptOfRecord => 50.00, // per page
            self::CertificateOfGrades => 40.00,
            self::CertificateOfEnrolment => 40.00,
            self::CertificateOfGraduation => 40.00,
            self::CertificateOfGWA => 40.00,
            self::CAV => 40.00,
            self::ModeOfInstruction => 40.00,
            self::CertificateOfUpper25 => 40.00,
            self::AuthenticationCertifyTrueCopy => 10.00, // per page
        };
    }

    /**
     * Check if this document type is priced per page
     */
    public function isPerPage(): bool
    {
        return match ($this) {
            self::TranscriptOfRecord,
            self::AuthenticationCertifyTrueCopy => true,
            default => false,
        };
    }

    /**
     * Get processing time in days
     */
    public function processingDays(): string
    {
        return '5-7 working days';
    }

    /**
     * Get all document types as array
     */
    public static function toArray(): array
    {
        return array_map(fn ($case) => $case->value, self::cases());
    }

    /**
     * Get all document types with prices
     */
    public static function withPrices(): array
    {
        return array_map(function ($case) {
            $price = $case->basePrice();
            $priceLabel = $case->isPerPage() ? "₱{$price} per page" : "₱{$price}";

            return [
                'value' => $case->value,
                'label' => $case->label(),
                'price' => $price,
                'price_label' => $priceLabel,
                'is_per_page' => $case->isPerPage(),
                'processing_time' => $case->processingDays(),
            ];
        }, self::cases());
    }
}
