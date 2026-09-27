<?php

use App\Models\SystemSetting;

test('can store and retrieve a plain setting', function () {
    SystemSetting::setValue('site.name', 'MinSU Portal');

    expect(SystemSetting::getValue('site.name'))->toBe('MinSU Portal');
});

test('returns default when setting does not exist', function () {
    expect(SystemSetting::getValue('missing.key'))->toBeNull();
    expect(SystemSetting::getValue('missing.key', 'fallback'))->toBe('fallback');
});

test('updating an existing key overwrites the value', function () {
    SystemSetting::setValue('site.name', 'Old Name');
    SystemSetting::setValue('site.name', 'New Name');

    expect(SystemSetting::getValue('site.name'))->toBe('New Name');
    expect(SystemSetting::where('setting_key', 'site.name')->count())->toBe(1);
});

test('encrypted settings are stored encrypted and read decrypted', function () {
    SystemSetting::setValue('mail.password', 'super-secret', encrypt: true);

    $setting = SystemSetting::where('setting_key', 'mail.password')->first();

    expect($setting->is_encrypted)->toBeTrue();
    expect($setting->getRawOriginal('value'))->not->toBe('super-secret');
    expect($setting->decrypted_value)->toBe('super-secret');
    expect(SystemSetting::getValue('mail.password'))->toBe('super-secret');
});

test('plain settings expose value directly via decrypted accessor', function () {
    SystemSetting::setValue('site.tagline', 'We Must Ship');

    $setting = SystemSetting::where('setting_key', 'site.tagline')->first();

    expect($setting->is_encrypted)->toBeFalse();
    expect($setting->decrypted_value)->toBe('We Must Ship');
});
