
import React from 'react';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';

export const footerLinks = [
  { name: 'privacy', labelKey: 'footer.privacy', fallback: 'Privacy Policy' },
  { name: 'terms', labelKey: 'footer.terms', fallback: 'Terms' },
  { name: 'impressum', labelKey: 'footer.impressum', fallback: 'Impressum' },
];

export default function FooterMenu() {
  const { locale, t } = useTranslations();
  const year = new Date().getFullYear();
  const copyright = t('footer.copyright', `© ${year} Progzone. All rights reserved.`).replace(':year', year);
  const footerMenuTitle = t('footer.menu_title', 'Footer Menu');

  return (
    <footer className="hidden border-t border-[#00eaff]/20 bg-[#050611]/80 py-6 text-sm text-slate-400 shadow-[0_-12px_36px_rgba(0,234,255,0.08)] backdrop-blur md:block">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <p className="mb-4 sm:mb-0">{copyright}</p>
        <div className="flex flex-col items-center space-y-2 sm:items-end">

          <div className="flex space-x-6">
            {footerLinks.map((link) => (
              <a key={link.name} href={route(link.name, locale)} className="transition hover:text-[#00eaff]">
                {t(link.labelKey, link.fallback)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

