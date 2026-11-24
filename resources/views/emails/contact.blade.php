@php
    $fields = [
        __('contact_request.labels.name') => $contact->name,
        __('contact_request.labels.email') => $contact->email,
        __('contact_request.labels.phone') => $contact->phone,
    ];
@endphp

<h1>{{ __('contact_request.title', ['domain' => $domain]) }}</h1>

@foreach ($fields as $label => $value)
    @continue($value === null || $value === '')
    <p><strong>{{ $label }}:</strong> {{ $value }}</p>
@endforeach

@if ($contact->message)
    <p><strong>{{ __('contact_request.labels.message') }}:</strong><br>{!! nl2br(e($contact->message)) !!}</p>
@endif
