<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;
use Modules\USG\Models\Announcement;

use function Pest\Laravel\actingAs;

describe('USG Announcement Publish Flow', function () {
    beforeEach(function () {
        $this->seed(RolesAndPermissionsSeeder::class);
        Storage::fake('public');
    });

    it('usg-admin can create a new announcement', function () {
        Event::fake();

        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        actingAs($usgAdmin);

        $page = visit('/usg/admin/announcements/create')
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Create New Announcement')
            ->assertSee('Basic Information')
            ->assertSee('Title')
            ->assertSee('Content')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();

        // Fill out the form
        $page->fill('title', 'New Student Council Event')
            ->fill('excerpt', 'Join us for the annual student council event.')
            ->fill('content', 'This is the full content of the announcement with all the details about the upcoming student council event.')
            ->assertNoJavascriptErrors();

        $page->click('Save as Draft')
            ->wait(2000)
            ->assertSee('Announcement created successfully')
            ->assertNoJavascriptErrors();

        // Verify announcement was created
        expect(Announcement::where('title', 'New Student Council Event')->count())->toBe(1);

        $announcement = Announcement::where('title', 'New Student Council Event')->first();
        expect($announcement->status)->toBe('draft')
            ->and($announcement->excerpt)->toBe('Join us for the annual student council event.');
    });

    it('usg-admin can publish a draft announcement', function () {
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        $announcement = Announcement::factory()->draft()->create([
            'title' => 'Draft Announcement to Publish',
        ]);

        actingAs($usgAdmin);

        $page = visit("/usg/admin/announcements/{$announcement->id}/edit")
            ->on()->desktop();

        $page->assertSee('Edit Announcement')
            ->assertSee('Draft Announcement to Publish')
            ->assertSee('Draft')
            ->assertNoJavascriptErrors();

        // Publish the announcement
        $page->click('Publish')
            ->wait(2000)
            ->assertSee('Announcement published successfully')
            ->assertNoJavascriptErrors();

        // Verify announcement was published
        $announcement->refresh();
        expect($announcement->status)->toBe('published')
            ->and($announcement->published_at)->not->toBeNull();
    });

    it('usg-admin can unpublish an announcement', function () {
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        $announcement = Announcement::factory()->published()->create([
            'title' => 'Published Announcement',
        ]);

        actingAs($usgAdmin);

        $page = visit("/usg/admin/announcements/{$announcement->id}/edit")
            ->on()->desktop();

        $page->assertSee('Edit Announcement')
            ->assertSee('Published')
            ->assertNoJavascriptErrors();

        // Unpublish the announcement
        $page->click('Unpublish')
            ->wait(2000)
            ->assertSee('Announcement unpublished successfully')
            ->assertNoJavascriptErrors();

        // Verify announcement was unpublished
        $announcement->refresh();
        expect($announcement->status)->toBe('draft');
    });

    it('public can view published announcements', function () {
        $announcement = Announcement::factory()->published()->create([
            'title' => 'Public Announcement',
            'excerpt' => 'This is a public announcement excerpt.',
        ]);

        $page = visit('/usg/announcements')
            ->on()->desktop()
            ->inLightMode();

        $page->assertSee('Announcements')
            ->assertSee('Public Announcement')
            ->assertSee('This is a public announcement excerpt.')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });

    it('public cannot see draft announcements', function () {
        $draftAnnouncement = Announcement::factory()->draft()->create([
            'title' => 'Secret Draft Announcement',
        ]);

        $publishedAnnouncement = Announcement::factory()->published()->create([
            'title' => 'Visible Published Announcement',
        ]);

        $page = visit('/usg/announcements')
            ->on()->desktop();

        $page->assertSee('Visible Published Announcement')
            ->assertDontSee('Secret Draft Announcement')
            ->assertNoJavascriptErrors();
    });

    it('public can view announcement details', function () {
        $announcement = Announcement::factory()->published()->create([
            'title' => 'Detailed Announcement',
            'content' => 'This is the full content of the announcement with detailed information.',
        ]);

        $page = visit("/usg/announcements/{$announcement->slug}")
            ->on()->desktop();

        $page->assertSee('Detailed Announcement')
            ->assertSee('This is the full content of the announcement with detailed information.')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();

        // Verify view count increased
        $announcement->refresh();
        expect($announcement->views)->toBe(1);
    });

    it('complete publish workflow: create, edit, publish, view', function () {
        Event::fake();

        // Step 1: USG Admin creates draft
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        actingAs($usgAdmin);

        $createPage = visit('/usg/admin/announcements/create')
            ->on()->desktop();

        $createPage->fill('title', 'Workflow Test Announcement')
            ->fill('excerpt', 'Testing the complete workflow.')
            ->fill('content', 'Full content for the workflow test.')
            ->click('Save as Draft')
            ->wait(2000)
            ->assertSee('Announcement created successfully');

        $announcement = Announcement::where('title', 'Workflow Test Announcement')->first();

        // Step 2: Edit the announcement
        $editPage = visit("/usg/admin/announcements/{$announcement->id}/edit");

        $editPage->assertSee('Edit Announcement')
            ->assertValue('title', 'Workflow Test Announcement')
            ->fill('title', 'Updated Workflow Test Announcement')
            ->click('Save Changes')
            ->wait(2000)
            ->assertSee('Announcement updated successfully');

        // Step 3: Publish the announcement
        $publishPage = visit("/usg/admin/announcements/{$announcement->id}/edit");

        $publishPage->click('Publish')
            ->wait(2000)
            ->assertSee('Announcement published successfully');

        // Step 4: View as public
        $announcement->refresh();

        $publicPage = visit("/usg/announcements/{$announcement->slug}")
            ->on()->desktop();

        $publicPage->assertSee('Updated Workflow Test Announcement')
            ->assertSee('Full content for the workflow test.')
            ->assertNoJavascriptErrors();
    });

    it('usg-admin can toggle featured status', function () {
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        $announcement = Announcement::factory()->published()->create([
            'is_featured' => false,
        ]);

        actingAs($usgAdmin);

        $page = visit("/usg/admin/announcements/{$announcement->id}/edit")
            ->on()->desktop();

        $page->assertSee('Edit Announcement')
            ->check('is_featured')
            ->click('Save Changes')
            ->wait(2000)
            ->assertSee('Announcement updated successfully')
            ->assertNoJavascriptErrors();

        // Verify featured status
        $announcement->refresh();
        expect($announcement->is_featured)->toBeTrue();
    });

    it('mobile: usg-admin can create announcement on mobile', function () {
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        actingAs($usgAdmin);

        $page = visit('/usg/admin/announcements/create')
            ->on()->mobile()
            ->inLightMode();

        $page->assertSee('Create New Announcement')
            ->fill('title', 'Mobile Test Announcement')
            ->fill('excerpt', 'Created on mobile device.')
            ->fill('content', 'Mobile content.')
            ->assertNoJavascriptErrors();

        $page->click('Save as Draft')
            ->wait(2000)
            ->assertSee('Announcement created successfully');

        expect(Announcement::where('title', 'Mobile Test Announcement')->count())->toBe(1);
    });

    it('dark mode: announcement creation works in dark mode', function () {
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        actingAs($usgAdmin);

        $page = visit('/usg/admin/announcements/create')
            ->on()->desktop()
            ->inDarkMode();

        $page->assertSee('Create New Announcement')
            ->fill('title', 'Dark Mode Announcement')
            ->fill('excerpt', 'Testing dark mode.')
            ->fill('content', 'Dark mode content.')
            ->assertNoJavascriptErrors()
            ->assertNoConsoleLogs();
    });

    it('validation: shows errors for empty required fields', function () {
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        actingAs($usgAdmin);

        $page = visit('/usg/admin/announcements/create')
            ->on()->desktop();

        // Try to submit without filling required fields
        $page->click('Save as Draft')
            ->wait(1000)
            ->assertSee('title')
            ->assertSee('content')
            ->assertNoJavascriptErrors();
    });

    it('usg-admin can delete announcement', function () {
        $usgAdmin = User::factory()->create();
        $usgAdmin->assignRole('usg-admin');

        $announcement = Announcement::factory()->draft()->create([
            'title' => 'Announcement to Delete',
        ]);

        actingAs($usgAdmin);

        $page = visit("/usg/admin/announcements/{$announcement->id}/edit")
            ->on()->desktop();

        $page->assertSee('Edit Announcement')
            ->click('Delete Announcement')
            ->wait(1000)
            ->click('Confirm Delete')
            ->wait(2000)
            ->assertPathIs('/usg/admin/announcements')
            ->assertSee('Announcement deleted successfully')
            ->assertNoJavascriptErrors();

        // Verify announcement was deleted
        expect(Announcement::find($announcement->id))->toBeNull();
    });

    it('multiple devices: announcement displays correctly on different devices', function () {
        $announcement = Announcement::factory()->published()->create([
            'title' => 'Multi-Device Announcement',
        ]);

        // Desktop
        $desktopPage = visit("/usg/announcements/{$announcement->slug}")
            ->on()->desktop();

        $desktopPage->assertSee('Multi-Device Announcement')
            ->assertNoJavascriptErrors();

        // Mobile
        $mobilePage = visit("/usg/announcements/{$announcement->slug}")
            ->on()->mobile();

        $mobilePage->assertSee('Multi-Device Announcement')
            ->assertNoJavascriptErrors();

        // Tablet
        $tabletPage = visit("/usg/announcements/{$announcement->slug}")
            ->on()->tablet();

        $tabletPage->assertSee('Multi-Device Announcement')
            ->assertNoJavascriptErrors();
    });
});
