<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PriceController extends Controller
{
    /**
     * Display the price list for the current domain.
     */
    public function index(Request $request): Response
    {
        $domain = $this->normalizeDomain($request->getHost()); // pl. progzone.de
        $locale = app()->getLocale();

        $allowedAttributes = [
            'slug',
            'locale',
            'domain',
            'title',
            'description',
            'feature_heading',
            'features',
            'price_label',
            'price_value',
            'currency',
            'extras',
            'position',
        ];


        $aliasMap = [
            'domain' => ['domain_price'],
            'hosting' => ['hosting_price'],
            'plugin' => ['plugin_price'],
            'extraFunctionsDev' => ['hourly_rate'],
        ];

        // Árlista domain + nyelv szerint
        $prices = [];

        Price::query()
            ->forDomainAndLocale($domain, $locale)
            ->orderBy('position')
            ->get()
            ->each(function (Price $price) use (&$prices, $allowedAttributes, $aliasMap) {
                $slug = $price->slug ?: 'extra';
                $data = Arr::only($price->toArray(), $allowedAttributes);

                $prices[$slug] = $data;

                foreach ($aliasMap[$slug] ?? [] as $alias) {
                    $prices[$alias] = $data;
                }
            });

        return Inertia::render('Prices', [
            'prices' => $prices,
        ]);
    }

    /**
     * Normalizes a domain value by removing protocol prefixes, common subdomains and ports.
     */
    protected function normalizeDomain(?string $domain): ?string
    {
        if ($domain === null) {
            return null;
        }

        $normalized = Str::of($domain)
            ->lower()
            ->trim()
            ->value();

        if ($normalized === '') {
            return null;
        }

        if (Str::startsWith($normalized, ['http://', 'https://'])) {
            $parsedHost = parse_url($normalized, PHP_URL_HOST);

            if (is_string($parsedHost) && $parsedHost !== '') {
                $normalized = $parsedHost;
            }
        }

        if (Str::startsWith($normalized, '//')) {
            $normalized = Str::substr($normalized, 2);
        }

        if (Str::startsWith($normalized, 'www.')) {
            $normalized = Str::substr($normalized, 4);
        }

        $normalized = Str::before($normalized, '/');

        return Str::before($normalized, ':');
    }
}
