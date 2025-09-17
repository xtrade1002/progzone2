import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Home() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
        <h1 className="text-4xl font-bold text-[#FF007A]">Örülök, hogy itt vagy – Üdvözöllek a ProgZone-nál!</h1>
        <p className="text-lg text-gray-300">
          Legyen szó weboldal-készítésről, webshop-fejlesztésről, webdesignról, logótervezésről vagy online
          marketingről – nálam mindent egy helyen megtalálsz. A célom, hogy modern, egyedi és reszponzív
          megoldásokat kínáljak, amelyek nemcsak jól néznek ki, hanem valódi eredményeket is hoznak. Ha profi
          online jelenlétre vágysz, szívesen segítek megvalósítani a víziódat!
        </p>
      </section>
    </Layout>
  );
}