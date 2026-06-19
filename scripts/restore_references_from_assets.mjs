import fs from 'node:fs';

const files = {
  hu: 'resources/lang/hu.json',
  de: 'resources/lang/de.json',
  en: 'resources/lang/en.json',
};

const text = {
  hu: {
    meta_title: 'Referenciák',
    title: 'Referenciák',
    subtitle: 'Válogatás a kedvenc projektjeimből',
    lightbox_alt: 'Előnézet',
    cta: 'Megnézem a weboldalt',
    websiteLabel: 'Weboldal',
    websiteDesc: 'Webdesign és weboldal-fejlesztési referencia.',
    tags: ['Weboldal', 'Webdesign', 'Fejlesztés'],
    secretDesc: 'Prémium hirdetési platform Laravel és Inertia alapon.',
    secretTags: ['Laravel', 'Inertia', 'Hirdetések'],
    flyer: 'Flyer',
    card: 'Névjegykártya',
    mockup: 'Mockup',
    other: 'Egyéb grafika',
  },
  de: {
    meta_title: 'Referenzen',
    title: 'Referenzen',
    subtitle: 'Eine Auswahl meiner Lieblingsprojekte',
    lightbox_alt: 'Vorschau',
    cta: 'Website ansehen',
    websiteLabel: 'Website',
    websiteDesc: 'Referenz für Webdesign und Entwicklung.',
    tags: ['Website', 'Webdesign', 'Entwicklung'],
    secretDesc: 'Premium-Anzeigenplattform mit Laravel und Inertia umgesetzt.',
    secretTags: ['Laravel', 'Inertia', 'Anzeigen'],
    flyer: 'Flyer',
    card: 'Visitenkarte',
    mockup: 'Mockup',
    other: 'Weitere Grafik',
  },
  en: {
    meta_title: 'References',
    title: 'References',
    subtitle: 'A selection of my favourite projects',
    lightbox_alt: 'Preview',
    cta: 'View website',
    websiteLabel: 'Website',
    websiteDesc: 'Website design and development reference.',
    tags: ['Website', 'Web design', 'Development'],
    secretDesc: 'Premium listing platform built with Laravel and Inertia.',
    secretTags: ['Laravel', 'Inertia', 'Listings'],
    flyer: 'Flyer',
    card: 'Business card',
    mockup: 'Mockup',
    other: 'Other graphic',
  },
};

const websiteProjects = (locale) => {
  const t = text[locale];
  const website = (title, image, url) => ({
    type: 'link',
    url,
    image,
    lightboxImage: image,
    title,
    cta: t.cta,
    categoryKey: 'websites',
    label: t.websiteLabel,
    category: t.websiteLabel,
    description: t.websiteDesc,
    tags: t.tags,
    imageFit: 'contain',
  });

  return [
    {
      type: 'link',
      url: 'https://secretlounge.ch',
      image: '/img/websites/secretlounge.ch.png',
      lightboxImage: '/img/websites/secretlounge.ch.png',
      title: 'SecretLounge.ch',
      cta: t.cta,
      domainOverrides: {
        'progzone.hu': {
          url: 'https://secretlounge.hu/hu',
          image: '/img/secretlounge-hu-preview.png',
          lightboxImage: '/img/secretlounge-hu-preview.png',
          title: 'SecretLounge.hu',
        },
      },
      categoryKey: 'websites',
      label: t.websiteLabel,
      category: t.websiteLabel,
      description: t.secretDesc,
      tags: t.secretTags,
      imageFit: 'contain',
    },
    website('Hunportal', '/img/websites/hunportal-preview.png', 'https://hunportal.hu'),
    website(locale === 'de' ? 'Kertmeister' : 'Kertmester', '/img/websites/kertmester.png', 'https://www.kertmester.eu'),
    website('Fixappoint', '/img/websites/screenshot-2025-11-28-101112.png', 'https://fixappoint.hu'),
    website('Glamlash', '/img/websites/glamlash.png', 'https://www.glamlash.hu'),
    website('Versenybikini', '/img/websites/versenybikini.png', 'https://www.versenybikini.hu'),
    website('Oha Yachting', '/img/websites/ohayachting.webp', 'https://ohayachting.com'),
  ];
};

const flyerNames = {
  hu: {
    auto: 'Autómosó flyer',
    barber: 'Barber flyer',
    burger: 'Burger flyer',
    coffee: 'Kávézó flyer',
    disco: 'Disco flyer',
    fitness: 'Fitness flyer',
    ingatlan: 'Ingatlan flyer',
    joga: 'Jóga flyer',
    kutyakozmetika: 'Kutyakozmetika flyer',
    massage: 'Masszázs flyer',
    pekseg: 'Pékség flyer',
    pizza: 'Pizza flyer',
    teahaz: 'Teaház flyer',
  },
  de: {
    'autowäsche': 'Autowäsche Flyer',
    barber: 'Barber Flyer',
    burger: 'Burger Flyer',
    disco: 'Disco Flyer',
    immobilien: 'Immobilien Flyer',
    kaffee: 'Kaffee Flyer',
    pizza: 'Pizza Flyer',
    yoga: 'Yoga Flyer',
  },
  en: {
    auto: 'Car wash flyer',
    barber: 'Barber flyer',
    burger: 'Burger flyer',
    coffee: 'Coffee flyer',
    disco: 'Disco flyer',
    fitness: 'Fitness flyer',
    ingatlan: 'Real estate flyer',
    joga: 'Yoga flyer',
    kutyakozmetika: 'Dog grooming flyer',
    massage: 'Massage flyer',
    pekseg: 'Bakery flyer',
    pizza: 'Pizza flyer',
    teahaz: 'Tea house flyer',
  },
};

const flyerDir = (locale) => (locale === 'de' ? 'flyer_de' : 'flyer_hu');

const imageProject = (categoryKey, title, image, label, extra = {}) => ({
  type: 'image',
  image,
  lightboxImage: image,
  title,
  label,
  category: label,
  categoryKey,
  imageFit: 'contain',
  ...extra,
});

const flyerProjects = (locale) => Object.entries(flyerNames[locale]).map(([name, title]) => (
  imageProject('flyers', title, `/img/flyer/${flyerDir(locale)}/${name}.png`, text[locale].flyer)
));

const businessCardProjects = (locale) => [
  ['Fixappoint névjegykártya', 'Fixappoint Visitenkarte', 'Fixappoint business card', 'visitenkarte_fixappoint.png'],
  ['Glamazon névjegykártya', 'Glamazon Visitenkarte', 'Glamazon business card', 'visitenkarte_glamazon.png'],
  ['Kertmester névjegykártya', 'Kertmeister Visitenkarte', 'Kertmester business card', 'visitenkarte_kertmester.png'],
].map(([hu, de, en, file]) => imageProject(
  'businessCards',
  ({ hu, de, en })[locale],
  `/img/névjegykártya/${file}`,
  text[locale].card,
));

const mockupProjects = (locale) => [
  ['Fixappoint mockup', 'Fixappoint Mockup', 'Fixappoint mockup', 'mockup_fixappoint.png'],
  ['Glamazon mockup', 'Glamazon Mockup', 'Glamazon mockup', 'mockup_glamazon.png'],
  ['Glamlash mockup', 'Glamlash Mockup', 'Glamlash mockup', 'mockup_glamlash.png'],
  ['Hunportal mockup', 'Hunportal Mockup', 'Hunportal mockup', 'mockup_hunportal.png'],
  ['Kertmester mockup', 'Kertmeister Mockup', 'Kertmester mockup', 'mockup_kertmester.png'],
  ['Oha Yachting mockup', 'Oha Yachting Mockup', 'Oha Yachting mockup', 'mockup_oha.png'],
  ['Ügyvéd mockup', 'Anwalt Mockup', 'Lawyer mockup', 'mockup_ugyved.png'],
].map(([hu, de, en, file]) => imageProject(
  'mockups',
  ({ hu, de, en })[locale],
  `/img/mockup/${file}`,
  text[locale].mockup,
));

const otherProjects = (locale) => [
  ['Ajándékkártya', 'Geschenkkarte', 'Gift card', 'ajandekkartya.png'],
  ['Ajándékkártya design', 'Geschenkkarten-Design', 'Gift card design', 'ajandekkartya-2.png'],
  ['Belépőjegy', 'Eintrittskarte', 'Admission ticket', 'belepojegy.png'],
  ['Bérlet', 'Passkarte', 'Pass card', 'berlet.png'],
  ['Hűségkártya', 'Treuekarte', 'Loyalty card', 'husegkartya.png'],
  ['Kupon', 'Gutschein', 'Coupon', 'kupon.png'],
  ['Utalvány', 'Wertgutschein', 'Voucher', 'utalvany.png'],
].map(([hu, de, en, file]) => imageProject(
  'otherDesigns',
  ({ hu, de, en })[locale],
  `/img/egyeb/hu/${file}`,
  text[locale].other,
));

function referencesFor(locale) {
  return {
    meta_title: text[locale].meta_title,
    title: text[locale].title,
    subtitle: text[locale].subtitle,
    lightbox_alt: text[locale].lightbox_alt,
    projects: [
      ...websiteProjects(locale),
      ...flyerProjects(locale),
      ...businessCardProjects(locale),
      ...mockupProjects(locale),
      ...otherProjects(locale),
    ],
  };
}

for (const [locale, file] of Object.entries(files)) {
  const source = fs.readFileSync(file, 'utf8');
  const start = source.indexOf('  "references": {');
  const end = source.indexOf(',\n  "impressum": {', start);

  if (start === -1 || end === -1) {
    throw new Error(`Could not locate references block in ${file}`);
  }

  const block = JSON.stringify({ references: referencesFor(locale) }, null, 2)
    .replace(/^{\n/, '')
    .replace(/\n}$/, '');

  fs.writeFileSync(file, `${source.slice(0, start)}${block}${source.slice(end)}\n`);
}
