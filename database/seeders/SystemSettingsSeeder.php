<?php

namespace Database\Seeders;

use App\Models\SystemSetting;
use Illuminate\Database\Seeder;

class SystemSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Application Settings
            [
                'setting_key' => 'app_name',
                'value' => 'MINSUBC Systems',
                'type' => 'application',
                'description' => 'Application name displayed throughout the system',
            ],
            [
                'setting_key' => 'app_version',
                'value' => '1.0.0',
                'type' => 'application',
                'description' => 'Current application version',
            ],
            [
                'setting_key' => 'maintenance_mode',
                'value' => 'false',
                'type' => 'application',
                'description' => 'Whether the application is in maintenance mode',
            ],

            // Security Settings
            [
                'setting_key' => 'session_timeout',
                'value' => '7200', // 2 hours in seconds
                'type' => 'security',
                'description' => 'Session timeout in seconds',
            ],
            [
                'setting_key' => 'password_min_length',
                'value' => '8',
                'type' => 'security',
                'description' => 'Minimum password length requirement',
            ],
            [
                'setting_key' => 'two_factor_required',
                'value' => 'false',
                'type' => 'security',
                'description' => 'Whether two-factor authentication is required for all users',
            ],

            // Email Settings
            [
                'setting_key' => 'email_notifications_enabled',
                'value' => 'true',
                'type' => 'email',
                'description' => 'Whether email notifications are enabled',
            ],
            [
                'setting_key' => 'smtp_host',
                'value' => 'smtp.gmail.com',
                'type' => 'email',
                'description' => 'SMTP server hostname',
            ],
            [
                'setting_key' => 'smtp_port',
                'value' => '587',
                'type' => 'email',
                'description' => 'SMTP server port',
            ],

            // System Settings
            [
                'setting_key' => 'timezone',
                'value' => 'Asia/Manila',
                'type' => 'system',
                'description' => 'Default timezone for the application',
            ],
            [
                'setting_key' => 'date_format',
                'value' => 'Y-m-d',
                'type' => 'system',
                'description' => 'Default date format',
            ],
            [
                'setting_key' => 'max_upload_size',
                'value' => '10485760', // 10MB in bytes
                'type' => 'system',
                'description' => 'Maximum file upload size in bytes',
            ],

            // Feature Flags
            [
                'setting_key' => 'registrar_module_enabled',
                'value' => 'true',
                'type' => 'features',
                'description' => 'Whether the registrar module is enabled',
            ],
            [
                'setting_key' => 'usg_module_enabled',
                'value' => 'true',
                'type' => 'features',
                'description' => 'Whether the USG module is enabled',
            ],
            [
                'setting_key' => 'audit_logging_enabled',
                'value' => 'true',
                'type' => 'features',
                'description' => 'Whether audit logging is enabled',
            ],
        ];

        foreach ($settings as $setting) {
            SystemSetting::updateOrCreate(
                ['setting_key' => $setting['setting_key']],
                $setting
            );
        }
    }
}
