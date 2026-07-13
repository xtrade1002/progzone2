<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      @php
        $locale = app()->getLocale();
        $fallbackLocale = config('app.fallback_locale', 'hu');
        $translationPaths = array_filter([
          lang_path("{$locale}.json"),
          str_contains($locale, '-') ? lang_path(strtok($locale, '-') . '.json') : null,
          lang_path("{$fallbackLocale}.json"),
        ]);
        $translations = [];

        foreach (array_reverse($translationPaths) as $translationPath) {
          if (is_file($translationPath)) {
            $decoded = json_decode(file_get_contents($translationPath), true);

            if (is_array($decoded)) {
              $translations = array_replace_recursive($translations, $decoded);
            }
          }
        }

        $seoTitle = data_get($translations, 'home.meta_title', config('app.name', 'Progzone'));
        $seoDescription = data_get($translations, 'home.meta_description');
        $host = preg_replace('/^www\./', '', request()->getHost());
        $canonicalUrl = match ($host) {
          'progzone.de' => 'https://progzone.de/',
          'progzone.hu' => 'https://progzone.hu/',
          default => url('/'),
        };
      @endphp

      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>{{ $seoTitle }}</title>
      @if ($seoDescription)
        <meta name="description" content="{{ $seoDescription }}">
        <meta property="og:description" content="{{ $seoDescription }}">
        <meta name="twitter:description" content="{{ $seoDescription }}">
      @endif
      <link rel="canonical" href="{{ $canonicalUrl }}">
      <link rel="alternate" hrefLang="hu" href="https://progzone.hu/">
      <link rel="alternate" hrefLang="de" href="https://progzone.de/">
      <link rel="alternate" hrefLang="x-default" href="https://progzone.hu/">
      <meta property="og:type" content="website">
      <meta property="og:title" content="{{ $seoTitle }}">
      <meta property="og:url" content="{{ $canonicalUrl }}">
      <meta property="og:site_name" content="Progzone">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="{{ $seoTitle }}">

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
