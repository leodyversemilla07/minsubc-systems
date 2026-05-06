@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-3xl px-4 py-8">
    <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Verify Transcript</h1>
        <p class="mt-1 text-sm text-gray-500">Verify the authenticity of a student's transcript</p>
    </div>

    <!-- Verification Form -->
    <form method="GET" class="mb-8">
        <div class="flex gap-4">
            <div class="flex-1">
                <input type="text" name="student_id" value="{{ request('student_id') }}" 
                       placeholder="Enter Student ID (e.g., MSU2024-0001)"
                       class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                       required>
            </div>
            <button type="submit" class="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
                Verify
            </button>
        </div>
    </form>

    @if(isset($verification) && $verification['verified'])
        <!-- Verified Result -->
        <div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div class="border-b border-green-200 bg-green-50 px-6 py-4 dark:border-green-900 dark:bg-green-900/20">
                <div class="flex items-center gap-3">
                    <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                        <h3 class="text-lg font-bold text-green-800 dark:text-green-200">Transcript Verified</h3>
                        <p class="text-sm text-green-600 dark:text-green-400">{{ $verification['message'] }}</p>
                    </div>
                </div>
            </div>
            
            <div class="p-6">
                <dl class="grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt class="text-sm font-medium text-gray-500">Student ID</dt>
                        <dd class="text-lg font-semibold text-gray-900 dark:text-white">{{ $verification['student_id'] }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">Student Name</dt>
                        <dd class="text-lg font-semibold text-gray-900 dark:text-white">{{ $verification['name'] }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">Total Semesters</dt>
                        <dd class="text-lg font-semibold text-gray-900 dark:text-white">{{ $verification['total_semesters'] }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                        <dd class="text-lg font-semibold text-gray-900 dark:text-white">
                            {{ $verification['last_updated'] ? Carbon\Carbon::parse($verification['last_updated'])->format('M d, Y') : 'N/A' }}
                        </dd>
                    </div>
                </dl>
            </div>
            
            <div class="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                <p class="text-xs text-gray-500">
                    <svg class="mr-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verification timestamp: {{ now()->format('F d, Y H:i:s') }}
                </p>
            </div>
        </div>
    @elseif(isset($verification) && !$verification['verified'])
        <!-- Not Found -->
        <div class="overflow-hidden rounded-xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
            <div class="p-6">
                <div class="flex items-center gap-3">
                    <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h3 class="text-lg font-bold text-red-800 dark:text-red-200">Verification Failed</h3>
                        <p class="text-sm text-red-600 dark:text-red-400">{{ $verification['message'] }}</p>
                    </div>
                </div>
            </div>
        </div>
    @else
        <!-- Instructions -->
        <div class="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">How to Verify</h3>
            <ol class="list-inside list-decimal space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Enter the student's official ID number in the field above</li>
                <li>Click the "Verify" button</li>
                <li>The system will confirm if the transcript is valid and show student details</li>
            </ol>
            
            <div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <p class="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> This verification system confirms that the transcript was generated by MinSU BC Systems 
                    and has not been tampered with.
                </p>
            </div>
        </div>
    @endif
</div>
@endsection