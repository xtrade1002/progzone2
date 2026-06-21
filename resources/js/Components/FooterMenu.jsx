
import React from 'react';
import { usePage } from '@inertiajs/react';
import { localizedRoute } from '../route.js';
import useTranslations from '../lib/useTranslations.js';

export const footerLinks = [
  { name: 'privacy', labelKey: 'footer.privacy', fallback: 'Privacy Policy' },
  { name: 'terms', labelKey: 'footer.terms', fallback: 'Terms' },
  { name: 'impressum', labelKey: 'footer.impressum', fallback: 'Impressum' },
];

export default function FooterMenu() {
  const { props } = usePage();
  const { locale, t } = useTranslations();
  const localizedRoutes = props?.localizedRoutes;
  const year = new Date().getFullYear();
  const copyright = t('footer.copyright', `© ${year} Progzone. All rights reserved.`).replace(':year', year);

  return (
    <footer className="mt-12 border-t border-[#00eaff]/18 bg-[#02040c]/92 text-sm text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/img/pz.png" alt="Progzone" className="h-11 w-11 rounded-full shadow-[0_0_18px_rgb(var(--pz-pink-rgb)/0.6)]" />
            <span className="text-xl font-black text-white">PROGZONE</span>
          </div>
        </div>

        <div>
          <div className="grid gap-3">
            {footerLinks.map((link) => (
              <a key={link.name} href={localizedRoute(link.name, locale, localizedRoutes)} className="transition hover:text-[var(--pz-pink)]">
                {t(link.labelKey, link.fallback)}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden justify-end md:flex">
          <div className="relative h-28 w-28 rotate-45 border border-[#00eaff]/65 shadow-[0_0_22px_rgba(0,231,255,0.35)]">
            <div className="absolute inset-5 border border-[var(--pz-pink)] shadow-[0_0_22px_rgb(var(--pz-pink-rgb)/0.45)]" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-6 py-5 text-center text-xs text-slate-500">
        {copyright}
      </div>
    </footer>
  );
}

