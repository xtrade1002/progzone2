import React, { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';

const locales = [
  { code: 'hu', labels: { hu: 'Magyar', de: 'Ungarisch', en: 'Hungarian' }, flag: '/img/language/hungary.png' },
  { code: 'de', labels: { hu: 'Német', de: 'Deutsch', en: 'German' }, flag: '/img/language/flag.png' },
  { code: 'en', labels: { hu: 'Angol', de: 'Englisch', en: 'English' }, flag: '/img/language/usa.png' },
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
      { locale: code, current_path: window.location.pathname },
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
        className="flex items-center justify-center p-1 transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
      >
        <img
          src={current.flag}
          alt=""
          className="h-6 w-6 rounded-full object-cover"
          aria-hidden="true"
        />
        <span className="sr-only">{t('common.language_switcher_label', 'Language')}</span>
      </button>

      {open && (
        <ul className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-[#00eaff]/30 bg-[#080b18]/95 shadow-[0_0_24px_rgba(0,234,255,0.18)] backdrop-blur">
          {locales.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-200 hover:bg-[#00eaff]/10 hover:text-[#00eaff] ${
                  item.code === locale ? 'bg-[rgb(var(--pz-pink-rgb)/0.18)] font-semibold text-white' : ''
                }`}
              >
                <img
                  src={item.flag}
                  alt=""
                  className="h-5 w-5 rounded-full object-cover"
                  aria-hidden="true"
                />
                <span>{item.labels?.[locale] ?? item.labels?.hu ?? item.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
