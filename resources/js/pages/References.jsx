import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function References() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">Referenciák</h1>
        <p className="text-lg text-gray-300">
          Válogatás a kedvenc projektjeimből
        </p>
        <div className="grid gap-6 md:grid-cols-2">
        <a 
            href="https://www.glamlash.hu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group"
          >
            <article 
              className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
              style={{ backgroundImage: "url('/img/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* Sötét overlay a szöveg olvashatóságához */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition"></div>

              {/* Tartalom */}
              <div className="relative p-6">
                <h2 className="text-2xl font-semibold text-[#FF007A]">
                  Kozmetikai szolgáltatás
                </h2>
                <p className="mt-4 text-sm text-gray-300">
                  Komplett márkaarculat és reszponzív webes megjelenés kialakítása.
                </p>
                <span className="inline-block mt-6 px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
                  Megnézem a weboldalt
                </span>
              </div>
            </article>
          </a>
          
          <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
            <h2 className="text-2xl font-semibold text-[#FF007A]">Kertészeti weboldal</h2>
            <p className="mt-4 text-sm text-gray-300">
              Felhasználóbarát dashboard és integrációk fejlesztése startupoknak.
            </p>
          </article>
      
          <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
            <h2 className="text-2xl font-semibold text-[#FF007A]">Kertészeti weboldal</h2>
            <p className="mt-4 text-sm text-gray-300">
              Felhasználóbarát dashboard és integrációk fejlesztése startupoknak.
            </p>
          </article>
          <a 
            href="https://www.kertmester.eu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group"
          >
            <article 
              className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
              style={{ backgroundImage: "url('/img/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* Sötét overlay a szöveg olvashatóságához */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition"></div>

              {/* Tartalom */}
              <div className="relative p-6">
                <h2 className="text-2xl font-semibold text-[#FF007A]">
                  Kertészeti szolgáltatás
                </h2>
                <p className="mt-4 text-sm text-gray-300">
                  Komplett márkaarculat és reszponzív webes megjelenés kialakítása.
                </p>
                <span className="inline-block mt-6 px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
                  Megnézem a weboldalt
                </span>
              </div>
            </article>
          </a>
          <a 
            href="https://www.versenybikini.hu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group"
          >
            <article 
              className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
              style={{ backgroundImage: "url('/img/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* Sötét overlay a szöveg olvashatóságához */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition"></div>

              {/* Tartalom */}
              <div className="relative p-6">
                <h2 className="text-2xl font-semibold text-[#FF007A]">
                  Versenybikini készítés
                </h2>
                <p className="mt-4 text-sm text-gray-300">
                  Komplett márkaarculat és reszponzív webes megjelenés kialakítása.
                </p>
                <span className="inline-block mt-6 px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
                  Megnézem a weboldalt
                </span>
              </div>
            </article>
          </a>
          <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
            <h2 className="text-2xl font-semibold text-[#FF007A]">Kertészeti weboldal</h2>
            <p className="mt-4 text-sm text-gray-300">
              Felhasználóbarát dashboard és integrációk fejlesztése startupoknak.
            </p>
          </article>
          
        </div>
      </section>
    </Layout>
  );
}
