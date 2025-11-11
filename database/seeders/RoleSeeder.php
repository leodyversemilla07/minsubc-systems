<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles if they don't exist
        $roles = [
            'admin',
            'registrar',
            'registrar_staff',
            'sas',
            'sas_staff',
            'usg',
            'usg_staff',
            'voting_admin',
            'student',
            'faculty',
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }
    }
}
