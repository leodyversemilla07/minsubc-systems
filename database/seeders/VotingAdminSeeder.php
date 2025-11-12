<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class VotingAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('voting_admins')->insert([
            'username' => 'admin',
            'password' => '$2y$10$lQf6BzNGLpXmKLqlR0aulOBwCBthltGIMoGGIb5ro3HeHm8gpl8XC',
            'firstname' => 'kian',
            'lastname' => 'Rodriguez',
            'photo' => '440969875_1482253359391132_4061404540813449474_n.jpg',
            'created_on' => '2024-04-11',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
