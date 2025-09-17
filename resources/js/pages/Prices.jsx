import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Prices() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Weboldal készítés */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#FF007A] mb-6">
            Weboldal készítés (WordPress – CMS alapú)
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Gyors és költséghatékony megoldás kis- és középvállalkozások számára. 
            Reszponzív, keresőbarát és könnyen kezelhető weboldalak.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Mini", desc: "1–3 aloldal", price: "Ab 1000€" },
              { title: "Standard", desc: "3–5 aloldal", price: "Ab 1500€" },
              { title: "Pro", desc: "5–10 aloldal", price: "Ab 2000€" },
              { title: "Egyedi", desc: "10+ aloldal", price: "Egyedi ár" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-[#FF007A]/50 bg-[#111] p-6 text-center hover:shadow-[0_0_20px_#FF007A] transition">
                <h3 className="text-xl font-bold text-[#FF007A] mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.desc}</p>
                <p className="text-lg font-semibold text-white">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Egyedi fejlesztés */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#FF007A] mb-6">
            Egyedileg fejlesztett weboldal
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Teljesen személyre szabott megoldás, speciális funkciókkal (pl. időpontfoglalás, CRM, portál). 
            Maximális rugalmasság és bővíthetőség.
          </p>
          <div className="rounded-lg border border-[#FF007A]/50 bg-[#111] p-8 text-center max-w-lg mx-auto hover:shadow-[0_0_20px_#FF007A] transition">
            <h3 className="text-2xl font-bold text-[#FF007A] mb-2">Individuális ajánlat</h3>
            <p className="text-gray-300 mb-4">Ár a funkciók terjedelmétől függ</p>
            <p className="text-xl font-semibold text-white">Ab 2500€</p>
          </div>
        </div>

        {/* Webshop készítés */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#FF007A] mb-6">
            Webshop készítés (WooCommerce)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Mini Webshop", desc: "max. 50 termék", price: "Ab 2000€" },
              { title: "Business Webshop", desc: "max. 150 termék", price: "Ab 5000€" },
              { title: "Enterprise Webshop", desc: "150+ termék", price: "Ab 10000€" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-[#FF007A]/50 bg-[#111] p-6 text-center hover:shadow-[0_0_20px_#00F7FF] transition">
                <h3 className="text-xl font-bold text-[#FF007A] mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.desc}</p>
                <p className="text-lg font-semibold text-white">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#FF007A] mb-6">
            Marketing
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Hogyan épülnek fel a marketing költségek? – Hirdetési költségkeret + Szolgáltatási díj.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-lg border border-gray-700 bg-[#111] p-6">
              <h3 className="text-xl font-bold text-[#FF007A] mb-2">1) Hirdetési költségkeret</h3>
              <p className="text-gray-300">
                Összeg, amely a platformokra kerül (Google, Facebook, Instagram, TikTok). 
                Külön kerül levonásra az ügyfél számlájáról.
              </p>
            </div>
            <div className="rounded-lg border border-gray-700 bg-[#111] p-6">
              <h3 className="text-xl font-bold text-[#FF007A] mb-2">2) Szolgáltatási díj</h3>
              <p className="text-gray-300">
                Tervezés, kampányoptimalizálás, kulcsszókutatás, szövegírás és kreatívok készítése. 
                Fix összeg a szakértő munkájáért.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-lg border border-[#FF007A]/50 bg-[#111] p-6 text-center hover:shadow-[0_0_20px_#FF007A]">
              <h3 className="text-xl font-bold text-[#FF007A] mb-2">Social Marketing</h3>
              <p className="text-gray-300">
                Ideális márkaépítéshez, közösségformáláshoz és széles eléréshez.
              </p>
            </div>
            <div className="rounded-lg border border-[#FF007A]/50 bg-[#111] p-6 text-center hover:shadow-[0_0_20px_#00F7FF]">
              <h3 className="text-xl font-bold text-[#FF007A] mb-2">Google Ads</h3>
              <p className="text-gray-300">
                Célozott hirdetések, amelyek közvetlenül a vásárlókat szólítják meg.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Basic", desc: "Google Ads", price: "Egyedi ár" },
              { title: "Business", desc: "Social Media Ads", price: "Egyedi ár" },
              { title: "Pro / Enterprise", desc: "Google + Social kombi", price: "Egyedi ár" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-[#FF007A]/50 bg-[#111] p-6 text-center hover:shadow-[0_0_20px_#FF007A] transition">
                <h3 className="text-xl font-bold text-[#FF007A] mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.desc}</p>
                <p className="text-lg font-semibold text-white">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </Layout>
  );
}