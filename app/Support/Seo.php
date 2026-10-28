<?php

namespace App\Support;

use Illuminate\Http\Request;

class Seo
{
    public static function alternates(string $path): array
    {
        $hu = 'https://progzone.hu' . LocalizedRoutes::localizedPathFor($path, 'hu');
        $de = 'https://progzone.de' . LocalizedRoutes::localizedPathFor($path, 'de');

        return ['hu' => $hu, 'de' => $de, 'de-DE' => $de, 'de-CH' => $de];
    }

    public static function forRequest(Request $request): array
    {
        $locale = LocalizedRoutes::normalizeLocale(app()->getLocale());
        $match = LocalizedRoutes::matchPath($request->path());
        $page = $match['name'];
        $host = preg_replace('/^www\./', '', $request->getHost());
        $domain = ['hu' => 'progzone.hu', 'de' => 'progzone.de'][$locale] ?? $host;
        $base = in_array($host, ['progzone.hu', 'progzone.de'], true)
            ? "https://{$domain}" : $request->getSchemeAndHttpHost();
        $canonical = $base . LocalizedRoutes::localizedPathFor($request->path(), $locale);
        [$title, $description] = config("seo.pages.{$locale}.{$page}") ?? config("seo.pages.en.{$page}");

        if ($match['category'] !== null) {
            $label = config("seo.categories.{$locale}.{$match['category']}");
            $title = $label . ' | ' . $title;
            $description = $label . ': ' . $description;
        }

        $alternates = $locale === 'en' ? [] : self::alternates($request->path());
        $countries = $locale === 'hu' ? ['HU'] : ['DE', 'CH'];
        $structuredData = [
            '@context' => 'https://schema.org',
            '@graph' => [
                ['@type' => 'Organization', '@id' => $base . '/#organization', 'name' => 'Progzone',
                    'url' => $base . '/', 'logo' => $base . '/favicon-512.png',
                    'areaServed' => array_map(fn ($code) => ['@type' => 'Country', 'name' => $code], $countries)],
                ['@type' => 'WebSite', '@id' => $base . '/#website', 'name' => 'Progzone',
                    'url' => $base . '/', 'inLanguage' => $locale,
                    'publisher' => ['@id' => $base . '/#organization']],
                ['@type' => 'WebPage', '@id' => $canonical . '#webpage', 'url' => $canonical,
                    'name' => $title, 'description' => $description, 'inLanguage' => $locale,
                    'isPartOf' => ['@id' => $base . '/#website']],
            ],
        ];

        return compact('title', 'description', 'canonical', 'alternates', 'locale', 'structuredData') + [
            'ogLocale' => ['hu' => 'hu_HU', 'de' => 'de_DE', 'en' => 'en_US'][$locale],
            'ogAlternateLocales' => $locale === 'de' ? ['de_CH'] : [],
            'image' => $base . '/favicon-512.png',
        ];
    }
}
