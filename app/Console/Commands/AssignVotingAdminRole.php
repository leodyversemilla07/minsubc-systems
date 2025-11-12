<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class AssignVotingAdminRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'voting:assign-admin {email : The email of the user to assign as voting-admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign the voting-admin role to a user by email';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email');

        $user = User::where('email', $email)->first();

        if (! $user) {
            $this->error("User with email '{$email}' not found.");

            return self::FAILURE;
        }

        $role = Role::where('name', 'voting-admin')->first();

        if (! $role) {
            $this->error('voting-admin role not found. Please run the VotingSystemPermissionsSeeder first.');
            $this->info('Run: php artisan db:seed --class=VotingSystemPermissionsSeeder');

            return self::FAILURE;
        }

        if ($user->hasRole('voting-admin')) {
            $this->info("User '{$user->name}' ({$email}) already has the voting-admin role.");

            return self::SUCCESS;
        }

        $user->assignRole('voting-admin');

        $this->info("Successfully assigned 'voting-admin' role to {$user->name} ({$email})");
        $this->info('This user can now access all Voting System admin features.');

        return self::SUCCESS;
    }
}
