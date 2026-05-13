<?php

namespace App\Http\Controllers;

use App\Mail\NewContactMessage;
use App\Mail\NewQuoteRequest;
use App\Mail\QuoteRequestConfirmation;
use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Mail;

class FormController extends Controller
{
    /**
     * Handle the incoming quote request form submission.
     */
    public function storeQuoteRequest(Request $request): RedirectResponse
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

        $quoteRequest = QuoteRequest::create($data);

        $mailSettings = $this->resolveMailSettings($request);

        Mail::mailer($mailSettings['mailer'])
            ->to($mailSettings['recipient'])
            ->send(new NewQuoteRequest($quoteRequest, $mailSettings['domain'], $mailSettings['from']));

        Mail::mailer($mailSettings['mailer'])
            ->to($quoteRequest->email)
            ->send(new QuoteRequestConfirmation($quoteRequest, $mailSettings['domain'], $mailSettings['from']));

        return redirect()
            ->back()
            ->with('success', __('flash_quote_success'));
    }

    /**
     * Handle the incoming contact form submission.
     */
    public function storeContactMessage(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => $this->safeTextRules(required: true, max: 255),
            'email' => ['required', 'email', 'max:255'],
            'phone' => $this->safeTextRules(max: 255),
            'message' => $this->safeTextRules(required: true),
        ]);

        $data = $this->sanitizeFormData($data);
        $contactMessage = ContactMessage::create($data);

        $mailSettings = $this->resolveMailSettings($request);

        Mail::mailer($mailSettings['mailer'])
            ->to($mailSettings['recipient'])
            ->send(new NewContactMessage($contactMessage, $mailSettings['domain'], $mailSettings['from']));

        return redirect()
            ->back()
            ->with('success', __('flash_contact_success'));
    }

    /**
     * Determine the recipient, mailer and from address based on the current host.
     *
     * @return array{domain: string, recipient: string, mailer: string, from: array<string, string|null>}
     */
    private function resolveMailSettings(Request $request): array
    {
        $host = (string) $request->getHost();
        $domainMailers = config('mail.domain_mailers', []);
        $defaultMailer = config('mail.default_domain_mailer', []);

        $defaultFrom = Arr::get($defaultMailer, 'from');

        if (! is_array($defaultFrom) || empty($defaultFrom['address'])) {
            $defaultFrom = [
                'address' => config('mail.from.address'),
                'name' => config('mail.from.name'),
            ];
        }

        $fallback = [
            'domain' => Arr::get($defaultMailer, 'domain', 'progzone.de'),
            'recipient' => Arr::get($defaultMailer, 'recipient') ?: 'info@progzone.de',
            'mailer' => Arr::get($defaultMailer, 'mailer') ?: config('mail.default'),
            'from' => $defaultFrom,
        ];

        foreach ($domainMailers as $domain => $settings) {
            if ($host !== '' && str_contains($host, (string) $domain)) {
                return [
                    'domain' => (string) $domain,
                    'recipient' => Arr::get($settings, 'recipient') ?: $fallback['recipient'],
                    'mailer' => Arr::get($settings, 'mailer') ?: $fallback['mailer'],
                    'from' => $this->prepareFromAddress(Arr::get($settings, 'from'), $fallback['from']),
                ];
            }
        }

        return array_merge($fallback, [
            'domain' => $host ?: $fallback['domain'],
            'from' => $this->prepareFromAddress(Arr::get($defaultMailer, 'from'), $fallback['from']),
        ]);
    }

    /**
     * Normalize the from configuration.
     *
     * @param  array<string, string|null>|null  $candidate
     * @param  array<string, string|null>  $fallback
     * @return array<string, string|null>
     */
    private function prepareFromAddress(?array $candidate, array $fallback): array
    {
        if (! empty($candidate['address'])) {
            return [
                'address' => $candidate['address'],
                'name' => $candidate['name'] ?? $fallback['name'] ?? null,
            ];
        }

        return $fallback;
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
