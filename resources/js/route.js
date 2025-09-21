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
};

export default function route(name) {
  if (!routes[name]) {
    console.warn(`Route "${name}" is not defined.`);
    return '#';
  }

  return routes[name];
}

export function availableRoutes() {
  return { ...routes };
}
