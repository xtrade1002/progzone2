const copy = {
  hu: {
    eyebrow: 'SZOLGÁLTATÁSOK / ÁRAK', title: 'Átlátható árak.', accent: 'Hozzád illő megoldások.',
    intro: 'Kiinduló árak a weboldaltól a marketingig. A részleteket a céljaidhoz igazítjuk.',
    names: ['WordPress weboldal', 'WooCommerce webshop', 'Egyedi fejlesztés', 'Mobilalkalmazás', 'Online marketing'],
    descriptions: ['Könnyen szerkeszthető weboldal a vállalkozásod bemutatásához.', 'Online értékesítés, fizetési és szállítási megoldásokkal.', 'Speciális funkciókhoz és összetettebb üzleti folyamatokhoz.', 'Android- és iOS-alkalmazások egyedi felülettel és funkciókkal.', 'Hirdetési kampányok beállítása és kezelése.'],
    units: ['Kiinduló ár', 'Kiinduló ár', 'Fejlesztési díj', 'Egyedi ajánlat', 'Kampánykezelés munkadíja'],
    marketingNote: 'A hirdetési keret ezen felül fizetendő.',
    marketingDetails: 'A feltüntetett havi összeg a kampányok beállításának és kezelésének munkadíja. A Google, Facebook vagy Instagram felé fizetendő hirdetési költséget nem tartalmazza: a hirdetési keret a kezelési díjon felül, külön költség. A szolgáltatás pontos tartalmát és a kampányok számát előre egyeztetjük.',
    details: 'Részletek és feltételek', extraTitle: 'Mivel számolj még?',
    extra: 'A domain, a tárhely és a prémium licencek külön tételek lehetnek. Marketingnél a hirdetési keret külön költség.',
    final: 'A végleges ajánlat a pontosított feladat alapján készül.', cta: 'Ajánlatot kérek',
    unavailable: 'Az árakról jelenleg egyedi egyeztetés alapján tudok tájékoztatást adni.',
  },
  en: {
    eyebrow: 'SERVICES / PRICING', title: 'Clear pricing.', accent: 'Solutions that fit you.',
    intro: 'Starting prices from websites to marketing. We work out the details around your goals.',
    names: ['WordPress website', 'WooCommerce online shop', 'Custom development', 'Mobile application', 'Online marketing'],
    descriptions: ['An editable website to introduce your business.', 'Online sales with payment and shipping options.', 'Specialised features and more complex business workflows.', 'Android and iOS applications with custom interfaces and features.', 'Advertising campaign setup and management.'],
    units: ['Starting price', 'Starting price', 'Development fee', 'Custom quote', 'Campaign management fee'],
    marketingNote: 'Advertising spend is charged separately.',
    marketingDetails: 'The monthly amount covers the work of setting up and managing campaigns. It excludes advertising spend paid to Google, Facebook or Instagram: the advertising budget is an additional cost on top of the management fee. We agree the exact scope and number of campaigns beforehand.',
    details: 'Details and conditions', extraTitle: 'What else should you budget for?',
    extra: 'Domains, hosting and premium licences may be separate charges. Advertising spend is separate from marketing fees.',
    final: 'The final quote is based on the agreed scope.', cta: 'Request a quote',
    unavailable: 'Please get in touch for pricing tailored to your project.',
  },
  de: {
    eyebrow: 'LEISTUNGEN / PREISE', title: 'Transparente Preise.', accent: 'Lösungen, die zu dir passen.',
    intro: 'Einstiegspreise von Websites bis Marketing. Die Details stimmen wir auf deine Ziele ab.',
    names: ['WordPress-Website', 'WooCommerce-Onlineshop', 'Individuelle Entwicklung', 'Mobile Anwendung', 'Onlinemarketing'],
    descriptions: ['Eine bearbeitbare Website zur Vorstellung deines Unternehmens.', 'Onlineverkauf mit Zahlungs- und Versandmöglichkeiten.', 'Besondere Funktionen und komplexere Geschäftsabläufe.', 'Android- und iOS-Anwendungen mit individuellen Oberflächen und Funktionen.', 'Einrichtung und Betreuung von Werbekampagnen.'],
    units: ['Einstiegspreis', 'Einstiegspreis', 'Entwicklungspreis', 'Individuelles Angebot', 'Honorar für Kampagnenbetreuung'],
    marketingNote: 'Das Anzeigenbudget kommt zusätzlich hinzu.',
    marketingDetails: 'Der monatliche Betrag ist das Honorar für die Einrichtung und Betreuung der Kampagnen. Die Werbekosten bei Google, Facebook oder Instagram sind nicht enthalten: Das Anzeigenbudget fällt zusätzlich zum Betreuungshonorar an. Den genauen Umfang und die Anzahl der Kampagnen stimmen wir vorher ab.',
    details: 'Details und Konditionen', extraTitle: 'Welche weiteren Kosten gibt es?',
    extra: 'Domain, Hosting und Premium-Lizenzen können separat berechnet werden. Das Anzeigenbudget ist nicht im Marketinghonorar enthalten.',
    final: 'Das endgültige Angebot richtet sich nach dem abgestimmten Umfang.', cta: 'Angebot anfragen',
    unavailable: 'Für die Preise deines Projekts kontaktiere mich bitte persönlich.',
  },
};

export default function pricesDesignContent(locale) {
  const selected = copy[locale?.startsWith('de') ? 'de' : locale === 'hu' ? 'hu' : 'en'];
  if (locale !== 'de-CH') return selected;
  return Object.fromEntries(Object.entries(selected).map(([key, value]) => [key,
    Array.isArray(value) ? value.map(text => text.replaceAll('ß', 'ss')) : value.replaceAll('ß', 'ss'),
  ]));
}
