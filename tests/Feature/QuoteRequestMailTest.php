<?php

namespace Tests\Feature;

use App\Mail\NewQuoteRequest;
use App\Mail\QuoteRequestConfirmation;
use App\Models\ContactMessage;
use App\Models\DomainSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class QuoteRequestMailTest extends TestCase
{
    use RefreshDatabase;

    public function test_enabled_turnstile_blocks_missing_verification_before_saving_or_sending(): void
    {
        Mail::fake();
        config(['services.turnstile.site_key' => 'test-site', 'services.turnstile.secret_key' => 'test-secret']);
        foreach (['/contact-message', '/quote-request'] as $path) {
            $this->post($path, ['locale' => 'en', 'name' => 'John Doe', 'email' => 'john@example.test', 'message' => 'A test request.', 'service' => 'Website', 'privacy' => true])
                ->assertSessionHasErrors('cf_turnstile_response');
        }
        $this->assertDatabaseCount('contact_messages', 0);
        $this->assertDatabaseCount('quote_requests', 0);
        Mail::assertNothingSent();
    }

    public function test_verified_turnstile_allows_contact_and_quote_submissions(): void
    {
        Mail::fake();
        config(['services.turnstile.site_key' => 'test-site', 'services.turnstile.secret_key' => 'test-secret']);
        \Illuminate\Support\Facades\Http::fake(['challenges.cloudflare.com/*' => \Illuminate\Support\Facades\Http::response(['success' => true])]);
        foreach (['/contact-message', '/quote-request'] as $path) {
            $this->post($path, ['locale' => 'en', 'name' => 'John Doe', 'email' => 'john@example.test', 'message' => 'A test request.', 'service' => 'Website', 'privacy' => true, 'cf_turnstile_response' => 'verified-test-token'])
                ->assertSessionHasNoErrors();
        }
        $this->assertDatabaseCount('contact_messages', 1);
        $this->assertDatabaseCount('quote_requests', 1);
        Mail::assertSent(\App\Mail\NewContactMessage::class, 1);
        Mail::assertSent(NewQuoteRequest::class, 1);
        Mail::assertSent(QuoteRequestConfirmation::class, 1);
    }

    #[\PHPUnit\Framework\Attributes\TestWith(['en', 'A new message', 'Message'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['de', 'Eine neue Nachricht', 'Nachricht'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['de-CH', 'Eine neue Nachricht', 'Nachricht'])]
    public function test_contact_email_preserves_the_form_language(string $locale, string $heading, string $label): void
    {
        Mail::fake();
        $this->post('/contact-message', [
            'locale' => $locale, 'name' => 'John Doe', 'email' => 'john@example.test', 'message' => 'Contact form test.',
        ])->assertSessionHasNoErrors();
        app()->setLocale('hu');
        Mail::assertSent(\App\Mail\NewContactMessage::class, function ($mail) use ($locale, $heading, $label) {
            $html = $mail->render();
            return $mail->locale === $locale && str_contains($html, $heading) && str_contains($html, $label) && ! str_contains($html, 'Új üzenet');
        });
    }

    #[\PHPUnit\Framework\Attributes\TestWith(['en', 'Your submitted details', 'No specific deadline', 'Your quote request has been received'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['de', 'Deine übermittelten Angaben', 'Kein fester Termin', 'Deine Angebotsanfrage ist eingegangen'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['de-CH', 'Deine übermittelten Angaben', 'Kein fester Termin', 'Deine Angebotsanfrage ist eingegangen'])]
    public function test_quote_emails_keep_the_language_used_on_the_form(string $locale, string $heading, string $timeframe, string $subject): void
    {
        Mail::fake();

        $this->post('/quote-request', [
            'locale' => $locale,
            'name' => 'Test Customer',
            'email' => 'customer@example.test',
            'service' => 'Website',
            'message' => 'A website for my business.',
            'timeline_preference' => 'flexible',
            'privacy' => true,
        ])->assertSessionHasNoErrors();

        app()->setLocale('hu');

        Mail::assertSent(QuoteRequestConfirmation::class, function ($mail) use ($locale, $heading, $timeframe, $subject) {
            $html = $mail->render();

            return $mail->locale === $locale
                && str_contains($html, $heading)
                && str_contains($html, $timeframe)
                && str_contains($mail->subject, $subject)
                && ! str_contains($html, 'A beküldött adatok');
        });
        Mail::assertSent(NewQuoteRequest::class, function ($mail) use ($locale, $timeframe) {
            return $mail->locale === $locale && str_contains($mail->render(), $timeframe);
        });
    }

    #[\PHPUnit\Framework\Attributes\TestWith(['en', 'Please enter a valid email address.'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['de', 'Bitte gib eine gültige E-Mail-Adresse ein.'])]
    #[\PHPUnit\Framework\Attributes\TestWith(['de-CH', 'Bitte gib eine gültige E-Mail-Adresse ein.'])]
    public function test_quote_validation_uses_the_form_language(string $locale, string $expected): void
    {
        Mail::fake();

        $this->post('/quote-request', ['locale' => $locale, 'email' => 'invalid'])
            ->assertSessionHasErrors(['email' => $expected]);

        Mail::assertNothingSent();
    }

    public function test_quote_can_be_requested_without_optional_project_details(): void
    {
        Mail::fake();

        $this->from('/ajanlatkeres')->post('/quote-request', [
            'name' => 'Teszt Elek',
            'email' => 'customer@example.test',
            'service' => 'Még nem tudom pontosan',
            'message' => 'Szeretném bemutatni a vállalkozásomat.',
            'privacy' => true,
        ])->assertSessionHasNoErrors()->assertRedirect('/ajanlatkeres');

        $this->assertDatabaseHas('quote_requests', [
            'email' => 'customer@example.test',
            'phone' => null,
            'timeline' => null,
        ]);
        Mail::assertSent(NewQuoteRequest::class, 1);
        Mail::assertSent(QuoteRequestConfirmation::class, 1);
    }

    public function test_estimate_details_are_saved_and_included_in_both_emails(): void
    {
        Mail::fake();

        $this->post('/quote-request', [
            'name' => 'Teszt Elek',
            'email' => 'customer@example.test',
            'service' => 'Webshopot szeretnék',
            'message' => 'Kézműves termékeket szeretnék árulni.',
            'existing_site' => 'https://example.test',
            'product_count' => '21–100 termék',
            'integrations' => 'Számlázó és a korábbi termékek átvétele',
            'timeline_preference' => 'fixed',
            'timeline' => now()->addMonth()->toDateString(),
            'deadline_reason' => 'Üzletnyitás',
            'reference_sites' => "https://example.test\nA színei tetszenek.\n\nMásodik példa\nhttps://example.org\nA menüje tetszik.",
            'privacy' => true,
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseHas('quote_requests', [
            'existing_site' => 'https://example.test',
            'product_count' => '21–100 termék',
            'timeline_preference' => 'fixed',
            'deadline_reason' => 'Üzletnyitás',
        ]);

        foreach ([NewQuoteRequest::class, QuoteRequestConfirmation::class] as $mailable) {
            Mail::assertSent($mailable, function ($mail) {
                $html = $mail->render();

                return str_contains($html, 'Üzletnyitás')
                    && str_contains($html, '21–100 termék')
                    && str_contains($html, 'Számlázó és a korábbi termékek átvétele');
            });
        }
    }

    public function test_fixed_deadline_needs_a_future_date(): void
    {
        Mail::fake();
        $data = [
            'name' => 'Teszt Elek',
            'email' => 'customer@example.test',
            'service' => 'weboldal',
            'message' => 'Bemutatkozó weboldal.',
            'timeline_preference' => 'fixed',
            'privacy' => true,
        ];

        $this->post('/quote-request', $data)->assertSessionHasErrors('timeline');
        $this->post('/quote-request', [...$data, 'timeline' => now()->subDay()->toDateString()])
            ->assertSessionHasErrors('timeline');
        Mail::assertNothingSent();
    }

    public function test_quote_phone_rejects_more_than_fifteen_digits(): void
    {
        Mail::fake();

        $this->from('/ajanlatkeres')
            ->post('/quote-request', ['phone' => '3612345678901234'])
            ->assertSessionHasErrors('phone');

        Mail::assertNothingSent();
    }

    /** @test */
    public function quote_request_sends_the_form_to_the_owner_and_the_customer(): void
    {
        Mail::fake();

        DomainSetting::create([
            'domain' => 'progzone.hu',
            'contact_email' => 'owner@example.test',
        ]);

        $response = $this->from('/quote')->post('/quote-request', [
            'name' => 'Teszt Megrendelo',
            'email' => 'customer@example.test',
            'phone' => '123456789',
            'company' => 'Teszt Kft.',
            'service' => 'weboldal',
            'budget' => '0-200',
            'timeline' => now()->addDay()->toDateString(),
            'message' => 'Szeretnek egy weboldalt.',
            'reference_sites' => 'https://example.test',
            'menu_items' => '5',
            'languages' => 'magyar',
            'features' => 'Kapcsolatfelveteli urlap',
            'hosting_domain' => 'Kerek segitseget domainnel.',
            'privacy' => '1',
        ], [
            'HTTP_HOST' => 'progzone.hu',
        ]);

        $response->assertRedirect('/quote');

        $this->assertDatabaseHas('quote_requests', [
            'email' => 'customer@example.test',
            'menu_items' => '5',
        ]);

        Mail::assertSent(NewQuoteRequest::class, function (NewQuoteRequest $mail) {
            return $mail->hasTo('owner@example.test');
        });

        Mail::assertSent(QuoteRequestConfirmation::class, function (QuoteRequestConfirmation $mail) {
            return $mail->hasTo('customer@example.test');
        });
    }

    /** @test */
    public function contact_form_rejects_javascript_payloads(): void
    {
        Mail::fake();

        $response = $this->from('/contact')->post('/contact-message', [
            'name' => 'Teszt',
            'email' => 'customer@example.test',
            'phone' => '123456789',
            'message' => '<script>alert(1)</script>',
        ]);

        $response->assertRedirect('/contact');
        $response->assertSessionHasErrors('message');
        $this->assertSame(0, ContactMessage::count());
    }
}
