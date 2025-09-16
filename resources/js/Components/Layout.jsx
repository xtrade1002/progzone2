import React from 'react';
import Footer from './FooterMenu.jsx';
import MainMenu from './MainMenu.jsx';

export default function Layout({ activePath, children }) {
  return (
    <div className="min-h-screen text-[#FF007A] flex flex-col">
      <MainMenu activePath={activePath} />
      <main className="flex-grow flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}
