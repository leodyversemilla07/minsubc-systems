<?php

namespace Modules\Alumni\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Alumni\Models\Donation;

class DonationFactory extends Factory
{
    protected $model = Donation::class;

    public function definition(): array
    {
        return [
            'amount' => $this->faker->randomFloat(2, 500, 100000),
            'currency' => 'PHP',
            'donation_type' => $this->faker->randomElement(['monetary', 'in-kind']),
            'purpose' => $this->faker->randomElement(['general fund', 'scholarship', 'infrastructure', 'research']),
            'payment_method' => $this->faker->randomElement(['bank transfer', 'gcash', 'paymaya', 'cash']),
            'donated_at' => $this->faker->dateTimeBetween('-2 years'),
            'is_anonymous' => $this->faker->boolean(20),
        ];
    }
}