```
minsubc-systems/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   │   └── ResolveCampus.php
│   │   └── Requests/
│   ├── Models/
│   │   └── User.php
│   ├── Modules/
│   │   ├── Guidance/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Middleware/
│   │   │   │   └── Requests/
│   │   │   ├── Models/
│   │   │   ├── Services/
│   │   │   └── routes.php
│   │   ├── Registrar/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Middleware/
│   │   │   │   └── Requests/
│   │   │   ├── Models/
│   │   │   ├── Services/
│   │   │   └── routes.php
│   │   ├── SAS/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/
│   │   │   │   ├── Middleware/
│   │   │   │   └── Requests/
│   │   │   ├── Models/
│   │   │   ├── Services/
│   │   │   └── routes.php
│   │   └── USG/
│   │       ├── Http/
│   │       │   ├── Controllers/
│   │       │   ├── Middleware/
│   │       │   ├── Requests/
│   │       ├── Models/
│   │       ├── Services/
│   │       └── routes.php
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── FortifyServiceProvider.php
├── bootstrap/
│   ├── app.php
│   └── providers.php
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php
│   ├── fortify.php
│   ├── inertia.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── services.php
│   └── session.php
├── database/
│   ├── database.sqlite
│   ├── factories/
│   │   └── UserFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   └── 2025_08_26_100418_add_two_factor_columns_to_users_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
├── public/
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── index.php
│   ├── logo.svg
│   ├── robots.txt
│   └── build/
│       └── manifest.json
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── actions/
│   │   ├── app.tsx
│   │   ├── components/
│   │   │   ├── alert-error.tsx
│   │   │   ├── app-content.tsx
│   │   │   ├── app-header.tsx
│   │   │   ├── app-logo-icon.tsx
│   │   │   ├── app-logo.tsx
│   │   │   ├── app-shell.tsx
│   │   │   ├── app-sidebar-header.tsx
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── appearance-dropdown.tsx
│   │   │   ├── appearance-tabs.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── delete-user.tsx
│   │   │   ├── heading-small.tsx
│   │   │   ├── heading.tsx
│   │   │   ├── icon.tsx
│   │   │   ├── input-error.tsx
│   │   │   ├── nav-footer.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── text-link.tsx
│   │   │   ├── two-factor-recovery-codes.tsx
│   │   │   ├── two-factor-setup-modal.tsx
│   │   │   ├── ui/
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── collapsible.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── icon.tsx
│   │   │   │   ├── input-otp.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── navigation-menu.tsx
│   │   │   │   ├── placeholder-pattern.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   └── user-info.tsx
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── dashboard.tsx
│   │   │   ├── guidance/
│   │   │   ├── registrar/
│   │   │   ├── sas/
│   │   │   ├── settings/
│   │   │   ├── usg/
│   │   │   └── welcome.tsx
│   │   ├── routes/
│   │   ├── ssr.tsx
│   │   ├── types/
│   │   └── wayfinder/
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── auth.php
│   ├── console.php
│   ├── settings.php
│   └── web.php
├── storage/
│   ├── app/
│   │   ├── private/
│   │   └── public/
│   ├── framework/
│   │   ├── cache/
│   │   ├── sessions/
│   │   ├── testing/
│   │   └── views/
│   └── logs/
├── tests/
│   ├── Feature/
│   │   ├── Auth/
│   │   ├── DashboardTest.php
│   │   ├── ExampleTest.php
│   │   └── Settings/
│   ├── Pest.php
│   ├── TestCase.php
│   └── Unit/
├── vendor/
│   ├── autoload.php
│   ├── pest-plugins.json
│   ├── _laravel_ide/
│   ├── bacon/
│   ├── bin/
│   ├── brianium/
│   ├── brick/
│   ├── carbonphp/
│   ├── composer/
│   ├── dasprid/
│   ├── dflydev/
│   ├── doctrine/
│   ├── dragonmantank/
│   ├── egulias/
│   ├── fakerphp/
│   ├── fidry/
│   ├── filp/
│   ├── fruitcake/
│   ├── graham-campbell/
│   ├── guzzlehttp/
│   ├── hamcrest/
│   ├── inertiajs/
│   ├── jean85/
│   ├── laravel/
│   ├── league/
│   ├── mockery/
│   ├── monolog/
│   ├── myclabs/
│   ├── nesbot/
│   ├── nette/
│   ├── nunomaduro/
│   ├── paragonie/
│   ├── pestphp/
│   ├── phar-io/
│   ├── phpdocumentor/
│   ├── phpoption/
│   ├── phpstan/
│   ├── pragmarx/
│   ├── psr/
│   ├── psy/
│   ├── ralouphie/
│   ├── ramsey/
│   ├── sebastian/
│   ├── staabm/
│   ├── symfony/
│   ├── ta-tikoma/
│   ├── theseer/
│   ├── tijverkoyen/
│   ├── vlucas/
│   ├── voku/
│   ├── webmozart/
│   └── zxing/
├── .editorconfig
├── .env
├── .env.example
├── .gitattributes
├── .github/
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .vscode/
├── artisan
├── boost.json
├── components.json
├── composer.json
├── composer.lock
├── DIRECTORY_STRUCTURE.md
├── DRS.md
├── eslint.config.js
├── node_modules/
├── package-lock.json
├── package.json
├── phpunit.xml
├── tsconfig.json
├── vite.config.ts
└── README.md
```