<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocaleFromHost
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $availableLocales = ['hu', 'de', 'en'];

        $sessionLocale = null;

        if ($request->hasSession()) {
            $sessionLocale = $request->session()->get('locale');
        }

        if ($sessionLocale && in_array($sessionLocale, $availableLocales, true)) {
            $locale = $sessionLocale;
        } else {
            $host = $request->getHost();
            $locale = match ($host) {
                'progzone.de', 'bitbau.ch' => 'de',
                'progzone.hu' => 'hu',
                default => config('app.fallback_locale', 'hu'),
            };

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
}
