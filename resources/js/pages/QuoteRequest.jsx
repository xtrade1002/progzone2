import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function QuoteRequest() {
  return (
    <Layout>
      <section className="w-full px-6 py-20">
        <div className="max-w-4xl mx-auto rounded-2xl p-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-[#FF007A] mb-10 drop-shadow-[0_0_20px_#ff007a]">
            Árajánlat kérés
          </h2>
          <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            Töltsd ki az alábbi űrlapot, és rövid időn belül személyre szabott árajánlattal kereslek
            meg. Minél több információt adsz meg, annál pontosabb ajánlatot tudok készíteni.
          </p>

          <form className="space-y-6 bg-black/20 border border-gray-700 rounded-xl p-8 shadow-[0_0_35px_rgba(255,0,122,0.2)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Név *"
                required
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
              />
              <input
                type="email"
                placeholder="E-mail cím *"
                required
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="tel"
                placeholder="Telefonszám"
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
              />
              <input
                type="text"
                placeholder="Cég / Projekt neve"
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Szolgáltatás típusa *"
                required
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
              />
              <input
                type="text"
                placeholder="Tervezett határidő"
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
              />
            </div>
            <textarea
              rows="5"
              placeholder="Projekt leírása *"
              required
              className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
            ></textarea>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-300 text-sm">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-[#FF007A] h-4 w-4" required />
                Elfogadom az adatkezelési tájékoztatót.
              </label>
              <span className="text-gray-400">
                * A csillaggal jelölt mezők kitöltése kötelező.
              </span>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-semibold bg-[#FF007A] text-white shadow-[0_0_25px_#ff007a] hover:shadow-[0_0_40px_#ff007a] transition"
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
