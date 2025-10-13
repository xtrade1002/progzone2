<?php

namespace App\Http\Controllers;

use App\Mail\NewQuoteRequest;
use App\Models\DomainSetting;
use App\Models\QuoteRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class QuoteController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'service' => ['required', 'string', 'max:255'],
            'budget' => ['nullable', 'string', 'max:255'],
            'timeline' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'reference_sites' => ['nullable', 'string'],
            'target_audience' => ['nullable', 'string', 'max:255'],
            'languages' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'string'],
            'content_source' => ['nullable', 'string', 'max:255'],
            'billing_info' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:100'],
            'support' => ['nullable', 'string', 'max:255'],
            'hosting_domain' => ['nullable', 'string', 'max:255'],
            'integrations' => ['nullable', 'string'],
            'marketing' => ['nullable', 'string'],
            'legal' => ['nullable', 'string'],
            'priority' => ['nullable', 'string', 'max:255'],
            'privacy' => ['accepted'],
        ]);

        $data['privacy'] = true;

        $quote = QuoteRequest::create($data);

        $host = $this->determineHostLabel($request->getHost());
        $recipient = $this->resolveRecipient($request->getHost());

        Mail::to($recipient)->send(new NewQuoteRequest($quote, $host));

        return redirect()
            ->back()
            ->with('success', __('flash_quote_success'));
    }

    protected function resolveRecipient(?string $host): string
    {
        $domain = $this->normalizeDomain($host);

        $candidates = collect([$domain])
            ->merge($this->fallbackDomains($domain))
            ->push(null)
            ->filter(function ($candidate) {
                if ($candidate === null) {
                    return true;
                }

                return is_string($candidate) && $candidate !== '';
            })
            ->unique()
            ->values();

        foreach ($candidates as $candidate) {
            $query = DomainSetting::query();

            if ($candidate === null) {
                $query->whereNull('domain');
            } else {
                $query->where('domain', $candidate);
            }

            $email = $query->value('contact_email');

            if (is_string($email) && $email !== '') {
                return $email;
            }
        }

        return (string) config('mail.from.address', 'info@progzone.de');
    }

    protected function determineHostLabel(?string $host): string
    {
        $normalized = $this->normalizeDomain($host);

        if (is_string($normalized) && $normalized !== '') {
            return $normalized;
        }

        $fallback = parse_url((string) config('app.url'), PHP_URL_HOST);

        if (is_string($fallback) && $fallback !== '') {
            return $this->normalizeDomain($fallback) ?: $fallback;
        }

        return 'progzone.hu';
    }

    protected function fallbackDomains(?string $currentDomain): array
    {
        $fallbacks = config('prices.fallback_domains', []);

        if (is_string($fallbacks)) {
            $fallbacks = array_map('trim', explode(',', $fallbacks));
        }

        return collect($fallbacks)
            ->push('progzone.hu')
            ->map(fn ($domain) => $this->normalizeDomain($domain))
            ->filter()
            ->unique()
            ->reject(fn ($domain) => $domain === $currentDomain)
            ->values()
            ->all();
    }

    protected function normalizeDomain(?string $domain): ?string
    {
        if ($domain === null) {
            return null;
        }

        $normalized = Str::of($domain)
            ->lower()
            ->trim()
            ->value();

        if ($normalized === '') {
            return null;
        }

        if (Str::startsWith($normalized, ['http://', 'https://'])) {
            $parsedHost = parse_url($normalized, PHP_URL_HOST);

            if (is_string($parsedHost) && $parsedHost !== '') {
                $normalized = $parsedHost;
            }
        }

        if (Str::startsWith($normalized, '//')) {
            $normalized = Str::substr($normalized, 2);
        }

        if (Str::startsWith($normalized, 'www.')) {
            $normalized = Str::substr($normalized, 4);
        }

        $normalized = Str::before($normalized, '/');
        $normalized = Str::before($normalized, ':');

        if (in_array($normalized, ['localhost', '127.0.0.1'], true)) {
            return null;
        }

        return $normalized ?: null;
    }
}
