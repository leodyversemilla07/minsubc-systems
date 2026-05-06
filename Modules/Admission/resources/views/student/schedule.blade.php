@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Class Schedule</h1>
        <p class="mt-1 text-sm text-gray-500">Your weekly class schedule</p>
    </div>

    <!-- Legend -->
    <div class="mb-6 flex flex-wrap gap-4">
        @foreach($subjectColors as $subject => $color)
            <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded" style="background-color: {{ $color }}"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ $subject }}</span>
            </div>
        @endforeach
    </div>

    <!-- Schedule Grid -->
    <div class="overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table class="min-w-[1000px]">
            <thead>
                <tr class="bg-gray-50 dark:bg-gray-800">
                    <th class="sticky left-0 border-b border-r border-gray-200 px-4 py-3 text-center text-xs font-medium uppercase text-gray-500 dark:border-gray-700">
                        Time
                    </th>
                    @foreach(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as $day)
                        <th class="border-b border-gray-200 px-4 py-3 text-center text-xs font-medium uppercase text-gray-500 dark:border-gray-700">
                            {{ substr($day, 0, 3) }}
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @foreach($timeSlots as $slot)
                    <tr>
                        <td class="sticky left-0 border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-center text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800">
                            {{ $slot['start'] }}<br>
                            <span class="text-gray-400">-</span><br>
                            {{ $slot['end'] }}
                        </td>
                        @foreach(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as $day)
                            @php
                                $class = $schedule[$day][$slot['time']] ?? null;
                            @endphp
                            <td class="border-b border-gray-200 p-1 align-top dark:border-gray-700">
                                @if($class)
                                    <div class="rounded-lg p-2 text-xs" style="background-color: {{ $class['color'] }}20; border-left: 3px solid {{ $class['color'] }};">
                                        <p class="font-semibold text-gray-900 dark:text-white">{{ $class['subject'] }}</p>
                                        <p class="text-gray-600 dark:text-gray-400">{{ $class['room'] ?? 'TBA' }}</p>
                                        @if(isset($class['instructor']))
                                            <p class="mt-1 text-gray-500">{{ $class['instructor'] }}</p>
                                        @endif
                                    </div>
                                @endif
                            </td>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Schedule Summary -->
    <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Total Subjects</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $totalSubjects }}</p>
        </div>
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Total Units</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $totalUnits }}</p>
        </div>
        <div class="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p class="text-sm text-gray-500">Total Hours/Week</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $totalHours }} hrs</p>
        </div>
    </div>

    @if($scheduleDetails->isNotEmpty())
        <div class="mt-6">
            <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Detailed Schedule</h3>
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Subject</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Day</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Time</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Room</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Instructor</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                        @foreach($scheduleDetails as $item)
                            <tr>
                                <td class="px-4 py-3">
                                    <p class="font-medium text-gray-900 dark:text-white">{{ $item['subject'] }}</p>
                                </td>
                                <td class="px-4 py-3 text-sm capitalize">{{ $item['day'] }}</td>
                                <td class="px-4 py-3 text-sm">{{ $item['start_time'] }} - {{ $item['end_time'] }}</td>
                                <td class="px-4 py-3 text-sm">{{ $item['room'] ?? 'TBA' }}</td>
                                <td class="px-4 py-3 text-sm">{{ $item['instructor'] ?? 'TBA' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
</div>
@endsection