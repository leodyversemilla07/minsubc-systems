<header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <h1 class="text-2xl font-bold text-[var(--voting-primary)]">
                    <a href="{{ route('voting.index') }}">Voting System</a>
                </h1>
            </div>

            <nav class="flex items-center space-x-6">
                @guest('voter')
                    <a href="{{ route('voting.login') }}" class="text-gray-700 hover:text-[var(--voting-primary)] transition">
                        Login
                    </a>
                    <a href="{{ route('voting.results') }}" class="text-gray-700 hover:text-[var(--voting-primary)] transition">
                        Results
                    </a>
                @else
                    <span class="text-gray-700">Welcome, {{ auth('voter')->user()->name }}</span>
                    <form method="POST" action="{{ route('voting.logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-gray-700 hover:text-[var(--voting-primary)] transition">
                            Logout
                        </button>
                    </form>
                @endguest
            </nav>
        </div>
    </div>
</header>
