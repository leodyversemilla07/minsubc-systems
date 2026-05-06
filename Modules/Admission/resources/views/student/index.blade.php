@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Enrollments</h1>
        <p class="mt-1 text-sm text-gray-500">Manage your course enrollments and view your academic records</p>
    </div>

    <!-- Current Enrollment Status -->
    @if($currentEnrollment)
        <div class="mb-8 overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div class="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Current Enrollment</h2>
                        <p class="text-sm text-gray-500">{{ $currentEnrollment->academic_year }} - {{ $currentEnrollment->semester }} Semester</p>
                    </div>
                    <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium {{ $currentEnrollment->status === 'enrolled' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' }}">
                        {{ ucfirst($currentEnrollment->status) }}
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                <div class="grid gap-6 md:grid-cols-3">
                    <div>
                        <p class="text-sm text-gray-500">Program</p>
                        <p class="text-lg font-semibold">{{ $currentEnrollment->program ?? $currentEnrollment->section?->course?->name ?? 'N/A' }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Year Level</p>
                        <p class="text-lg font-semibold">{{ $currentEnrollment->year_level }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Section</p>
                        <p class="text-lg font-semibold">{{ $currentEnrollment->section?->name ?? 'Not Assigned' }}</p>
                    </div>
                </div>
                
                <div class="mt-6 grid gap-6 md:grid-cols-4">
                    <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p class="text-sm text-blue-600">Total Subjects</p>
                        <p class="text-2xl font-bold text-blue-700">{{ $currentEnrollment->total_subjects }}</p>
                    </div>
                    <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                        <p class="text-sm text-green-600">Total Units</p>
                        <p class="text-2xl font-bold text-green-700">{{ $currentEnrollment->total_units }}</p>
                    </div>
                    <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                        <p class="text-sm text-purple-600">Total Fees</p>
                        <p class="text-2xl font-bold text-purple-700">₱{{ number_format($currentEnrollment->total_fees, 2) }}</p>
                    </div>
                    <div class="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                        <p class="text-sm text-orange-600">Balance</p>
                        <p class="text-2xl font-bold text-orange-700">₱{{ number_format($currentEnrollment->balance, 2) }}</p>
                    </div>
                </div>
                
                <div class="mt-6 flex gap-3">
                    <a href="{{ route('student.enrollment.show', $currentEnrollment) }}" 
                       class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        View Details
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="{{ route('student.enrollment.schedule') }}" 
                       class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                        View Schedule
                    </a>
                </div>
            </div>
        </div>
    @else
        <!-- No Current Enrollment -->
        <div class="mb-8 overflow-hidden rounded-xl border border-dashed border-gray-300 bg-white p-12 dark:border-gray-700 dark:bg-gray-900">
            <div class="text-center">
                <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Active Enrollment</h3>
                <p class="mt-2 text-sm text-gray-500">You don&apos;t have an active enrollment for this semester.</p>
                @if($canEnroll)
                    <a href="{{ route('student.enrollment.enroll') }}" 
                       class="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Enroll Now
                    </a>
                @endif
            </div>
        </div>
    @endif

    <!-- Quick Links -->
    <div class="grid gap-6 md:grid-cols-4">
        <a href="{{ route('student.enrollment.grades') }}" class="group rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div class="flex items-center gap-4">
                <div class="rounded-full bg-green-100 p-3 text-green-600 group-hover:bg-green-200 dark:bg-green-900/30">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">My Grades</h3>
                    <p class="text-sm text-gray-500">View your grades and GPA</p>
                </div>
            </div>
        </a>
        
        <a href="{{ route('student.enrollment.schedule') }}" class="group rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div class="flex items-center gap-4">
                <div class="rounded-full bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-200 dark:bg-blue-900/30">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">Class Schedule</h3>
                    <p class="text-sm text-gray-500">View your weekly schedule</p>
                </div>
            </div>
        </a>
        
        <a href="{{ route('student.enrollment.payment') }}" class="group rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div class="flex items-center gap-4">
                <div class="rounded-full bg-orange-100 p-3 text-orange-600 group-hover:bg-orange-200 dark:bg-orange-900/30">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">Payments</h3>
                    <p class="text-sm text-gray-500">Manage your payments</p>
                </div>
            </div>
        </a>
        
        <a href="{{ route('student.enrollment.history') }}" class="group rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div class="flex items-center gap-4">
                <div class="rounded-full bg-purple-100 p-3 text-purple-600 group-hover:bg-purple-200 dark:bg-purple-900/30">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">History</h3>
                    <p class="text-sm text-gray-500">Past enrollments</p>
                </div>
            </div>
        </a>
    </div>

    <!-- Enrollment History -->
    @if($enrollmentHistory->isNotEmpty())
        <div class="mt-8">
            <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Enrollment History</h2>
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Academic Year</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Semester</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Program</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">GPA</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                        @foreach($enrollmentHistory as $enrollment)
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td class="px-4 py-3 text-sm">{{ $enrollment->academic_year }}</td>
                                <td class="px-4 py-3 text-sm">{{ $enrollment->semester }}</td>
                                <td class="px-4 py-3 text-sm">{{ $enrollment->program ?? $enrollment->section?->course?->name ?? 'N/A' }}</td>
                                <td class="px-4 py-3">
                                    <span class="inline-flex rounded-full px-2 py-1 text-xs font-medium {{ $enrollment->status === 'enrolled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800' }}">
                                        {{ ucfirst($enrollment->status) }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm">{{ $enrollment->gpa ? number_format($enrollment->gpa, 2) : 'N/A' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
</div>
@endsection