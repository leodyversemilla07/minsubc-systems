<?php

use Illuminate\Support\Facades\File;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Event;
use Modules\USG\Models\Resolution;
use Modules\USG\Models\TransparencyReport;

describe('Print Stylesheet', function () {
    it('exists and is importable', function () {
        $printCssPath = resource_path('css/print.css');

        expect(File::exists($printCssPath))->toBeTrue();

        $content = File::get($printCssPath);
        expect($content)->toContain('@media print');
    });

    it('is imported in main CSS file', function () {
        $appCssPath = resource_path('css/app.css');
        $content = File::get($appCssPath);

        expect($content)->toContain("@import './print.css'");
    });

    it('contains print-specific page setup', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('@page');
        expect($content)->toContain('margin: 1.5cm');
        expect($content)->toContain('size: A4 portrait');
    });

    it('hides navigation and interactive elements', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('nav,');
        expect($content)->toContain('button,');
        expect($content)->toContain('.no-print,');
        expect($content)->toContain('display: none !important');
    });

    it('optimizes typography for print', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('h1 {');
        expect($content)->toContain('font-size: 24pt');
        expect($content)->toContain('page-break-after: avoid');
    });

    it('includes link URL display rules', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain("a[href^='http']::after");
        expect($content)->toContain("content: ' (' attr(href) ')'");
    });

    it('defines announcement print styles', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.announcement');
        expect($content)->toContain('.announcement-title');
        expect($content)->toContain('.announcement-content');
    });

    it('defines resolution print styles', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.resolution');
        expect($content)->toContain('.resolution-title');
        expect($content)->toContain('.resolution-content');
    });

    it('defines transparency report print styles', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.transparency-report');
        expect($content)->toContain('.report-title');
        expect($content)->toContain('.report-section');
    });

    it('defines event print styles', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.event');
        expect($content)->toContain('.event-title');
        expect($content)->toContain('.event-description');
    });

    it('includes USG official header styles', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.usg-official-header');
        expect($content)->toContain('.usg-org-name');
        expect($content)->toContain('.usg-logo-print');
    });
});

describe('Print-Friendly Pages', function () {
    it('announcement page can be accessed for printing', function () {
        $announcement = Announcement::factory()->create([
            'status' => 'published',
            'title' => 'Test Announcement',
        ]);

        $response = $this->get(route('usg.announcements.show', $announcement->slug));

        $response->assertSuccessful();
        $response->assertInertia(
            fn ($page) => $page->component('usg/announcements/show')
                ->has('announcement')
        );
    });

    it('resolution page can be accessed for printing', function () {
        $resolution = Resolution::factory()->create([
            'status' => 'published',
            'title' => 'Test Resolution',
        ]);

        $response = $this->get(route('usg.resolutions.show', $resolution->id));

        $response->assertSuccessful();
        $response->assertInertia(
            fn ($page) => $page->component('usg/resolutions/show')
                ->has('resolution')
        );
    });

    it('event page can be accessed for printing', function () {
        $event = Event::factory()->create([
            'status' => 'published',
            'title' => 'Test Event',
        ]);

        $response = $this->get(route('usg.events.show', $event->slug));

        $response->assertSuccessful();
        $response->assertInertia(
            fn ($page) => $page->component('usg/events/show')
                ->has('event')
        );
    });

    it('transparency report page can be accessed for printing', function () {
        $report = TransparencyReport::factory()->financial()->create([
            'status' => 'published',
            'title' => 'Test Transparency Report',
        ]);

        $response = $this->get(route('usg.transparency.show', $report->slug));

        $response->assertSuccessful();
        $response->assertInertia(
            fn ($page) => $page->component('usg/transparency/show')
                ->has('report')
        );
    });
});

describe('Print Utility Classes', function () {
    it('defines print-only display class', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.print-only');
        expect($content)->toContain('display: block !important');
    });

    it('defines print text alignment utilities', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.print-text-left');
        expect($content)->toContain('.print-text-center');
        expect($content)->toContain('.print-text-right');
    });

    it('defines page break utilities', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.page-break-before');
        expect($content)->toContain('.page-break-after');
        expect($content)->toContain('.page-break-inside-avoid');
    });

    it('removes backgrounds and shadows for print', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('background: none !important');
        expect($content)->toContain('box-shadow: none !important');
        expect($content)->toContain('text-shadow: none !important');
    });
});

describe('Print Optimization', function () {
    it('optimizes colors for black and white printing', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('color: black !important');
        expect($content)->toContain('background: white !important');
    });

    it('sets proper orphans and widows for text flow', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('orphans: 3');
        expect($content)->toContain('widows: 3');
    });

    it('prevents page breaks inside important elements', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('page-break-inside: avoid');
    });

    it('optimizes images for print', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('img {');
        expect($content)->toContain('max-width: 100%');
        expect($content)->toContain('height: auto');
    });

    it('includes metadata display styles', function () {
        $printCssPath = resource_path('css/print.css');
        $content = File::get($printCssPath);

        expect($content)->toContain('.metadata');
        expect($content)->toContain('.metadata-item');
        expect($content)->toContain('.metadata-label');
    });
});
