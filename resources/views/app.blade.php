<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      @php
        $seo = \App\Support\Seo::forRequest(request());
        $host = preg_replace('/^www\./', '', request()->getHost());
      @endphp
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title inertia="">{{ $seo['title'] }}</title>
      <meta inertia="description" name="description" content="{{ $seo['description'] }}">
      <link inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">
      @foreach ($seo['alternates'] as $language => $href)
        <link inertia="alternate-{{ $language }}" rel="alternate" hreflang="{{ $language }}" href="{{ $href }}">
      @endforeach
      <meta inertia="og:type" property="og:type" content="website">
      <meta inertia="og:title" property="og:title" content="{{ $seo['title'] }}">
      <meta inertia="og:description" property="og:description" content="{{ $seo['description'] }}">
      <meta inertia="og:url" property="og:url" content="{{ $seo['canonical'] }}">
      <meta inertia="og:site_name" property="og:site_name" content="Progzone">
      <meta inertia="og:locale" property="og:locale" content="{{ $seo['ogLocale'] }}">
      @foreach ($seo['ogAlternateLocales'] as $alternateLocale)
        <meta inertia="og:locale:{{ $alternateLocale }}" property="og:locale:alternate" content="{{ $alternateLocale }}">
      @endforeach
      <meta inertia="og:image" property="og:image" content="{{ $seo['image'] }}">
      <meta inertia="twitter:card" name="twitter:card" content="summary">
      <meta inertia="twitter:title" name="twitter:title" content="{{ $seo['title'] }}">
      <meta inertia="twitter:description" name="twitter:description" content="{{ $seo['description'] }}">
      <meta inertia="twitter:image" name="twitter:image" content="{{ $seo['image'] }}">
      <script inertia="structured-data" type="application/ld+json">{!! json_encode($seo['structuredData'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!}</script>

      @if ($host === 'progzone.de')
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3E2JHBJS5Y"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3E2JHBJS5Y');
        </script>
      @endif

      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=pz-neon-20260707">
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png?v=pz-neon-20260707">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=pz-neon-20260707">
      <link rel="icon" href="/favicon.ico?v=pz-neon-20260707" sizes="any">
      <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192.png?v=pz-neon-20260707">

      @viteReactRefresh
      @vite(['resources/css/app.css', 'resources/js/app.jsx'])
      @inertiaHead
  </head>
  <body class="bg-[#02040c] text-white font-sans antialiased">
      @inertia
  </body>
</html>
