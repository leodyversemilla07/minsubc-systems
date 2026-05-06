@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
        <div>
            <a href="{{ route('admission.admin.grades.index') }}" class="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Grades
            </a>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Enter Grades - {{ $section->name }}</h1>
            <p class="mt-1 text-sm text-gray-500">
                {{ $section->course?->name ?? 'N/A' }} | {{ $section->academic_year }} / {{ $section->semester }}
            </p>
        </div>
        <div class="flex gap-2">
            <a href="{{ route('admission.admin.grades.sheet', $section) }}" target="_blank"
               class="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Sheet
            </a>
            <a href="{{ route('admission.admin.grades.export', ['section_id' => $section->id]) }}"
               class="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
            </a>
        </div>
    </div>

    <!-- Subjects Info -->
    <div class="mb-6 grid gap-4 md:grid-cols-4">
        @foreach($subjects as $subject)
            <div class="rounded-lg border bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <p class="text-xs font-medium text-gray-500">{{ $subject->code }}</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ $subject->name }}</p>
                <p class="text-xs text-gray-500">{{ $subject->units }} units</p>
            </div>
        @endforeach
    </div>

    <!-- Grade Entry Form -->
    @forelse($enrollments as $enrollment)
        <form action="{{ route('admission.admin.grades.submit', $enrollment) }}" method="POST" class="mb-6">
            @csrf
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div class="border-b bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-medium text-gray-900 dark:text-white">{{ $enrollment->full_name }}</h3>
                            <p class="text-xs text-gray-500">Student ID: {{ $enrollment->student_id ?? 'N/A' }}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-xs text-gray-500">Current GPA</p>
                                <p class="text-lg font-bold" id="gpa-{{ $enrollment->id }}">
                                    {{ number_format($enrollment->gpa ?? 0, 2) }}
                                </p>
                            </div>
                            <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {{ $enrollment->status === 'enrolled' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' }}">
                                {{ ucfirst($enrollment->status) }}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="p-4">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Subject</th>
                                <th class="w-24 px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Units</th>
                                <th class="w-32 px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Grade</th>
                                <th class="w-32 px-3 py-2 text-center text-xs font-medium uppercase text-gray-500">Status</th>
                                <th class="w-40 px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Remarks</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                            @php
                                $enrolledSubjects = $enrollment->subjects->filter(fn($s) => $s->status === 'enrolled');
                                // If no enrolled subjects, show all section subjects
                                $displaySubjects = $enrolledSubjects->isEmpty() ? $subjects : $enrolledSubjects->map(fn($es) => $es->subject);
                            @endphp
                            @foreach($displaySubjects as $es)
                                @php
                                    $subject = $es->subject ?? $es;
                                    $enrollmentSubject = $enrollment->subjects->firstWhere('subject_id', $subject->id);
                                    $currentGrade = $enrollmentSubject?->grade;
                                @endphp
                                <tr>
                                    <td class="px-3 py-2">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ $subject->code }}</p>
                                        <p class="text-xs text-gray-500">{{ $subject->name }}</p>
                                    </td>
                                    <td class="px-3 py-2 text-center text-sm">{{ $subject->units }}</td>
                                    <td class="px-3 py-2">
                                        <input type="number" name="grades[{{ $subject->id }}][grade]" 
                                               value="{{ $currentGrade }}"
                                               min="0" max="100" step="0.01"
                                               placeholder="—"
                                               class="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-center text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 {{ $currentGrade !== null && $currentGrade >= 75 ? 'bg-green-50 dark:bg-green-900/20' : ($currentGrade !== null ? 'bg-red-50 dark:bg-red-900/20' : '') }}"
                                               onchange="this.classList.toggle('bg-green-50', this.value >= 75); this.classList.toggle('bg-red-50', this.value && this.value < 75);">
                                        <input type="hidden" name="grades[{{ $subject->id }}][subject_id]" value="{{ $subject->id }}">
                                    </td>
                                    <td class="px-3 py-2 text-center">
                                        <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium {{ $currentGrade === null ? 'bg-gray-100 text-gray-600' : ($currentGrade >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') }}">
                                            {{ $currentGrade === null ? 'No Grade' : ($currentGrade >= 75 ? 'Passed' : 'Failed') }}
                                        </span>
                                    </td>
                                    <td class="px-3 py-2">
                                        <input type="text" name="grades[{{ $subject->id }}][remarks]" 
                                               value="{{ $enrollmentSubject?->remarks }}"
                                               placeholder="Optional remarks..."
                                               class="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-800">
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                
                <div class="border-t bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                    <button type="submit" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        Save Grades for {{ $enrollment->full_name }}
                    </button>
                </div>
            </div>
        </form>
    @empty
        <div class="rounded-lg border border-dashed p-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Students Enrolled</h3>
            <p class="mt-1 text-sm text-gray-500">There are no students enrolled in this section yet.</p>
        </div>
    @endforelse

    <!-- Bulk Upload Section -->
    <div class="mt-8 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Bulk Upload Grades</h3>
        <form action="{{ route('admission.admin.grades.bulk-upload') }}" method="POST" enctype="multipart/form-data" class="flex items-end gap-4">
            @csrf
            <input type="hidden" name="section_id" value="{{ $section->id }}">
            <div class="flex-1">
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">CSV File</label>
                <input type="file" name="csv_file" accept=".csv,.txt" required
                       class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800">
            </div>
            <button type="submit" class="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                Upload CSV
            </button>
        </form>
        <p class="mt-2 text-xs text-gray-500">
            CSV Format: student_id, subject_code, grade, remarks
        </p>
    </div>
</div>
@endsection