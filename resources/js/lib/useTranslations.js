import { usePage } from '@inertiajs/react';

function hasOwn(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function translate(translations, key, fallback = '') {
  if (!key) {
    return fallback;
  }

  const path = Array.isArray(key) ? key : key.split('.');
  let value = translations;

  for (const segment of path) {
    if (value && typeof value === 'object' && hasOwn(value, segment)) {
      value = value[segment];
    } else {
      return fallback;
    }
  }

  return value ?? fallback;
}

export default function useTranslations() {
  const { props } = usePage();
  const translations = props?.trans ?? {};
  const locale = props?.locale ?? 'hu';

  return {
    trans: translations,
    locale,
    t: (key, fallback = '') => translate(translations, key, fallback),
  };
}
