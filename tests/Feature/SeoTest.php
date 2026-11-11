<?php

namespace Tests\Feature;

use App\Support\LocalizedRoutes;
use App\Support\Seo;
use Illuminate\Http\Request;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SeoTest extends TestCase
{
    public function test_every_localized_page_has_its_own_canonical_and_metadata(): void
    {
        foreach (['hu' => 'progzone.hu', 'de' => 'progzone.de'] as $locale => $host) {
            app()->setLocale($locale);
            $titles = [];
            $descriptions = [];

            foreach (array_keys(LocalizedRoutes::PAGE_ROUTES) as $page) {
                $path = LocalizedRoutes::pagePath($page, $locale);
                $seo = Seo::forRequest(Request::create("https://{$host}{$path}?utm_source=test"));
                $this->assertSame("https://{$host}{$path}", $seo['canonical']);
                $this->assertNotEmpty($seo['description']);
                $this->assertSame('https://progzone.hu' . LocalizedRoutes::pagePath($page, 'hu'), $seo['alternates']['hu']);
                $this->assertSame('https://progzone.de' . LocalizedRoutes::pagePath($page, 'de'), $seo['alternates']['de-CH']);
                $this->assertSame($seo['alternates']['de-DE'], $seo['alternates']['de-CH']);
                $titles[] = $seo['title'];
                $descriptions[] = $seo['description'];
            }

            $this->assertCount(count($titles), array_unique($titles));
            $this->assertCount(count($descriptions), array_unique($descriptions));
        }
    }

    public function test_homepage_locale_and_market_follow_the_domain(): void
    {
        foreach (['hu' => 'progzone.hu', 'de' => 'progzone.de'] as $locale => $host) {
            $this->withServerVariables(['HTTP_HOST' => $host, 'HTTPS' => 'on'])
                ->get("https://{$host}/")->assertOk()->assertInertia(fn (Assert $page) => $page
                    ->where('locale', $locale)
                    ->where('seo.locale', $locale)
                    ->where('seo.canonical', "https://{$host}/")
                    ->where('seo.structuredData.@graph.0.areaServed.0.name', $locale === 'hu' ? 'HU' : 'DE')
                );
        }
    }

    public function test_initial_html_contains_complete_page_specific_seo_without_javascript(): void
    {
        $html = $this->withServerVariables(['HTTP_HOST' => 'progzone.de', 'HTTPS' => 'on'])
            ->get('https://progzone.de/leistungen')->assertOk()->getContent();
        $document = new \DOMDocument();
        @$document->loadHTML($html);
        $xpath = new \DOMXPath($document);

        $this->assertSame('de', $document->documentElement->getAttribute('lang'));
        $this->assertSame(1, $xpath->query('//head/title')->length);
        $this->assertSame(1, $xpath->query('//head/meta[@name="description"]')->length);
        $this->assertSame(1, $xpath->query('//head/link[@rel="canonical"]')->length);
        $this->assertSame('https://progzone.de/leistungen', $xpath->query('//link[@rel="canonical"]')->item(0)->getAttribute('href'));
        $this->assertSame('https://progzone.hu/szolgaltatasok', $xpath->query('//link[@hreflang="hu"]')->item(0)->getAttribute('href'));
        $this->assertStringContainsString('Schweiz', $xpath->query('//meta[@name="description"]')->item(0)->getAttribute('content'));
        $data = json_decode($xpath->query('//script[@type="application/ld+json"]')->item(0)->textContent, true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame(['DE', 'CH'], array_column($data['@graph'][0]['areaServed'], 'name'));
    }

    public function test_reference_category_seo_stays_with_the_matching_category(): void
    {
        app()->setLocale('de');
        foreach (array_keys(LocalizedRoutes::REFERENCE_CATEGORIES) as $category) {
            $path = LocalizedRoutes::referencePath($category, 'de');
            $seo = Seo::forRequest(Request::create('https://progzone.de' . $path));
            $this->assertSame('https://progzone.de' . $path, $seo['canonical']);
            $this->assertSame('https://progzone.hu' . LocalizedRoutes::referencePath($category, 'hu'), $seo['alternates']['hu']);
            $this->assertStringStartsWith(config("seo.categories.de.{$category}"), $seo['title']);
        }
    }

    public function test_english_pages_do_not_canonicalize_to_another_language(): void
    {
        app()->setLocale('en');
        $seo = Seo::forRequest(Request::create('https://progzone.de/services'));
        $this->assertSame('https://progzone.de/services', $seo['canonical']);
        $this->assertSame([], $seo['alternates']);
    }

    public function test_unknown_urls_return_a_real_not_found_status(): void
    {
        $this->get('/this-page-does-not-exist')->assertNotFound();
    }

    public function test_sitemap_alternates_agree_with_page_canonicals(): void
    {
        foreach (['hu' => 'progzone.hu', 'de' => 'progzone.de'] as $locale => $host) {
            $xml = $this->withServerVariables(['HTTP_HOST' => $host, 'HTTPS' => 'on'])
                ->get("https://{$host}/sitemap.xml")->assertOk()->getContent();
            $sitemap = simplexml_load_string($xml);

            foreach ($sitemap->url as $url) {
                $path = parse_url((string) $url->loc, PHP_URL_PATH);
                app()->setLocale($locale);
                $seo = Seo::forRequest(Request::create((string) $url->loc));
                $this->assertSame((string) $url->loc, $seo['canonical']);
                $alternates = [];
                foreach ($url->children('http://www.w3.org/1999/xhtml')->link as $link) {
                    $attributes = $link->attributes();
                    $alternates[(string) $attributes['hreflang']] = (string) $attributes['href'];
                }
                $this->assertSame(Seo::alternates($path), $alternates);
            }
        }
    }
}
