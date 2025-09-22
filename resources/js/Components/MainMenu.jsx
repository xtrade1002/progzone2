import React from 'react';
import route from '../route.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import useTranslations from '../lib/useTranslations.js';

const menuItems = [
  { name: 'home', labelKey: 'menu.home', fallback: 'Home' },
  { name: 'aboutme', labelKey: 'menu.about', fallback: 'About' },
  { name: 'services', labelKey: 'menu.services', fallback: 'Services' },
  { name: 'prices', labelKey: 'menu.prices', fallback: 'Prices' },
  { name: 'references', labelKey: 'menu.references', fallback: 'References' },
  { name: 'infos', labelKey: 'menu.infos', fallback: 'Infos' },
  { name: 'quote', labelKey: 'menu.quote', fallback: 'Quote' },
  { name: 'contact', labelKey: 'menu.contact', fallback: 'Contact' },
];

export default function MainMenu({ activePath }) {
  const { t } = useTranslations();

  return (
    <header className="bg-gradient-to-br from-[#0a0a0f] via-[#141422] to-[#0a0a0f] text-gray-400 py-4">
      <nav>
        <ul className="flex items-center justify-center space-x-6 text-lg font-semibold text-[#FF007A]">
          {menuItems.map((item) => {
            const href = route(item.name);
            const isActive = activePath === href;
            const baseClasses = 'hover:underline transition-colors';
            const activeClasses = isActive
              ? 'text-white underline decoration-[#FF007A] decoration-2 underline-offset-4'
              : '';

            return (
              <li key={item.name}>
                <a href={href} className={`${baseClasses} ${activeClasses}`.trim()}>
                  {t(item.labelKey, item.fallback)}
                </a>
              </li>
            );
          })}
          <li className="pl-2">
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>

      {/* Neon kék vonal közvetlenül a menü alatt */}
      <div className="w-full h-[1px] bg-[#00f7ff] shadow-[0_0_15px_#00f7ff] mt-4 mb-2"/>
    </header>
  );
}
