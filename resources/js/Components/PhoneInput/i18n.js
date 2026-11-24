import { usePage } from '@inertiajs/react';

const messages = {
  'Telefon': { en: 'Phone', de: 'Telefon' },
  'Országhívó': { en: 'Calling code', de: 'Ländervorwahl' },
  'Nincs találat': { en: 'No results', de: 'Keine Ergebnisse' },
  'Válassz…': { en: 'Choose…', de: 'Auswählen…' },
  'Keresés…': { en: 'Search…', de: 'Suchen…' },
};

let locale = 'hu';

export function useSiteLocale() {
  const { props } = usePage();
  locale = (props.locale ?? 'hu').split('-')[0];
  return locale;
}

export const translateSiteText = (value) => (
  typeof value === 'string' ? messages[value]?.[locale] ?? value : value
);
