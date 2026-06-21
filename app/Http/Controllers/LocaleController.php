<?php

namespace App\Http\Controllers;

use App\Support\LocalizedRoutes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LocaleController extends Controller
{
    /**
     * Update the user's preferred locale.
     */
    public function update(Request $request): RedirectResponse
    {
        $locale = $request->input('locale');
        $availableLocales = ['hu', 'de', 'en'];

        if (! in_array($locale, $availableLocales, true)) {
            $locale = config('app.fallback_locale', 'hu');
        }

        $request->session()->put('locale', $locale);
        $request->session()->put('locale_host', $this->normalizeHost($request->getHost()));

        $previousPath = (string) $request->input('current_path', '');
        $previousPath = $previousPath !== ''
            ? (parse_url($previousPath, PHP_URL_PATH) ?: '/')
            : (parse_url((string) $request->headers->get('referer'), PHP_URL_PATH) ?: '/');
        $targetPath = LocalizedRoutes::localizedPathFor($previousPath, $locale);

        return redirect($targetPath);
    }

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

        if (Str::startsWith($normalized, 'www.')) {
            $normalized = Str::substr($normalized, 4);
        }

        return Str::before(Str::before($normalized, '/'), ':') ?: null;
    }
}
