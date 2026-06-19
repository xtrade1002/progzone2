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
    websites: { hu: 'weboldalak', de: 'websites', en: 'websites' },
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

export function availableRoutes() {
  return { ...routes };
}
