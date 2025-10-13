<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public ContactMessage $contactMessage,
        private string $domain,
        private array $fromAddress = [],
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Új üzenet a {$this->domain} oldalról – Contact",
            from: $this->prepareFromAddress(),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
            with: [
                'contact' => $this->contactMessage,
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
