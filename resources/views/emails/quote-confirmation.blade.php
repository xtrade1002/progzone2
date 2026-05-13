<h1>Köszönjük, megkaptuk az ajánlatkérésed</h1>

<p>
    A(z) {{ $domain }} oldalon leadott forma nyomtatványt sikeresen rögzítettük.
    Hamarosan átnézzük az adatokat, és jelentkezünk a megadott elérhetőségen.
</p>

<h2>A beküldött adatok</h2>

@include('emails.partials.quote-fields', ['quote' => $quote])
