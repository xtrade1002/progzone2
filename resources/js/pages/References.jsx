import React from "react";
import MainMenu from "../Components/MainMenu";

export default function References() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <MainMenu />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">
          Referenciák
        </h1>
        <p className="text-lg text-gray-300">
          Válogatás a kedvenc projektjeimből, amelyek jól mutatják, hogyan dolgozom
          együtt ügyfeleimmel az ötlet megszületésétől a sikeres megvalósításig.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
            <h2 className="text-2xl font-semibold text-[#FF007A]">Digitális ügynökség</h2>
            <p className="mt-4 text-sm text-gray-300">
              Komplett márkaarculat és reszponzív webes megjelenés kialakítása.
            </p>
          </article>
          <article className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
            <h2 className="text-2xl font-semibold text-[#FF007A]">SaaS platform</h2>
            <p className="mt-4 text-sm text-gray-300">
              Felhasználóbarát dashboard és integrációk fejlesztése startupoknak.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
