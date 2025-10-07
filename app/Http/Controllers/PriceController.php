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
}

