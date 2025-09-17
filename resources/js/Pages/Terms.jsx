import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Terms() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold text-[#FF007A]">Általános szerződési feltételek</h1>
        <p className="text-lg text-gray-300">
          Az együttműködés során törekszem az átlátható kommunikációra és a határidők pontos betartására. Az alábbi
          pontok foglalják össze a legfontosabb feltételeket.
        </p>
        <ol className="space-y-2 list-decimal list-inside text-gray-300">
          <li>A projekt részleteit és az árajánlatot írásban rögzítjük.</li>
          <li>A határidők betartása közös felelősségünk.</li>
          <li>A projekt lezárása után is biztosítok támogatást és karbantartást.</li>
        </ol>
      </section>
    </Layout>
  );
}
