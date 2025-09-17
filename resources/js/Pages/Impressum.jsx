import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Impressum() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold text-[#FF007A]">Impresszum</h1>
        <div className="space-y-2 text-lg text-gray-300">
          <p>
            <span className="font-semibold text-white">Név:</span> Progzone
          </p>
          <p>
            <span className="font-semibold text-white">E-mail:</span> hello@portfolio.hu
          </p>
          <p>
            <span className="font-semibold text-white">Telefonszám:</span> +36 30 123 4567
          </p>
          <p>
            <span className="font-semibold text-white">Székhely:</span> 1234 Budapest, Példa utca 1.
          </p>
        </div>
        <p className="text-sm text-gray-300">
          A weboldalon megjelenített tartalom a szerzői jogról szóló törvény hatálya alá esik. A tartalmak felhasználása
          csak előzetes írásos engedéllyel lehetséges.
        </p>
      </section>
    </Layout>
  );
}
