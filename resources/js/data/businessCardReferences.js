const cards = [
  {
    "id": "fixappoint",
    "name": "Fixappoint"
  },
  {
    "id": "csaladallitok",
    "name": "Magyar Családállítók Egyesülete"
  },
  {
    "id": "hunportal",
    "name": "Hunportal"
  },
  {
    "id": "glamlash",
    "name": "Glamlash"
  },
  {
    "id": "oha",
    "name": "Oha Yachting"
  },
  {
    "id": "secretlounge",
    "name": "SecretLounge.hu"
  },
  {
    "id": "lunelle",
    "name": "Lunelle"
  },
  {
    "id": "ugyved",
    "name": "Kovács & Társai"
  },
  {
    "id": "glamazon",
    "name": "Glamazon"
  },
  {
    "id": "kertmester",
    "name": "Kertmester"
  }
];

function imageFields(id) {
  const base = '/images/business-cards/' + id + '-v2';
  return { image: base + '-960.webp', lightboxImage: base + '-1440.webp', previewSrcSet: [480, 960, 1440].map(width => base + '-' + width + '.webp ' + width + 'w').join(', '), imageFit: 'contain' };
}

export default function businessCardReferences(projects, locale) {
  const language = locale?.split(/[-_]/)[0];
  const suffix = { hu: 'névjegykártya', de: 'Visitenkarte', en: 'business card' }[language] ?? 'névjegykártya';
  const replacementIds = ['fixappoint', 'glamazon', 'kertmester'];
  const existing = projects.map(project => {
    const id = project.categoryKey === 'businessCards' && replacementIds.find(id => project.title?.toLowerCase().includes(id));
    return id ? { ...project, ...imageFields(id) } : project;
  });
  const additional = cards.filter(card => !replacementIds.includes(card.id)).map(card => ({
    id: 'business-card-' + card.id, categoryKey: 'businessCards', type: 'image', title: card.name + ' ' + suffix, ...imageFields(card.id),
  }));
  return [...existing, ...additional];
}

