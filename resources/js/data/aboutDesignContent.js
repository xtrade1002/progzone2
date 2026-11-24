const content = {
  hu: {
    eyebrow: 'RÓLAM', headline: ['Az ötleted.', 'A közös', 'projektünk.'], greeting: 'Örülök, hogy itt vagy!',
    intro: ['Weboldalkészítéssel, webdesignnal, fejlesztéssel és online marketinggel foglalkozom – nálam ezek egy helyen, összehangoltan valósulnak meg.', 'A célom, hogy modern, egyedi és reszponzív megoldásokkal segítsem az online jelenlétedet, az elképzeléseidtől a megvalósításig.'],
    cta: 'Beszéljünk a projektedről', expertise: 'Tudás, ami összeér.',
    tabs: ['Design', 'Fejlesztés', 'Marketing'], tabLabel: 'Szakmai területek',
    panelHeadings: ['Megjelenés, ami hozzád illik.', 'Ötletből működő felület.', 'Találj utat a célcsoportodhoz.'],
    hint: 'Válassz területet a további részletekhez.', portraitAlt: 'A Progzone készítőjének portréja',
  },
  en: {
    eyebrow: 'ABOUT ME', headline: ['Your idea.', 'Our shared', 'project.'], greeting: 'It’s great to have you here!',
    intro: ['I work on websites, web design, development and online marketing, bringing them together in one coordinated project.', 'My goal is to support your online presence with modern, tailored and responsive solutions, from your first idea through to implementation.'],
    cta: 'Let’s talk about your project', expertise: 'Skills that work together.',
    tabs: ['Design', 'Development', 'Marketing'], tabLabel: 'Areas of expertise',
    panelHeadings: ['A look that fits your brand.', 'From idea to working interface.', 'Connect with your audience.'],
    hint: 'Choose an area to explore the details.', portraitAlt: 'Portrait of the person behind Progzone',
  },
  de: {
    eyebrow: 'ÜBER MICH', headline: ['Deine Idee.', 'Unser', 'Projekt.'], greeting: 'Schön, dass du hier bist!',
    intro: ['Ich beschäftige mich mit Websites, Webdesign, Entwicklung und Onlinemarketing – bei mir greifen diese Bereiche ineinander.', 'Mein Ziel sind moderne, individuelle und responsive Lösungen für deinen Onlineauftritt, von der ersten Idee bis zur Umsetzung.'],
    cta: 'Sprechen wir über dein Projekt', expertise: 'Wissen, das zusammenwirkt.',
    tabs: ['Design', 'Entwicklung', 'Marketing'], tabLabel: 'Fachgebiete',
    panelHeadings: ['Ein Auftritt, der zu dir passt.', 'Von der Idee zur Anwendung.', 'Erreiche deine Zielgruppe.'],
    hint: 'Wähle einen Bereich für weitere Details.', portraitAlt: 'Porträt der Person hinter Progzone',
  },
};

export default function aboutDesignContent(locale) {
  const copy = content[locale?.startsWith('de') ? 'de' : locale === 'hu' ? 'hu' : 'en'];
  if (locale !== 'de-CH') return copy;
  return Object.fromEntries(Object.entries(copy).map(([key, value]) => [key,
    Array.isArray(value) ? value.map(text => text.replaceAll('ß', 'ss')) : value.replaceAll('ß', 'ss'),
  ]));
}
