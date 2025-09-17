<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>{{ config('app.name', 'Progzone') }}</title>

      <link rel="preconnect" href="https://fonts.bunny.net">
      <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

      @vite(['resources/css/app.css', 'resources/js/app.jsx'])
      @inertiaHead
  </head>
  <body class="bg-gradient-to-br from-[#0a0a0f] via-[#141422] to-[#0a0a0f] text-white font-sans antialiased">
      @inertia
  </body>
</html>
