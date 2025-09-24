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

        // Árlista domain + nyelv szerint
        $prices = Price::query()
            ->forDomainAndLocale($domain, $locale)
            ->orderBy('position')
            ->get()
            ->mapWithKeys(function (Price $price) {
                return [
                    // FONTOS: a slug legyen a kulcs
                    $price->slug ?? 'extra' => array_merge(
                        Arr::only(
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
                            ]
                        ),
                        [
                            // Fix árértékek a placeholder-ekhez
                            'domain_price'  => '3.000 Ft/év',
                            'hosting_price' => '10.000 Ft/év',
                            'plugin_price'  => '20.000–50.000 Ft',
                            'hourly_rate'   => '10.000 Ft/óra',
                        ]
                    ),
                ];
            });

        return Inertia::render('Prices', [
            'prices' => $prices,
        ]);
    }
}