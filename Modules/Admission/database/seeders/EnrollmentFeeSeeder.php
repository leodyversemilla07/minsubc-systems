<?php

namespace Modules\Admission\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\EnrollmentFee;

class EnrollmentFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get active term
        $activeTerm = AcademicTerm::active()->first();

        if (!$activeTerm) {
            $activeTerm = AcademicTerm::first();
        }

        if (!$activeTerm) {
            return;
        }

        // Default fees for all terms
        $fees = [
            [
                'name' => 'Tuition Fee',
                'type' => 'tuition',
                'amount' => 150.00, // per unit
                'unit' => 'per unit',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 1,
                'description' => 'Basic tuition fee charged per unit',
            ],
            [
                'name' => 'Miscellaneous Fee',
                'type' => 'misc',
                'amount' => 2500.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 2,
                'description' => 'General miscellaneous fees',
            ],
            [
                'name' => 'Athletic Fee',
                'type' => 'misc',
                'amount' => 200.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 3,
                'description' => 'For athletic programs and activities',
            ],
            [
                'name' => 'Cultural Fee',
                'type' => 'misc',
                'amount' => 150.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 4,
                'description' => 'For cultural activities and programs',
            ],
            [
                'name' => 'Library Fee',
                'type' => 'misc',
                'amount' => 300.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 5,
                'description' => 'Library services and resources',
            ],
            [
                'name' => 'Laboratory Fee',
                'type' => 'lab',
                'amount' => 500.00,
                'unit' => 'per subject',
                'units' => null,
                'is_required' => false,
                'is_active' => true,
                'priority' => 6,
                'description' => 'Laboratory use for science and computing subjects',
            ],
            [
                'name' => 'Guidance Fee',
                'type' => 'misc',
                'amount' => 150.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 7,
                'description' => 'Counseling and guidance services',
            ],
            [
                'name' => 'Medical/Dental Fee',
                'type' => 'misc',
                'amount' => 250.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 8,
                'description' => 'Health services and medical consultations',
            ],
            [
                'name' => 'Student Publication Fee',
                'type' => 'misc',
                'amount' => 100.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 9,
                'description' => 'Student publication and newsletter',
            ],
            [
                'name' => 'Registration Fee',
                'type' => 'misc',
                'amount' => 500.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => true,
                'is_active' => true,
                'priority' => 10,
                'description' => 'One-time registration fee per semester',
            ],
            [
                'name' => 'ID Card Fee',
                'type' => 'other',
                'amount' => 200.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => false,
                'is_active' => true,
                'priority' => 11,
                'description' => 'Student ID card (new or replacement)',
            ],
            [
                'name' => 'NSTP Fee',
                'type' => 'other',
                'amount' => 1500.00,
                'unit' => 'flat rate',
                'units' => null,
                'is_required' => false,
                'is_active' => true,
                'priority' => 12,
                'description' => 'NSTP program fee (for 1st and 2nd year)',
            ],
        ];

        // Create fees for the active term
        foreach ($fees as $feeData) {
            EnrollmentFee::updateOrCreate(
                [
                    'academic_term_id' => $activeTerm->id,
                    'name' => $feeData['name'],
                ],
                array_merge($feeData, ['academic_term_id' => $activeTerm->id])
            );
        }

        // Also create fees for all other terms
        $otherTerms = AcademicTerm::where('id', '!=', $activeTerm->id)->get();

        foreach ($otherTerms as $term) {
            foreach ($fees as $feeData) {
                EnrollmentFee::firstOrCreate(
                    [
                        'academic_term_id' => $term->id,
                        'name' => $feeData['name'],
                    ],
                    array_merge($feeData, ['academic_term_id' => $term->id])
                );
            }
        }
    }
}