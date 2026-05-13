<?php

namespace App\Http\Controllers;

use App\Mail\NewQuoteRequest;
use App\Mail\QuoteRequestConfirmation;
use App\Models\DomainSetting;
use App\Models\QuoteRequest;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class QuoteController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => $this->safeTextRules(required: true, max: 255),
            'email' => ['required', 'email', 'max:255'],
            'phone' => $this->safeTextRules(max: 255),
            'company' => $this->safeTextRules(max: 255),
            'service' => $this->safeTextRules(required: true, max: 255),
            'budget' => $this->safeTextRules(max: 255),
            'timeline' => $this->safeTextRules(max: 255),
            'message' => $this->safeTextRules(required: true),
            'reference_sites' => $this->safeTextRules(),
            'target_audience' => $this->safeTextRules(max: 255),
            'languages' => $this->safeTextRules(max: 100),
            'features' => $this->safeTextRules(),
            'content_source' => $this->safeTextRules(max: 255),
            'billing_info' => $this->safeTextRules(),
            'payment_method' => $this->safeTextRules(max: 100),
            'support' => $this->safeTextRules(max: 255),
            'hosting_domain' => $this->safeTextRules(max: 255),
            'integrations' => $this->safeTextRules(),
            'marketing' => $this->safeTextRules(),
            'legal' => $this->safeTextRules(),
            'priority' => $this->safeTextRules(max: 255),
            'privacy' => ['accepted'],
        ]);

        $data = $this->sanitizeFormData($data);
        $data['privacy'] = true;

        $quote = QuoteRequest::create($data);

        $host = $this->determineHostLabel($request->getHost());
        $recipient = $this->resolveRecipient($request->getHost());

        Mail::to($recipient)->send(new NewQuoteRequest($quote, $host));
        Mail::to($quote->email)->send(new QuoteRequestConfirmation($quote, $host));

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

    /**
     * @return array<int, mixed>
     */
    private function safeTextRules(bool $required = false, ?int $max = null): array
    {
        $rules = [$required ? 'required' : 'nullable', 'string'];

        if ($max !== null) {
            $rules[] = 'max:'.$max;
        }

        $rules[] = $this->rejectExecutableContent();

        return $rules;
    }

    private function rejectExecutableContent(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (! is_string($value)) {
                return;
            }

            if (preg_match('/<\s*\/?\s*(script|iframe|object|embed|link|meta|style)\b|javascript\s*:|data\s*:\s*text\/html|on[a-z]+\s*=/i', $value)) {
                $fail('A mező nem tartalmazhat HTML vagy JavaScript kódot.');
            }
        };
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function sanitizeFormData(array $data): array
    {
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $data[$key] = trim(strip_tags($value));
            }
        }

        return $data;
    }
}
