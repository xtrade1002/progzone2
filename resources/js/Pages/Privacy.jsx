import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Privacy() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold text-[#FF007A]">Adatvédelmi szerződés</h1>
        <p className="text-lg text-gray-300">
          A személyes adatok kezelése során minden esetben az érvényes jogszabályoknak és a legjobb gyakorlatnak
          megfelelően járok el. Az adatok kizárólag a kapcsolattartáshoz és a szolgáltatás teljesítéséhez szükségesek.
        </p>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          <li>Az adatokhoz kizárólag én férek hozzá.</li>
          <li>Az adatokat soha nem adom át harmadik félnek.</li>
          <li>A kapcsolattartáshoz használt információkat kérésre törlöm.</li>
        </ul>
      </section>
    </Layout>
  );
}
