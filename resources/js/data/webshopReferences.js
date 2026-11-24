// Project IDs and screenshots remain stable when the shop names change.
const shops = [
  { id: 'lunelle', title: 'Lunelle', url: 'https://tesztweboldal.de/', image: '/images/references/lunelle-20261124.webp' },
];

export default function webshopReferences(locale) {
  const language = locale?.split(/[-_]/)[0];
  const text = {
    hu: { label: 'Webshop', description: 'WordPress és WooCommerce alapú webshop, egyedi megjelenéssel.', view: 'Megtekintés', tags: ['WordPress', 'WooCommerce', 'Webdesign'] },
    de: { label: 'Onlineshop', description: 'Onlineshop mit individuellem Design auf Basis von WordPress und WooCommerce.', view: 'Ansehen', tags: ['WordPress', 'WooCommerce', 'Webdesign'] },
    en: { label: 'Online store', description: 'A WordPress and WooCommerce online store with a custom visual design.', view: 'View', tags: ['WordPress', 'WooCommerce', 'Web design'] },
  }[language] ?? { label: 'Webshop', description: 'WordPress és WooCommerce alapú webshop, egyedi megjelenéssel.', view: 'Megtekintés', tags: ['WordPress', 'WooCommerce', 'Webdesign'] };
  return shops.map(shop => ({ ...shop, type: 'link', categoryKey: 'webshops', lightboxImage: shop.image, imageFit: 'contain', label: text.label, description: text.description, cta: text.view, tags: text.tags }));
}
