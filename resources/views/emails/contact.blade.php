@php
    $fields = [
        'Név' => $contact->name,
        'E-mail cím' => $contact->email,
        'Telefonszám' => $contact->phone,
    ];
@endphp

<h1>Új üzenet érkezett a(z) {{ $domain }} oldalról</h1>

@foreach ($fields as $label => $value)
    @continue($value === null || $value === '')
    <p><strong>{{ $label }}:</strong> {{ $value }}</p>
@endforeach

@if ($contact->message)
    <p><strong>Üzenet:</strong><br>{!! nl2br(e($contact->message)) !!}</p>
@endif
