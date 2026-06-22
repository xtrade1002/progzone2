<?php

namespace App\Http\Controllers;

use App\Support\LocalizedRoutes;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use SimpleXMLElement;

class SitemapController extends Controller
{
    private const DOMAIN_LOCALES = [
        'progzone.hu' => 'hu',
        'progzone.de' => 'de',
    ];

    private const LOCALE_DOMAINS = [
        'hu' => 'progzone.hu',
        'de' => 'progzone.de',
    ];

    public function __invoke(Request $request)
    {
        $host = $this->normalizeHost($request->getHost());
        $locale = self::DOMAIN_LOCALES[$host] ?? 'hu';

        $xml = new SimpleXMLElement(
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"></urlset>'
        );

        foreach ($this->entries() as $entry) {
            $url = $xml->addChild('url');
            $url->addChild('loc', $this->localizedUrl($entry, $locale));
            $url->addChild('changefreq', $entry['changefreq']);
            $url->addChild('priority', $entry['priority']);

            foreach (array_keys(self::LOCALE_DOMAINS) as $alternateLocale) {
                $link = $url->addChild('xhtml:link', null, 'http://www.w3.org/1999/xhtml');
                $link->addAttribute('rel', 'alternate');
                $link->addAttribute('hreflang', $alternateLocale);
                $link->addAttribute('href', $this->localizedUrl($entry, $alternateLocale));
            }
        }

        return response($xml->asXML(), 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
        ]);
    }

    private function entries(): array
    {
        $entries = [];

        foreach (LocalizedRoutes::PAGE_ROUTES as $name => $route) {
            $entries[] = [
                'name' => $name,
                'category' => null,
                'changefreq' => $name === 'home' ? 'weekly' : 'monthly',
                'priority' => $name === 'home' ? '1.0' : '0.8',
            ];

            if ($name !== 'references') {
                continue;
            }

            foreach (array_keys(LocalizedRoutes::REFERENCE_CATEGORIES) as $category) {
                $entries[] = [
                    'name' => 'references',
                    'category' => $category,
                    'changefreq' => 'monthly',
                    'priority' => '0.7',
                ];
            }
        }

        return $entries;
    }

    private function localizedUrl(array $entry, string $locale): string
    {
        $domain = self::LOCALE_DOMAINS[$locale];
        $path = $entry['category'] === null
            ? LocalizedRoutes::pagePath($entry['name'], $locale)
            : LocalizedRoutes::referencePath($entry['category'], $locale);

        return "https://{$domain}{$path}";
    }

    private function normalizeHost(?string $host): ?string
    {
        if ($host === null) {
            return null;
        }

        $host = Str::of($host)->lower()->value();

        if (Str::startsWith($host, 'www.')) {
            $host = Str::substr($host, 4);
        }

        return Str::before($host, ':');
    }
}
