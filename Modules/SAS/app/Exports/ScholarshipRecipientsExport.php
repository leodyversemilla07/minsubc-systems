<?php

namespace Modules\SAS\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Modules\SAS\Models\ScholarshipRecipient;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ScholarshipRecipientsExport implements FromQuery, WithHeadings, WithMapping, WithStyles
{
    public function __construct(protected array $filters = []) {}

    public function query()
    {
        $query = ScholarshipRecipient::query()
            ->with(['student', 'scholarship']);

        // Apply same filters as report service
        if (! empty($this->filters['scholarship_id'])) {
            $query->where('scholarship_id', $this->filters['scholarship_id']);
        }

        if (! empty($this->filters['status'])) {
            $query->where('status', $this->filters['status']);
        }

        if (! empty($this->filters['semester'])) {
            $query->where('semester', $this->filters['semester']);
        }

        if (! empty($this->filters['academic_year'])) {
            $query->where('academic_year', $this->filters['academic_year']);
        }

        if (! empty($this->filters['date_from'])) {
            $query->whereDate('date_awarded', '>=', $this->filters['date_from']);
        }

        if (! empty($this->filters['date_to'])) {
            $query->whereDate('date_awarded', '<=', $this->filters['date_to']);
        }

        return $query->latest('date_awarded');
    }

    public function headings(): array
    {
        return [
            'Recipient ID',
            'Student ID',
            'Student Name',
            'Email',
            'Scholarship Type',
            'Status',
            'Amount',
            'Semester',
            'Academic Year',
            'Date Awarded',
            'Expiration Date',
            'Renewal Status',
            'Requirements Complete',
            'Remarks',
        ];
    }

    public function map($recipient): array
    {
        return [
            $recipient->id,
            $recipient->student->student_id ?? 'N/A',
            $recipient->student->name ?? 'N/A',
            $recipient->student->email ?? 'N/A',
            $recipient->scholarship->scholarship_name ?? 'N/A',
            $recipient->status,
            '₱' . number_format($recipient->amount, 2),
            $recipient->semester,
            $recipient->academic_year,
            $recipient->date_awarded?->format('Y-m-d') ?? 'N/A',
            $recipient->expiration_date?->format('Y-m-d') ?? 'N/A',
            $recipient->renewal_status ?? 'N/A',
            $recipient->requirements_complete ? 'Yes' : 'No',
            $recipient->remarks ?? 'N/A',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold header
            1 => ['font' => ['bold' => true]],
        ];
    }
}
