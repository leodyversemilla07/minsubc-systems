<?php

namespace App\Modules\Registrar\Services;

use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Student;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class DocumentGenerator
{
    /**
     * Generate a document PDF for the given request
     */
    public function generateDocument(DocumentRequest $request): string
    {
        $method = $this->getGenerationMethod($request->document_type);

        if (! method_exists($this, $method)) {
            throw new \InvalidArgumentException("Document type '{$request->document_type}' is not supported");
        }

        return $this->{$method}($request, $request->student);
    }

    /**
     * Map document types to generation methods
     */
    private function getGenerationMethod(string $documentType): string
    {
        return match ($documentType) {
            'coe' => 'generateCoe',
            'tor' => 'generateTor',
            'cog' => 'generateCog', // Certificate of Good Moral Character
            'certificate_good_moral' => 'generateCog',
            'honorable_dismissal' => 'generateHonorableDismissal',
            'cav' => 'generateCav',
            'diploma' => 'generateDiploma',
            'grades' => 'generateGrades', // Certificate of Grades
            'so' => 'generateStandingOrder',
            'form_137' => 'generateForm137',
            default => throw new \InvalidArgumentException("Unknown document type: {$documentType}")
        };
    }

    /**
     * Generate Certificate of Enrollment (COE)
     */
    private function generateCoe(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'valid_until' => now()->addMonths(6)->format('F j, Y'),
        ];

        $pdf = Pdf::loadView('documents.coe', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'COE_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Transcript of Records (TOR)
     */
    private function generateTor(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'academic_records' => $this->getAcademicRecords($student),
        ];

        $pdf = Pdf::loadView('documents.tor', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'TOR_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Certificate of Good Moral Character (COG)
     */
    private function generateCog(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'purpose' => $request->purpose ?? 'For employment purposes',
        ];

        $pdf = Pdf::loadView('documents.cog', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'COG_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Certificate of Grades
     */
    private function generateGrades(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'grades' => $this->getGradeRecords($student),
        ];

        $pdf = Pdf::loadView('documents.grades', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'Grades_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Honorable Dismissal
     */
    private function generateHonorableDismissal(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'transfer_to' => $request->purpose ?? 'Another institution',
        ];

        $pdf = Pdf::loadView('documents.honorable_dismissal', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'Honorable_Dismissal_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Certificate of Authentication and Verification (CAV)
     */
    private function generateCav(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'purpose' => $request->purpose ?? 'For authentication purposes',
        ];

        $pdf = Pdf::loadView('documents.cav', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'CAV_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Diploma
     */
    private function generateDiploma(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'graduation_date' => $this->getGraduationDate($student),
        ];

        $pdf = Pdf::loadView('documents.diploma', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'Diploma_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Standing Order (SO)
     */
    private function generateStandingOrder(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'purpose' => $request->purpose ?? 'For academic purposes',
        ];

        $pdf = Pdf::loadView('documents.so', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'SO_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate Form 137
     */
    private function generateForm137(DocumentRequest $request, Student $student): string
    {
        $data = [
            'student' => $student,
            'request' => $request,
            'qr_code' => $this->generateQrCode($request),
            'issued_date' => now()->format('F j, Y'),
            'academic_records' => $this->getAcademicRecords($student),
        ];

        $pdf = Pdf::loadView('documents.form_137', $data);
        $pdf->setPaper('a4', 'portrait');

        $filename = 'Form_137_'.$request->request_number.'.pdf';
        $path = 'documents/'.$filename;

        Storage::put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate QR code for document verification
     */
    private function generateQrCode(DocumentRequest $request): string
    {
        $verificationData = [
            'request_number' => $request->request_number,
            'student_id' => $request->student_id,
            'document_type' => $request->document_type,
            'issued_date' => now()->toDateString(),
            'verification_hash' => hash('sha256', $request->request_number.$request->student_id.config('app.key')),
        ];

        $qrCodeData = json_encode($verificationData);

        $renderer = new ImageRenderer(
            new RendererStyle(200),
            new SvgImageBackEnd
        );

        $writer = new Writer($renderer);

        return 'data:image/svg+xml;base64,'.base64_encode($writer->writeString($qrCodeData));
    }

    /**
     * Get academic records for TOR
     */
    private function getAcademicRecords(Student $student): array
    {
        // This would typically come from a grades/enrollment database
        // For now, return sample data
        return [
            ['subject' => 'Mathematics', 'grade' => '1.25', 'units' => 3],
            ['subject' => 'English', 'grade' => '1.50', 'units' => 3],
            ['subject' => 'Science', 'grade' => '1.75', 'units' => 3],
            ['subject' => 'History', 'grade' => '1.00', 'units' => 3],
        ];
    }

    /**
     * Get grade records for grades certificate
     */
    private function getGradeRecords(Student $student): array
    {
        // This would typically come from a grades database
        // For now, return sample data
        return [
            ['subject' => 'Programming 1', 'grade' => '1.25', 'semester' => '1st Semester 2024'],
            ['subject' => 'Database Management', 'grade' => '1.50', 'semester' => '1st Semester 2024'],
            ['subject' => 'Web Development', 'grade' => '1.75', 'semester' => '2nd Semester 2024'],
        ];
    }

    /**
     * Get graduation date for diploma
     */
    private function getGraduationDate(Student $student): string
    {
        // This would typically come from student records
        // For now, return a sample date
        return 'April 15, 2025';
    }
}
