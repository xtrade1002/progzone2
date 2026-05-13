import React, { useState } from 'react';
import route from '../route.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { footerLinks } from './FooterMenu.jsx';
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
  const { locale, t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-[#00eaff]/35 bg-[#050611]/92 text-gray-300 shadow-[0_0_28px_rgba(0,234,255,0.18)] backdrop-blur-xl">
      <nav className="relative mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <a href={route('home', locale)} className="group flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#00eaff]/55 bg-black/40 text-sm font-black italic text-[#00eaff] shadow-[0_0_18px_rgb(var(--pz-pink-rgb)/0.55)]">
            PZ
          </span>
          <span className="block truncate text-lg font-black tracking-wide sm:text-xl">
            <span className="text-[var(--pz-pink)]">PROG</span><span className="text-[#00eaff]">ZONE</span>
          </span>
        </a>

        <div className="hidden lg:block">
          <ul className="flex items-center justify-center gap-5 text-[0.95rem] font-bold text-[var(--pz-pink)] xl:gap-7">
            {menuItems.map((item) => {
              const href = route(item.name, locale);
              const isActive = activePath === href;
              const baseClasses = 'relative py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#00eaff] after:shadow-[0_0_12px_#00eaff] after:transition-transform hover:text-white hover:after:scale-x-100';
              const activeClasses = isActive
                ? 'text-white after:scale-x-100'
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-full border border-[rgb(var(--pz-pink-rgb)/0.45)] bg-black/30 p-2 text-[var(--pz-pink)] shadow-[0_0_14px_rgb(var(--pz-pink-rgb)/0.32)] transition hover:text-[#00eaff] focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-main-menu"
          >
            {isMenuOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
          </button>
        </div>
      </nav>
    </header>

    {isMenuOpen && (
      <div
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 bg-black/45 backdrop-blur-md lg:hidden"
        onClick={closeMenu}
        aria-hidden="true"
      />
    )}

    {isMenuOpen && (
      <aside
        id="mobile-main-menu"
        className="fixed inset-x-0 bottom-0 top-[72px] z-50 flex flex-col overflow-hidden border-t border-[#00eaff]/30 bg-transparent lg:hidden"
      >
        <nav className="max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-[rgb(var(--pz-pink-rgb)/0.28)] bg-[#060815]/98 py-4 shadow-[0_18px_46px_rgba(0,0,0,0.58)]">
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => {
              const href = route(item.name, locale);
              const isActive = activePath === href;
              const baseClasses =
                'block rounded-xl border px-4 py-3 text-lg font-bold transition-colors duration-200';
              const activeClasses = isActive
                ? 'border-[#00eaff]/45 bg-[#00eaff]/10 text-[#00eaff] shadow-[0_0_16px_rgba(0,234,255,0.25)]'
                : 'border-transparent text-gray-200 hover:border-[rgb(var(--pz-pink-rgb)/0.4)] hover:bg-white/5 hover:text-[#00eaff]';

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
          <div className="mt-4 border-t border-[rgb(var(--pz-pink-rgb)/0.24)] pt-4">
            <ul className="space-y-1">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={route(link.name, locale)}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-2 text-base font-medium text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-[#00eaff]"
                  >
                    {t(link.labelKey, link.fallback)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    )}
    </>
  );
}
