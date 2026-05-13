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
            'timeline' => '2 het',
            'message' => 'Szeretnek egy weboldalt.',
            'privacy' => '1',
        ], [
            'HTTP_HOST' => 'progzone.hu',
        ]);

        $response->assertRedirect('/quote');

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
