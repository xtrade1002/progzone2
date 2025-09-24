<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class PriceController extends Controller
{
    /**
     * Display the price list for the current domain.
     */
    public function index(Request $request): Response
    {
        $domain = $request->getHost(); // pl. progzone.de
        $locale = app()->getLocale();

        // Árlista domain + nyelv szerint, kulcs: slug (pl. wordpress, domain, plugin stb.)
        $prices = Price::query()
            ->forDomainAndLocale($domain, $locale)
            ->orderBy('position')
            ->get()
            ->mapWithKeys(function (Price $price) {
                return [
                    $price->slug => Arr::only(
                        $price->toArray(),
                        [
                            'slug',
                            'locale',
                            'domain',
                            'title',
                            'description',
                            'feature_heading',
                            'features',
                            'price_label',
                            'currency',
                            'extras',
                            'position',
                        ],
                    ),
                ];
            });

        return Inertia::render('Prices', [
            'prices' => $prices,
        ]);
    }
}