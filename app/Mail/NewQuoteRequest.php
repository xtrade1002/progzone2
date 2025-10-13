<?php

namespace App\Mail;

use App\Models\QuoteRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewQuoteRequest extends Mailable
{
    use Queueable;
    use SerializesModels;

    public QuoteRequest $quote;

    public string $host;

    public function __construct(QuoteRequest $quote, string $host)
    {
        $this->quote = $quote;
        $this->host = $host;
    }

    public function build(): self
    {
        $subject = '💡 Új ajánlatkérés a ' . $this->host . ' oldalról';

        return $this
            ->subject($subject)
            ->replyTo($this->quote->email, $this->quote->name)
            ->markdown('emails.quote', [
                'quote' => $this->quote,
                'host' => $this->host,
            ]);
    }
}
