@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Grades</h1>
            <p class="mt-1 text-sm text-gray-500">View your academic grades and performance</p>
        </div>
        <div class="flex items-center gap-4">
            <div class="text-right">
                <p class="text-sm text-gray-500">Cumulative GPA</p>
                <p class="text-3xl font-bold text-blue-600">{{ number_format($cumulativeGPA, 2) }}</p>
            </div>
        </div>
    </div>

    <!-- Academic Standing -->
    <div class="mb-6">
        <div class="rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-gray-800 dark:to-gray-800">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Academic Standing</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $academicStanding }}</p>
                </div>
                <div class="flex gap-8">
                    <div class="text-center">
                        <p class="text-3xl font-bold text-green-600">{{ $passedSubjects }}</p>
                        <p class="text-sm text-gray-500">Passed</p>
                    </div>
                    <div class="text-center">
                        <p class="text-3xl font-bold text-red-600">{{ $failedSubjects }}</p>
                        <p class="text-sm text-gray-500">Failed</p>
                    </div>
                    <div class="text-center">
                        <p class="text-3xl font-bold text-gray-600">{{ $totalSubjects }}</p>
                        <p class="text-sm text-gray-500">Total</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Grade Records by Semester -->
    @forelse($gradeRecords as $record)
        <div class="mb-6 overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div class="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            {{ $record['academic_year'] }} - {{ $record['semester'] }} Semester
                        </h3>
                        <p class="text-sm text-gray-500">{{ $record['section'] ?? 'N/A' }}</p>
                    </div>
                    <div class="flex items-center gap-6">
                        <div class="text-right">
                            <p class="text-xs text-gray-500">Semester GPA</p>
                            <p class="text-xl font-bold {{ $record['gpa'] >= 3.0 ? 'text-green-600' : ($record['gpa'] >= 2.0 ? 'text-yellow-600' : 'text-red-600') }}">
                                {{ number_format($record['gpa'], 2) }}
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-gray-500">Avg Grade</p>
                            <p class="text-xl font-bold text-gray-700 dark:text-gray-300">
                                {{ $record['average'] ? number_format($record['average'], 1) : 'N/A' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <table class="min-w-full">
                <thead class="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Subject</th>
                        <th class="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">Units</th>
                        <th class="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">Grade</th>
                        <th class="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">Points</th>
                        <th class="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    @foreach($record['subjects'] as $subject)
                        <tr>
                            <td class="px-6 py-4">
                                <p class="font-medium text-gray-900 dark:text-white">{{ $subject['code'] }}</p>
                                <p class="text-sm text-gray-500">{{ $subject['name'] }}</p>
                            </td>
                            <td class="px-6 py-4 text-center text-sm">{{ $subject['units'] }}</td>
                            <td class="px-6 py-4 text-center">
                                <span class="text-lg font-bold {{ $subject['grade'] >= 75 ? 'text-green-600' : 'text-red-600' }}">
                                    {{ $subject['grade'] !== null ? number_format($subject['grade'], 0) : 'INC' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-center text-sm">
                                {{ $subject['grade'] !== null ? number_format($subject['points'], 1) : '-' }}
                            </td>
                            <td class="px-6 py-4 text-center">
                                @if($subject['status'] === 'passed')
                                    <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                        Passed
                                    </span>
                                @elseif($subject['status'] === 'failed')
                                    <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                        Failed
                                    </span>
                                @elseif($subject['status'] === 'incomplete')
                                    <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                        Incomplete
                                    </span>
                                @else
                                    <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                        {{ ucfirst($subject['status']) }}
                                    </span>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @empty
        <div class="rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Grade Records Yet</h3>
            <p class="mt-2 text-sm text-gray-500">Your academic grades will appear here once they are posted.</p>
        </div>
    @endforelse

    <!-- Grade Scale Legend -->
    <div class="mt-8 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Grade Scale</h3>
        <div class="grid gap-4 md:grid-cols-2">
            <div>
                <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Grading System (4.0 Scale)</h4>
                <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>98-100 = 4.0 | 95-97 = 3.9 | 92-94 = 3.7 | 89-91 = 3.5</p>
                    <p>86-88 = 3.2 | 83-85 = 3.0 | 80-82 = 2.7 | 77-79 = 2.5</p>
                    <p>75-76 = 2.3 | Below 75 = 0.0 (Failed)</p>
                </div>
            </div>
            <div>
                <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Academic Standing</h4>
                <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>3.5+ = Dean's Lister | 3.0-3.49 = Honors</p>
                    <p>2.5-2.99 = Good | 2.0-2.49 = Satisfactory</p>
                    <p>1.5-1.99 = Warning | Below 1.5 = Academic Probation</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection