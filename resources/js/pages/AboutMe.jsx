import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function AboutMe() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Kép + bemutatkozás */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/img/me.jpg"
              alt="Rólam"
              className="rounded-2xl shadow-[0_0_25px_#ff007a]/50"
            />
          </div>
          <div>
            <h3 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
              Örülök, hogy itt vagy – Üdvözöllek a ProgZone oldalán!
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Legyen szó weboldal-készítésről, webshop-fejlesztésről, webdesignról, logótervezésről 
              vagy online marketingről – nálam mindent egy helyen megtalálsz. A célom, hogy modern, egyedi és reszponzív 
              megoldásokat kínáljak, amelyek nemcsak jól néznek ki, hanem valódi eredményeket is hoznak. 
            </p>
            <br />
            <p className="text-gray-300 leading-relaxed"> Ha profi online jelenlétre vágysz, szívesen segítek megvalósítani a víziódat!</p>
          </div>
        </div>

        {/* Mit tanultam? */}
        <div className="relative">
          <h4 className="text-4xl font-bold text-[#FF007A] mb-12 text-center relative inline-block">
            Miben tudok Neked segíteni?
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#00f7ff] rounded-full"></span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            
            {/* Design */}
            <div className="p-6 rounded-xl border border-[#ff007a]/30 bg-[#121317]/60 hover:shadow-[0_0_25px_#ff007a] transition duration-300">
            
              <h2 className="text-2xl font-bold text-[#FF007A] mb-4">Design</h2>
              <p className="text-gray-300 mb-6">
                Egyedi és professzionális designok, amelyek egyedivé teszik a márkádat.
              </p>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <span className="font-semibold text-white">Adobe Photoshop & Illustrator Tanúsítvány</span><br />
                  Professzionális képszerkesztés, logótervezés, digitális illusztráció
                </li>
                <li>
                  <span className="font-semibold text-white">Webdesign & Digitális Médiák</span><br />
                  UI/UX design, reszponzív webdesign, HTML & CSS
                </li>
              </ul>
            </div>

            {/* Webfejlesztés */}
            <div className="p-6 rounded-xl border border-[#ff007a]/30 bg-[#121317]/60 hover:shadow-[0_0_25px_#ff007a] transition duration-300">
              
              <h2 className="text-2xl font-bold text-[#FF007A] mb-4">Webfejlesztés</h2>
              <p className="text-gray-300 mb-6">
                Egyedi megoldásokat fejlesztünk HTML, CSS, JavaScript, PHP és modern keretrendszerekkel, mint a Laravel és az Angular.
              </p>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <span className="font-semibold text-white">Webfejlesztés & Frontend Design</span><br />
                  HTML, CSS, JavaScript, reszponzív design
                </li>
                <li>
                  <span className="font-semibold text-white">Backend programozás PHP-vel</span><br />
                  PHP, MySQL, MVC-architektúra, API-integráció
                </li>
                <li>
                  <span className="font-semibold text-white">Modern webalkalmazások Angular & Laravel alapokon</span><br />
                  TypeScript, komponens alapú fejlesztés, REST API-k
                </li>
              </ul>
            </div>

            {/* Marketing */}
            <div className="p-6 rounded-xl border border-[#ff007a]/30 bg-[#121317]/60 hover:shadow-[0_0_25px_#ff007a] transition duration-300">
              <h2 className="text-2xl font-bold text-[#FF007A] mb-4">Marketing</h2>
              <p className="text-gray-300 mb-6">
                Segítünk elérni a megfelelő célcsoportot és fenntartható eredményeket hozni.
              </p>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <span className="font-semibold text-white">SEO-optimalizálás</span><br />
                  Stratégiai kulcsszóelemzés, technikai SEO, minőségi tartalmak
                </li>
                <li>
                  <span className="font-semibold text-white">Social Media Marketing (Instagram & Facebook)</span><br />
                  Kreatív kampányok, célzott hirdetések, márkaismertség növelés
                </li>
                <li>
                  <span className="font-semibold text-white">Google Analytics</span><br />
                  Részletes elemzések a felhasználói viselkedésről, forgalomról és konverziókról
                </li>
                <li>
                  <span className="font-semibold text-white">Google Ads</span><br />
                  Hirdetések létrehozása és optimalizálása magas konverziós aránnyal
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}