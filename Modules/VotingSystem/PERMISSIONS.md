# VotingSystem Permissions

This document describes the permission-based access control system for the VotingSystem module.

## Overview

The VotingSystem module uses **Spatie Laravel Permission** to control access to admin features. Users must have specific permissions to access different parts of the voting admin panel.

## Roles

### Voting Admin
Full access to all voting system features.

**Permissions:**
- All election management (view, create, edit, delete, toggle status)
- All candidate management (view, create, edit, delete)
- All position management (view, create, edit, delete, reorder)
- All partylist management (view, create, edit, delete)
- All voter management (view, create, edit, delete, reset password, reset vote, export)
- View activity logs
- View feedback

### Voting Manager
Read-only access to voting system features.

**Permissions:**
- View elections, candidates, positions, partylists, voters
- View activity logs
- View feedback

## Permissions List

### Election Management
- `voting.elections.view` - View elections list and details
- `voting.elections.create` - Create new elections
- `voting.elections.edit` - Edit existing elections
- `voting.elections.delete` - Delete elections
- `voting.elections.toggle-status` - Enable/disable elections

### Candidate Management
- `voting.candidates.view` - View candidates list and details
- `voting.candidates.create` - Create new candidates
- `voting.candidates.edit` - Edit existing candidates
- `voting.candidates.delete` - Delete candidates

### Position Management
- `voting.positions.view` - View positions list and details
- `voting.positions.create` - Create new positions
- `voting.positions.edit` - Edit existing positions
- `voting.positions.delete` - Delete positions
- `voting.positions.reorder` - Reorder positions (move up/down)

### Partylist Management
- `voting.partylists.view` - View partylists list and details
- `voting.partylists.create` - Create new partylists
- `voting.partylists.edit` - Edit existing partylists
- `voting.partylists.delete` - Delete partylists

### Voter Management
- `voting.voters.view` - View voters list and details
- `voting.voters.create` - Create new voters
- `voting.voters.edit` - Edit existing voters
- `voting.voters.delete` - Delete voters
- `voting.voters.reset-password` - Reset voter passwords
- `voting.voters.reset-vote` - Reset voter's vote (allow re-voting)
- `voting.voters.export` - Export voter lists

### Activity Logs
- `voting.activity-logs.view` - View activity logs

### Feedback
- `voting.feedback.view` - View voter feedback

## Setup Instructions

### 1. Create Permissions and Roles

Run the permissions seeder:

```bash
php artisan db:seed --class=VotingSystemPermissionsSeeder
```

This will create:
- All voting system permissions
- "Voting Admin" role (with all permissions)
- "Voting Manager" role (with view-only permissions)

### 2. Assign Voting Admin Role to a User

Use the Artisan command:

```bash
php artisan voting:assign-admin user@example.com
```

Or use Tinker:

```bash
php artisan tinker
```

```php
$user = App\Models\User::where('email', 'user@example.com')->first();
$user->assignRole('Voting Admin');
```

### 3. Assign Voting Manager Role

```bash
php artisan tinker
```

```php
$user = App\Models\User::where('email', 'manager@example.com')->first();
$user->assignRole('Voting Manager');
```

### 4. Assign Individual Permissions

If you need granular control, assign specific permissions:

```php
$user = App\Models\User::find(1);
$user->givePermissionTo([
    'voting.elections.view',
    'voting.candidates.view',
    'voting.positions.view',
]);
```

## Checking Permissions in Code

### In Controllers

Permissions are automatically enforced via middleware in routes. If you need additional checks:

```php
// Check if user has permission
if (auth()->user()->can('voting.elections.create')) {
    // Allow action
}

// Abort if user doesn't have permission
abort_unless(auth()->user()->can('voting.elections.edit'), 403);

// Or use authorize
$this->authorize('voting.elections.delete');
```

### In Blade Views

```blade
@can('voting.elections.create')
    <a href="{{ route('voting.admin.elections.create') }}">Create Election</a>
@endcan

@role('Voting Admin')
    <p>You are a Voting Admin</p>
@endrole
```

### In Inertia/React

Pass permissions to the frontend via Inertia shared data in `HandleInertiaRequests` middleware:

```php
'permissions' => auth()->check() 
    ? auth()->user()->getAllPermissions()->pluck('name') 
    : []
```

Then use in React:

```tsx
import { usePage } from '@inertiajs/react';

const { permissions } = usePage().props;

if (permissions.includes('voting.elections.create')) {
    // Show create button
}
```

## Access Control Flow

1. User logs in with their regular account
2. User navigates to `/voting/admin/*`
3. Middleware checks:
   - User is authenticated (`auth`)
   - User's email is verified (`verified`)
   - User has at least one voting permission
4. Each specific route checks for the exact permission needed
5. If permission is missing, user gets a 403 Forbidden error

## Super Admin Role

If a "Super Admin" role exists in your system, it automatically receives all voting permissions when the seeder runs.

## Troubleshooting

### Permission Denied (403)

**Cause:** User doesn't have the required permission.

**Solution:** Assign the appropriate role or permission:
```bash
php artisan voting:assign-admin user@example.com
```

### Cache Issues

If permissions aren't being recognized, clear the permission cache:

```bash
php artisan permission:cache-reset
```

Or programmatically:

```php
app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
```

### Role Not Found

**Cause:** Permissions seeder hasn't been run.

**Solution:**
```bash
php artisan db:seed --class=VotingSystemPermissionsSeeder
```

## Best Practices

1. **Assign roles, not individual permissions** - Use "Voting Admin" or "Voting Manager" roles for simplicity
2. **Use the command for assignment** - `php artisan voting:assign-admin email@example.com`
3. **Test with different roles** - Ensure users with different permissions see appropriate UI
4. **Clear cache after changes** - Run `php artisan permission:cache-reset` after modifying permissions
5. **Document custom permissions** - If you add new permissions, update this file

## Future Enhancements

- Add a UI for managing voting system roles and permissions
- Create more granular roles (e.g., "Election Manager", "Voter Manager")
- Add permission-based menu filtering on frontend
- Implement audit logging for permission changes
