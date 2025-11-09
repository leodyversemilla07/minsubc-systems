# Migrating Legacy PHP to Blade Templates

## Overview
This guide explains how to convert the legacy PHP voting system files into modern Laravel Blade templates while retaining PHP functionality.

## Setup Complete ✅
- ✅ Tailwind CSS v4 configured
- ✅ Alpine.js for JavaScript interactivity
- ✅ Vite build setup
- ✅ Master layout created
- ✅ Example pages (index, login) created

## Migration Strategy

### 1. **Use Blade Components** (Recommended)
Convert static HTML/PHP to reusable Blade components.

**Example - Legacy PHP:**
```php
// legacy/includes/header.php
<?php
$page_title = "Voting System";
?>
<header>
    <h1><?php echo $page_title; ?></h1>
</header>
```

**Converted to Blade:**
```blade
{{-- resources/views/components/header.blade.php --}}
<header class="bg-white shadow-sm">
    <h1 class="text-2xl font-bold">{{ $title }}</h1>
</header>

{{-- Usage --}}
<x-votingsystem::header title="Voting System" />
```

### 2. **Retain PHP Logic in Controllers**
Move database queries and business logic to controllers.

**Example - Legacy PHP:**
```php
// legacy/home.php
<?php
include 'includes/conn.php';
$sql = "SELECT * FROM candidates WHERE position_id = 1";
$result = $conn->query($sql);
$candidates = [];
while($row = $result->fetch_assoc()) {
    $candidates[] = $row;
}
?>
<div>
    <?php foreach($candidates as $candidate): ?>
        <p><?php echo $candidate['name']; ?></p>
    <?php endforeach; ?>
</div>
```

**Converted to Laravel:**
```php
// Controller
public function home()
{
    $candidates = DB::table('candidates')
        ->where('position_id', 1)
        ->get();
    
    return view('votingsystem::home', compact('candidates'));
}
```

```blade
{{-- Blade View --}}
<div>
    @foreach($candidates as $candidate)
        <p>{{ $candidate->name }}</p>
    @endforeach
</div>
```

### 3. **Use @php Directives for Complex Logic**
For complex PHP logic that hasn't been refactored yet:

```blade
@php
    // You can still write PHP code here
    $election = \DB::table('elections')->where('active', 1)->first();
    $isActive = $election ? true : false;
    $votesCount = \DB::table('votes')->count();
@endphp

<div class="stats">
    @if($isActive)
        <p class="text-green-600">Election is Active</p>
        <p class="text-gray-600">Total Votes: {{ $votesCount }}</p>
    @else
        <p class="text-red-600">No Active Election</p>
    @endif
</div>
```

### 4. **Blade Directives for Common Patterns**

**Authentication:**
```blade
@auth('voter')
    <p>Welcome, {{ auth('voter')->user()->name }}</p>
@else
    <a href="{{ route('voting.login') }}">Login</a>
@endauth
```

**Conditional Rendering:**
```blade
@if($election->status === 'active')
    <button>Cast Vote</button>
@elseif($election->status === 'ended')
    <a href="{{ route('voting.results') }}">View Results</a>
@else
    <p>Election not started yet</p>
@endif
```

**Loops:**
```blade
@forelse($candidates as $candidate)
    <div class="candidate-card">
        <h3>{{ $candidate->name }}</h3>
        <p>{{ $candidate->position }}</p>
    </div>
@empty
    <p>No candidates found</p>
@endforelse
```

**Error Handling:**
```blade
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

@if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif
```

## Migration Workflow

### Step 1: Create Eloquent Models
Convert database tables to Laravel models.

```bash
php artisan make:model Voter -m
php artisan make:model Candidate -m
php artisan make:model Position -m
php artisan make:model Vote -m
php artisan make:model Election -m
```

### Step 2: Create Controllers
Group related functionality into controllers.

```bash
php artisan module:make-controller VoterController VotingSystem
php artisan module:make-controller CandidateController VotingSystem
php artisan module:make-controller BallotController VotingSystem
```

### Step 3: Convert Views One by One
Priority order:
1. ✅ **index.php** → `resources/views/index.blade.php` (Done)
2. ✅ **Login** → `resources/views/login.blade.php` (Done)
3. 🔄 **ballot** → Convert next
4. 🔄 **results** → Convert next
5. 🔄 **admin pages** → Convert next

### Step 4: Update Routes
Replace direct PHP file access with Laravel routes.

**Before:**
```
/voting/index.php
/voting/home.php?election=1
```

**After:**
```
/voting (Route::get)
/voting/ballot (Route::get with auth)
```

## Using Alpine.js for Interactivity

Alpine.js is included for JavaScript interactivity without React.

**Example:**
```blade
<div x-data="{ open: false }">
    <button @click="open = !open" class="btn">
        Toggle Details
    </button>
    
    <div x-show="open" x-transition class="details">
        <p>Candidate details here...</p>
    </div>
</div>
```

**Form Validation:**
```blade
<div x-data="{ 
    voterId: '', 
    password: '',
    isValid() {
        return this.voterId.length > 0 && this.password.length >= 6;
    }
}">
    <input 
        x-model="voterId" 
        type="text" 
        placeholder="Voter ID"
        class="input"
    >
    
    <input 
        x-model="password" 
        type="password" 
        placeholder="Password"
        class="input"
    >
    
    <button 
        :disabled="!isValid()" 
        :class="{ 'opacity-50 cursor-not-allowed': !isValid() }"
        class="btn"
    >
        Login
    </button>
</div>
```

## Tailwind CSS Classes

Use Tailwind v4 utility classes for styling:

```blade
{{-- Buttons --}}
<button class="px-6 py-3 bg-[var(--voting-primary)] text-white rounded-lg hover:bg-[var(--voting-dark)] transition">
    Vote Now
</button>

{{-- Cards --}}
<div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold mb-2">Card Title</h3>
    <p class="text-gray-600">Card content...</p>
</div>

{{-- Forms --}}
<input 
    type="text" 
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--voting-primary)] focus:border-transparent"
>
```

## Database Connection

Use Laravel's Query Builder or Eloquent instead of mysqli:

**Legacy:**
```php
$conn = new mysqli($servername, $username, $password, $dbname);
$sql = "SELECT * FROM voters WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $voter_id);
$stmt->execute();
```

**Laravel:**
```php
$voter = DB::table('voters')->find($voter_id);
// Or with Eloquent:
$voter = Voter::find($voter_id);
```

## Session Management

**Legacy:**
```php
session_start();
$_SESSION['voter_id'] = $id;
if(!isset($_SESSION['voter_id'])) {
    header('location: login.php');
}
```

**Laravel:**
```php
// Store
session(['voter_id' => $id]);

// Retrieve
$voterId = session('voter_id');

// Middleware for protection
Route::middleware(['auth:voter'])->group(function() {
    // Protected routes
});
```

## Next Steps

1. ✅ Run `npm install` in the VotingSystem module directory
2. ✅ Run `npm run build` to compile assets
3. 🔄 Convert `ballot.php` to `ballot.blade.php`
4. 🔄 Convert `result.php` to `results.blade.php`
5. 🔄 Create Eloquent models from SQL schema
6. 🔄 Write Laravel migrations
7. 🔄 Create controllers with proper methods
8. 🔄 Write tests for voting functionality

## File Organization

```
Modules/VotingSystem/
├── resources/
│   ├── assets/
│   │   ├── css/
│   │   │   └── app.css (Tailwind v4)
│   │   └── js/
│   │       └── app.js (Alpine.js)
│   ├── views/
│   │   ├── components/
│   │   │   └── layouts/
│   │   │       └── master.blade.php ✅
│   │   ├── index.blade.php ✅
│   │   ├── login.blade.php ✅
│   │   ├── ballot.blade.php (TODO)
│   │   ├── results.blade.php (TODO)
│   │   └── admin/ (TODO)
│   └── legacy/ (Keep for reference)
│       ├── index.php
│       ├── home.php
│       └── ... (all old files)
```

## Support

All legacy PHP files are preserved in `resources/legacy/` for reference during migration.
You can gradually convert them one by one while keeping the system functional.
