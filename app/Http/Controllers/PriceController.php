<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PriceController extends Controller
{
    /**
     * Display the price list for the current locale.
     */
    public function index(Request $request): Response
    {
        $host = $request->getHost();
        $locale = app()->getLocale();

        $prices = Price::forDomainAndLocale($host, $locale)
            ->orderBy('position')
            ->get()
            ->map(fn (Price $price) => [
                'id' => $price->id,
                'slug' => $price->slug,
                'title' => $price->title,
                'description' => $price->description,
                'feature_heading' => $price->feature_heading,
                'features' => $price->features ?? [],
                'price_label' => $price->price_label,
            ]);

        return Inertia::render('Prices', [
            'prices' => $prices,
        ]);
    }
}
