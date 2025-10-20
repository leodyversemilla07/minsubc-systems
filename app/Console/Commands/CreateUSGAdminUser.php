<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class CreateUSGAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usg:create-admin
                           {--first_name= : First name of the admin user}
                           {--middle_name= : Middle name of the admin user (optional)}
                           {--last_name= : Last name of the admin user}
                           {--email= : Email address of the admin user}
                           {--password= : Password for the admin user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a USG admin user with the usg-admin role';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Creating USG Admin User');
        $this->info('======================');

        // Get user input
        $firstName = $this->option('first_name') ?? $this->ask('First name');
        $middleName = $this->option('middle_name') ?? $this->ask('Middle name (optional)', '');
        $lastName = $this->option('last_name') ?? $this->ask('Last name');
        $email = $this->option('email') ?? $this->ask('Email address');
        $password = $this->option('password') ?? $this->secret('Password');

        // Validate input
        $validator = Validator::make([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'password' => $password,
        ], [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            $this->error('Validation failed:');
            foreach ($validator->errors()->all() as $error) {
                $this->error('  ' . $error);
            }

            return 1;
        }

        // Check if usg-admin role exists
        if (! Role::where('name', 'usg-admin')->exists()) {
            $this->error('The usg-admin role does not exist. Please run the USG roles seeder first:');
            $this->info('php artisan db:seed --class=USGRolesAndPermissionsSeeder');

            return 1;
        }

        try {
            // Create the user
            $user = User::create([
                'first_name' => $firstName,
                'middle_name' => $middleName ?: null,
                'last_name' => $lastName,
                'email' => $email,
                'password' => Hash::make($password),
                'email_verified_at' => now(), // Auto-verify the admin user
            ]);

            // Assign the usg-admin role
            $user->assignRole('usg-admin');

            $this->info('✅ USG Admin user created successfully!');
            $this->table(['Field', 'Value'], [
                ['Name', $user->full_name],
                ['Email', $user->email],
                ['Role', 'usg-admin'],
                ['Created', $user->created_at->format('Y-m-d H:i:s')],
            ]);

            $this->info('The user can now log in at: ' . url('/login'));
            $this->info('USG Admin dashboard: ' . url('/usg/admin'));

            return 0;
        } catch (\Exception $e) {
            $this->error('Failed to create USG admin user: ' . $e->getMessage());

            return 1;
        }
    }
}
