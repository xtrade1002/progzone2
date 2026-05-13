const pageRoutes = {
  home: { hu: '/', de: '/', en: '/' },
  aboutme: { hu: '/rolam', de: '/ueber-mich', en: '/about-me' },
  services: { hu: '/szolgaltatasok', de: '/leistungen', en: '/services' },
  prices: { hu: '/arak', de: '/preise', en: '/prices' },
  references: { hu: '/referenciak', de: '/referenzen', en: '/references' },
  infos: { hu: '/informaciok', de: '/infos', en: '/insights' },
  quote: { hu: '/arajanlat', de: '/angebot', en: '/quote' },
  contact: { hu: '/kapcsolat', de: '/kontakt', en: '/contact' },
  privacy: { hu: '/adatvedelem', de: '/datenschutz', en: '/privacy' },
  terms: { hu: '/aszf', de: '/agb', en: '/terms' },
  impressum: { hu: '/impresszum', de: '/impressum', en: '/imprint' },
};

const actionRoutes = {
  'quote-request.store': '/quote-request',
  'contact-message.store': '/contact-message',
  'locale.update': '/locale',
};

function normalizePath(path) {
  const pathname = path?.split('?')?.[0]?.split('#')?.[0] ?? '/';
  const trimmed = `/${pathname.replace(/^\/+|\/+$/g, '')}`;

  return trimmed === '//' ? '/' : trimmed;
}

export default function route(name, locale = 'hu') {
  if (pageRoutes[name]) {
    return pageRoutes[name][locale] ?? pageRoutes[name].hu ?? '/';
  }

  if (!actionRoutes[name]) {
    console.warn(`Route "${name}" is not defined.`);
    return '#';
  }

  return actionRoutes[name];
}

export function pageRouteNameFromPath(path) {
  const normalizedPath = normalizePath(path);

  return Object.entries(pageRoutes).find(([, paths]) => Object.values(paths).includes(normalizedPath))?.[0] ?? 'home';
}

export function localizedPathFor(path, locale) {
  return route(pageRouteNameFromPath(path), locale);
}

export function availableRoutes() {
  return {
    ...actionRoutes,
    ...Object.fromEntries(Object.entries(pageRoutes).map(([name, paths]) => [name, { ...paths }])),
  };
}
