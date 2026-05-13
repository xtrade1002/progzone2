<?php

namespace Tests\Feature;

use App\Models\Price;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PricesPageTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
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

        $response = $this->get('/arak');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Prices')
            ->where('prices.wordpress.price_label', 'Kezdő csomag')
            ->where('prices.wordpress.extras', '+ áfa')
        );
    }
}
