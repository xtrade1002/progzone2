import React, { useState } from 'react';
import route from '../route.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import useTranslations from '../lib/useTranslations.js';

const MenuIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="relative bg-gradient-to-br from-[#0a0a0f] via-[#141422] to-[#0a0a0f] text-gray-400 py-4">
      <nav className="relative">
        <div className="hidden md:block">
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
        </div>

        <div className="flex items-center justify-end px-4 md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-md p-2 text-[#FF007A] transition hover:text-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] focus:ring-offset-2 focus:ring-offset-[#141422]"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-main-menu"
          >
            <MenuIcon className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Neon kék vonal közvetlenül a menü alatt */}
      <div className="hidden w-full h-[1px] bg-[#00f7ff] shadow-[0_0_15px_#00f7ff] mt-4 mb-2 md:block" />

      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}

      <aside
        id="mobile-main-menu"
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-full flex-col bg-gradient-to-b from-[#141422] to-[#0a0a0f] shadow-[0_0_25px_rgba(0,247,255,0.3)] transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <span className="text-lg font-semibold text-white">{t('menu.title', 'Menu')}</span>
          <button
            type="button"
            onClick={closeMenu}
            className="rounded-md p-2 text-[#FF007A] transition hover:text-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] focus:ring-offset-2 focus:ring-offset-[#141422]"
            aria-label="Close navigation menu"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => {
              const href = route(item.name);
              const isActive = activePath === href;
              const baseClasses =
                'block rounded-lg px-4 py-3 text-lg font-semibold transition-colors duration-200';
              const activeClasses = isActive
                ? 'text-[#00f7ff] shadow-[0_0_12px_rgba(0,247,255,0.35)] bg-white/5'
                : 'text-gray-200 hover:text-[#00f7ff] hover:bg-white/5';

              return (
                <li key={item.name}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className={`${baseClasses} ${activeClasses}`.trim()}
                  >
                    {t(item.labelKey, item.fallback)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <LanguageSwitcher />
        </div>
      </aside>
    </header>
  );
}
