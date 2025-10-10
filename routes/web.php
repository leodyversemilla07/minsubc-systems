<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();

        // Get stats for the user
        $stats = [
            'total_requests' => 0,
            'pending_payment' => 0,
            'processing' => 0,
            'ready_for_pickup' => 0,
            'completed' => 0,
        ];

        $recentRequests = collect();

        if ($user->student) {
            // Student stats
            $studentRequests = \App\Modules\Registrar\Models\DocumentRequest::where('student_id', $user->student->student_id);

            $stats = [
                'total_requests' => $studentRequests->count(),
                'pending_payment' => (clone $studentRequests)->where('status', 'pending_payment')->count(),
                'processing' => (clone $studentRequests)->whereIn('status', ['paid', 'processing'])->count(),
                'ready_for_pickup' => (clone $studentRequests)->where('status', 'ready_for_pickup')->count(),
                'completed' => (clone $studentRequests)->whereIn('status', ['released'])->count(),
            ];

            $recentRequests = $studentRequests->latest()->take(5)->get([
                'id', 'request_number', 'document_type', 'status', 'created_at', 'amount',
            ]);
        }

        return Inertia::render('dashboard', [
            'user' => $user->only(['first_name', 'last_name', 'email']) + [
                'student' => $user->student?->only(['student_id', 'course', 'year_level']),
            ],
            'stats' => $stats,
            'recent_requests' => $recentRequests,
        ]);
    })->name('dashboard');
});

// Preview route for Blade templates (development only)
Route::get('/preview/grades', function () {
    // Create mock data for preview
    $mockRequest = new \App\Modules\Registrar\Models\DocumentRequest();
    $mockRequest->request_number = 'REQ-2025-001';
    
    $mockUser = new \App\Models\User();
    $mockUser->first_name = 'Juan';
    $mockUser->middle_name = 'Santos';
    $mockUser->last_name = 'Dela Cruz';
    
    $mockStudent = new \App\Modules\Registrar\Models\Student();
    $mockStudent->student_id = '2024-00123';
    $mockStudent->course = 'Bachelor of Science in Computer Science';
    $mockStudent->year_level = '3rd Year';
    $mockStudent->setRelation('user', $mockUser);
    
    // Generate verification QR code
    $verificationHash = hash('sha256', $mockRequest->request_number.$mockStudent->student_id.config('app.key'));
    $verificationUrl = config('app.url').'/verify/'.$mockRequest->request_number.'?hash='.$verificationHash;
    
    $renderer = new \BaconQrCode\Renderer\ImageRenderer(
        new \BaconQrCode\Renderer\RendererStyle\RendererStyle(200),
        new \BaconQrCode\Renderer\Image\SvgImageBackEnd
    );
    $writer = new \BaconQrCode\Writer($renderer);
    $qrCode = 'data:image/svg+xml;base64,'.base64_encode($writer->writeString($verificationUrl));
    
    $data = [
        'student' => $mockStudent,
        'request' => $mockRequest,
        'qr_code' => $qrCode,
        'issued_date' => now()->format('F j, Y'),
        'grades' => [
            ['subject' => 'Programming 1', 'grade' => '1.25', 'semester' => '1st Semester 2024'],
            ['subject' => 'Database Management', 'grade' => '1.50', 'semester' => '1st Semester 2024'],
            ['subject' => 'Web Development', 'grade' => '1.75', 'semester' => '2nd Semester 2024'],
            ['subject' => 'Data Structures', 'grade' => '1.50', 'semester' => '2nd Semester 2024'],
            ['subject' => 'Software Engineering', 'grade' => '1.25', 'semester' => '1st Semester 2025'],
        ],
    ];
    
    return view('documents.grades', $data);
});

// Preview index page
Route::get('/preview', function () {
    return view('preview-index');
});

// Preview route for Certificate of Enrollment
Route::get('/preview/coe', function () {
    $mockRequest = new \App\Modules\Registrar\Models\DocumentRequest();
    $mockRequest->request_number = 'REQ-2025-002';
    $mockRequest->purpose = 'scholarship application';
    
    $mockUser = new \App\Models\User();
    $mockUser->first_name = 'Maria';
    $mockUser->middle_name = 'Santos';
    $mockUser->last_name = 'Garcia';
    
    $mockStudent = new \App\Modules\Registrar\Models\Student();
    $mockStudent->student_id = '2024-00456';
    $mockStudent->course = 'Bachelor of Science in Information Technology';
    $mockStudent->year_level = '2nd Year';
    $mockStudent->setRelation('user', $mockUser);
    
    // Generate verification QR code
    $verificationHash = hash('sha256', $mockRequest->request_number.$mockStudent->student_id.config('app.key'));
    $verificationUrl = config('app.url').'/verify/'.$mockRequest->request_number.'?hash='.$verificationHash;
    
    $renderer = new \BaconQrCode\Renderer\ImageRenderer(
        new \BaconQrCode\Renderer\RendererStyle\RendererStyle(200),
        new \BaconQrCode\Renderer\Image\SvgImageBackEnd
    );
    $writer = new \BaconQrCode\Writer($renderer);
    $qrCode = 'data:image/svg+xml;base64,'.base64_encode($writer->writeString($verificationUrl));
    
    $data = [
        'student' => $mockStudent,
        'request' => $mockRequest,
        'qr_code' => $qrCode,
        'issued_date' => now()->format('F j, Y'),
        'valid_until' => now()->addMonths(6)->format('F j, Y'),
    ];
    
    return view('documents.coe', $data);
});

// Preview route for Certificate of Good Moral
Route::get('/preview/good-moral', function () {
    $mockRequest = new \App\Modules\Registrar\Models\DocumentRequest();
    $mockRequest->request_number = 'REQ-2025-003';
    
    $mockUser = new \App\Models\User();
    $mockUser->first_name = 'Pedro';
    $mockUser->middle_name = 'Reyes';
    $mockUser->last_name = 'Santos';
    
    $mockStudent = new \App\Modules\Registrar\Models\Student();
    $mockStudent->student_id = '2023-00789';
    $mockStudent->course = 'Bachelor of Arts in Communication';
    $mockStudent->year_level = '4th Year';
    $mockStudent->setRelation('user', $mockUser);
    
    // Generate verification QR code
    $verificationHash = hash('sha256', $mockRequest->request_number.$mockStudent->student_id.config('app.key'));
    $verificationUrl = config('app.url').'/verify/'.$mockRequest->request_number.'?hash='.$verificationHash;
    
    $renderer = new \BaconQrCode\Renderer\ImageRenderer(
        new \BaconQrCode\Renderer\RendererStyle\RendererStyle(200),
        new \BaconQrCode\Renderer\Image\SvgImageBackEnd
    );
    $writer = new \BaconQrCode\Writer($renderer);
    $qrCode = 'data:image/svg+xml;base64,'.base64_encode($writer->writeString($verificationUrl));
    
    $data = [
        'student' => $mockStudent,
        'request' => $mockRequest,
        'qr_code' => $qrCode,
        'issued_date' => now()->format('F j, Y'),
        'purpose' => 'employment requirements',
    ];
    
    return view('documents.certificate_good_moral', $data);
});

// Preview route for Transcript of Records
Route::get('/preview/tor', function () {
    $mockRequest = new \App\Modules\Registrar\Models\DocumentRequest();
    $mockRequest->request_number = 'REQ-2025-004';
    
    $mockUser = new \App\Models\User();
    $mockUser->first_name = 'Ana';
    $mockUser->middle_name = 'Cruz';
    $mockUser->last_name = 'Fernandez';
    
    $mockStudent = new \App\Modules\Registrar\Models\Student();
    $mockStudent->student_id = '2022-00321';
    $mockStudent->course = 'Bachelor of Science in Accountancy';
    $mockStudent->year_level = '3rd Year';
    $mockStudent->setRelation('user', $mockUser);
    
    // Generate verification QR code
    $verificationHash = hash('sha256', $mockRequest->request_number.$mockStudent->student_id.config('app.key'));
    $verificationUrl = config('app.url').'/verify/'.$mockRequest->request_number.'?hash='.$verificationHash;
    
    $renderer = new \BaconQrCode\Renderer\ImageRenderer(
        new \BaconQrCode\Renderer\RendererStyle\RendererStyle(200),
        new \BaconQrCode\Renderer\Image\SvgImageBackEnd
    );
    $writer = new \BaconQrCode\Writer($renderer);
    $qrCode = 'data:image/svg+xml;base64,'.base64_encode($writer->writeString($verificationUrl));
    
    $data = [
        'student' => $mockStudent,
        'request' => $mockRequest,
        'qr_code' => $qrCode,
        'issued_date' => now()->format('F j, Y'),
        'academic_records' => [
            ['code' => 'CS101', 'subject' => 'Introduction to Computing', 'units' => '3', 'grade' => '1.25', 'semester' => '1st Sem 2022-2023'],
            ['code' => 'MATH101', 'subject' => 'College Algebra', 'units' => '3', 'grade' => '1.50', 'semester' => '1st Sem 2022-2023'],
            ['code' => 'ENG101', 'subject' => 'English Communication', 'units' => '3', 'grade' => '1.75', 'semester' => '1st Sem 2022-2023'],
            ['code' => 'CS102', 'subject' => 'Programming Fundamentals', 'units' => '3', 'grade' => '1.25', 'semester' => '2nd Sem 2022-2023'],
            ['code' => 'MATH102', 'subject' => 'Trigonometry', 'units' => '3', 'grade' => '1.50', 'semester' => '2nd Sem 2022-2023'],
            ['code' => 'PE101', 'subject' => 'Physical Education 1', 'units' => '2', 'grade' => '1.00', 'semester' => '2nd Sem 2022-2023'],
            ['code' => 'CS201', 'subject' => 'Data Structures', 'units' => '3', 'grade' => '1.50', 'semester' => '1st Sem 2023-2024'],
            ['code' => 'CS202', 'subject' => 'Object-Oriented Programming', 'units' => '3', 'grade' => '1.25', 'semester' => '1st Sem 2023-2024'],
            ['code' => 'CS203', 'subject' => 'Database Management', 'units' => '3', 'grade' => '1.75', 'semester' => '2nd Sem 2023-2024'],
            ['code' => 'CS204', 'subject' => 'Web Development', 'units' => '3', 'grade' => '1.50', 'semester' => '2nd Sem 2023-2024'],
        ],
    ];
    
    return view('documents.tor', $data);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Registrar Module Routes
require __DIR__.'/../app/Modules/Registrar/routes.php';
