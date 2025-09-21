import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Services() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">

        {/* Weboldal készítés (WordPress) */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF007A] mb-4">
            Weboldal készítés (WordPress)
          </h2>
          <p className="text-gray-300 mb-6">
            Gyors és költséghatékony megoldás, ahol a tartalmat Te is könnyedén szerkesztheted.
            Ideális vállalkozásoknak, akik profi, modern és keresőoptimalizált weboldalt szeretnének rövid határidővel.
          </p>
        </div>


        {/* Webshop készítés */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF007A] mb-4">
            Webshop készítés (WooCommerce)
          </h2>
          <p className="text-gray-300 mb-6">
            Professzionális online áruház, amely egyszerűen kezelhető és bővíthető. Integrálható fizetési
            és szállítási rendszerekkel, akciók kezelésével és akár többnyelvű felülettel is.
          </p>
        </div>

        {/* Egyedi fejlesztés */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF007A] mb-4">
            Egyedileg fejlesztett weboldal
          </h2>
          <p className="text-gray-300 mb-6">
            Teljesen személyre szabott fejlesztés, amely speciális igényeket és egyedi funkciókat is kielégít. Maximális rugalmasság és bővíthetőség hosszú távra.
          </p>
        </div>

        {/* Marketing */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF007A] mb-4">
            Marketing
          </h2>
          <p className="text-gray-300 mb-6">
            Teljes körű online marketing szolgáltatások: Google Ads, Facebook és Instagram kampányok, SEO és
            tartalomkészítés. Segítünk több ügyfelet elérni, növelni a bevételeidet és erősíteni a márkádat.
          </p>
        </div>

      </section>
    </Layout>
  );
}