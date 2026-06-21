import React, { useEffect, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import route, { localeForPath, localizedPathForPath } from '../route.js';
import useTranslations from '../lib/useTranslations.js';

const locales = [
  { code: 'hu', label: 'Magyar', flagClass: 'flag-icon--hu' },
  { code: 'de', label: 'Deutsch', flagClass: 'flag-icon--de' },
  { code: 'en', label: 'English', flagClass: 'flag-icon--us' },
];

export default function LanguageSwitcher() {
  const { locale, t } = useTranslations();
  const { props } = usePage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const localizedRoutes = props?.localizedRoutes;
  const pathLocale = typeof window !== 'undefined'
    ? localeForPath(window.location.pathname, localizedRoutes)
    : null;
  const currentLocale = pathLocale ?? locale;

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

  const current = locales.find((item) => item.code === currentLocale) ?? locales[0];

  const handleSelect = (code) => {
    setOpen(false);
    const currentPath = window.location.pathname;
    const targetPath = localizedPathForPath(currentPath, code, localizedRoutes);

    if (code === currentLocale) {
      if (targetPath !== currentPath) {
        window.location.href = targetPath;
      }
      return;
    }

    router.post(
      route('locale.update'),
      { locale: code, current_path: currentPath },
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
        className="flex items-center gap-2 rounded-full border border-[#00eaff]/20 bg-black/35 px-2.5 py-1.5 text-lg shadow-[0_0_16px_rgba(0,234,255,0.12)] transition hover:border-[#00eaff]/60 focus:outline-none focus:ring-2 focus:ring-[#00eaff]/60 sm:px-3"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span aria-hidden="true" className={`flag-icon ${current.flagClass}`} />
        <span className="sr-only">{t('common.language_switcher_label', 'Language')}</span>
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-[#00eaff]/25 bg-[#050611]/95 shadow-[0_18px_42px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          {locales.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-200 transition hover:bg-[#00eaff]/10 hover:text-white ${
                  item.code === currentLocale ? 'bg-[#00eaff]/12 font-semibold text-white' : ''
                }`}
              >
                <span aria-hidden="true" className={`flag-icon ${item.flagClass}`} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
