<?php

namespace App\Http\Controllers;

use App\Mail\NewContactMessage;
use App\Mail\NewQuoteRequest;
use App\Models\ContactMessage;
use App\Models\QuoteRequest;
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

        $quoteRequest = QuoteRequest::create($data);

        $mailSettings = $this->resolveMailSettings($request);

        Mail::mailer($mailSettings['mailer'])
            ->to($mailSettings['recipient'])
            ->send(new NewQuoteRequest($quoteRequest, $mailSettings['domain'], $mailSettings['from']));

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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

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
}
