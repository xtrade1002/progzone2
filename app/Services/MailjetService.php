<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class MailjetService
{
    private bool $enabled = false;

    private string $fromEmail = '';

    private string $fromName = '';

    private string $toEmail = '';

    private string $apiKey = '';

    private string $apiSecret = '';

    public function __construct()
    {
        $this->apiKey = (string) config('services.mailjet.key');
        $this->apiSecret = (string) config('services.mailjet.secret');
        $this->fromEmail = (string) config('services.mailjet.from_email');
        $this->fromName = (string) (config('services.mailjet.from_name') ?: $this->fromEmail);
        $this->toEmail = (string) config('services.mailjet.to_email');

        if ($this->apiKey && $this->apiSecret && $this->fromEmail && $this->toEmail) {
            $this->enabled = true;
        } else {
            Log::warning('Mailjet credentials are not fully configured. Notification emails will be skipped.');
        }
    }

    /**
     * Send a notification email for a new quote request.
     */
    public function sendQuoteRequestNotification(array $data): void
    {
        $subject = 'Új árajánlatkérés érkezett - ' . Arr::get($data, 'name', 'Ismeretlen ügyfél');

        $fields = [
            'Név' => Arr::get($data, 'name'),
            'E-mail cím' => Arr::get($data, 'email'),
            'Telefonszám' => Arr::get($data, 'phone'),
            'Cég' => Arr::get($data, 'company'),
            'Szolgáltatás' => Arr::get($data, 'service'),
            'Tervezett költségvetés' => Arr::get($data, 'budget'),
            'Tervezett ütemezés' => Arr::get($data, 'timeline'),
            'Üzenet' => Arr::get($data, 'message'),
        ];

        $this->send($subject, $fields);
    }

    /**
     * Send a notification email for a new contact message.
     */
    public function sendContactMessageNotification(array $data): void
    {
        $subject = 'Új kapcsolatfelvételi üzenet érkezett - ' . Arr::get($data, 'name', 'Ismeretlen feladó');

        $fields = [
            'Név' => Arr::get($data, 'name'),
            'E-mail cím' => Arr::get($data, 'email'),
            'Telefonszám' => Arr::get($data, 'phone'),
            'Üzenet' => Arr::get($data, 'message'),
        ];

        $this->send($subject, $fields);
    }

    /**
     * Send an email through Mailjet using the configured credentials.
     */
    private function send(string $subject, array $fields): void
    {
        if (! $this->enabled) {
            return;
        }

        $htmlBody = $this->buildHtmlBody($subject, $fields);
        $textBody = $this->buildTextBody($subject, $fields);

        $payload = [
            'Messages' => [[
                'From' => [
                    'Email' => $this->fromEmail,
                    'Name' => $this->fromName,
                ],
                'To' => [[
                    'Email' => $this->toEmail,
                ]],
                'Subject' => $subject,
                'TextPart' => $textBody,
                'HTMLPart' => $htmlBody,
            ]],
        ];

        try {
            $response = Http::withBasicAuth($this->apiKey, $this->apiSecret)
                ->acceptJson()
                ->post('https://api.mailjet.com/v3.1/send', $payload);

            if ($response->failed()) {
                Log::error('Mailjet API request failed.', [
                    'status' => $response->status(),
                    'body' => $response->json(),
                ]);
            }
        } catch (Throwable $exception) {
            Log::error('Failed to send Mailjet notification email.', [
                'exception' => $exception,
            ]);
        }
    }

    private function buildHtmlBody(string $subject, array $fields): string
    {
        $rows = [];

        foreach ($fields as $label => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            $escaped = htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $rows[] = "<p><strong>{$label}:</strong> {$escaped}</p>";
        }

        $escapedSubject = htmlspecialchars($subject, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        return "<h2>{$escapedSubject}</h2>\n" . implode("\n", $rows);
    }

    private function buildTextBody(string $subject, array $fields): string
    {
        $lines = [];

        foreach ($fields as $label => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            $lines[] = $label . ': ' . (string) $value;
        }

        return $subject . "\n\n" . implode("\n", $lines);
    }
}
