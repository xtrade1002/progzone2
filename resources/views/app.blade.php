<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>{{ config('app.name', 'Progzone') }}</title>

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
