<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ReferencesLocaleTest extends TestCase
{
    #[Test]
    public function german_reference_path_exposes_german_locale_and_content_on_hungarian_domain(): void
    {
        $this->withServerVariables([
            'HTTP_HOST' => 'progzone.hu',
            'HTTPS' => 'on',
        ])->get('/referenzen')->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('References')
            ->where('locale', 'de')
            ->where('trans.references.projects.0.cta', 'Website ansehen')
            ->where('trans.references.projects.0.title', 'Ungarischer Verband für Familienaufstellungen')
        );
    }

    #[Test]
    public function english_reference_path_exposes_english_locale_and_matching_content_on_hungarian_domain(): void
    {
        $this->withServerVariables([
            'HTTP_HOST' => 'progzone.hu',
            'HTTPS' => 'on',
        ])->get('/references')->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('References')
            ->where('locale', 'en')
            ->where('trans.references.projects.0.cta', 'View website')
            ->where('trans.references.projects.0.title', 'Hungarian Association of Family Constellation Practitioners')
            ->has('trans.references.projects', 38)
        );
    }
}
