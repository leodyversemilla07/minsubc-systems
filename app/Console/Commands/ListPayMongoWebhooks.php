<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ListPayMongoWebhooks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'paymongo:list-webhooks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all registered PayMongo webhooks';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('📋 Fetching PayMongo Webhooks...');
        $this->newLine();

        // Get PayMongo secret key
        $secretKey = config('services.paymongo.secret_key');

        if (! $secretKey || $secretKey === 'sk_test_xxxxx') {
            $this->error('❌ PayMongo secret key not configured!');
            $this->line('Please set PAYMONGO_SECRET_KEY in your .env file.');

            return Command::FAILURE;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic '.base64_encode($secretKey.':'),
            ])->get('https://api.paymongo.com/v1/webhooks');

            if ($response->successful()) {
                $webhooks = $response->json()['data'];

                if (empty($webhooks)) {
                    $this->warn('No webhooks registered yet.');
                    $this->newLine();
                    $this->line('Run <fg=cyan>php artisan paymongo:setup-webhook</> to create one.');

                    return Command::SUCCESS;
                }

                $this->info('Found '.count($webhooks).' webhook(s):');
                $this->newLine();

                foreach ($webhooks as $webhook) {
                    $attributes = $webhook['attributes'];
                    $this->line("🆔 ID: <fg=green>{$webhook['id']}</>");
                    $this->line("📍 URL: <fg=cyan>{$attributes['url']}</>");
                    $this->line("🔔 Status: <fg=yellow>{$attributes['status']}</>");
                    $this->line('📋 Events:');
                    foreach ($attributes['events'] as $event) {
                        $this->line("   • {$event}");
                    }
                    $this->line("📅 Created: {$attributes['created_at']}");
                    $this->newLine();
                }

                return Command::SUCCESS;
            }

            $this->error('❌ Failed to fetch webhooks');
            $this->line($response->body());

            return Command::FAILURE;
        } catch (\Exception $e) {
            $this->error('❌ Exception: '.$e->getMessage());

            return Command::FAILURE;
        }
    }
}
