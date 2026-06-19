<?php

namespace App\Support;

class LocalizedRoutes
{
    public const LOCALES = ['hu', 'de', 'en'];

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
            'controller' => true,
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
                'hu' => '/infok',
                'de' => '/infos',
                'en' => '/infos',
            ],
        ],
        'quote' => [
            'component' => 'QuoteRequest',
            'paths' => [
                'hu' => '/ajanlatkeres',
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
                'en' => '/impressum',
            ],
        ],
    ];

    public const REFERENCE_CATEGORIES = [
        'websites' => [
            'hu' => 'weboldalak',
            'de' => 'webseiten',
            'en' => 'websites',
        ],
        'flyers' => [
            'hu' => 'flyerek',
            'de' => 'flyer',
            'en' => 'flyers',
        ],
        'businessCards' => [
            'hu' => 'nevjegykartyak',
            'de' => 'visitenkarten',
            'en' => 'business-cards',
        ],
        'mockups' => [
            'hu' => 'mockupok',
            'de' => 'mockups',
            'en' => 'mockups',
        ],
        'otherDesigns' => [
            'hu' => 'egyeb-grafikak',
            'de' => 'weitere-designs',
            'en' => 'other-designs',
        ],
    ];

    public static function pagePath(string $name, ?string $locale = null): string
    {
        $locale = self::normalizeLocale($locale);

        return self::PAGE_ROUTES[$name]['paths'][$locale] ?? self::PAGE_ROUTES[$name]['paths']['en'] ?? '/';
    }

    public static function referencePath(?string $category = null, ?string $locale = null): string
    {
        $locale = self::normalizeLocale($locale);
        $path = self::pagePath('references', $locale);

        if ($category === null || $category === 'all') {
            return $path;
        }

        $slug = self::REFERENCE_CATEGORIES[$category][$locale] ?? null;

        return $slug ? "{$path}/{$slug}" : $path;
    }

    public static function categoryFromSlug(?string $slug): ?string
    {
        if ($slug === null || $slug === '') {
            return null;
        }

        foreach (self::REFERENCE_CATEGORIES as $key => $localizedSlugs) {
            if (in_array($slug, $localizedSlugs, true)) {
                return $key;
            }
        }

        return null;
    }

    public static function matchPath(string $path): array
    {
        $path = '/' . trim($path, '/');
        $path = $path === '/' ? '/' : rtrim($path, '/');

        foreach (self::PAGE_ROUTES as $name => $route) {
            foreach ($route['paths'] as $locale => $routePath) {
                if ($path === $routePath) {
                    return ['name' => $name, 'locale' => $locale, 'category' => null];
                }

                if ($name === 'references' && str_starts_with($path, "{$routePath}/")) {
                    $slug = substr($path, strlen($routePath) + 1);
                    $category = self::categoryFromSlug($slug);

                    if ($category !== null) {
                        return ['name' => $name, 'locale' => $locale, 'category' => $category];
                    }
                }
            }
        }

        return ['name' => 'home', 'locale' => null, 'category' => null];
    }

    public static function localizedPathFor(string $path, string $locale): string
    {
        $match = self::matchPath($path);

        if ($match['name'] === 'references') {
            return self::referencePath($match['category'], $locale);
        }

        return self::pagePath($match['name'], $locale);
    }

    public static function normalizeLocale(?string $locale): string
    {
        if ($locale === 'de-CH') {
            return 'de';
        }

        return in_array($locale, self::LOCALES, true) ? $locale : 'hu';
    }

    public static function frontendRoutes(): array
    {
        return [
            'pages' => collect(self::PAGE_ROUTES)
                ->map(fn ($route) => $route['paths'])
                ->all(),
            'referenceCategories' => self::REFERENCE_CATEGORIES,
        ];
    }
}
