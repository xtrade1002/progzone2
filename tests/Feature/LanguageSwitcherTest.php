<?php

namespace Tests\Feature;

use App\Support\LocalizedRoutes;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LanguageSwitcherTest extends TestCase
{
    public function test_domain_defaults_ignore_old_automatically_saved_locales(): void
    {
        foreach (['progzone.de' => 'de', 'progzone.hu' => 'hu'] as $domain => $expected) {
            $this->withSession(['locale' => 'hu', 'locale_host' => $domain, 'locale_explicit' => false])
                ->get("https://{$domain}/")
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->where('locale', $expected)
                    ->where('contentLocale', $expected)
                );
        }
    }

    public function test_each_language_can_be_selected_and_survives_reload_and_navigation(): void
    {
        foreach (['progzone.de', 'progzone.hu'] as $domain) {
            foreach (['en', 'hu', 'de'] as $locale) {
                $this->post("https://{$domain}/locale", ['locale' => $locale, 'current_path' => '/'])
                    ->assertRedirect('/')
                    ->assertSessionHas('locale', $locale)
                    ->assertSessionHas('locale_host', $domain)
                    ->assertSessionHas('locale_explicit', true);

                foreach (['/', LocalizedRoutes::pagePath('services', $locale), '/'] as $path) {
                    $this->get("https://{$domain}{$path}")
                        ->assertOk()
                        ->assertSee('<html lang="' . $locale . '">', false)
                        ->assertInertia(fn (Assert $page) => $page
                            ->where('locale', $locale)
                            ->where('contentLocale', $locale)
                        );
                }
            }
        }
    }

    public function test_a_preference_from_another_domain_does_not_override_the_default(): void
    {
        $this->withSession(['locale' => 'hu', 'locale_host' => 'progzone.hu', 'locale_explicit' => true])
            ->get('https://progzone.de/')
            ->assertInertia(fn (Assert $page) => $page->where('locale', 'de'));
    }

    public function test_switching_on_a_subpage_redirects_to_its_translated_url(): void
    {
        $this->post('https://progzone.de/locale', ['locale' => 'en', 'current_path' => '/leistungen'])
            ->assertRedirect('/services');
        $this->get('https://progzone.de/services')
            ->assertInertia(fn (Assert $page) => $page->where('locale', 'en'));
    }
}
