import React from 'react';
import { usePage } from '@inertiajs/react';
import Footer from './FooterMenu.jsx';
import MainMenu from './MainMenu.jsx';

export default function Layout({ activePath, children }) {
  const { url, props } = usePage();
  const currentPath = activePath ?? url ?? '';
  const successMessage = props?.flash?.success;

  return (
    <div className="pz-page min-h-screen flex flex-col text-white">
      <MainMenu activePath={currentPath} />

      {successMessage && (
        <div className="mx-auto mt-6 w-full max-w-4xl px-6">
          <div
            className="rounded-lg border border-green-400/30 bg-green-500/10 px-6 py-4 text-center text-sm font-medium text-green-200 shadow-[0_0_25px_rgba(34,197,94,0.45)]"
            role="status"
            aria-live="polite"
          >
            {successMessage}
          </div>
        </div>
      )}

      <main className="relative z-10 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
