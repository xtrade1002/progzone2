import React from 'react';

export default function Studies() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">Studies</h1>
      <p className="text-lg text-gray-300">
        Itt osztom meg a legújabb tanulmányaimat, kutatásaimat és a kedvenc szakmai cikkeimet, amelyek inspirálnak a
        mindennapi munkám során.
      </p>
      <div className="space-y-4 text-gray-300">
        <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
          <h2 className="text-2xl font-semibold text-[#FF007A]">Design rendszerek a gyakorlatban</h2>
          <p className="mt-3 text-sm">
            Esettanulmány arról, hogyan javítja a konzisztenciát egy jól felépített design rendszer.
          </p>
        </article>
        <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
          <h2 className="text-2xl font-semibold text-[#FF007A]">Modern frontend architektúrák</h2>
          <p className="mt-3 text-sm">
            Gondolatok a komponens alapú megközelítésről és a moduláris kódszervezésről.
          </p>
        </article>
      </div>
    </section>
  );
}
