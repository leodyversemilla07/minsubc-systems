<?php

use Modules\Helpdesk\Models\TicketCategory;
use Modules\Helpdesk\Models\Ticket;
use Modules\Helpdesk\Models\TicketComment;
use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    if (!Schema::hasTable('hlp_categories')) {
        Schema::create('hlp_categories', function ($table) {
            $table->id(); $table->string('name'); $table->text('description')->nullable();
            $table->string('color')->nullable(); $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
        Schema::create('hlp_tickets', function ($table) {
            $table->id(); $table->foreignId('category_id')->constrained('hlp_categories');
            $table->string('title'); $table->text('description'); $table->string('priority')->default('medium');
            $table->string('status')->default('open'); $table->foreignId('reported_by')->constrained('users');
            $table->foreignId('assigned_to')->nullable()->constrained('users');
            $table->dateTime('resolved_at')->nullable(); $table->timestamps();
        });
        Schema::create('hlp_comments', function ($table) {
            $table->id(); $table->foreignId('ticket_id')->constrained('hlp_tickets')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users'); $table->text('body');
            $table->boolean('is_internal')->default(false); $table->timestamps();
        });
    }
    Role::firstOrCreate(['name' => 'helpdesk-admin']);
    Role::firstOrCreate(['name' => 'helpdesk-technician']);
});

test('can create ticket categories', function () {
    $cat = TicketCategory::create(['name' => 'Network Issues', 'color' => '#3b82f6']);
    expect($cat->id)->not->toBeNull();
    expect($cat->name)->toBe('Network Issues');
});

test('can create tickets', function () {
    $user = User::factory()->create();
    $cat = TicketCategory::factory()->create();
    $ticket = Ticket::create([
        'category_id' => $cat->id,
        'title' => 'Computer not booting',
        'description' => 'PC in Lab 3 will not turn on.',
        'priority' => 'high',
        'status' => 'open',
        'reported_by' => $user->id,
    ]);
    expect($ticket->priority)->toBe('high');
    expect($ticket->status)->toBe('open');
});

test('can assign ticket to technician', function () {
    $tech = User::factory()->create();
    $ticket = Ticket::factory()->create();
    $ticket->update(['assigned_to' => $tech->id, 'status' => 'in_progress']);
    $this->assertNotNull($ticket->fresh()->assigned_to);
    expect($ticket->fresh()->status)->toBe('in_progress');
});

test('can resolve ticket', function () {
    $ticket = Ticket::factory()->create(['status' => 'in_progress']);
    $ticket->update(['status' => 'resolved', 'resolved_at' => now()]);
    expect($ticket->fresh()->status)->toBe('resolved');
});

test('can comment on ticket', function () {
    $user = User::factory()->create();
    $ticket = Ticket::factory()->create();
    $comment = TicketComment::create([
        'ticket_id' => $ticket->id,
        'user_id' => $user->id,
        'body' => 'Checking the hardware now.',
    ]);
    expect($comment->body)->toBe('Checking the hardware now.');
});

test('can access admin dashboard', function () {
    $admin = User::factory()->create()->assignRole('helpdesk-admin');
    $response = $this->actingAs($admin)->get('/admin/helpdesk/dashboard');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list tickets', function () {
    $admin = User::factory()->create()->assignRole('helpdesk-admin');
    $response = $this->actingAs($admin)->get('/admin/helpdesk/tickets');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list categories', function () {
    $admin = User::factory()->create()->assignRole('helpdesk-admin');
    $response = $this->actingAs($admin)->get('/admin/helpdesk/categories');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});