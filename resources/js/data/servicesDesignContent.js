const copy = {
  hu: {
    eyebrow: 'SZOLGÁLTATÁSOK', title: 'Digitális megoldások.', accent: 'A céljaidra szabva.',
    intro: 'Webes, mobilos és marketing megoldások egy helyen, a vállalkozásod igényeihez igazítva.',
    titles: ['WordPress weboldal', 'WooCommerce webshop', 'Egyedi webfejlesztés', 'Online marketing'],
    descriptions: [
      'Szerkeszthető, könnyen kezelhető üzleti weboldal WordPress alapon, amely egyszerűen frissíthető és bővíthető.',
      'Online értékesítéshez készülő webshop WooCommerce alapon, integrált fizetési és szállítási lehetőségekkel.',
      'Egyedi funkciók fejlesztése és meglévő üzleti rendszerekkel való összekapcsolás, a folyamataidhoz igazítva.',
      'Google Ads-, Facebook- és Instagram-kampányok beállítása és kezelése, valamint SEO és tartalomkészítés.',
    ],
    tags: ['Bemutatkozás · Tartalomkezelés', 'Termékek · Fizetés · Szállítás', 'Egyedi funkciók · Rendszerkapcsolatok', 'Kampánykezelés · SEO · Tartalom'],
    mobileTitle: 'Mobilalkalmazás', mobileDescription: 'Android- és iOS-alkalmazások, meglévő rendszerekkel összekapcsolva.',
    footer: 'Beszéljük át, mire van szükséged.', cta: 'Ajánlatot kérek',
  },
  en: {
    eyebrow: 'SERVICES', title: 'Digital solutions.', accent: 'Built around your goals.',
    intro: 'Websites, mobile apps and marketing in one place, tailored to your business.',
    titles: ['WordPress website', 'WooCommerce online shop', 'Custom web development', 'Online marketing'],
    descriptions: [
      'An editable, easy-to-manage business website built on WordPress, ready to update and expand.',
      'An online shop built on WooCommerce, with integrated payment and shipping options.',
      'Custom features and connections to existing business systems, designed around your workflows.',
      'Setup and management of Google Ads, Facebook and Instagram campaigns, plus SEO and content creation.',
    ],
    tags: ['Business presentation · Content management', 'Products · Payments · Shipping', 'Custom features · Integrations', 'Campaign management · SEO · Content'],
    mobileTitle: 'Mobile application', mobileDescription: 'Android and iOS applications connected to your existing systems.',
    footer: 'Let’s talk about what you need.', cta: 'Request a quote',
  },
  de: {
    eyebrow: 'LEISTUNGEN', title: 'Digitale Lösungen.', accent: 'Auf deine Ziele abgestimmt.',
    intro: 'Websites, mobile Apps und Marketing aus einer Hand, passend zu deinem Unternehmen.',
    titles: ['WordPress-Website', 'WooCommerce-Onlineshop', 'Individuelle Webentwicklung', 'Onlinemarketing'],
    descriptions: [
      'Eine bearbeitbare, einfach zu verwaltende Unternehmenswebsite auf WordPress-Basis, die sich aktualisieren und erweitern lässt.',
      'Ein Onlineshop auf WooCommerce-Basis mit integrierten Zahlungs- und Versandmöglichkeiten.',
      'Individuelle Funktionen und Anbindungen an bestehende Geschäftssysteme, abgestimmt auf deine Abläufe.',
      'Einrichtung und Betreuung von Google-Ads-, Facebook- und Instagram-Kampagnen sowie SEO und Inhaltserstellung.',
    ],
    tags: ['Unternehmensauftritt · Inhaltsverwaltung', 'Produkte · Zahlung · Versand', 'Individuelle Funktionen · Schnittstellen', 'Kampagnenbetreuung · SEO · Inhalte'],
    mobileTitle: 'Mobile Anwendung', mobileDescription: 'Android- und iOS-Anwendungen, verbunden mit bestehenden Systemen.',
    footer: 'Besprechen wir, was du brauchst.', cta: 'Angebot anfragen',
  },
};

export default function servicesDesignContent(locale) {
  const selected = copy[locale?.startsWith('de') ? 'de' : locale === 'hu' ? 'hu' : 'en'];
  if (locale !== 'de-CH') return selected;
  return Object.fromEntries(Object.entries(selected).map(([key, value]) => [key,
    Array.isArray(value) ? value.map(text => text.replaceAll('ß', 'ss')) : value.replaceAll('ß', 'ss'),
  ]));
}
