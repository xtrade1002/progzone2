<?php

namespace App\Mail;

use App\Models\QuoteRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuoteRequestConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public QuoteRequest $quoteRequest,
        private string $domain,
        private array $fromAddress = [],
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Megkaptuk az ajánlatkérésed - {$this->domain}",
            from: $this->prepareFromAddress(),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.quote-confirmation',
            with: [
                'quote' => $this->quoteRequest,
                'domain' => $this->domain,
            ],
        );
    }

    /**
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    private function prepareFromAddress(): ?Address
    {
        $address = $this->fromAddress['address'] ?? null;

        if (! $address) {
            return null;
        }

        return new Address(
            $address,
            $this->fromAddress['name'] ?? null,
        );
    }
}
