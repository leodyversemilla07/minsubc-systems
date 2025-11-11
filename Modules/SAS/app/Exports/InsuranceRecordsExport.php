<?php

namespace Modules\SAS\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Modules\SAS\Models\InsuranceRecord;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class InsuranceRecordsExport implements FromQuery, WithHeadings, WithMapping, WithStyles
{
    public function __construct(protected array $filters = []) {}

    public function query()
    {
        $query = InsuranceRecord::query()
            ->with(['student']);

        // Apply same filters as report service
        if (! empty($this->filters['policy_type'])) {
            $query->where('policy_type', $this->filters['policy_type']);
        }

        if (! empty($this->filters['status'])) {
            $query->where('status', $this->filters['status']);
        }

        if (! empty($this->filters['insurance_provider'])) {
            $query->where('insurance_provider', 'like', '%' . $this->filters['insurance_provider'] . '%');
        }

        if (! empty($this->filters['date_from'])) {
            $query->whereDate('effective_date', '>=', $this->filters['date_from']);
        }

        if (! empty($this->filters['date_to'])) {
            $query->whereDate('effective_date', '<=', $this->filters['date_to']);
        }

        return $query->latest('effective_date');
    }

    public function headings(): array
    {
        return [
            'Record ID',
            'Student ID',
            'Student Name',
            'Email',
            'Insurance Provider',
            'Policy Number',
            'Policy Type',
            'Coverage Amount',
            'Status',
            'Effective Date',
            'Expiration Date',
            'Beneficiary Name',
            'Beneficiary Relationship',
            'Submission Date',
        ];
    }

    public function map($record): array
    {
        return [
            $record->id,
            $record->student->student_id ?? 'N/A',
            $record->student->name ?? 'N/A',
            $record->student->email ?? 'N/A',
            $record->insurance_provider,
            $record->policy_number,
            $record->policy_type,
            '₱' . number_format($record->coverage_amount, 2),
            $record->status,
            $record->effective_date?->format('Y-m-d') ?? 'N/A',
            $record->expiration_date?->format('Y-m-d') ?? 'N/A',
            $record->beneficiary_name ?? 'N/A',
            $record->beneficiary_relationship ?? 'N/A',
            $record->submission_date?->format('Y-m-d') ?? 'N/A',
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
