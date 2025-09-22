<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'flash' => fn () => [
                'success' => session('success'),
            ],
            'locale' => fn () => app()->getLocale(),
            'availableLocales' => ['hu', 'de', 'en'],
            'trans' => function () {
                $locale = app()->getLocale();
                $fallback = config('app.fallback_locale', 'hu');

                $paths = array_unique([
                    lang_path("{$locale}.json"),
                    lang_path("{$fallback}.json"),
                ]);

                foreach ($paths as $path) {
                    if (is_file($path)) {
                        try {
                            $decoded = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
                        } catch (\JsonException) {
                            $decoded = [];
                        }

                        if (is_array($decoded)) {
                            return $decoded;
                        }
                    }
                }

                return [];
            },
        ]);
    }
}
