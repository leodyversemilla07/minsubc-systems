<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BrandedEmailService
{
    /**
     * Send a branded email using SendGrid.
     */
    public function send(
        string $to,
        string $subject,
        string $bodyContent,
        string $module = 'general',
        array $options = []
    ): bool {
        $sendgridApiKey = config('services.sendgrid.api_key');

        if (! $sendgridApiKey || ! $to) {
            Log::warning('Branded email not sent: Missing API key or email address', [
                'email' => $to,
                'has_api_key' => ! empty($sendgridApiKey),
            ]);

            return false;
        }

        $html = $this->generateBrandedHtml($subject, $bodyContent, $module, $options);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$sendgridApiKey,
                'Content-Type' => 'application/json',
            ])->post('https://api.sendgrid.com/v3/mail/send', [
                'personalizations' => [
                    [
                        'to' => [['email' => $to]],
                        'subject' => $subject,
                    ],
                ],
                'from' => [
                    'email' => $options['from_email'] ?? config('mail.from.address', 'noreply@minsu.edu.ph'),
                    'name' => $options['from_name'] ?? config('mail.from.name', 'MinSU BC Systems'),
                ],
                'content' => [
                    [
                        'type' => 'text/html',
                        'value' => $html,
                    ],
                    [
                        'type' => 'text/plain',
                        'value' => strip_tags($bodyContent),
                    ],
                ],
            ]);

            if ($response->successful()) {
                Log::info('Branded email sent successfully', [
                    'email' => $to,
                    'subject' => $subject,
                    'module' => $module,
                ]);

                return true;
            }

            Log::error('Branded email sending failed', [
                'email' => $to,
                'subject' => $subject,
                'response' => $response->json(),
            ]);

            return false;
        } catch (\Exception $e) {
            Log::error('Branded email sending exception', [
                'email' => $to,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Generate branded HTML email.
     */
    private function generateBrandedHtml(
        string $subject,
        string $bodyContent,
        string $module,
        array $options
    ): string {
        $moduleConfig = $this->getModuleConfig($module);
        $year = date('Y');
        $appName = config('app.name', 'MinSU BC Systems');

        // Convert plain text to HTML paragraphs
        $formattedBody = $this->formatBodyContent($bodyContent);

        // Action button (optional)
        $actionButton = '';
        if (! empty($options['action_url']) && ! empty($options['action_text'])) {
            $actionButton = <<<HTML
            <tr>
                <td style="padding: 20px 0;">
                    <a href="{$options['action_url']}" 
                       style="display: inline-block; padding: 14px 30px; background-color: {$moduleConfig['primary_color']}; 
                              color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                        {$options['action_text']}
                    </a>
                </td>
            </tr>
HTML;
        }

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, {$moduleConfig['primary_color']} 0%, {$moduleConfig['secondary_color']} 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 24px; font-weight: bold;">
                                {$moduleConfig['logo_text']}
                            </h1>
                            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                {$moduleConfig['tagline']}
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">
                                {$subject}
                            </h2>
                            
                            <div style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                                {$formattedBody}
                            </div>
                            
                            {$actionButton}
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 25px 40px; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="color: #6b7280; font-size: 12px; line-height: 1.5;">
                                        <p style="margin: 0 0 5px 0;">
                                            <strong>Mindoro State University - Bongabong Campus</strong>
                                        </p>
                                        <p style="margin: 0 0 5px 0;">
                                            Bongabong, Oriental Mindoro, Philippines
                                        </p>
                                        <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 11px;">
                                            This is an automated message from {$appName}. 
                                            Please do not reply directly to this email.
                                        </p>
                                        <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 11px;">
                                            © {$year} Mindoro State University. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }

    /**
     * Get module-specific configuration for email branding.
     */
    private function getModuleConfig(string $module): array
    {
        $configs = [
            'registrar' => [
                'primary_color' => '#1e40af',
                'secondary_color' => '#3b82f6',
                'logo_text' => '📄 MinSU Document Request System',
                'tagline' => 'Office of the University Registrar',
            ],
            'sas' => [
                'primary_color' => '#059669',
                'secondary_color' => '#10b981',
                'logo_text' => '🎓 Student Affairs Services',
                'tagline' => 'Scholarships, Insurance & Organizations',
            ],
            'usg' => [
                'primary_color' => '#7c3aed',
                'secondary_color' => '#8b5cf6',
                'logo_text' => '🏛️ University Student Government',
                'tagline' => 'Information & Transparency Portal',
            ],
            'voting' => [
                'primary_color' => '#dc2626',
                'secondary_color' => '#ef4444',
                'logo_text' => '🗳️ USG Election System',
                'tagline' => 'Secure & Transparent Voting',
            ],
            'general' => [
                'primary_color' => '#374151',
                'secondary_color' => '#6b7280',
                'logo_text' => '🏫 MinSU BC Systems',
                'tagline' => 'Mindoro State University - Bongabong Campus',
            ],
        ];

        return $configs[$module] ?? $configs['general'];
    }

    /**
     * Format body content - convert plain text to HTML.
     */
    private function formatBodyContent(string $content): string
    {
        // Convert newlines to paragraphs
        $paragraphs = preg_split('/\n\s*\n/', $content);
        $formatted = '';

        foreach ($paragraphs as $paragraph) {
            $paragraph = trim($paragraph);
            if (empty($paragraph)) {
                continue;
            }

            // Convert single newlines to <br>
            $paragraph = nl2br(htmlspecialchars($paragraph));

            $formatted .= "<p style=\"margin: 0 0 15px 0;\">{$paragraph}</p>";
        }

        return $formatted;
    }
}
