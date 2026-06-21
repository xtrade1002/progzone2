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
        className="flex items-center gap-2 rounded-full border border-transparent bg-[#1b1b2f] px-3 py-1 text-lg shadow hover:border-[#FF007A] focus:outline-none focus:ring-2 focus:ring-[#FF007A]"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span aria-hidden="true" className={`flag-icon ${current.flagClass}`} />
        <span className="sr-only">{t('common.language_switcher_label', 'Language')}</span>
      </button>

      {open && (
        <ul className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-[#FF007A]/40 bg-[#121317] shadow-lg">
          {locales.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-200 hover:bg-[#1f2030] ${
                  item.code === currentLocale ? 'bg-[#1f1f2a] font-semibold text-white' : ''
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
