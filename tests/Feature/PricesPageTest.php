<?php

namespace Tests\Feature;

use App\Models\Price;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
        $response->assertSee('Kezdő csomag', false);
    }
}
