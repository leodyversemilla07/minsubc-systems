<?php

test('student model has correct fillable attributes', function () {
    $student = new \App\Models\Student;

    expect($student->getFillable())->toEqual([
        'student_id',
        'user_id',
        'phone',
        'course',
        'year_level',
        'campus',
        'status',
    ]);
});

test('student model has correct primary key', function () {
    $student = new \App\Models\Student;

    expect($student->getKeyName())->toBe('student_id');
    expect($student->getIncrementing())->toBeFalse();
    expect($student->getKeyType())->toBe('string');
});

test('student model has correct casts', function () {
    $student = new \App\Models\Student;

    $casts = $student->getCasts();

    expect($casts['status'])->toBe('string');
    expect($casts['year_level'])->toBe('integer');
});
