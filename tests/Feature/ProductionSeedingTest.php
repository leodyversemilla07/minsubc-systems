<?php

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\DemoSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

it('seeds roles without creating demo users in production', function () {
    $this->app['env'] = 'production';

    $this->artisan('db:seed', [
        '--class' => DatabaseSeeder::class,
        '--force' => true,
    ])->assertExitCode(0);

    expect(Role::where('name', 'super-admin')->exists())->toBeTrue()
        ->and(Role::where('name', 'helpdesk-admin')->exists())->toBeTrue()
        ->and(User::count())->toBe(0);
});

it('leaves existing account credentials unchanged during production seeding', function () {
    $user = User::factory()->create([
        'email' => 'admin@minsubc.edu.ph',
        'password' => Hash::make('a-unique-existing-password'),
    ]);
    $originalPasswordHash = $user->password;
    $this->app['env'] = 'production';

    $this->artisan('db:seed', [
        '--class' => DatabaseSeeder::class,
        '--force' => true,
    ])->assertExitCode(0);

    expect(User::count())->toBe(1)
        ->and($user->fresh()->password)->toBe($originalPasswordHash);
});

it('does not create demo users when a demo seeder is invoked directly outside development', function (string $environment, string $seeder) {
    $this->app['env'] = $environment;

    $this->artisan('db:seed', [
        '--class' => $seeder,
        '--force' => true,
    ])->assertExitCode(0);

    expect(User::count())->toBe(0);
})->with(['production', 'staging'])->with([UserSeeder::class, DemoSeeder::class]);
