@if (($page['component'] ?? null) === 'References')
    @php($referencePreload = \App\Support\ReferencePreviews::preload($page, preg_replace('/^www\./', '', request()->getHost())))
    @if ($referencePreload)
        <link rel="preload" as="image" imagesrcset="{{ $referencePreload['srcset'] }}" imagesizes="{{ $referencePreload['sizes'] }}" fetchpriority="high">
    @endif
    @unless (\Illuminate\Support\Facades\Vite::isRunningHot())
        <link rel="modulepreload" href="{{ \Illuminate\Support\Facades\Vite::asset('resources/js/Pages/References.jsx') }}">
    @endunless
@endif
