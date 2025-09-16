import React from 'react';
import { usePage } from '@inertiajs/react';
import Footer from './FooterMenu.jsx';
import MainMenu from './MainMenu.jsx';

export default function Layout({ activePath, children }) {
  const { url } = usePage();
  const currentPath = activePath ?? url ?? '';

  return (
    <div className="min-h-screen text-[#FF007A] flex flex-col">
      <MainMenu activePath={currentPath} />
      <main className="flex-grow flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}
