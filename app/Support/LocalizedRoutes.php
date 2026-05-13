<?php

namespace App\Support;

class LocalizedRoutes
{
    public const PAGE_ROUTES = [
        'home' => [
            'component' => 'Home',
            'paths' => [
                'hu' => '/',
                'de' => '/',
                'en' => '/',
            ],
        ],
        'aboutme' => [
            'component' => 'AboutMe',
            'paths' => [
                'hu' => '/rolam',
                'de' => '/ueber-mich',
                'en' => '/about-me',
            ],
        ],
        'services' => [
            'component' => 'Services',
            'paths' => [
                'hu' => '/szolgaltatasok',
                'de' => '/leistungen',
                'en' => '/services',
            ],
        ],
        'prices' => [
            'controller' => [\App\Http\Controllers\PriceController::class, 'index'],
            'paths' => [
                'hu' => '/arak',
                'de' => '/preise',
                'en' => '/prices',
            ],
        ],
        'references' => [
            'component' => 'References',
            'paths' => [
                'hu' => '/referenciak',
                'de' => '/referenzen',
                'en' => '/references',
            ],
        ],
        'infos' => [
            'component' => 'Infos',
            'paths' => [
                'hu' => '/informaciok',
                'de' => '/infos',
                'en' => '/insights',
            ],
        ],
        'quote' => [
            'component' => 'QuoteRequest',
            'paths' => [
                'hu' => '/arajanlat',
                'de' => '/angebot',
                'en' => '/quote',
            ],
        ],
        'contact' => [
            'component' => 'Contact',
            'paths' => [
                'hu' => '/kapcsolat',
                'de' => '/kontakt',
                'en' => '/contact',
            ],
        ],
        'privacy' => [
            'component' => 'Privacy',
            'paths' => [
                'hu' => '/adatvedelem',
                'de' => '/datenschutz',
                'en' => '/privacy',
            ],
        ],
        'terms' => [
            'component' => 'Terms',
            'paths' => [
                'hu' => '/aszf',
                'de' => '/agb',
                'en' => '/terms',
            ],
        ],
        'impressum' => [
            'component' => 'Impressum',
            'paths' => [
                'hu' => '/impresszum',
                'de' => '/impressum',
                'en' => '/imprint',
            ],
        ],
    ];

    public static function locales(): array
    {
        return ['hu', 'de', 'en'];
    }

    public static function pageNameForPath(string $path): ?string
    {
        $normalizedPath = self::normalizePath($path);

        foreach (self::PAGE_ROUTES as $name => $route) {
            if (in_array($normalizedPath, $route['paths'], true)) {
                return $name;
            }
        }

        return null;
    }

    public static function localeForPath(string $path): ?string
    {
        $normalizedPath = self::normalizePath($path);

        if ($normalizedPath === '/') {
            return null;
        }

        foreach (self::PAGE_ROUTES as $route) {
            foreach ($route['paths'] as $locale => $localizedPath) {
                if ($normalizedPath === $localizedPath) {
                    return $locale;
                }
            }
        }

        return null;
    }

    public static function path(string $name, string $locale): string
    {
        return self::PAGE_ROUTES[$name]['paths'][$locale]
            ?? self::PAGE_ROUTES[$name]['paths'][config('app.fallback_locale', 'hu')]
            ?? '/';
    }

    private static function normalizePath(string $path): string
    {
        $normalized = '/' . trim(parse_url($path, PHP_URL_PATH) ?: '/', '/');

        return $normalized === '//' ? '/' : $normalized;
    }
}
