const copy = {
  hu: {
    eyebrow: 'PROGZONE / TUDNIVALÓK', title: 'Érthetően a', accent: 'digitális világról.',
    intro: 'Amit érdemes tudnod, mielőtt belevágunk.', topics: 'Témakörök',
    featured: ['Domain és tárhely.', 'A marketing költségei.', 'Biztonság és bizalom.', 'Az ötlettől az átadásig.', 'Induljon a webshopod.', 'Weboldal vagy alkalmazás?', 'Jogi alapok, érthetően.'],
    diagramLabels: ['Egyeztetés · Tervezés · Megvalósítás', 'Termékek · Fizetés · Szállítás', 'Android · iOS · Kapcsolódó rendszerek', 'A működésedhez illő dokumentumok'],
    leads: ['Két külön dolog. Együtt teszik elérhetővé az oldalad.', 'A jó kampány mögött több van, mint egy hirdetés.', 'Védd a weboldalad és a látogatóid adatait.'],
    questions: ['WordPress vagy egyedi fejlesztés?', 'Mire jó a rendszeres karbantartás?', 'Miért kerül többe az egyedi fejlesztés?', 'Milyen költségekkel számolj hosszú távon?'],
    address: 'A címed', hosting: 'Tárhely', files: 'A weboldalad helye', domain: 'ceged.hu',
    campaign: 'Hirdetések', strategy: 'Tervezés és kezelés', growth: 'Tartalom és mérés',
    security: 'Biztonság', trust: 'Az ügyfeleid bizalma', cta: 'Van még kérdésed?', contact: 'Kapcsolat',
  },
  en: {
    eyebrow: 'PROGZONE / INSIGHTS', title: 'Making sense of', accent: 'the digital world.',
    intro: 'What you should know before we get started.', topics: 'Topics',
    featured: ['Domain and hosting.', 'Marketing costs.', 'Security and trust.', 'From idea to handover.', 'Launch your online shop.', 'Website or mobile app?', 'Legal basics, explained.'],
    diagramLabels: ['Discussion · Planning · Development', 'Products · Payments · Delivery', 'Android · iOS · Connected systems', 'Documents that reflect your business'],
    leads: ['Two different things. Together, they make your website accessible.', 'There is more to a good campaign than an advert.', 'Protect your website and your visitors’ data.'],
    questions: ['WordPress or custom development?', 'Why does regular maintenance matter?', 'Why does custom development cost more?', 'What are the long-term costs?'],
    address: 'Your address', hosting: 'Hosting', files: 'Your website’s home', domain: 'example.com',
    campaign: 'Advertising', strategy: 'Planning and management', growth: 'Content and measurement',
    security: 'Security', trust: 'Your customers’ trust', cta: 'Still have a question?', contact: 'Contact',
  },
  de: {
    eyebrow: 'PROGZONE / WISSENSWERTES', title: 'Die digitale Welt.', accent: 'Einfach erklärt.',
    intro: 'Was du wissen solltest, bevor wir starten.', topics: 'Themen',
    featured: ['Domain und Hosting.', 'Marketingkosten.', 'Sicherheit und Vertrauen.', 'Von der Idee zur Übergabe.', 'Dein Onlineshop startet.', 'Website oder mobile App?', 'Rechtliches, einfach erklärt.'],
    diagramLabels: ['Abstimmung · Planung · Umsetzung', 'Produkte · Zahlung · Versand', 'Android · iOS · Angebundene Systeme', 'Dokumente passend zu deinem Betrieb'],
    leads: ['Zwei verschiedene Dinge. Gemeinsam machen sie deine Website erreichbar.', 'Hinter einer guten Kampagne steckt mehr als eine Anzeige.', 'Schütze deine Website und die Daten deiner Besucher.'],
    questions: ['WordPress oder individuelle Entwicklung?', 'Warum ist regelmäßige Wartung wichtig?', 'Warum kostet individuelle Entwicklung mehr?', 'Welche laufenden Kosten entstehen?'],
    address: 'Deine Adresse', hosting: 'Hosting', files: 'Der Platz für deine Website', domain: 'beispiel.de',
    campaign: 'Werbung', strategy: 'Planung und Betreuung', growth: 'Inhalte und Analyse',
    security: 'Sicherheit', trust: 'Das Vertrauen deiner Kunden', cta: 'Noch eine Frage?', contact: 'Kontakt',
  },
};

export default function infosDesignContent(locale) {
  const selected = copy[locale?.startsWith('de') ? 'de' : locale === 'hu' ? 'hu' : 'en'];
  if (locale !== 'de-CH') return selected;
  return Object.fromEntries(Object.entries(selected).map(([key, value]) => [key,
    Array.isArray(value) ? value.map(text => text.replaceAll('ß', 'ss')) : value.replaceAll('ß', 'ss'),
  ]));
}
