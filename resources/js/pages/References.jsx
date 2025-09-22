import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout.jsx';

export default function References() {
  const [lightboxImage, setLightboxImage] = useState(null);

  // ESC gombbal is zárható legyen a lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">Referenciák</h1>
        <p className="text-lg text-gray-300">Válogatás a kedvenc projektjeimből</p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ✅ Glamlash projekt */}
          <a
            href="https://www.glamlash.hu"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <article
              className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
              style={{
                backgroundImage: "url('/img/bg_women.jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>

              {/* Tartalom külön boxban */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h2 className="text-xl font-semibold text-[#FF007A]">
                  Kozmetikai szolgáltatás
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                  Komplett márkaarculat és reszponzív webes megjelenés kialakítása.
                </p>
                <span className="inline-block mt-3 px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
                  Megnézem a weboldalt
                </span>
              </div>
            </article>
          </a>

          {/* ✅ Csak kép → Lightbox */}
          <button
            onClick={() => setLightboxImage('/img/4.webp')}
            className="block group w-full"
          >
            <article
              className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
              style={{
                backgroundImage: "url('/img/kertmester_logo.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h2 className="text-xl font-semibold text-[#FF007A]">
                  Logótervezés és arculat
                </h2>
              </div>
            </article>
          </button>

          {/* ✅ Másik linkes projekt */}
          <a
            href="https://www.kertmester.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <article
              className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
              style={{
                backgroundImage: "url('/img/kertmester_logo.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
              }}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h2 className="text-xl font-semibold text-[#FF007A]">
                  Kertészeti weboldal
                </h2>
              
                <span className="inline-block mt-3 px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
                  Megnézem a weboldalt
                </span>
              </div>
            </article>
          </a>


          {/* ✅ Másik linkes projekt */}
          <a
            href="https://www.versenybikini.hu"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <article
              className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
              style={{
                backgroundImage: "url('/img/background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
              }}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h2 className="text-xl font-semibold text-[#FF007A]">
                  Versenybikini készítés
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                  Komplett márkaarculat és reszponzív webes megjelenés kialakítása.
                </p>
                <span className="inline-block mt-3 px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
                  Megnézem a weboldalt
                </span>
              </div>
            </article>
          </a>

          {/* ✅ Sima szöveges referencia */}
          <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
            <h2 className="text-2xl font-semibold text-[#FF007A]">Kertészeti weboldal</h2>
            <p className="mt-4 text-sm text-gray-300">
              Felhasználóbarát dashboard és integrációk fejlesztése startupoknak.
            </p>
          </article>
        </div>

        {/* ✅ Lightbox modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <img
              src={lightboxImage}
              alt="Preview"
              className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
            />
          </div>
        )}
      </section>
    </Layout>
  );
}