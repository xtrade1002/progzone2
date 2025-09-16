import React from "react";
import MainMenu from "../Components/MainMenu";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <MainMenu />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-bold text-[#FF007A]">Rólam</h1>
        <p className="text-lg text-gray-300">
          Szenvedélyes fejlesztő vagyok, aki a kreatív ötleteket modern, letisztult
          felhasználói élménnyé alakítja. Törekszem a folyamatos fejlődésre, hogy
          minden projektben a legfrissebb technológiákkal dolgozhassak.
        </p>
        <p className="text-lg text-gray-300">
          Ha érdekel a történetem, szívesen mesélek arról, hogyan jutottam el az
          első kódsoroktól a komplex webes alkalmazásokig.
        </p>
      </main>
    </div>
  );
}
