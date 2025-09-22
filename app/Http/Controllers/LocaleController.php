<?php

namespace App\Http\Controllers;

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

        return redirect()->back();
    }
}
