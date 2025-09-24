<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PriceController extends Controller
{
    /**
     * Display the price list for the current domain and locale.
     */
    public function index(Request $request): Response
    {
        $domain = $request->getHost(); // pl. progzone.de

        // Lekérjük az árakat domain alapján
        $prices = DB::table('prices')
            ->where('domain', $domain)
            ->where('is_active', 1)
            ->orderBy('position')
            ->get()
            ->keyBy('title'); // kulcs: wordpress, woocommerce, custom, marketing, domain, hosting stb.

        return Inertia::render('Prices', [
            // a szövegek a fordítási JSON fájlokból jönnek (hu/de/en)
            'trans'  => trans('prices'),
            // az árak az adatbázisból jönnek, domain szerint
            'prices' => $prices,
        ]);
    }
}