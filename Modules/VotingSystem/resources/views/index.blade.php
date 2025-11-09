<x-votingsystem::layouts.master>
    <div class="min-h-screen bg-gradient-to-br from-[var(--voting-light)] to-white">
        {{-- Hero Section --}}
        <div class="container mx-auto px-4 py-16">
            <div class="text-center max-w-4xl mx-auto">
                <h1 class="text-5xl font-bold text-[var(--voting-primary)] mb-6">
                    Electronic Voting System
                </h1>
                <p class="text-xl text-gray-600 mb-8">
                    Secure, transparent, and efficient digital voting platform
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="{{ route('voting.login') }}" 
                       class="px-8 py-3 bg-[var(--voting-primary)] text-white rounded-lg hover:bg-[var(--voting-dark)] transition">
                        Cast Your Vote
                    </a>
                    <a href="{{ route('voting.results') }}" 
                       class="px-8 py-3 bg-white text-[var(--voting-primary)] border-2 border-[var(--voting-primary)] rounded-lg hover:bg-[var(--voting-light)] transition">
                        View Results
                    </a>
                </div>
            </div>
        </div>

        {{-- Features Section --}}
        <div class="container mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <div class="text-4xl mb-4">🔒</div>
                    <h3 class="text-xl font-bold text-[var(--voting-primary)] mb-2">Secure</h3>
                    <p class="text-gray-600">
                        Advanced encryption and authentication ensure your vote is protected
                    </p>
                </div>
                
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <div class="text-4xl mb-4">⚡</div>
                    <h3 class="text-xl font-bold text-[var(--voting-primary)] mb-2">Fast</h3>
                    <p class="text-gray-600">
                        Real-time vote counting and instant results when election ends
                    </p>
                </div>
                
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <div class="text-4xl mb-4">✅</div>
                    <h3 class="text-xl font-bold text-[var(--voting-primary)] mb-2">Transparent</h3>
                    <p class="text-gray-600">
                        Complete audit trail and verifiable results for all stakeholders
                    </p>
                </div>
            </div>
        </div>
    </div>
</x-votingsystem::layouts.master>
