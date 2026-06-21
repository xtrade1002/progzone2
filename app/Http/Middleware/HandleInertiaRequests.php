<?php

namespace App\Http\Middleware;

use App\Models\DomainSetting;
use App\Support\LocalizedRoutes;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;
use Throwable;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        $domain = $this->normalizeDomain($request->getHost());

        return array_merge(parent::share($request), [
            'locale' => app()->getLocale(),
            'contactEmail' => $this->resolveContactEmail($domain),
            'localizedRoutes' => LocalizedRoutes::frontendRoutes(),
        ]);
    }

    protected function resolveContactEmail(?string $domain): ?string
    {
        if ($domain === null) {
            return $this->fallbackContactEmail();
        }

        return Cache::remember("domain-contact-email:{$domain}", now()->addMinutes(10), function () use ($domain) {
            return $this->resolveContactEmailFromDatabase($domain);
        });
    }

    protected function resolveContactEmailFromDatabase(?string $domain): ?string
    {
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
            try {
                $query = DomainSetting::query();

                if ($candidate === null) {
                    $query->whereNull('domain');
                } else {
                    $query->where('domain', $candidate);
                }

                $email = $query->value('contact_email');
            } catch (Throwable) {
                return $this->fallbackContactEmail();
            }

            if (is_string($email) && $email !== '') {
                return $email;
            }
        }

        return $this->fallbackContactEmail();
    }

    protected function fallbackContactEmail(): ?string
    {
        return config('mail.default_domain_mailer.from.address')
            ?? config('mail.from.address');
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
