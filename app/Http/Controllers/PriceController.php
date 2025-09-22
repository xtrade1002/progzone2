<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PriceController extends Controller
{
    /**
     * Display the price list for the current locale.
     */
    public function index(Request $request): Response
    {
        $domain = $request->getHost(); // pl. progzone.de
        $locale = app()->getLocale();

        $rows = DB::table('prices')
            ->when(
                Price::hasLocaleColumn(),
                fn ($query) => $query->where('locale', $locale)
            )
            ->where(function ($query) use ($domain) {
                $query->whereNull('domain');

                if ($domain) {
                    $query->orWhere('domain', $domain);
                }
            })
            ->orderBy('position')
            ->get()
            ->map(fn ($row) => (array) $row)
            ->all();

        $prices = Price::hydrate($rows)
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
