import React, { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';
import { createPortal } from 'react-dom';

// Unicode emoji verzió (minden böngészőben működik)
const locales = [
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export default function LanguageSwitcher() {
  const { locale, t } = useTranslations();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [direction, setDirection] = useState('down'); // 'down' vagy 'up'

  const current = locales.find((item) => item.code === locale) ?? locales[0];

  // Kattintás kívül → bezár
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !document.getElementById('lang-dropdown')?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Pozíció kiszámítása
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // dinamikus magasság a locale lista alapján (kb. 48px soronként)
      const dropdownHeight = locales.length * 48;

      if (rect.bottom + dropdownHeight < viewportHeight) {
        // van hely lefelé
        setDirection('down');
        setPosition({ top: rect.bottom + 8, left: rect.left });
      } else {
        // nincs hely → felfelé nyíljon
        setDirection('up');
        setPosition({ top: rect.top - dropdownHeight - 8, left: rect.left });
      }
    }
  }, [open]);

  const handleSelect = (code) => {
    setOpen(false);
    if (code === locale) return;

    router.post(
      route('locale.update'),
      { locale: code },
      { preserveScroll: true, preserveState: false }
    );
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="flex items-center gap-2 rounded-full border border-transparent bg-[#1b1b2f] px-3 py-1 text-lg shadow hover:border-[#FF007A] focus:outline-none focus:ring-2 focus:ring-[#FF007A]"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span aria-hidden="true" className="text-xl">{current.flag}</span>
        <span className="sr-only">
          {t('common.language_switcher_label', 'Language')}
        </span>
      </button>

      {open &&
        createPortal(
          <ul
            id="lang-dropdown"
            className="fixed z-[9999] w-40 rounded-lg border border-[#FF007A]/40 bg-[#121317] shadow-lg py-1"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {locales.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-200 hover:bg-[#1f2030] ${
                    item.code === locale
                      ? 'bg-[#1f1f2a] font-semibold text-white'
                      : ''
                  }`}
                >
                  <span className="text-lg">{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
}
