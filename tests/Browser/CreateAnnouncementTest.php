<?php

use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

describe('USG Admin Announcement Creation', function () {
    it('can visit the announcement creation page', function () {
        Notification::fake();

        // Create USG admin role if it doesn't exist
        $role = Role::firstOrCreate(['name' => 'usg-admin']);

        // Create user and assign role
        $user = User::factory()->create();
        $user->assignRole($role);

        actingAs($user);

        $page = visit('/usg/admin/announcements/create')
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Create New Announcement')
            ->assertSee('Basic Information')
            ->assertSee('Title')
            ->assertSee('Content')
            ->assertSee('Category')
            ->assertSee('Tags')
            ->assertSee('Featured Image')
            ->assertSee('Attachments')
            ->assertSee('Publishing Options')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });

    it('can fill out basic announcement form fields', function () {
        Notification::fake();

        // Create USG admin role if it doesn't exist
        $role = Role::firstOrCreate(['name' => 'usg-admin']);

        // Create user and assign role
        $user = User::factory()->create();
        $user->assignRole($role);

        actingAs($user);

        $page = visit('/usg/admin/announcements/create')
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Create New Announcement')
            ->fill('title', 'Test Announcement Title')
            ->fill('excerpt', 'This is a test excerpt for the announcement.')
            ->fill('content', 'This is the full content of the test announcement. It contains detailed information.')
            ->assertValue('title', 'Test Announcement Title')
            ->assertValue('excerpt', 'This is a test excerpt for the announcement.')
            ->assertValue('content', 'This is the full content of the test announcement. It contains detailed information.')
            ->assertNoJavascriptErrors();
    });

    it('can upload a featured image', function () {
        Notification::fake();

        // Create USG admin role if it doesn't exist
        $role = Role::firstOrCreate(['name' => 'usg-admin']);

        // Create user and assign role
        $user = User::factory()->create();
        $user->assignRole($role);

        actingAs($user);

        $page = visit('/usg/admin/announcements/create')
            ->on()->desktop()
            ->inLightMode();

        $imagePath = realpath(__DIR__.'/fixtures/test-image.jpg');

        $page->assertSee('Create New Announcement')
            ->attach('featured_image', $imagePath)
            ->wait(1000) // Wait for image preview to load
            ->assertNoJavascriptErrors();
    })->skip('File uploads require dev server with Vite running');

    it('can attach files', function () {
        Notification::fake();

        // Create USG admin role if it doesn't exist
        $role = Role::firstOrCreate(['name' => 'usg-admin']);

        // Create user and assign role
        $user = User::factory()->create();
        $user->assignRole($role);

        actingAs($user);

        $page = visit('/usg/admin/announcements/create')
            ->on()->desktop()
            ->inLightMode();

        $pdfPath = realpath(__DIR__.'/fixtures/test-file.pdf');

        $page->assertSee('Create New Announcement')
            ->attach('attachments[]', $pdfPath)
            ->wait(1000) // Wait for file to be processed
            ->assertNoJavascriptErrors();
    })->skip('File uploads require dev server with Vite running');
});
