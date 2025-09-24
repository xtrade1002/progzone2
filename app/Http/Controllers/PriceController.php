<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        // Árlista domain szerint, kulcs: cím/slug (pl. wordpress, domain, plugin stb.)
        $prices = DB::table('prices')
            ->where('domain', $domain)
            ->where('is_active', 1)
            ->orderBy('position')
            ->get()
            ->mapWithKeys(function ($row) {
                return [$row->title => (array) $row];
            });

        return Inertia::render('Prices', [
            'prices' => $prices,
        ]);
    }
}