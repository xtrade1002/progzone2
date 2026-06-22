<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class SitemapTest extends TestCase
{
    #[Test]
    public function hu_sitemap_contains_hungarian_urls_and_alternates(): void
    {
        $response = $this->withServerVariables([
            'HTTP_HOST' => 'progzone.hu',
            'HTTPS' => 'on',
        ])->get('/sitemap.xml');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
        $response->assertSee('https://progzone.hu/szolgaltatasok', false);
        $response->assertSee('https://progzone.hu/referenciak/weboldalak', false);
        $response->assertSee('https://progzone.de/leistungen', false);
        $response->assertDontSee('https://progzone.hu/leistungen', false);
    }

    #[Test]
    public function de_sitemap_contains_german_urls_and_alternates(): void
    {
        $response = $this->withServerVariables([
            'HTTP_HOST' => 'progzone.de',
            'HTTPS' => 'on',
        ])->get('/sitemap.xml');

        $response->assertOk();
        $response->assertSee('https://progzone.de/leistungen', false);
        $response->assertSee('https://progzone.de/referenzen/webseiten', false);
        $response->assertSee('https://progzone.hu/szolgaltatasok', false);
        $response->assertDontSee('https://progzone.de/szolgaltatasok', false);
    }

    #[Test]
    public function legacy_rss_sitemap_url_serves_the_xml_sitemap(): void
    {
        $response = $this->withServerVariables([
            'HTTP_HOST' => 'progzone.de',
            'HTTPS' => 'on',
        ])->get('/sitemap.rss');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
        $response->assertSee('<urlset', false);
        $response->assertSee('https://progzone.de/leistungen', false);
        $response->assertDontSee('<html', false);
    }
}
