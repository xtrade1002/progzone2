const routes = {
  home: '/',
  aboutme: '/about-me',
  services: '/services',
  prices: '/prices',
  references: '/references',
  infos: '/infos',
  quote: '/quote',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  impressum: '/impressum',
  'quote-request.store': '/quote-request',
  'contact-message.store': '/contact-message',
  'locale.update': '/locale',
};

const fallbackLocalizedRoutes = {
  pages: {
    home: { hu: '/', de: '/', en: '/' },
    aboutme: { hu: '/rolam', de: '/ueber-mich', en: '/about-me' },
    services: { hu: '/szolgaltatasok', de: '/leistungen', en: '/services' },
    prices: { hu: '/arak', de: '/preise', en: '/prices' },
    references: { hu: '/referenciak', de: '/referenzen', en: '/references' },
    infos: { hu: '/infok', de: '/infos', en: '/infos' },
    quote: { hu: '/ajanlatkeres', de: '/angebot', en: '/quote' },
    contact: { hu: '/kapcsolat', de: '/kontakt', en: '/contact' },
    privacy: { hu: '/adatvedelem', de: '/datenschutz', en: '/privacy' },
    terms: { hu: '/aszf', de: '/agb', en: '/terms' },
    impressum: { hu: '/impresszum', de: '/impressum', en: '/impressum' },
  },
  referenceCategories: {
    websites: { hu: 'weboldalak', de: 'webseiten', en: 'websites' },
    flyers: { hu: 'flyerek', de: 'flyer', en: 'flyers' },
    businessCards: { hu: 'nevjegykartyak', de: 'visitenkarten', en: 'business-cards' },
    mockups: { hu: 'mockupok', de: 'mockups', en: 'mockups' },
    otherDesigns: { hu: 'egyeb-grafikak', de: 'weitere-designs', en: 'other-designs' },
  },
};

export default function route(name) {
  if (!routes[name]) {
    console.warn(`Route "${name}" is not defined.`);
    return '#';
  }

  return routes[name];
}

export function localizedRoute(name, locale = 'hu', localizedRoutes = null, params = {}) {
  const source = localizedRoutes ?? fallbackLocalizedRoutes;
  const normalizedLocale = ['hu', 'de', 'en'].includes(locale) ? locale : 'hu';
  const pagePath = source.pages?.[name]?.[normalizedLocale] ?? fallbackLocalizedRoutes.pages[name]?.[normalizedLocale];

  if (!pagePath) {
    return route(name);
  }

  if (name === 'references' && params.category && params.category !== 'all') {
    const slug = source.referenceCategories?.[params.category]?.[normalizedLocale]
      ?? fallbackLocalizedRoutes.referenceCategories[params.category]?.[normalizedLocale];

    return slug ? `${pagePath}/${slug}` : pagePath;
  }

  return pagePath;
}

export function localizedPathForPath(path, locale = 'hu', localizedRoutes = null) {
  const source = localizedRoutes ?? fallbackLocalizedRoutes;
  const normalizedLocale = ['hu', 'de', 'en'].includes(locale) ? locale : 'hu';
  const normalizedPath = `/${String(path ?? '/').split('?')[0].replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '') || '/';

  for (const [name, paths] of Object.entries(source.pages ?? {})) {
    for (const pagePath of Object.values(paths ?? {})) {
      const cleanPagePath = pagePath === '/' ? '/' : pagePath.replace(/\/$/, '');

      if (normalizedPath === cleanPagePath) {
        return localizedRoute(name, normalizedLocale, source);
      }

      if (name === 'references' && cleanPagePath !== '/' && normalizedPath.startsWith(`${cleanPagePath}/`)) {
        const slug = normalizedPath.slice(cleanPagePath.length + 1);
        const categoryEntry = Object.entries(source.referenceCategories ?? {})
          .find(([, slugs]) => Object.values(slugs ?? {}).includes(slug));

        if (categoryEntry) {
          return localizedRoute('references', normalizedLocale, source, { category: categoryEntry[0] });
        }
      }
    }
  }

  return localizedRoute('home', normalizedLocale, source);
}

export function localeForPath(path, localizedRoutes = null) {
  const source = localizedRoutes ?? fallbackLocalizedRoutes;
  const normalizedPath = `/${String(path ?? '/').split('?')[0].replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '') || '/';

  for (const [name, paths] of Object.entries(source.pages ?? {})) {
    for (const [locale, pagePath] of Object.entries(paths ?? {})) {
      const cleanPagePath = pagePath === '/' ? '/' : pagePath.replace(/\/$/, '');

      if (cleanPagePath !== '/' && normalizedPath === cleanPagePath) {
        return locale;
      }

      if (name === 'references' && cleanPagePath !== '/' && normalizedPath.startsWith(`${cleanPagePath}/`)) {
        const slug = normalizedPath.slice(cleanPagePath.length + 1);
        const isKnownCategory = Object.values(source.referenceCategories ?? {})
          .some((slugs) => Object.values(slugs ?? {}).includes(slug));

        if (isKnownCategory) {
          return locale;
        }
      }
    }
  }

  return null;
}

export function availableRoutes() {
  return { ...routes };
}
