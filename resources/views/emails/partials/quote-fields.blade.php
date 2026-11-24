@php
    $fields = [
        'name' => $quote->name,
        'email' => $quote->email,
        'phone' => $quote->phone,
        'company' => $quote->company,
        'service' => $quote->service,
        'budget' => $quote->budget,
        'timeline_preference' => array_key_exists($quote->timeline_preference ?? '', __('quote_request.timelines'))
            ? __('quote_request.timelines.'.$quote->timeline_preference)
            : $quote->timeline_preference,
        'timeline' => $quote->timeline,
        'deadline_reason' => $quote->deadline_reason,
        'existing_site' => $quote->existing_site,
        'product_count' => $quote->product_count,
        'reference_sites' => $quote->reference_sites,
        'menu_items' => $quote->menu_items,
        'languages' => $quote->languages,
        'features' => $quote->features,
        'integrations' => $quote->integrations,
        'content_source' => $quote->content_source,
        'payment_method' => $quote->payment_method,
        'support' => $quote->support,
        'hosting_domain' => $quote->hosting_domain,
        'privacy' => __('quote_request.'.($quote->privacy ? 'yes' : 'no')),
    ];
@endphp

@foreach ($fields as $field => $value)
    @continue($value === null || $value === '')
    <p><strong>{{ __('quote_request.labels.'.$field) }}:</strong>
        @if (in_array($field, ['reference_sites', 'features', 'integrations'], true) || (is_string($value) && str_contains($value, "\n")))
            <br>{!! nl2br(e($value)) !!}
        @else
            {{ $value }}
        @endif
    </p>
@endforeach

@if ($quote->message)
    <p><strong>{{ __('quote_request.labels.message') }}:</strong><br>{!! nl2br(e($quote->message)) !!}</p>
@endif
