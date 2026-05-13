<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ReferencesPageTest extends TestCase
{
    #[Test]
    public function hungarian_references_page_uses_valid_accented_texts(): void
    {
        $response = $this->get('/referenciak');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('References')
            ->where('locale', 'hu')
            ->where('trans.references.title', 'Referenciák')
            ->where(
                'trans.references.subtitle',
                'Négy működő weboldal, letisztultabb bemutatással. A képek helyére jöhetnek az általad küldött screenshotok.'
            )
            ->where('trans.references.projects.0.description', 'Elegáns, szolgáltatásközpontú weboldal szépségipari vállalkozásnak.')
            ->where('trans.references.projects.1.label', 'Időpontfoglaló rendszer')
            ->where('trans.references.projects.1.description', 'Német, magyar és európai piacra készült online jelenlét és foglalási fókuszú digitális felület.')
            ->where('trans.references.projects.2.tags.2', 'Nemzetközi')
            ->where('trans.references.projects.3.description', 'Átlátható, bizalomépítő weboldal kertészeti szolgáltatások bemutatására.')
        );
    }
}
