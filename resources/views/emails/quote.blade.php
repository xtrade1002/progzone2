@component('mail::message')
<style>
  .quote-box {
    background-color: #0a0a0f;
    color: #ffffff;
    border: 1px solid #00f7ff;
    border-radius: 10px;
    padding: 24px;
    box-shadow: 0 0 18px #00f7ff55;
  }
  .quote-title {
    color: #00f7ff;
    font-size: 22px;
    font-weight: 700;
    text-shadow: 0 0 8px #00f7ff;
    margin-bottom: 6px;
  }
  .quote-meta {
    color: #9ca3af;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .quote-label {
    color: #ff007a;
    font-weight: 600;
  }
  .quote-value {
    color: #ffffff;
  }
  .quote-section-title {
    color: #00f7ff;
    font-size: 16px;
    font-weight: 600;
    margin-top: 18px;
    text-shadow: 0 0 6px #00f7ffaa;
  }
  .quote-divider {
    border-color: #00f7ff;
    opacity: 0.35;
    margin: 16px 0;
  }
</style>

@php
    $timezone = config('app.timezone', 'UTC');
    $submittedAt = $quote->created_at?->copy()->setTimezone($timezone)->format('Y.m.d H:i');

    $shortFields = [
        'Név' => $quote->name,
        'Email' => $quote->email,
        'Telefon' => $quote->phone,
        'Cég / projekt' => $quote->company,
        'Kért szolgáltatás' => $quote->service,
        'Költségkeret' => $quote->budget,
        'Tervezett ütemezés' => $quote->timeline,
        'Prioritás' => $quote->priority,
        'Elsődleges célközönség' => $quote->target_audience,
        'Projekt nyelvei' => $quote->languages,
        'Tartalom forrása' => $quote->content_source,
        'Preferált fizetési mód' => $quote->payment_method,
        'Utótámogatási igény' => $quote->support,
        'Hosting / domain igény' => $quote->hosting_domain,
    ];

    $longFields = [
        'Projekt összefoglaló' => $quote->message,
        'Referencia oldalak' => $quote->reference_sites,
        'Kulcsfunkciók' => $quote->features,
        'Szükséges integrációk' => $quote->integrations,
        'Marketing célok' => $quote->marketing,
        'Jogi / compliance megjegyzések' => $quote->legal,
        'Számlázási információk' => $quote->billing_info,
    ];
@endphp

<div class="quote-box">
  <div class="quote-title">Új ajánlatkérés érkezett a {{ $host }} oldalról</div>
  @if($submittedAt)
    <div class="quote-meta">Beküldve: {{ $submittedAt }} ({{ $timezone }})</div>
  @endif

  <hr class="quote-divider" />

  @foreach($shortFields as $label => $value)
    <p>
      <span class="quote-label">{{ $label }}:</span>
      <span class="quote-value">{{ filled($value) ? $value : '—' }}</span>
    </p>
  @endforeach

  <hr class="quote-divider" />

  @foreach($longFields as $label => $value)
    @if(filled($value))
      <div>
        <div class="quote-section-title">{{ $label }}</div>
        <p class="quote-value" style="white-space:pre-line;">{!! nl2br(e($value)) !!}</p>
      </div>
    @endif
  @endforeach
</div>

@component('mail::subcopy')
Ez az üzenet automatikusan generálódott a {{ $host }} ajánlatkérő űrlapjáról.
@endcomponent
@endcomponent
