<x-votingsystem::layouts.master>
    <div class="min-h-screen bg-gradient-to-br from-[var(--voting-light)] to-white flex items-center justify-center px-4">
        <div class="max-w-md w-full">
            {{-- Login Card --}}
            <div class="bg-white rounded-lg shadow-xl p-8">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-[var(--voting-primary)] mb-2">
                        Voter Login
                    </h2>
                    <p class="text-gray-600">
                        Enter your credentials to cast your vote
                    </p>
                </div>

                {{-- Display Errors --}}
                @if ($errors->any())
                    <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                        <ul class="list-disc list-inside">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                {{-- Display Success Message --}}
                @if (session('success'))
                    <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                        {{ session('success') }}
                    </div>
                @endif

                {{-- Login Form --}}
                <form method="POST" action="{{ route('voting.authenticate') }}" class="space-y-6">
                    @csrf

                    {{-- Voter ID Field --}}
                    <div>
                        <label for="voter_id" class="block text-sm font-medium text-gray-700 mb-2">
                            Voter ID
                        </label>
                        <input 
                            type="text" 
                            id="voter_id" 
                            name="voter_id" 
                            value="{{ old('voter_id') }}"
                            required
                            autofocus
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--voting-primary)] focus:border-transparent transition"
                            placeholder="Enter your voter ID"
                        >
                    </div>

                    {{-- Password Field --}}
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--voting-primary)] focus:border-transparent transition"
                            placeholder="Enter your password"
                        >
                    </div>

                    {{-- Remember Me --}}
                    <div class="flex items-center">
                        <input 
                            type="checkbox" 
                            id="remember" 
                            name="remember"
                            class="h-4 w-4 text-[var(--voting-primary)] focus:ring-[var(--voting-primary)] border-gray-300 rounded"
                        >
                        <label for="remember" class="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    {{-- Submit Button --}}
                    <button 
                        type="submit"
                        class="w-full bg-[var(--voting-primary)] text-white py-3 rounded-lg hover:bg-[var(--voting-dark)] transition font-medium"
                    >
                        Login to Vote
                    </button>
                </form>

                {{-- Additional Links --}}
                <div class="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Don't have an account? 
                        <a href="{{ route('voting.index') }}" class="text-[var(--voting-primary)] hover:underline">
                            Go back
                        </a>
                    </p>
                </div>
            </div>

            {{-- PHP Legacy Code Example --}}
            @php
                // You can include legacy PHP logic here if needed
                // For example, checking election status from the database
                
                // Example: Check if election is active
                // $election = \DB::table('elections')->where('active', 1)->first();
                // $isElectionActive = $election ? true : false;
            @endphp

            {{-- Info Card (conditionally shown based on PHP logic) --}}
            <div class="mt-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-center">
                <p class="text-sm">
                    📅 Election Status: 
                    <span class="font-semibold">
                        {{-- You can use PHP variables here --}}
                        Check with admin for current election
                    </span>
                </p>
            </div>
        </div>
    </div>
</x-votingsystem::layouts.master>
