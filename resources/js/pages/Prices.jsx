import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout.jsx';

export default function Prices() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cardBase =
    'border border-[#ff007a]/50 rounded-2xl p-6 sm:p-8 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300';

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl p-4 sm:p-10">
          <h1
            className={`text-3xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a] transform transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Árak
          </h1>

          <ul className="space-y-10">
            {/* WordPress weboldal */}
            <li className={cardBase}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
                    Weboldal készítés (WordPress)
                  </h2>
                  <p className="text-gray-300">
                    Gyors, költséghatékony és könnyen szerkeszthető megoldás
                    modern dizájnnal és SEO-val.
                    <br />
                    Az ár függ az oldalak számától, a design típusától,
                    tartalomkezeléstől, karbantartástól, stb.
                  </p>

                  <p className="text-gray-300 mt-4">
                    <span className="font-bold text-[#FF007A] underline">
                      Az ár NEM tartalmazza:
                    </span>
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                    <li>Domain név (kb. 3.000 Ft/év)</li>
                    <li>Tárhely (kb. 10.000 Ft/év)</li>
                    <li>
                      Prémium sablonok és bővítmények (20.000–50.000 Ft
                      egyszeri vagy éves díj)
                    </li>
                    <li>
                      Egyedi funkciók (pl. időpontfoglaló, automatikus
                      számlázás)
                    </li>
                  </ul>

                  <p className="text-gray-300 mt-4">
                    Fix alapár, extra igények óradíj szerint (10.000 Ft/óra).
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
                  150.000 Ft-tól
                </span>
              </div>
            </li>

            {/* Webshop */}
            <li className={cardBase}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
                    Webshop készítés (WooCommerce)
                  </h2>
                  <p className="text-gray-300">
                    Professzionális online bolt integrált fizetéssel,
                    szállítással, akciókezeléssel és többnyelvűséggel.
                    <br />
                    Az ár függ a termékek számától, integrációktól, design
                    típustól, automatizációtól és karbantartástól, stb.
                  </p>

                  <p className="text-gray-300 mt-4">
                    <span className="font-bold text-[#FF007A] underline">
                      Az ár NEM tartalmazza:
                    </span>
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                    <li>Domain név (kb. 3.000 Ft/év)</li>
                    <li>Tárhely (kb. 10.000 Ft/év)</li>
                    <li>
                      Prémium sablonok és bővítmények (20.000–50.000 Ft
                      egyszeri vagy éves díj)
                    </li>
                    <li>
                      Egyedi funkciók (pl. időpontfoglaló, automatikus
                      számlázás)
                    </li>
                  </ul>

                  <p className="text-gray-300 mt-4">
                    Fix alapár, extra igények óradíj szerint (10.000 Ft/óra).
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
                  200.000 Ft-tól
                </span>
              </div>
            </li>

            {/* Egyedi fejlesztés */}
            <li className={cardBase}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
                    Egyedileg fejlesztett weboldal
                  </h2>
                  <p className="text-gray-300">
                    Speciális funkciókkal, maximális rugalmassággal és
                    bővíthetőséggel.
                    <br />
                    Az ár függ a funkciók bonyolultságától, integrációktól, a
                    rendszer méretétől és a design egyediségétől.
                  </p>
                  <p className="text-gray-300 mt-4">
                    Projekttől függően fix ár vagy óradíjas (10.000 Ft/óra)
                    elszámolás.
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
                  Fix ár / 10.000 Ft/óra
                </span>
              </div>
            </li>

            {/* Marketing */}
            <li className={cardBase}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
                    Marketing
                  </h2>
                  <p className="text-gray-300">
                    Google Ads, Facebook és Instagram kampányok, SEO és
                    tartalomkészítés a bevételeid növeléséhez.
                  </p>
                  <p className="text-gray-300 mt-4">
                    Az ár a kampányok számától, típusától, bonyolultságától,
                    stb.
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
                  30.000 Ft-tól/hó + hirdetési költség
                </span>
              </div>
            </li>
          </ul>

          {/* Záró megjegyzés */}
          <p className="mt-12 text-center text-gray-400">
            Pontos árajánlatért írj az{' '}
            <span className="text-[#FF007A] font-semibold">
              info@progzone.de
            </span>{' '}
            címre.
          </p>
        </div>
      </section>
    </Layout>
  );
}