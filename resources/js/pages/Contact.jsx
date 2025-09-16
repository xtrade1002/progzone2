import React from "react";
import MainMenu from "../Components/MainMenu";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <MainMenu />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">
          Kapcsolat
        </h1>
        <p className="text-lg text-gray-300">
          Vedd fel velem a kapcsolatot, és beszéljük át, hogyan tudok segíteni a
          következő projektedben. Írj e-mailt vagy keress meg a közösségi
          platformjaimon!
        </p>
        <div className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">E-mail:</span>
            {" "}
            hello@portfolio.hu
          </p>
          <p className="mt-2 text-sm text-gray-300">
            <span className="font-semibold text-white">Telefon:</span>
            {" "}
            +36 30 123 4567
          </p>
        </div>
      </main>
    </div>
  );
}
