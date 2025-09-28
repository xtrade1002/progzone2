import React from 'react';
import route from '../route.js';
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
  const footerMenuTitle = t('footer.menu_title', 'Footer Menu');

  return (
    <footer className="hidden bg-gray-900 text-gray-400 text-sm md:block py-6 mt-12">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <p className="mb-4 sm:mb-0">{copyright}</p>
        <div className="flex flex-col items-center space-y-2 sm:items-end">
          <p className="text-lg font-semibold uppercase tracking-widest text-pink-400">
            {footerMenuTitle}
          </p>
          <div className="flex space-x-6">
            {footerLinks.map((link) => (
              <a key={link.name} href={route(link.name)} className="hover:text-pink-400">
                {t(link.labelKey, link.fallback)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
