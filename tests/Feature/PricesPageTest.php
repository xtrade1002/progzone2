<?php

namespace Tests\Feature;

use App\Models\Price;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PricesPageTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function prices_page_renders_without_server_error(): void
    {
        Price::create([
            'slug' => 'wordpress',
            'locale' => 'hu',
            'domain' => null,
            'title' => 'WordPress csomag',
            'description' => 'Teszt csomag',
            'feature_heading' => null,
            'features' => [],
            'price_label' => 'Kezdő csomag',
            'price_value' => 199000,
            'currency' => 'Ft',
            'extras' => '+ áfa',
            'position' => 1,
            'is_active' => true,
        ]);

        $response = $this->get('/prices');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Prices')
            ->where('prices.wordpress.price_label', 'Kezdő csomag')
        );
    }

    public function test_development_rate_matches_the_market_even_when_prices_fall_back(): void
    {
        foreach (['wordpress', 'custom-website', 'extraFunctionsDev'] as $index => $slug) {
            Price::create([
                'slug' => $slug,
                'locale' => 'hu',
                'domain' => null,
                'title' => $slug,
                'price_value' => $slug === 'wordpress' ? 150000 : 10000,
                'currency' => 'Ft',
                'extras' => $slug === 'wordpress' ? '-tól' : '/óra',
                'position' => $index,
                'is_active' => true,
            ]);
        }

        foreach ([
            ['progzone.de', '/preise', 80, 'EUR', '/Stunde'],
            ['www.progzone.de', '/prices', 80, 'EUR', '/hour'],
            ['bitbau.ch', '/preise', 120, 'CHF', '/Stunde'],
            ['bitbau.ch', '/arak', 120, 'CHF', '/óra'],
            ['localhost', '/preise', 80, 'EUR', '/Stunde'],
        ] as [$host, $path, $value, $currency, $unit]) {
            $response = $this->withServerVariables(['HTTP_HOST' => $host, 'HTTPS' => 'on'])
                ->get('https://' . $host . $path);

            $response->assertOk()->assertInertia(function (Assert $page) use ($value, $currency, $unit) {
                $page->component('Prices')->where('prices.wordpress.price_value', '150000.00');
                foreach (['egyedifejlesztes', 'custom', 'custom-website', 'extraFunctionsDev', 'extrafunctionsdev', 'hourly_rate'] as $slug) {
                    $page->where("prices.{$slug}.price_value", $value)
                        ->where("prices.{$slug}.currency", $currency)
                        ->where("prices.{$slug}.extras", $unit);
                }
                return $page;
            });
        }

        $this->withServerVariables(['HTTP_HOST' => 'progzone.hu', 'HTTPS' => 'on'])
            ->get('https://progzone.hu/preise')
            ->assertOk()->assertInertia(fn (Assert $page) => $page
                ->where('prices.custom-website.price_value', '10000.00')
                ->where('prices.custom-website.currency', 'Ft')
                ->where('prices.extraFunctionsDev.price_value', '10000.00')
            );
    }

    public function test_missing_price_list_is_not_replaced_with_an_incomplete_market_list(): void
    {
        $this->withServerVariables(['HTTP_HOST' => 'progzone.de', 'HTTPS' => 'on'])
            ->get('https://progzone.de/preise')->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Prices')->where('prices', []));
    }
}
