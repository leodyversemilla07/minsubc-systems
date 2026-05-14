<?php

namespace Modules\Facilities\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Facilities\Models\Facility;

class FacilityFactory extends Factory
{
    protected $model = Facility::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Lecture Hall A', 'Computer Lab 1', 'Science Lab', 'Audio Visual Room', 'Function Hall', 'Gymnasium', 'Seminar Room B', 'Library Annex']),
            'code' => $this->faker->unique()->regexify('FAC-[A-Z]{3}-\d{3}'),
            'type' => $this->faker->randomElement(['classroom', 'laboratory', 'hall', 'gym', 'meeting-room', 'auditorium']),
            'location' => $this->faker->randomElement(['Main Building', 'Science Building', 'Annex', 'Sports Complex']),
            'capacity' => $this->faker->numberBetween(20, 500),
            'building' => $this->faker->randomElement(['Main', 'Science', 'Engineering', 'Annex']),
            'floor' => $this->faker->randomElement(['Ground', '2nd', '3rd', '4th']),
            'is_available' => true,
            'amenities' => $this->faker->randomElements(['projector', 'ac', 'wifi', 'sound-system', 'whiteboard', 'comfort-room'], rand(2, 5)),
        ];
    }
}