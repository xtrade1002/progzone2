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
        $prices = $this->resolvePrices($domain, $locale, $allowedAttributes, $aliasMap);
        $prices = $this->applyDevelopmentHourlyRate($prices, $domain, $locale);

        return Inertia::render('Prices', [
            'prices' => $prices,
            'domain' => $domain,
            'locale' => $locale,
        ]);
    }

    /**
     * Keep the agreed market rate consistent in the main price and all hourly placeholders,
     * even when the remaining price list falls back to another domain or language.
     */
    protected function applyDevelopmentHourlyRate(array $prices, ?string $domain, string $locale): array
    {
        if (empty($prices)) {
            return $prices;
        }

        $marketDomain = $domain;
        if (in_array($domain, ['localhost', '127.0.0.1'], true)) {
            $marketDomain = match ($locale) {
                'de' => 'progzone.de',
                'de-CH' => 'bitbau.ch',
                default => $domain,
            };
        }

        $rate = config('prices.development_hourly_rates', [])[$marketDomain] ?? null;
        if (! is_array($rate)) {
            return $prices;
        }

        $unit = match (true) {
            str_starts_with($locale, 'de') => '/Stunde',
            $locale === 'hu' => '/óra',
            default => '/hour',
        };

        foreach (['egyedifejlesztes', 'custom', 'custom-website', 'extraFunctionsDev', 'extrafunctionsdev', 'hourly_rate'] as $slug) {
            $prices[$slug] = array_replace($prices[$slug] ?? ['slug' => $slug], $rate, [
                'price_label' => null,
                'extras' => $unit,
            ]);
        }

        return $prices;
    }

    /**

     * Removes common subdomain prefixes (e.g. www.) and lowercases the domain name.

     */
    protected function normalizeDomain(?string $domain): ?string
    {
        if ($domain === null) {
            return null;
        }


        $normalized = Str::lower($domain);

        if (Str::startsWith($normalized, 'www.')) {
            $normalized = Str::substr($normalized, 4);
        }


        return $normalized;
    }

    /**
     * Collects prices for the given domain and locale.
     */
    protected function collectPrices(?string $domain, string $locale, array $allowedAttributes, array $aliasMap): array
    {
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

        return $prices;
    }

    /**
     * Resolves the first non-empty price list from domain and locale fallback candidates.
     */
    protected function resolvePrices(?string $domain, string $locale, array $allowedAttributes, array $aliasMap): array
    {
        foreach ($this->localeCandidates($locale) as $candidateLocale) {
            $prices = $this->collectPrices($domain, $candidateLocale, $allowedAttributes, $aliasMap);

            if (! empty($prices)) {
                return $prices;
            }

            foreach ($this->fallbackDomains($domain) as $fallbackDomain) {
                $prices = $this->collectPrices($fallbackDomain, $candidateLocale, $allowedAttributes, $aliasMap);

                if (! empty($prices)) {
                    return $prices;
                }
            }
        }

        return [];
    }

    /**
     * Returns locale candidates in priority order.
     */
    protected function localeCandidates(string $locale): array
    {
        return collect([
            $locale,
            config('app.fallback_locale'),
            'hu',
            'de',
            'en',
        ])
            ->filter()
            ->map(fn ($candidate) => Str::lower((string) $candidate))
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Returns the list of fallback domains to try when the requested domain has no data.
     */
    protected function fallbackDomains(?string $currentDomain): array
    {
        $fallbacks = config('prices.fallback_domains', []);

        if (is_string($fallbacks)) {
            $fallbacks = array_map('trim', explode(',', $fallbacks));
        }

        return collect($fallbacks)
            ->map(fn ($domain) => $this->normalizeDomain($domain))
            ->filter()
            ->unique()
            ->reject(fn ($domain) => $domain === $currentDomain)
            ->values()
            ->all();
    }
}

