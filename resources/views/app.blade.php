<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>{{ config('app.name', 'Progzone') }}</title>

      <link rel="icon" href="/favicon.ico" sizes="any">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
      <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192.png">

      <link
        rel="preload"
        as="image"
        href="/img/progzone-neon-portrait-lcp.jpg"
        imagesrcset="/img/progzone-neon-portrait-lcp.jpg 402w"
        imagesizes="(max-width: 640px) 248px, (max-width: 1023px) 310px, 390px"
        fetchpriority="high"
      >

      @viteReactRefresh
      @vite(['resources/css/app.css', 'resources/js/app.jsx'])
      @inertiaHead
  </head>
  <body class="bg-[#02040c] text-white font-sans antialiased">
      @inertia
  </body>
</html>
