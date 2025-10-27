<?php

namespace Database\Factories;

use App\Models\SystemSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SystemSetting>
 */
class SystemSettingFactory extends Factory
{
    protected $model = SystemSetting::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['general', 'payment', 'notification', 'email', 'sms', 'security'];
        $keys = [
            'app_name',
            'app_description',
            'contact_email',
            'contact_phone',
            'payment_enabled',
            'notification_enabled',
            'maintenance_mode',
            'max_upload_size',
            'default_currency',
        ];

        return [
            'setting_key' => fake()->unique()->randomElement($keys),
            'value' => fake()->randomElement([
                fake()->word(),
                fake()->numberBetween(1, 100),
                fake()->boolean() ? 'true' : 'false',
                fake()->email(),
            ]),
            'type' => fake()->randomElement($types),
            'description' => fake()->boolean(70) ? fake()->sentence() : null,
            'is_encrypted' => false,
        ];
    }

    /**
     * Indicate that the setting is encrypted.
     */
    public function encrypted(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_encrypted' => true,
            'value' => 'encrypted_'.fake()->sha256(),
        ]);
    }

    /**
     * Indicate that the setting is not encrypted.
     */
    public function unencrypted(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_encrypted' => false,
        ]);
    }

    /**
     * Indicate that the setting is for payment configuration.
     */
    public function payment(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'payment',
            'setting_key' => fake()->randomElement([
                'payment_gateway',
                'payment_api_key',
                'payment_secret_key',
                'payment_webhook_url',
            ]),
            'is_encrypted' => fake()->boolean(70),
        ]);
    }

    /**
     * Indicate that the setting is for notification configuration.
     */
    public function notification(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'notification',
            'setting_key' => fake()->randomElement([
                'sms_provider',
                'sms_api_key',
                'email_from_address',
                'email_from_name',
            ]),
        ]);
    }

    /**
     * Indicate that the setting is for general configuration.
     */
    public function general(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'general',
            'setting_key' => fake()->randomElement([
                'app_name',
                'app_description',
                'contact_email',
                'contact_phone',
                'timezone',
            ]),
            'is_encrypted' => false,
        ]);
    }
}
