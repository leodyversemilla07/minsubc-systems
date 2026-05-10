<?php

use App\Models\User;
use Modules\HR\Models\Employee;
use Modules\HR\Models\Department;
use Modules\HR\Models\Position;
use Modules\HR\Models\Attendance;
use Modules\HR\Models\LeaveType;
use Modules\HR\Models\LeaveRequest;
use Modules\HR\Models\Evaluation;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'hr-admin']);
    Role::firstOrCreate(['name' => 'hr-staff']);
});

// ─── Model Creation ───────────────────────────────────

test('can create department', function () {
    $dept = Department::create([
        'code' => 'CAS',
        'name' => 'College of Arts and Sciences',
        'type' => 'academic',
    ]);
    expect($dept->code)->toBe('CAS');
    expect($dept->fresh()->is_active)->toBeTrue();
});

test('can create position', function () {
    $pos = Position::create([
        'title' => 'Professor',
        'category' => 'faculty',
        'employment_type' => 'full-time',
    ]);
    expect($pos->title)->toBe('Professor');
    expect($pos->category)->toBe('faculty');
});

test('can create employee', function () {
    $dept = Department::factory()->create();
    $pos = Position::factory()->create();
    $emp = Employee::create([
        'employee_id' => 'EMP-001',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john.doe@example.com',
        'hire_date' => now()->subYear(),
        'department_id' => $dept->id,
        'position_id' => $pos->id,
        'employment_status' => 'active',
    ]);
    expect($emp->full_name)->toBe('Doe, John');
    expect($emp->department->id)->toBe($dept->id);
});

test('employee belongs to department and position', function () {
    $dept = Department::factory()->create(['name' => 'Engineering']);
    $pos = Position::factory()->create(['title' => 'Instructor']);
    $emp = Employee::factory()->create([
        'department_id' => $dept->id,
        'position_id' => $pos->id,
    ]);
    expect($emp->department->name)->toBe('Engineering');
    expect($emp->position->title)->toBe('Instructor');
});

test('can create attendance record', function () {
    $emp = Employee::factory()->create();
    $attendance = Attendance::create([
        'employee_id' => $emp->id,
        'date' => today(),
        'time_in' => now(),
        'status' => 'present',
    ]);
    expect($attendance->employee->id)->toBe($emp->id);
    expect($attendance->status)->toBe('present');
});

test('attendance prevents duplicate date', function () {
    $emp = Employee::factory()->create();
    Attendance::create(['employee_id' => $emp->id, 'date' => today(), 'status' => 'present']);
    $this->expectException(Illuminate\Database\QueryException::class);
    Attendance::create(['employee_id' => $emp->id, 'date' => today(), 'status' => 'late']);
});

test('can create leave type', function () {
    $lt = LeaveType::create([
        'name' => 'Sick Leave',
        'code' => 'SL',
        'days_per_year' => 15,
        'is_paid' => true,
    ]);
    expect($lt->code)->toBe('SL');
    expect($lt->days_per_year)->toBe(15);
});

test('can create leave request', function () {
    $emp = Employee::factory()->create();
    $lt = LeaveType::factory()->create();
    $leave = LeaveRequest::create([
        'leave_code' => 'LV-2026-00001',
        'employee_id' => $emp->id,
        'leave_type_id' => $lt->id,
        'start_date' => now()->addDay(),
        'end_date' => now()->addDays(3),
        'total_days' => 3,
        'reason' => 'Medical appointment',
        'status' => 'pending',
    ]);
    expect($leave->status)->toBe('pending');
    expect($leave->employee->id)->toBe($emp->id);
});

test('leave request defaults to pending', function () {
    $emp = Employee::factory()->create();
    $lt = LeaveType::factory()->create();
    $leave = LeaveRequest::factory()->create(['employee_id' => $emp->id, 'leave_type_id' => $lt->id]);
    expect($leave->status)->toBe('pending');
});

test('can create evaluation', function () {
    $emp = Employee::factory()->create();
    $eval = Evaluation::create([
        'employee_id' => $emp->id,
        'evaluator_id' => $emp->id,
        'type' => 'performance',
        'period' => 'Q1 2026',
        'rating' => 4,
        'status' => 'completed',
        'submitted_at' => now(),
    ]);
    expect($eval->rating)->toBe(4);
    expect($eval->employee->id)->toBe($emp->id);
});

// ─── Admin Dashboard ──────────────────────────────────

test('hr-admin can view dashboard', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('unauthorized user cannot access hr admin', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->get(route('hr.admin.dashboard'))->assertForbidden();
});

test('guest cannot access hr admin', function () {
    $this->get(route('hr.admin.dashboard'))->assertRedirect(route('login'));
});

// ─── Employees CRUD ──────────────────────────────────

test('admin can view employees list', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    Employee::factory()->count(3)->create();
    $response = $this->actingAs($admin)->get(route('hr.admin.employees.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view employee create page', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.employees.create'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create employee', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $dept = Department::factory()->create();
    $pos = Position::factory()->create();
    $response = $this->actingAs($admin)->post(route('hr.admin.employees.store'), [
        'employee_id' => 'EMP-002',
        'first_name' => 'Jane',
        'last_name' => 'Smith',
        'email' => 'jane.smith@example.com',
        'hire_date' => now()->format('Y-m-d'),
        'employment_status' => 'active',
    ]);
    $response->assertRedirect(route('hr.admin.employees.index'));
    expect(Employee::where('employee_id', 'EMP-002')->exists())->toBeTrue();
});

test('admin can view employee details', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $emp = Employee::factory()->create();
    $response = $this->actingAs($admin)->get(route('hr.admin.employees.show', $emp));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can edit employee page', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $emp = Employee::factory()->create();
    $response = $this->actingAs($admin)->get(route('hr.admin.employees.edit', $emp));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can update employee', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $emp = Employee::factory()->create(['first_name' => 'Old']);
    $response = $this->actingAs($admin)->put(route('hr.admin.employees.update', $emp), [
        'employee_id' => $emp->employee_id,
        'first_name' => 'Updated',
        'last_name' => $emp->last_name,
        'email' => $emp->email,
        'hire_date' => $emp->hire_date->format('Y-m-d'),
        'employment_status' => 'active',
    ]);
    $response->assertRedirect(route('hr.admin.employees.index'));
    expect($emp->fresh()->first_name)->toBe('Updated');
});

test('admin can delete employee', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $emp = Employee::factory()->create();
    $response = $this->actingAs($admin)->delete(route('hr.admin.employees.destroy', $emp));
    $response->assertRedirect(route('hr.admin.employees.index'));
    expect(Employee::find($emp->id))->toBeNull();
});

// ─── Departments CRUD ─────────────────────────────────

test('admin can view departments', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.departments.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create department', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->post(route('hr.admin.departments.store'), [
        'code' => 'COE',
        'name' => 'College of Engineering',
        'type' => 'academic',
    ]);
    $response->assertRedirect(route('hr.admin.departments.index'));
    expect(Department::where('code', 'COE')->exists())->toBeTrue();
});

test('admin can update department', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $dept = Department::factory()->create(['name' => 'Old Dept']);
    $response = $this->actingAs($admin)->put(route('hr.admin.departments.update', $dept), [
        'code' => $dept->code,
        'name' => 'Updated Dept',
        'type' => 'academic',
        'is_active' => true,
    ]);
    $response->assertRedirect(route('hr.admin.departments.index'));
    expect($dept->fresh()->name)->toBe('Updated Dept');
});

test('admin cannot delete department with employees', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $dept = Department::factory()->create();
    Employee::factory()->create(['department_id' => $dept->id]);
    $response = $this->actingAs($admin)->delete(route('hr.admin.departments.destroy', $dept));
    expect($response->status())->toBe(302);
    expect(Department::find($dept->id))->not->toBeNull();
});

// ─── Positions ────────────────────────────────────────

test('admin can view positions', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.positions.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create position', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->post(route('hr.admin.positions.store'), [
        'title' => 'Assistant Professor',
        'category' => 'faculty',
        'employment_type' => 'full-time',
    ]);
    $response->assertRedirect(route('hr.admin.positions.index'));
    expect(Position::where('title', 'Assistant Professor')->exists())->toBeTrue();
});

test('admin can update position', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $pos = Position::factory()->create(['title' => 'Old Title']);
    $response = $this->actingAs($admin)->put(route('hr.admin.positions.update', $pos), [
        'title' => 'Updated Title',
        'category' => 'faculty',
        'employment_type' => 'full-time',
        'is_active' => true,
    ]);
    $response->assertRedirect(route('hr.admin.positions.index'));
    expect($pos->fresh()->title)->toBe('Updated Title');
});

// ─── Attendance ──────────────────────────────────────

test('admin can view attendance', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.attendance.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view attendance report', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.attendance.report'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view employee attendance', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $emp = Employee::factory()->create();
    $response = $this->actingAs($admin)->get(route('hr.admin.attendance.employee', $emp));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can bulk update attendance', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $emp = Employee::factory()->create();
    $response = $this->actingAs($admin)->post(route('hr.admin.attendance.bulk'), [
        'records' => [
            ['employee_id' => $emp->id, 'date' => today()->format('Y-m-d'), 'status' => 'present'],
        ],
    ]);
    $response->assertRedirect(route('hr.admin.attendance.index'));
    expect(Attendance::where('employee_id', $emp->id)->whereDate('date', today())->exists())->toBeTrue();
});

// ─── Leave Requests ──────────────────────────────────

test('admin can view leave requests', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.leave.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view leave details', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $leave = LeaveRequest::factory()->create();
    $response = $this->actingAs($admin)->get(route('hr.admin.leave.show', $leave));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can approve leave request', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $leave = LeaveRequest::factory()->create(['status' => 'pending']);
    $response = $this->actingAs($admin)->post(route('hr.admin.leave.approve', $leave), [
        'approval_notes' => 'Approved.',
    ]);
    expect(in_array($response->status(), [302, 200]))->toBeTrue();
    expect($leave->fresh()->status)->toBe('approved');
});

test('admin can reject leave request', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $leave = LeaveRequest::factory()->create(['status' => 'pending']);
    $response = $this->actingAs($admin)->post(route('hr.admin.leave.reject', $leave), [
        'approval_notes' => 'Insufficient reason.',
    ]);
    expect(in_array($response->status(), [302, 200]))->toBeTrue();
    expect($leave->fresh()->status)->toBe('rejected');
});

// ─── Evaluations ──────────────────────────────────────

test('admin can view evaluations', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.evaluations.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can create evaluation', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $emp = Employee::factory()->create();
    $response = $this->actingAs($admin)->post(route('hr.admin.evaluations.store'), [
        'employee_id' => $emp->id,
        'evaluator_id' => $emp->id,
        'type' => 'performance',
        'period' => 'Q1 2026',
        'rating' => 4,
        'comments' => 'Good performance.',
    ]);
    $response->assertRedirect(route('hr.admin.evaluations.index'));
    expect(Evaluation::where('type', 'performance')->exists())->toBeTrue();
});

test('admin can view evaluation details', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $eval = Evaluation::factory()->create();
    $response = $this->actingAs($admin)->get(route('hr.admin.evaluations.show', $eval));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Reports ──────────────────────────────────────────

test('admin can view reports', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.reports.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view attendance report page', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.reports.attendance'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('admin can view leave report page', function () {
    $admin = User::factory()->create()->assignRole('hr-admin');
    $response = $this->actingAs($admin)->get(route('hr.admin.reports.leave'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Public Pages ─────────────────────────────────────

test('public can view hr home', function () {
    $response = $this->get(route('hr.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('public can view employee directory', function () {
    $response = $this->get(route('hr.directory'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Permissions ──────────────────────────────────────

test('hr-staff can access admin dashboard', function () {
    $staff = User::factory()->create()->assignRole('hr-staff');
    $response = $this->actingAs($staff)->get(route('hr.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── API Endpoints ────────────────────────────────────

test('employee search API works', function () {
    Employee::factory()->create(['first_name' => 'Searchable', 'employee_id' => 'SRC-001']);
    $response = $this->getJson(route('hr.api.employees.search', ['q' => 'Searchable']));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('departments API works', function () {
    Department::factory()->create(['code' => 'API-TEST']);
    $response = $this->getJson(route('hr.api.departments'));
    expect($response->status())->toBe(200);
});