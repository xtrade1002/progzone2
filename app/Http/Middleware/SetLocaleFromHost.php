<?php

namespace App\Http\Middleware;

use App\Support\LocalizedRoutes;
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
        $availableLocales = LocalizedRoutes::locales();
        $routeLocale = LocalizedRoutes::localeForPath($request->path());

        $sessionLocale = null;

        if ($request->hasSession()) {
            $sessionLocale = $request->session()->get('locale');
        }

        if ($routeLocale && in_array($routeLocale, $availableLocales, true)) {
            $locale = $routeLocale;
        } elseif ($sessionLocale && in_array($sessionLocale, $availableLocales, true)) {
            $locale = $sessionLocale;
        } else {
            $host = $request->getHost();
            $hostLocaleMap = [
                'progzone.de' => 'de',
                'www.progzone.de' => 'de',
                'bitbau.ch' => 'de',
                'www.bitbau.ch' => 'de',
                'progzone.hu' => 'hu',
                'www.progzone.hu' => 'hu',
            ];

            $locale = $hostLocaleMap[$host] ?? config('app.fallback_locale', 'hu');

            if (! in_array($locale, $availableLocales, true)) {
                $locale = config('app.fallback_locale', 'hu');
            }

        }

        if ($request->hasSession()) {
            $request->session()->put('locale', $locale);
        }

        App::setLocale($locale);

        return $next($request);
    }
}
