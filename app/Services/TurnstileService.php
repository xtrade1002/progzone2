<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class TurnstileService
{
    private string $secretKey;

    private int $timeout;

    public function __construct()
    {
        $this->secretKey = (string) config('services.turnstile.secret_key');
        $this->timeout = (int) config('services.turnstile.timeout', 8);
    }

    public function enabled(): bool
    {
        return $this->secretKey !== '';
    }

    public function validate(?string $token, ?string $remoteIp = null): bool
    {
        if (! $this->enabled()) {
            return true;
        }

        if (! $token || mb_strlen($token) > 2048) {
            return false;
        }

        try {
            $payload = [
                'secret' => $this->secretKey,
                'response' => $token,
            ];

            if ($remoteIp) {
                $payload['remoteip'] = $remoteIp;
            }

            $response = Http::asForm()
                ->timeout($this->timeout)
                ->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', $payload);

            if ($response->failed()) {
                Log::warning('Cloudflare Turnstile validation request failed.', [
                    'status' => $response->status(),
                ]);

                return false;
            }

            $result = $response->json();

            if (! (bool) ($result['success'] ?? false)) {
                Log::info('Cloudflare Turnstile validation rejected a submission.', [
                    'error_codes' => $result['error-codes'] ?? [],
                ]);

                return false;
            }

            return true;
        } catch (Throwable $exception) {
            Log::warning('Cloudflare Turnstile validation could not be completed.', [
                'exception' => $exception,
            ]);

            return false;
        }
    }
}
