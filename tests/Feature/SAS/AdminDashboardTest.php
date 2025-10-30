<?php

use App\Models\User;
use App\Modules\SAS\Models\InsuranceRecord;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\SASActivity;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Services\DashboardService;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->admin = User::factory()->create();
    $this->admin->assignRole('admin');

    $this->dashboardService = app(DashboardService::class);
});

describe('Admin Dashboard Access', function () {
    it('allows admin to view dashboard', function () {
        actingAs($this->admin);

        $response = get(route('sas.admin.dashboard'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/dashboard')
            ->has('dashboardData')
        );
    });

    it('prevents non-admin from accessing dashboard', function () {
        $student = User::factory()->create();
        $student->assignRole('student');

        actingAs($student);

        $response = get(route('sas.admin.dashboard'));

        $response->assertForbidden();
    });
});

describe('Dashboard Scholarship Statistics', function () {
    it('calculates total scholarships correctly', function () {
        Scholarship::factory()->count(10)->create();

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['scholarships']['total'])->toBe(10);
    });

    it('calculates active scholarships correctly', function () {
        Scholarship::factory()->count(7)->active()->create();
        Scholarship::factory()->count(3)->inactive()->create();

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['scholarships']['active'])->toBe(7);
    });

    it('calculates total scholarship recipients', function () {
        $scholarship = Scholarship::factory()->create();
        ScholarshipRecipient::factory()->count(15)->create([
            'scholarship_id' => $scholarship->id,
        ]);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['scholarships']['recipients'])->toBe(15);
    });

    it('calculates active recipients only', function () {
        $scholarship = Scholarship::factory()->create();
        ScholarshipRecipient::factory()->count(8)->create([
            'scholarship_id' => $scholarship->id,
            'status' => 'Active',
        ]);
        ScholarshipRecipient::factory()->count(3)->create([
            'scholarship_id' => $scholarship->id,
            'status' => 'Suspended',
        ]);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['scholarships']['active_recipients'])->toBe(8);
    });
});

describe('Dashboard Insurance Statistics', function () {
    it('calculates total insurance records', function () {
        InsuranceRecord::factory()->count(20)->create();

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['insurance']['total'])->toBe(20);
    });

    it('calculates approved insurance records', function () {
        InsuranceRecord::factory()->count(12)->create(['status' => 'Approved']);
        InsuranceRecord::factory()->count(5)->create(['status' => 'Pending Review']);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['insurance']['active'])->toBe(12);
    });

    it('calculates pending insurance records', function () {
        InsuranceRecord::factory()->count(6)->create(['status' => 'Pending Review']);
        InsuranceRecord::factory()->count(10)->create(['status' => 'Approved']);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['insurance']['pending'])->toBe(6);
    });

    it('identifies insurance expiring soon', function () {
        InsuranceRecord::factory()->count(4)->create([
            'status' => 'Approved',
            'expiration_date' => now()->addDays(15),
        ]);
        InsuranceRecord::factory()->count(6)->create([
            'status' => 'Approved',
            'expiration_date' => now()->addDays(60),
        ]);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['insurance']['expiring_soon'])->toBe(4);
    });
});

describe('Dashboard Organization Statistics', function () {
    it('calculates total organizations', function () {
        Organization::factory()->count(15)->create();

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['organizations']['total'])->toBe(15);
    });

    it('calculates active organizations', function () {
        Organization::factory()->count(10)->create(['status' => 'Active']);
        Organization::factory()->count(5)->create(['status' => 'Inactive']);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['organizations']['active'])->toBe(10);
    });

    it('distinguishes major and minor organizations', function () {
        Organization::factory()->count(8)->create(['organization_type' => 'Major']);
        Organization::factory()->count(12)->create(['organization_type' => 'Minor']);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['organizations']['major'])->toBe(8);
        expect($data['organizations']['minor'])->toBe(12);
    });
});

describe('Dashboard Activity Statistics', function () {
    it('calculates total activities', function () {
        SASActivity::factory()->count(25)->create();

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['activities']['total'])->toBe(25);
    });

    it('calculates activities by status', function () {
        SASActivity::factory()->count(5)->create(['status' => 'Scheduled']);
        SASActivity::factory()->count(3)->create(['status' => 'Ongoing']);
        SASActivity::factory()->count(7)->create(['status' => 'Completed']);
        SASActivity::factory()->count(2)->create(['status' => 'Cancelled']);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['activities']['scheduled'])->toBe(5);
        expect($data['activities']['completed'])->toBe(7);
    });

    it('identifies upcoming activities', function () {
        SASActivity::factory()->count(10)->create([
            'start_date' => now()->addDays(5),
            'status' => 'Scheduled',
        ]);
        SASActivity::factory()->count(5)->create([
            'start_date' => now()->subDays(5),
            'status' => 'Completed',
        ]);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['activities']['upcoming'])->toBe(10);
    });
});

describe('Dashboard Recent Activities Feed', function () {
    it('retrieves recent activities limited to 10', function () {
        SASActivity::factory()->count(15)->create([
            'status' => 'Scheduled',
        ]);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['recent_activities'])->toHaveCount(10);
    });
});

describe('Dashboard Upcoming Events', function () {
    it('retrieves upcoming events in chronological order', function () {
        $event1 = SASActivity::factory()->create([
            'start_date' => now()->addDays(10),
            'status' => 'Scheduled',
        ]);
        $event2 = SASActivity::factory()->create([
            'start_date' => now()->addDays(5),
            'status' => 'Scheduled',
        ]);
        $event3 = SASActivity::factory()->create([
            'start_date' => now()->addDays(15),
            'status' => 'Scheduled',
        ]);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['upcoming_events'])->toHaveCount(3);
        expect($data['upcoming_events'][0]->id)->toBe($event2->id);
    });

    it('excludes past events from upcoming', function () {
        SASActivity::factory()->count(3)->create([
            'start_date' => now()->subDays(5),
            'status' => 'Completed',
        ]);
        SASActivity::factory()->count(5)->create([
            'start_date' => now()->addDays(5),
            'status' => 'Scheduled',
        ]);

        $data = $this->dashboardService->getAdminDashboardData();

        expect($data['upcoming_events'])->toHaveCount(5);
    });
});

describe('Dashboard Statistics API', function () {
    it('returns statistics via API endpoint', function () {
        actingAs($this->admin);

        Scholarship::factory()->count(5)->create();
        Organization::factory()->count(10)->create();
        SASActivity::factory()->count(15)->create();

        $response = get(route('sas.admin.statistics'));

        $response->assertSuccessful();
        $response->assertJsonStructure([
            'scholarships',
            'insurance',
            'organizations',
            'activities',
        ]);
    });
});
