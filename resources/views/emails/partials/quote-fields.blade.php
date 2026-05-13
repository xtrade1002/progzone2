@php
    $fields = [
        'Név' => $quote->name,
        'E-mail cím' => $quote->email,
        'Telefonszám' => $quote->phone,
        'Cég' => $quote->company,
        'Szolgáltatás' => $quote->service,
        'Tervezett költségvetés' => $quote->budget,
        'Tervezett ütemezés' => $quote->timeline,
        'Referencia oldalak' => $quote->reference_sites,
        'Célközönség' => $quote->target_audience,
        'Projekt nyelvei' => $quote->languages,
        'Kulcsfunkciók' => $quote->features,
        'Tartalom forrása' => $quote->content_source,
        'Számlázási információk' => $quote->billing_info,
        'Preferált fizetési mód' => $quote->payment_method,
        'Utótámogatási igény' => $quote->support,
        'Tárhely / domain igény' => $quote->hosting_domain,
        'Szükséges integrációk' => $quote->integrations,
        'Marketing célok' => $quote->marketing,
        'Jogi / megfelelőségi elvárások' => $quote->legal,
        'Prioritás' => $quote->priority,
        'Adatkezelési tájékoztató elfogadva' => $quote->privacy ? 'Igen' : 'Nem',
    ];

    $multilineLabels = [
        'Referencia oldalak',
        'Kulcsfunkciók',
        'Szükséges integrációk',
        'Marketing célok',
        'Jogi / megfelelőségi elvárások',
    ];
@endphp

@foreach ($fields as $label => $value)
    @continue($value === null || $value === '')
    <p><strong>{{ $label }}:</strong>
        @if (in_array($label, $multilineLabels, true) || (is_string($value) && str_contains($value, "\n")))
            <br>{!! nl2br(e($value)) !!}
        @else
            {{ $value }}
        @endif
    </p>
@endforeach

@if ($quote->message)
    <p><strong>Üzenet:</strong><br>{!! nl2br(e($quote->message)) !!}</p>
@endif
