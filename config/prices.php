<?php

return [
    // Agreed development rates by market; these also apply to additional work.
    'development_hourly_rates' => [
        'progzone.de' => ['price_value' => 80, 'currency' => 'EUR'],
        'bitbau.ch' => ['price_value' => 120, 'currency' => 'CHF'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Price fallback domains
    |--------------------------------------------------------------------------
    |
    | When a request is served from a domain that does not have dedicated
    | entries in the prices table we can fall back to one or more predefined
    | domains. Provide a comma separated list of domains via the
    | PRICE_FALLBACK_DOMAINS environment variable (e.g. "progzone.hu,progzone.de").
    */
    'fallback_domains' => array_values(array_filter(array_map(
        static fn (string $domain) => trim($domain),
        explode(',', env('PRICE_FALLBACK_DOMAINS') ?: 'progzone.hu,progzone.de,bitbau.ch')
    ))),
];
