import React from "react";
import MainMenu from "../Components/MainMenu";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <MainMenu />
      <main className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
        <h1 className="text-4xl font-bold text-[#FF007A]">Főoldal</h1>
        <p className="text-lg text-gray-300">
          Üdvözöllek a portfóliómon! Itt találod a szolgáltatásaimat, a korábbi
          munkáimat és minden fontos információt, ami segít eldönteni, hogy
          együtt dolgozzunk-e a következő projekteden.
        </p>
      </main>
    </div>
  );
}
