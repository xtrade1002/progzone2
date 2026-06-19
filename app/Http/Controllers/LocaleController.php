<?php

namespace App\Http\Controllers;

use App\Support\LocalizedRoutes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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

        $previousPath = parse_url((string) $request->headers->get('referer'), PHP_URL_PATH) ?: '/';
        $targetPath = LocalizedRoutes::localizedPathFor($previousPath, $locale);

        return redirect($targetPath);
    }
}
