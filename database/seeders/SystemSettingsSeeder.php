<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SystemSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'setting_key' => 'regular_processing_days',
                'setting_value' => '5-7',
                'description' => 'Regular processing time in working days',
            ],
            [
                'setting_key' => 'rush_processing_days',
                'setting_value' => '2-3',
                'description' => 'Rush processing time in working days',
            ],
            [
                'setting_key' => 'coe_regular_price',
                'setting_value' => '100',
                'description' => 'COE regular processing price in PHP',
            ],
            [
                'setting_key' => 'coe_rush_price',
                'setting_value' => '200',
                'description' => 'COE rush processing price in PHP',
            ],
            [
                'setting_key' => 'cog_regular_price',
                'setting_value' => '100',
                'description' => 'COG regular processing price in PHP',
            ],
            [
                'setting_key' => 'cog_rush_price',
                'setting_value' => '200',
                'description' => 'COG rush processing price in PHP',
            ],
            [
                'setting_key' => 'tor_regular_price',
                'setting_value' => '100',
                'description' => 'TOR regular processing price in PHP',
            ],
            [
                'setting_key' => 'tor_rush_price',
                'setting_value' => '200',
                'description' => 'TOR rush processing price in PHP',
            ],
            [
                'setting_key' => 'honorable_dismissal_regular_price',
                'setting_value' => '100',
                'description' => 'Honorable Dismissal regular processing price in PHP',
            ],
            [
                'setting_key' => 'honorable_dismissal_rush_price',
                'setting_value' => '200',
                'description' => 'Honorable Dismissal rush processing price in PHP',
            ],
            [
                'setting_key' => 'cav_regular_price',
                'setting_value' => '100',
                'description' => 'CAV regular processing price in PHP',
            ],
            [
                'setting_key' => 'cav_rush_price',
                'setting_value' => '200',
                'description' => 'CAV rush processing price in PHP',
            ],
            [
                'setting_key' => 'diploma_regular_price',
                'setting_value' => '100',
                'description' => 'Diploma regular processing price in PHP',
            ],
            [
                'setting_key' => 'diploma_rush_price',
                'setting_value' => '200',
                'description' => 'Diploma rush processing price in PHP',
            ],
            [
                'setting_key' => 'cash_payment_deadline_hours',
                'setting_value' => '48',
                'description' => 'Hours before cash payment expires',
            ],
            [
                'setting_key' => 'paymongo_public_key',
                'setting_value' => 'pk_test_xxxxx',
                'description' => 'PayMongo public key',
            ],
            [
                'setting_key' => 'paymongo_secret_key',
                'setting_value' => 'sk_test_xxxxx',
                'description' => 'PayMongo secret key (encrypted)',
            ],
            [
                'setting_key' => 'sms_provider',
                'setting_value' => 'semaphore',
                'description' => 'SMS service provider (semaphore, m360)',
            ],
            [
                'setting_key' => 'sms_api_key',
                'setting_value' => 'your_sms_api_key',
                'description' => 'SMS service API key',
            ],
            [
                'setting_key' => 'semaphore_sender_name',
                'setting_value' => 'MinSU-DRS',
                'description' => 'Semaphore SMS sender name',
            ],
            [
                'setting_key' => 'email_provider',
                'setting_value' => 'sendgrid',
                'description' => 'Email service provider (sendgrid, aws_ses)',
            ],
            [
                'setting_key' => 'email_api_key',
                'setting_value' => 'your_email_api_key',
                'description' => 'Email service API key',
            ],
        ];

        foreach ($settings as $setting) {
            DB::table('system_settings')->updateOrInsert(
                ['setting_key' => $setting['setting_key']],
                $setting
            );
        }
    }
}
