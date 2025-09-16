import React from "react";
import MainMenu from "../Components/MainMenu";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <MainMenu />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">
          Szolgáltatások
        </h1>
        <ul className="space-y-4 text-lg text-gray-300 list-disc list-inside">
          <li>Reszponzív weboldalak tervezése és fejlesztése</li>
          <li>Webalkalmazások optimalizálása teljesítményre és SEO-ra</li>
          <li>UI/UX prototípusok készítése modern design eszközökkel</li>
          <li>Folyamatos karbantartás és támogatás hosszú távon</li>
        </ul>
      </main>
    </div>
  );
}
