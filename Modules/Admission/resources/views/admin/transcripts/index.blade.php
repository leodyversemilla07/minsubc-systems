@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Transcript Management</h1>
            <p class="mt-1 text-sm text-gray-500">Generate and manage official transcripts</p>
        </div>
        <a href="{{ route('admission.admin.transcripts.verify') }}"
           class="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verify Transcript
        </a>
    </div>

    <!-- Filters -->
    <form method="GET" class="mb-6 rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div class="flex flex-wrap items-end gap-4">
            <div class="flex-1 min-w-[200px]">
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Search Student</label>
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Name, ID, or email..."
                       class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
            </div>
            <div class="flex-1 min-w-[200px]">
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Course</label>
                <select name="course" class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                    <option value="">All Courses</option>
                    @foreach($courses as $course)
                        <option value="{{ $course }}" {{ request('course') == $course ? 'selected' : '' }}>{{ $course }}</option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Search
            </button>
        </div>
    </form>

    <!-- Students List -->
    <div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Student ID</th>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Course</th>
                    <th class="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Year</th>
                    <th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                @forelse($students as $student)
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td class="px-4 py-3">
                            <span class="font-mono font-medium text-gray-900 dark:text-white">{{ $student->student_id }}</span>
                        </td>
                        <td class="px-4 py-3">
                            <p class="font-medium text-gray-900 dark:text-white">{{ $student->user->full_name ?? 'N/A' }}</p>
                            <p class="text-xs text-gray-500">{{ $student->user->email ?? '' }}</p>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ $student->course ?? 'N/A' }}</td>
                        <td class="px-4 py-3 text-center text-sm">{{ $student->year_level ?? 1 }}</td>
                        <td class="px-4 py-3 text-right">
                            <div class="flex justify-end gap-2">
                                <a href="{{ route('admission.admin.transcripts.preview', $student->student_id) }}"
                                   target="_blank"
                                   class="rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                                    Preview
                                </a>
                                <a href="{{ route('admission.admin.transcripts.download', $student->student_id) }}"
                                   class="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
                                    Download
                                </a>
                                <a href="{{ route('admission.admin.transcripts.true-copy', $student->student_id) }}"
                                   class="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 dark:border-green-900 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800">
                                    TCOG
                                </a>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="py-12 text-center text-sm text-gray-500">
                            No students found.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{ $students->withQueryString()->links() }}
</div>
@endsection