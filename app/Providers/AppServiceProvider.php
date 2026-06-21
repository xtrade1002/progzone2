<?php

namespace App\Providers;

use App\Support\LocalizedRoutes;
use Illuminate\Support\Facades\Cache;
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
            'trans' => fn () => $this->translationsForCurrentRequest(),
        ]);
    }

    private function translationsForCurrentRequest(): array
    {
        $translations = $this->loadTranslations(
            app()->getLocale(),
            config('app.fallback_locale', 'hu')
        );

        return $this->scopeTranslations($translations);
    }

    private function loadTranslations(string $locale, string $fallback): array
    {
        $paths = array_values(array_unique([
            lang_path("{$locale}.json"),
            lang_path("{$fallback}.json"),
        ]));

        $signature = collect($paths)
            ->filter(fn ($path) => is_file($path))
            ->map(fn ($path) => $path . ':' . filemtime($path))
            ->implode('|');

        return Cache::rememberForever("translations:{$locale}:{$fallback}:" . md5($signature), function () use ($paths) {
            foreach ($paths as $path) {
                if (! is_file($path)) {
                    continue;
                }

                try {
                    $decoded = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
                } catch (\JsonException) {
                    $decoded = [];
                }

                if (is_array($decoded)) {
                    return $decoded;
                }
            }

            return [];
        });
    }

    private function scopeTranslations(array $translations): array
    {
        $match = LocalizedRoutes::matchPath(request()->path());
        $page = $match['name'] ?? 'home';

        $keys = [
            'flash_quote_success',
            'flash_contact_success',
            'common',
            'menu',
            'footer',
        ];

        $pageKeys = [
            'home' => ['home', 'about', 'services'],
            'aboutme' => ['about'],
            'services' => ['services', 'about'],
            'prices' => ['prices'],
            'references' => ['references'],
            'infos' => ['infos'],
            'quote' => ['quote'],
            'contact' => ['contact'],
            'privacy' => ['privacy'],
            'terms' => ['terms'],
            'impressum' => ['impressum'],
        ];

        $keys = array_merge($keys, $pageKeys[$page] ?? $pageKeys['home']);
        $scoped = [];

        foreach (array_unique($keys) as $key) {
            if (array_key_exists($key, $translations)) {
                $scoped[$key] = $translations[$key];
            }
        }

        if ($page !== 'references' && isset($scoped['references']['projects']) && is_array($scoped['references']['projects'])) {
            $scoped['references']['projects'] = array_slice(
                array_values(array_filter($scoped['references']['projects'], fn ($project) => is_array($project) && ! empty($project['image']))),
                0,
                4
            );
        }

        return $scoped;
    }
}
