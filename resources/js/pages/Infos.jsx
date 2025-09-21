import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Infos() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
          MIBŐL ÁLLNAK ÖSSZE A HIRDETÉSI KÖLTSÉGEK?
        </h1>

        <div className="space-y-12">
          {/* Szolgáltatási díj */}
          <div className="relative rounded-2xl bg-[#121317] border border-[#ff007a]/40 p-10 shadow-[0_0_25px_#ff007a55]">
            <div className="absolute -top-6 left-6 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff007a] to-[#00f7ff] text-white font-bold shadow-[0_0_20px_#ff007a]">
              1
            </div>
            <h2 className="text-2xl font-bold text-[#FF007A] mb-4">Szolgáltatási díj</h2>
            <p className="text-gray-300 font-semibold mb-2">
              A kampányok tervezésének, kezelésének és optimalizálásának díja.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Tartalmazza a kulcsszókutatást, célcsoport meghatározást, szövegek és kreatívok elkészítését, folyamatos optimalizálást.  
              Biztosítja, hogy a költségvetés a lehető legjobb eredményt hozza.  
              <span className="text-white font-bold"> Fix összeg = a szakember honoráriuma.</span>
            </p>
          </div>

          {/* Hirdetési költségkeret */}
          <div className="relative rounded-2xl bg-[#121317] border border-[#ff007a]/40 p-10 shadow-[0_0_25px_#00f7ff55]">
            <div className="absolute -top-6 left-6 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00f7ff] to-[#ff007a] text-white font-bold shadow-[0_0_20px_#00f7ff]">
              2
            </div>
            
            <h2 className="text-2xl font-bold text-[#FF007A] mb-4">Hirdetési költségkeret</h2>
            <p className="text-gray-300 font-semibold mb-2">
              Az az összeg, amelyet közvetlenül a hirdetési platformnak (Google, Facebook, Instagram, TikTok stb.) fizetünk.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Példa: 500 € havi büdzsé → 100%-ban a platformhoz kerül.  
              Csak a hirdetési felület használatát fedezi.  
              A megrendelő saját számlájáról kerül levonásra.
            </p>
          </div>

          {/* Két oszlopos szekció */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Marketing */}
            <div className="rounded-2xl bg-[#121317] border border-[#ff007a]/40 p-8 shadow-[0_0_20px_#ff007a33]">
              <h2 className="text-2xl font-bold text-[#FF007A] mb-4">Közösségi marketing</h2>
              <p className="text-gray-400 leading-relaxed">
                Ajánlott, <span className="text-white font-semibold">ha a márkaépítésről, közösség kialakításáról vagy széles elérésről van szó.</span>  
                Ideális a termékek vagy szolgáltatások ismertté tételére, új ügyfelek szerzésére és a márkaismertség növelésére.
              </p>
            </div>

            {/* Google Ads */}
            <div className="rounded-2xl bg-[#121317] border border-[#ff007a]/40 p-8 shadow-[0_0_20px_#00f7ff33]">
              <h2 className="text-2xl font-bold text-[#FF007A] mb-4">Google Ads</h2>
              <p className="text-gray-400 leading-relaxed">
                Ajánlott, <span className="text-white font-semibold">ha célzott keresésekre szeretnénk megjelenni</span> (pl. „fogorvos Budapest” vagy „webshop készítés ára”).  
                Sokkal inkább közvetlen vásárlásról vagy ajánlatkérésről szól, mivel a felhasználók aktívan keresnek megoldást.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}