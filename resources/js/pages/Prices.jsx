import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Prices() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-2xl p-10">
          <h1 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
            Árak
          </h1>

          <ul className="space-y-8">
            {/* WordPress weboldal */}
            <li className="border border-[#ff007a] rounded-2xl p-6 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-2">
                    Weboldal készítés (WordPress)
                  </h2>
                  <p className="text-gray-300">
                    Gyors, költséghatékony és könnyen szerkeszthető megoldás modern dizájnnal és SEO-val.
                    <br />
                    Az ár függ, pl. oldalak számától, design típusától, tartalomkezeléstől és karbantartástól, stb.
                  </p>
                  <br />
                  <p className="text-gray-300">
                    <span className="font-bold text-[#FF007A] underline">Az ár NEM tartalmazza:</span>
                    <ul className="list-disc list-inside mt-2">
                      <li>Domain név (kb. 3.000 Ft/év)</li>
                      <li>Tárhely (kb. 10.000 Ft/év)</li>
                      <li>Prémium sablonok és bővítmények (opcionális, kb. 20.000-50.000 Ft egyszeri vagy éves díj)</li>
                      <li>Egyedi fejlesztésű funkciók (pl. időpontfoglaló, automatikus számlázás, stb.)</li>
                    </ul>
                  </p>
                  <br />
                  <p>A projekt fő része fix áras, a plusz igények óradíj szerint (10.000 Ft / óra) kerülnek elszámolásra.</p>
                </div>
                <span className="text-xl font-bold text-[#00f7ff] whitespace-nowrap">
                  150.000 Ft-tól
                </span>
              </div>
            </li>

            {/* Webshop */}
            <li className="border border-[#ff007a] rounded-2xl p-6 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-2">
                    Webshop készítés (WooCommerce)
                  </h2>
                  <p className="text-gray-300">
                    Professzionális online bolt, integrált fizetéssel, szállítással, akciókezeléssel és többnyelvűséggel.
                    <br />
                    A webshop árát befolyásolja pl. a termékek száma, a fizetési és szállítási integrációk, a design típusa, az automatizáció és karbantartás igénye, stb.
                  </p>
                  <br />
                  <p className="text-gray-300">
                    <span className="font-bold text-[#FF007A] underline">Az ár NEM tartalmazza:</span>
                    <ul className="list-disc list-inside mt-2">
                      <li>Domain név (kb. 3.000 Ft/év)</li>
                      <li>Tárhely (kb. 10.000 Ft/év)</li>
                      <li>Prémium sablonok és bővítmények (opcionális, kb. 20.000-50.000 Ft egyszeri vagy éves díj)</li>
                      <li>Egyedi fejlesztésű funkciók (pl. időpontfoglaló, automatikus számlázás, stb.)</li>
                    </ul>
                  </p>
                  <br />
                  <p>A projekt fő része fix áras, a plusz igények óradíj szerint (10.000 Ft / óra) kerülnek elszámolásra.</p>
                </div>
                <span className="text-xl font-bold text-[#00f7ff] whitespace-nowrap">
                  200.000 Ft-tól
                </span>
              </div>
            </li>

            {/* Egyedi fejlesztés */}
            <li className="border border-[#ff007a] rounded-2xl p-6 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-2">
                    Egyedileg fejlesztett weboldal
                  </h2>
                  <p className="text-gray-300">
                    Speciális funkciókkal, maximális rugalmassággal és bővíthetőséggel.
                    Az ár függ pl. a kért funkciók bonyolultságától, az integrációktól, a rendszer méretétől, a design egyediségétől és a karbantartási igényektől, stb.
                  </p>
                  <br />
                  <p>A projekttől függően lehet fix áras, vagy óradíj szerinti (10.000 Ft / óra) elszámolás.</p>
                </div>
                <span className="text-xl font-bold text-[#00f7ff] whitespace-nowrap">
                  Fix ár / 10.000 Ft/óra
                </span>
              </div>
            </li>

            {/* Marketing */}
            <li className="border border-[#ff007a] rounded-2xl p-6 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-2">
                    Marketing
                  </h2>
                  <p className="text-gray-300">
                    Google Ads, Facebook és Instagram kampányok, SEO és tartalomkészítés a bevételeid növeléséhez.
                  </p>
                  <p>Az ár a kampányok számától,típusától,bonyolultságától,stb..</p>
                </div>
                <span className="text-xl font-bold text-[#00f7ff] whitespace-nowrap">
                  30.000 Ft-tól/hó + hirdetési költség
                </span>
              </div>
            </li>
          </ul>

          {/* Záró megjegyzés */}
          <p className="mt-12 text-center text-gray-400">
            Pontos árajánlatért kérlek vedd fel velem a kapcsolatot emailben:{" "}
            <span className="text-[#FF007A] font-semibold">info@progzone.de</span>
          </p>
        </div>
      </section>
    </Layout>
  );
}