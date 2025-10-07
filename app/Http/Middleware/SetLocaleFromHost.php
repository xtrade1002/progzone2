<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class SetLocaleFromHost
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $availableLocales = ['hu', 'de', 'de-CH', 'en'];

        $sessionLocale = null;

        if ($request->hasSession()) {
            $sessionLocale = $request->session()->get('locale');
        }

        if ($sessionLocale && in_array($sessionLocale, $availableLocales, true)) {
            $locale = $sessionLocale;
        } else {
            $host = $this->normalizeHost($request->getSchemeAndHttpHost())
                ?? $this->normalizeHost($request->getHost());

            $hostLocaleMap = [
                'progzone.de' => 'de',

                'www.progzone.de' => 'de',
                'bitbau.ch' => 'de-CH',
                'www.bitbau.ch' => 'de-CH',
                'progzone.hu' => 'hu',
            ];

            if ($host !== null) {
                $locale = $hostLocaleMap[$host] ?? config('app.fallback_locale', 'hu');
            } else {
                $locale = config('app.fallback_locale', 'hu');
            }

            if (! in_array($locale, $availableLocales, true)) {
                $locale = config('app.fallback_locale', 'hu');
            }

            if ($request->hasSession()) {
                $request->session()->put('locale', $locale);
            }
        }

        App::setLocale($locale);

        return $next($request);
    }

    /**
     * Normalize a host value by removing protocol prefixes, common subdomains and ports.
     */
    protected function normalizeHost(?string $host): ?string
    {
        if ($host === null) {
            return null;
        }

        $normalized = Str::of($host)
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

        return Str::before($normalized, ':');
    }
}
