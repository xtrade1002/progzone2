
import React from 'react';
import useTranslations from '../lib/useTranslations.js';

export const footerLinks = [
  { name: 'privacy', labelKey: 'footer.privacy', fallback: 'Privacy Policy' },
  { name: 'terms', labelKey: 'footer.terms', fallback: 'Terms' },
  { name: 'impressum', labelKey: 'footer.impressum', fallback: 'Impressum' },
];

export default function FooterMenu() {
  const { t } = useTranslations();
  const year = new Date().getFullYear();
  const copyright = t('footer.copyright', `© ${year} Progzone. All rights reserved.`).replace(':year', year);

  return (
    <footer className="mt-4 border-t border-[#00eaff]/18 bg-[#02040c]/92 text-sm text-slate-300 sm:mt-6 lg:mt-12">
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-6 sm:gap-6 sm:py-8 md:grid-cols-[1fr_auto] lg:gap-10 lg:py-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/img/pz-mark-v1.webp" width="44" height="44" loading="lazy" alt="Progzone" className="h-11 w-11 rounded-full shadow-[0_0_18px_rgb(var(--pz-pink-rgb)/0.6)]" />
            <span className="text-xl font-black text-white">PROGZONE</span>
          </div>
        </div>

        <div className="hidden justify-end md:flex">
          <div className="relative h-28 w-28 rotate-45 border border-[#00eaff]/65 shadow-[0_0_22px_rgba(0,231,255,0.35)]">
            <div className="absolute inset-5 border border-[var(--pz-pink)] shadow-[0_0_22px_rgb(var(--pz-pink-rgb)/0.45)]" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-6 py-3 text-center text-xs text-slate-500 sm:py-5">
        {copyright}
      </div>
    </footer>
  );
}

