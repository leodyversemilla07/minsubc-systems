<?php

namespace Modules\VotingSystem\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureVoterAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if voter ID exists in session
        if (! $request->session()->has('voting.voter_id')) {
            return redirect()->route('voting.login')
                ->withErrors(['error' => 'Please login to access the voting system.']);
        }

        // Optionally verify the voter still exists and hasn't voted
        $voterId = $request->session()->get('voting.voter_id');
        $voter = \Modules\VotingSystem\Models\Voter::find($voterId);

        if (! $voter) {
            $request->session()->forget(['voting.voter_id', 'voting.election_id']);

            return redirect()->route('voting.login')
                ->withErrors(['error' => 'Voter session invalid. Please login again.']);
        }

        return $next($request);
    }
}
