# 🔄 Voter-User Relationship Implementation

## ✅ Solution: Link Voter to User Model

Instead of making the Voter model extend `Authenticatable` and duplicating authentication features (like `remember_token`), we've established a proper relationship between Voter and User models.

---

## 🎯 **The Problem**

**Error:**
```
SQLSTATE[42S22]: Column not found: 1054 Unknown column 'remember_token' 
in 'field list' (SQL: update `voters` set `remember_token` = ...)
```

**Root Cause:**
- `Voter` model extended `Authenticatable`
- Laravel's auth system tried to update `remember_token` on voters table
- Voters table didn't have `remember_token` column
- Duplicate authentication features between User and Voter

---

## ✅ **The Solution**

### **Architecture Change:**

**Before:**
```
Voter extends Authenticatable
├─ Has own authentication
├─ Needs own remember_token
├─ Separate auth guard
└─ Duplicates User features
```

**After:**
```
Voter extends Model
├─ belongsTo(User)
├─ Uses User's authentication
├─ Delegates remember_token to User
└─ Session-based voting auth
```

---

## 🔧 **Implementation Details**

### **1. Voter Model Refactoring**

**File:** `Modules/VotingSystem/app/Models/Voter.php`

✅ **Changed base class:**
```php
// Before
class Voter extends Authenticatable

// After
class Voter extends Model
```

✅ **Added user relationship:**
```php
public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}
```

✅ **Delegated remember_token to User:**
```php
public function getRememberToken()
{
    return $this->user ? $this->user->getRememberToken() : null;
}

public function setRememberToken($value)
{
    if ($this->user) {
        $this->user->setRememberToken($value);
        $this->user->save();
    }
}
```

---

### **2. Database Migration**

**File:** `Modules/VotingSystem/database/migrations/2025_12_23_165400_add_user_id_to_voters_table.php`

✅ **Added user_id foreign key:**
```php
$table->foreignId('user_id')
    ->nullable()
    ->after('id')
    ->constrained('users')
    ->onDelete('cascade');
```

✅ **Made school_id nullable:**
```php
$table->string('school_id', 15)->nullable()->change();
```

**Why nullable?**
- Voter can be linked to User via `user_id`
- `school_id` still used for backward compatibility
- Can identify voter through User relationship

---

### **3. Authentication Flow Changes**

#### **Session-Based Voting Authentication**

**Before (Guard-Based):**
```php
Auth::guard('voter')->login($voter);
$voter = Auth::guard('voter')->user();
```

**After (Session-Based):**
```php
// Login - Store voter ID in session
$request->session()->put('voting.voter_id', $voter->id);
$request->session()->put('voting.election_id', $election->id);

// Retrieve - Get voter from session
$voterId = $request->session()->get('voting.voter_id');
$voter = Voter::with(['election', 'user'])->findOrFail($voterId);

// Logout - Clear session
$request->session()->forget(['voting.voter_id', 'voting.election_id']);
```

---

### **4. Middleware Update**

**Created:** `Modules/VotingSystem/app/Http/Middleware/EnsureVoterAuthenticated.php`

```php
public function handle(Request $request, Closure $next): Response
{
    // Check if voter ID exists in session
    if (!$request->session()->has('voting.voter_id')) {
        return redirect()->route('voting.login');
    }

    // Verify voter still exists
    $voterId = $request->session()->get('voting.voter_id');
    $voter = Voter::find($voterId);

    if (!$voter) {
        $request->session()->forget(['voting.voter_id', 'voting.election_id']);
        return redirect()->route('voting.login');
    }

    return $next($request);
}
```

**Routes Updated:**
```php
// Before
Route::middleware(['auth:voter'])

// After  
Route::middleware([EnsureVoterAuthenticated::class])
```

---

### **5. Controller Updates**

#### **VoterAuthController**

✅ **Integrated Auth (User already logged in):**
```php
// Link voter to user
if (!$voter->user_id) {
    $voter->update(['user_id' => $user->id]);
}

// Store in session (don't use voter guard)
$request->session()->put('voting.voter_id', $voter->id);
$request->session()->put('voting.election_id', $election->id);
```

✅ **Standalone Auth (Voter login):**
```php
// Try to link to user if exists
if (!$voter->user_id) {
    $user = User::whereHas('student', function ($query) use ($voter) {
        $query->where('student_id', $voter->school_id);
    })->first();

    if ($user) {
        $voter->update(['user_id' => $user->id]);
        Auth::login($user, $remember); // Auth the user too!
    }
}

// Store in session
$request->session()->put('voting.voter_id', $voter->id);
```

---

#### **BallotController**

✅ **Retrieve voter from session:**
```php
// Before
$voter = Auth::guard('voter')->user();

// After
$voterId = $request->session()->get('voting.voter_id');
$voter = Voter::with(['election', 'user'])->findOrFail($voterId);
```

✅ **After voting (logout):**
```php
// Before
Auth::guard('voter')->logout();
$request->session()->invalidate();

// After
$request->session()->forget(['voting.voter_id', 'voting.election_id']);
// Keep main user session if exists!
```

---

## 📊 **Benefits**

| Aspect | Benefit |
|--------|---------|
| **No Duplication** | One authentication system (User) |
| **Remember Token** | Uses User's remember_token |
| **Session Management** | Simple session-based voting auth |
| **User Tracking** | Can track which user voted |
| **Backward Compatible** | Still supports standalone voter login |
| **Cleaner Code** | Voter is just a model, not Authenticatable |

---

## 🔄 **User Workflows**

### **Workflow 1: Integrated User (Student)**

```
1. User logs in to main system
   ├─ User authenticated (remember_token handled)
   └─ Session created

2. User visits voting
   ├─ Voter record linked to user_id
   ├─ voting.voter_id stored in session
   └─ Redirect to ballot

3. User votes
   ├─ Retrieve voter from session
   ├─ Submit votes
   └─ Clear voting session (keep user session!)

4. User continues using main system
   └─ Still authenticated!
```

### **Workflow 2: Standalone Voter**

```
1. Voter logs in with school_id + password
   ├─ Find voter record
   ├─ Link to user if exists
   ├─ Authenticate user (remember_token!)
   └─ Store voting.voter_id in session

2. Vote and submit
   ├─ Retrieve from session
   ├─ Submit votes
   └─ Clear voting session

3. If linked to user → User still authenticated
   └─ Can access other system features
```

---

## 🧪 **Testing Requirements**

### **Test 1: Integrated Voting**
```
1. Login as student (main system)
2. Visit /voting/login
3. Select election + confirm password
4. Vote and submit
5. Verify: Still logged in to main system
```

### **Test 2: Standalone Voting**
```
1. Visit /voting/login (not logged in)
2. Login with school_id + voter password
3. If user exists → Should authenticate user too
4. Vote and submit
5. Verify: Voting session cleared
6. Verify: User session maintained (if linked)
```

### **Test 3: Database Migration**
```bash
php artisan migrate:fresh --seed
# Should create voters table with user_id column
```

---

## 📋 **Migration Steps**

### **Step 1: Run Migration**
```bash
php artisan migrate --path=Modules/VotingSystem/database/migrations/2025_12_23_165400_add_user_id_to_voters_table.php
```

### **Step 2: Link Existing Voters (Optional)**
```php
// Run this once to link existing voters to users
Voter::whereNull('user_id')->each(function ($voter) {
    $user = User::whereHas('student', function ($query) use ($voter) {
        $query->where('student_id', $voter->school_id);
    })->first();

    if ($user) {
        $voter->update(['user_id' => $user->id]);
    }
});
```

### **Step 3: Test Voting Flow**
- Test integrated voting
- Test standalone voting
- Verify remember_token works
- Check session management

---

## 🔒 **Security Considerations**

✅ **Session Security:**
- Voting session separate from main session
- Can vote without affecting main auth
- Session cleared after voting

✅ **User Linking:**
- Voter automatically linked to user when possible
- Uses user's remember_token for persistence
- No duplicate auth features

✅ **Backward Compatibility:**
- Standalone voters still work
- Voter password still functional
- Gradual migration to user-linked voting

---

## ✨ **Summary**

### **Files Modified:**
1. ✅ `Voter.php` - Refactored to extend Model, added user relationship
2. ✅ `VoterAuthController.php` - Session-based auth, user linking
3. ✅ `BallotController.php` - Session-based voter retrieval  
4. ✅ `web.php` - Updated middleware
5. ✅ **New:** `EnsureVoterAuthenticated.php` middleware
6. ✅ **New:** Migration for `user_id` column

### **Key Changes:**
- ✅ Voter linked to User model
- ✅ Session-based voting authentication
- ✅ User's remember_token utilized
- ✅ No auth guard for voters
- ✅ Cleaner, simpler architecture

### **Result:**
A **production-ready voting system** that:
- Leverages User's authentication features
- Avoids duplication
- Maintains security
- Supports both integrated and standalone voting
- No more `remember_token` errors! 🎉

---

**Date:** December 23, 2025  
**Version:** 3.0.0  
**Feature:** Voter-User Relationship & Session Auth  
**Status:** ✅ Complete & Ready for Migration
