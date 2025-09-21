import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Impressum() {
  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] mb-10">
          Impresszum
        </h1>

        <div className="bg-[#121317] border border-[#ff007a]/40 rounded-2xl p-8 shadow-[0_0_25px_#ff007a]/30 space-y-4 text-lg text-gray-300">
          <p>
            <span className="font-semibold text-white">Név:</span> Xtrade
          </p>
          <p>
            <span className="font-semibold text-white">USt-IdNr.:</span> DE362261730
          </p>
          <p>
            <span className="font-semibold text-white">E-mail:</span>{' '}
            <a
              href="mailto:info@progzone.hu"
              className="text-[#00f7ff] hover:text-[#ff007a] transition"
            >
              info@progzone.hu
            </a>
          </p>
          <p>
            <span className="font-semibold text-white">Telefonszám:</span>{' '}
            <a
              href="tel:+491736154730"
              className="text-[#00f7ff] hover:text-[#ff007a] transition"
            >
              +49 173 615 47 30
            </a>
          </p>
          <p>
            <span className="font-semibold text-white">Székhely:</span> Strasse der Jugend 18, 14974 Ludwigsfelde, Deutschland
          </p>
        </div>
      </section>
    </Layout>
  );
}