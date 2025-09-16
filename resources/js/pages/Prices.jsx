import React from 'react';

export default function Prices() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">Árak</h1>
      <p className="text-lg text-gray-300">
        Minden projekt egyedi, ezért az árak rugalmasan igazodnak az igényekhez. Az alábbi csomagok kiindulási
        alapként szolgálnak, a pontos ajánlatot egy személyes egyeztetés után készítem el.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6 text-center">
          <h2 className="text-2xl font-semibold text-[#FF007A]">Starter</h2>
          <p className="mt-4 text-sm text-gray-300">Kis, bemutatkozó oldalakhoz ideális megoldás.</p>
        </article>
        <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6 text-center">
          <h2 className="text-2xl font-semibold text-[#FF007A]">Professional</h2>
          <p className="mt-4 text-sm text-gray-300">Komplett szolgáltatás több aloldallal és egyedi dizájnnal.</p>
        </article>
        <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6 text-center">
          <h2 className="text-2xl font-semibold text-[#FF007A]">Enterprise</h2>
          <p className="mt-4 text-sm text-gray-300">Nagyvállalati vagy speciális projektekre szabott együttműködés.</p>
        </article>
      </div>
    </section>
  );
}
