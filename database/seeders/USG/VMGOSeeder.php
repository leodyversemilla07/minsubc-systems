<?php

namespace Database\Seeders\USG;

use App\Models\Modules\USG\Models\VMGO;
use Illuminate\Database\Seeder;

class VMGOSeeder extends Seeder
{
    public function run(): void
    {
        VMGO::create([
            'vision' => 'The Mindoro State University is a center of excellence in agriculture and fishery, science, technology, culture and education of globally competitive lifelong learners in a diverse yet cohesive society.',
            'mission' => 'The University commits to produce 21st-century skilled lifelong learners and generates and commercializes innovative technologies by providing excellent and relevant services in instruction, research, extension, and production through industry-driven curricula, collaboration, internationalization, and continual organizational growth for sustainable development.',
            'goals' => [
                'Provide and broaden the access to quality education responsive to an ever growing and dynamic society.',
            ],
            'objectives' => [
                'Offer quality education',
                'Provide opportunities for the youth to develop their potentials as human beings and productive member of society',
                'Expand Financial assistance to poor but deserving students towards greater access to quality education',
                'Maximize productivity to sustain income generation',
                'Intensify research and extension services, which are relevant to the needs of community',
            ],
            'effective_date' => now(),
            'updated_by' => null,
        ]);
    }
}
