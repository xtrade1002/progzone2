<h1>{{ __('quote_request.confirmation_title') }}</h1>

<p>
    {{ __('quote_request.confirmation_body', ['domain' => $domain]) }}
</p>

<h2>{{ __('quote_request.details') }}</h2>

@include('emails.partials.quote-fields', ['quote' => $quote])
