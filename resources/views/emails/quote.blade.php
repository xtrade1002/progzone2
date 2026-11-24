<h1>{{ __('quote_request.owner_title', ['domain' => $domain]) }}</h1>

@include('emails.partials.quote-fields', ['quote' => $quote])
