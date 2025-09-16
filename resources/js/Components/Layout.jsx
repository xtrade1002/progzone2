import React from 'react';
import FooterMenu from './FooterMenu.jsx';
import MainMenu from './MainMenu.jsx';

export default function Layout({ activePath, children }) {
  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col">
      <MainMenu activePath={activePath} />
      <main className="flex-1 w-full">{children}</main>
      <FooterMenu />
    </div>
  );
}
