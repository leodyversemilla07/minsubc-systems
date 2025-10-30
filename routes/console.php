<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// USG Module Scheduled Tasks
Schedule::command('usg:archive-expired')
    ->daily()
    ->at('00:00')
    ->timezone('Asia/Manila')
    ->description('Archive expired USG announcements and past events');

// SAS Module Scheduled Tasks
Schedule::command('sas:send-reminders')
    ->daily()
    ->at('08:00')
    ->timezone('Asia/Manila')
    ->description('Send SAS reminders for scholarships, insurance, and requirements');
