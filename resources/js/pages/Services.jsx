import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Services() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        
        {/* Design */}
        <div>
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
        <div>
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
        <div>
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

      </section>
    </Layout>
  );
}