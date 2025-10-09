<?php

namespace App\Console\Commands;

use App\Models\SystemSetting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SetupPayMongoWebhook extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'paymongo:setup-webhook {url? : The webhook URL (optional, defaults to APP_URL/webhooks/paymongo)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Register webhook with PayMongo for payment notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔧 Setting up PayMongo Webhook...');
        $this->newLine();

        // Get PayMongo secret key
        $secretKey = SystemSetting::getValue('paymongo_secret_key');

        if (! $secretKey || $secretKey === 'sk_test_xxxxx') {
            $this->error('❌ PayMongo secret key not configured!');
            $this->line('Please update your PayMongo API keys first.');

            return Command::FAILURE;
        }

        // Determine webhook URL
        $webhookUrl = $this->argument('url') ?? config('app.url').'/webhooks/paymongo';

        $this->line("📍 Webhook URL: <fg=cyan>{$webhookUrl}</>");
        $this->newLine();

        if (! $this->confirm('Continue with this webhook URL?', true)) {
            $this->warn('Cancelled.');

            return Command::SUCCESS;
        }

        try {
            // Create webhook via PayMongo API
            $response = Http::withHeaders([
                'Authorization' => 'Basic '.base64_encode($secretKey.':'),
                'Content-Type' => 'application/json',
            ])->post('https://api.paymongo.com/v1/webhooks', [
                'data' => [
                    'attributes' => [
                        'url' => $webhookUrl,
                        'events' => [
                            'checkout.session.payment.paid',
                            'checkout.session.payment.failed',
                        ],
                    ],
                ],
            ]);

            if ($response->successful()) {
                $webhook = $response->json()['data'];
                $webhookId = $webhook['id'];
                $webhookSecret = $webhook['attributes']['secret_key'];

                $this->newLine();
                $this->info('✅ Webhook successfully registered with PayMongo!');
                $this->newLine();

                $this->line("🆔 Webhook ID: <fg=green>{$webhookId}</>");
                $this->line("🔑 Webhook Secret: <fg=yellow>{$webhookSecret}</>");
                $this->newLine();

                // Store webhook secret in system settings
                $setting = SystemSetting::updateOrCreate(
                    ['setting_key' => 'paymongo_webhook_secret'],
                    [
                        'setting_value' => $webhookSecret,
                        'description' => 'PayMongo webhook secret key for signature verification',
                    ]
                );

                SystemSetting::updateOrCreate(
                    ['setting_key' => 'paymongo_webhook_id'],
                    [
                        'setting_value' => $webhookId,
                        'description' => 'PayMongo webhook ID',
                    ]
                );

                $this->info('✅ Webhook secret saved to system settings!');
                $this->newLine();

                $this->line('📋 Listening for events:');
                $this->line('  • checkout.session.payment.paid');
                $this->line('  • checkout.session.payment.failed');

                return Command::SUCCESS;
            }

            $errorBody = $response->json();
            $this->error('❌ Failed to register webhook with PayMongo');
            $this->line(json_encode($errorBody, JSON_PRETTY_PRINT));

            return Command::FAILURE;

        } catch (\Exception $e) {
            $this->error('❌ Exception: '.$e->getMessage());

            return Command::FAILURE;
        }
    }
}
