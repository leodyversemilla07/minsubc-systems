<?php

namespace Modules\Facilities\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Facilities\Models\Equipment;
use Modules\Facilities\Models\Facility;

class EquipmentFactory extends Factory
{
    protected $model = Equipment::class;

    public function definition(): array
    {
        return [
            'facility_id' => Facility::factory(),
            'name' => $this->faker->randomElement(['Projector', 'Laptop Cart', 'Sound System', 'Microphone', 'Extension Cord', 'TV Monitor', 'Speaker', 'Tripod Screen']),
            'code' => $this->faker->unique()->regexify('EQP-\d{4}'),
            'quantity' => $this->faker->numberBetween(1, 20),
            'available_quantity' => function (array $attrs) { return $attrs['quantity']; },
            'condition' => $this->faker->randomElement(['good', 'fair', 'needs-repair']),
            'status' => 'available',
        ];
    }
}