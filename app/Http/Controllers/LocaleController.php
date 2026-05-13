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
        $availableLocales = LocalizedRoutes::locales();

        if (! in_array($locale, $availableLocales, true)) {
            $locale = config('app.fallback_locale', 'hu');
        }

        $request->session()->put('locale', $locale);

        $currentPath = (string) $request->input('current_path', $request->headers->get('referer', '/'));
        $pageName = LocalizedRoutes::pageNameForPath($currentPath) ?? 'home';

        return redirect(LocalizedRoutes::path($pageName, $locale));
    }
}
