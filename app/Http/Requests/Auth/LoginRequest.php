<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'school_id' => ['nullable', 'string'],
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Validate the request's credentials and return the user without logging them in.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateCredentials(): User
    {
        $this->ensureIsNotRateLimited();

        // Find user by email first
        /** @var User|null $user */
        $user = User::where('email', $this->input('email'))->first();

        // Validate user exists
        if (! $user) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

        // Validate password
        if (! Auth::getProvider()->validateCredentials($user, $this->only('password'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'password' => 'The provided password is incorrect.',
            ]);
        }

        // Validate school_id matches student_id (only for students)
        if ($user->student) {
            // User is a student - school_id is required and must match
            if (! $this->filled('school_id')) {
                RateLimiter::hit($this->throttleKey());

                throw ValidationException::withMessages([
                    'school_id' => 'School ID is required for student accounts.',
                ]);
            }

            if ($user->student->student_id !== $this->input('school_id')) {
                RateLimiter::hit($this->throttleKey());

                throw ValidationException::withMessages([
                    'school_id' => 'The provided school ID does not match your account.',
                ]);
            }
        }
        // For non-student users (staff, admin), school_id is optional and not validated

        RateLimiter::clear($this->throttleKey());

        return $user;
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate-limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return $this->string('email')
            ->lower()
            ->append('|'.$this->ip())
            ->transliterate()
            ->value();
    }
}
