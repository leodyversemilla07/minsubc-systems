@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Grade Management</h1>
            <p class="mt-1 text-sm text-gray-500">Enter and manage student grades</p>
        </div>
        <div class="flex gap-2">
            <a href="{{ route('admission.admin.grades.export', request()->only(['section_id', 'academic_year', 'semester'])) }}"
               class="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
            </a>
        </div>
    </div>

    <!-- Filters -->
    <form method="GET" class="mb-6 rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div class="flex flex-wrap items-end gap-4">
            <div class="flex-1 min-w-[200px]">
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Academic Year</label>
                <select name="academic_year" class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                    <option value="">All Years</option>
                    @foreach($academicYears as $year)
                        <option value="{{ $year }}" {{ request('academic_year') == $year ? 'selected' : '' }}>{{ $year }}</option>
                    @endforeach
                </select>
            </div>
            <div class="flex-1 min-w-[200px]">
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Section</label>
                <select name="section_id" class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                    <option value="">All Sections</option>
                    @foreach($sections as $section)
                        <option value="{{ $section->id }}" {{ request('section_id') == $section->id ? 'selected' : '' }}>
                            {{ $section->name }} ({{ $section->course?->name }})
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="flex-1 min-w-[200px]">
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Search Student</label>
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Student name..."
                       class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
            </div>
            <button type="submit" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Filter
            </button>
        </div>
    </form>

    <!-- Statistics -->
    <div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Total Students</p>
            <p class="text-2xl font-bold">{{ $stats['total_students'] }}</p>
        </div>
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Grades Posted</p>
            <p class="text-2xl font-bold">{{ $stats['total_grades'] }}</p>
        </div>
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Passed</p>
            <p class="text-2xl font-bold text-green-600">{{ $stats['passed'] }}</p>
        </div>
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Failed</p>
            <p class="text-2xl font-bold text-red-600">{{ $stats['failed'] }}</p>
        </div>
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Pass Rate</p>
            <p class="text-2xl font-bold text-blue-600">{{ $stats['pass_rate'] }}%</p>
        </div>
    </div>

    <!-- Students List -->
    <div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Student</th>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Section</th>
                    <th class="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Subjects</th>
                    <th class="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Avg Grade</th>
                    <th class="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">GPA</th>
                    <th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                @forelse($enrollments as $enrollment)
                    @php
                        $subjects = $enrollment->subjects;
                        $grades = $subjects->filter(fn($s) => $s->grade !== null);
                        $avg = $grades->count() > 0 ? $grades->avg('grade') : null;
                    @endphp
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td class="px-4 py-3">
                            <p class="font-medium text-gray-900 dark:text-white">{{ $enrollment->full_name }}</p>
                            <p class="text-xs text-gray-500">{{ $enrollment->student_id ?? 'No ID' }}</p>
                        </td>
                        <td class="px-4 py-3">
                            <p class="text-sm">{{ $enrollment->section?->name ?? 'TBA' }}</p>
                            <p class="text-xs text-gray-500">{{ $enrollment->academic_year }} / {{ $enrollment->semester }}</p>
                        </td>
                        <td class="px-4 py-3 text-center text-sm">
                            {{ $subjects->count() }} subjects
                        </td>
                        <td class="px-4 py-3 text-center">
                            @if($avg !== null)
                                <span class="text-lg font-bold {{ $avg >= 75 ? 'text-green-600' : 'text-red-600' }}">
                                    {{ number_format($avg, 1) }}
                                </span>
                            @else
                                <span class="text-gray-400">N/A</span>
                            @endif
                        </td>
                        <td class="px-4 py-3 text-center">
                            @if($enrollment->subjects->whereNotNull('grade')->count() > 0)
                                <span class="text-sm font-medium">{{ number_format($enrollment->gpa ?? 0, 2) }}</span>
                            @else
                                <span class="text-gray-400">—</span>
                            @endif
                        </td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('student.enrollment.show', $enrollment) }}"
                               class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                                Enter Grades
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="py-12 text-center text-sm text-gray-500">
                            No students found.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{ $enrollments->withQueryString()->links() }}
</div>
@endsection