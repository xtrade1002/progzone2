import React, { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';

const locales = [
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export default function LanguageSwitcher() {
  const { locale, t } = useTranslations();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current || containerRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const current = locales.find((item) => item.code === locale) ?? locales[0];

  const handleSelect = (code) => {
    setOpen(false);
    if (code === locale) {
      return;
    }

    router.post(
      route('locale.update'),
      { locale: code },
      {
        preserveScroll: true,
        preserveState: false,
      },
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-transparent bg-[#1b1b2f] px-3 py-1 text-lg shadow hover:border-[#FF007A] focus:outline-none focus:ring-2 focus:ring-[#FF007A]"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span aria-hidden="true" className="text-xl">
          {current.flag}
        </span>
        <span className="sr-only">{t('common.language_switcher_label', 'Language')}</span>
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-40 rounded-lg border border-[#FF007A]/40 bg-[#121317] shadow-lg">
          {locales.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-200 hover:bg-[#1f2030] ${
                  item.code === locale ? 'bg-[#1f1f2a] font-semibold text-white' : ''
                }`}
              >
                <span aria-hidden="true">{item.flag}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
