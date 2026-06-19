<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\PriceController;
use App\Support\LocalizedRoutes;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$namedRoutes = [];

$renderWithLocale = function (string $locale, callable $render) {
    App::setLocale($locale);

    if (request()->hasSession()) {
        request()->session()->put('locale', $locale);
    }

    return $render();
};

foreach (LocalizedRoutes::PAGE_ROUTES as $name => $localizedRoute) {
    $registeredPaths = [];

    foreach ($localizedRoute['paths'] as $locale => $path) {
        if (isset($registeredPaths[$path])) {
            continue;
        }

        $registeredPaths[$path] = true;
        $routeName = isset($namedRoutes[$name]) ? null : $name;
        $namedRoutes[$name] = true;

        if ($name === 'prices') {
            $route = Route::get($path, fn () => $renderWithLocale(
                $locale,
                fn () => app()->call([app(PriceController::class), 'index'])
            ));
            $routeName ? $route->name($routeName) : null;
            continue;
        }

        if ($name === 'references') {
            $route = Route::get($path, fn () => $renderWithLocale(
                $locale,
                fn () => Inertia::render('References', [
                    'category' => null,
                ])
            ));
            $routeName ? $route->name($routeName) : null;

            foreach (LocalizedRoutes::REFERENCE_CATEGORIES as $category => $slugs) {
                Route::get("{$path}/{$slugs[$locale]}", fn () => $renderWithLocale(
                    $locale,
                    fn () => Inertia::render('References', [
                        'category' => $category,
                    ])
                ));
            }

            continue;
        }

        $route = Route::get($path, fn () => $renderWithLocale(
            $locale,
            fn () => Inertia::render($localizedRoute['component'])
        ));
        $routeName ? $route->name($routeName) : null;
    }
}

Route::post('/quote-request', [QuoteController::class, 'store'])->name('quote-request.store');
Route::post('/contact-message', [FormController::class, 'storeContactMessage'])->name('contact-message.store');
Route::post('/locale', [LocaleController::class, 'update'])->name('locale.update');

Route::fallback(fn () => Inertia::render('Home'));
