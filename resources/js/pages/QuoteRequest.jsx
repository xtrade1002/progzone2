import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';

const inputClasses = [
  'w-full',
  'rounded-lg',
  'border border-gray-700',
  'bg-transparent',
  'p-3',
  'text-gray-200',
  'focus:border-[#FF007A]',
  'focus:ring-2',
  'focus:ring-[#FF007A]',
  'outline-none',
  'transition',
].join(' ');

export default function QuoteRequest() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <Head title="Árajánlat kérés" />
      <section className="w-full px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-800 bg-black/40 p-10 shadow-[0_0_45px_rgba(255,0,122,0.2)]">
          <header className="mb-12 text-center text-gray-300">
            <p className="text-sm uppercase tracking-[0.3em] text-[#FF007A]">Kérj személyre szabott ajánlatot</p>
            <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">Árajánlat kérés</h1>
            <p className="mt-6 text-base sm:text-lg text-gray-400">
              Mondd el, mire van szükséged, én pedig egy részletes és személyre szabott ajánlattal kereslek meg a lehető
              legrövidebb időn belül.
            </p>
            <p className="mt-3 text-xs text-gray-500">* A csillaggal jelölt mezők kitöltése kötelező.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8 text-gray-300">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm" htmlFor="name">
                Teljes név *
                <input id="name" type="text" placeholder="Írd be a neved" required className={inputClasses} />
              </label>
              <label className="flex flex-col gap-2 text-sm" htmlFor="email">
                E-mail cím *
                <input id="email" type="email" placeholder="Add meg az e-mail címed" required className={inputClasses} />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm" htmlFor="phone">
                Telefonszám
                <input id="phone" type="tel" placeholder="+36 20 123 4567" className={inputClasses} />
              </label>
              <label className="flex flex-col gap-2 text-sm" htmlFor="company">
                Cég / projekt neve
                <input id="company" type="text" placeholder="Cégnév vagy projekt" className={inputClasses} />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm" htmlFor="service">
                Kívánt szolgáltatás *
                <select id="service" required defaultValue="" className={`${inputClasses} bg-[#151522]`}>
                  <option value="" disabled>
                    Válassz szolgáltatást
                  </option>
                  <option value="weboldal">Weboldal készítés</option>
                  <option value="webshop">Webshop fejlesztés</option>
                  <option value="design">Webdesign / UI</option>
                  <option value="logo">Logó- vagy arculattervezés</option>
                  <option value="marketing">Online marketing</option>
                  <option value="egyedi">Egyedi fejlesztés</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm" htmlFor="budget">
                Tervezett költségkeret
                <select id="budget" defaultValue="" className={`${inputClasses} bg-[#151522]`}>
                  <option value="" disabled>
                    Válassz kategóriát
                  </option>
                  <option value="0-200">0 - 200 000 Ft</option>
                  <option value="200-500">200 000 - 500 000 Ft</option>
                  <option value="500-1000">500 000 - 1 000 000 Ft</option>
                  <option value="1000+">1 000 000 Ft felett</option>
                  <option value="bizonytalan">Még bizonytalan</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm" htmlFor="timeline">
              Tervezett határidő
              <input id="timeline" type="text" placeholder="Pl. 2024. június vége" className={inputClasses} />
            </label>

            <label className="flex flex-col gap-2 text-sm" htmlFor="message">
              Projekt rövid leírása *
              <textarea
                id="message"
                rows="6"
                required
                placeholder="Írd le, milyen megoldást szeretnél, milyen funkciókra van szükség és minden egyéb hasznos információt."
                className={`${inputClasses} min-h-[160px]`}
              ></textarea>
            </label>

            <label className="flex items-start gap-3 text-sm" htmlFor="privacy">
              <input id="privacy" type="checkbox" className="mt-1 h-4 w-4 accent-[#FF007A]" required />
              <span className="text-gray-400">Megismertem és elfogadom az adatkezelési tájékoztatót.</span>
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-[#FF007A] px-8 py-3 text-center font-semibold text-white shadow-[0_0_25px_#ff007a] transition hover:shadow-[0_0_40px_#ff007a]"
              >
                Elküldöm
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
