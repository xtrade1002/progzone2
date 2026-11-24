import React, { useId } from 'react';
import '../../css/inquiry-design.css';

const content = {
  hu: {
    quote: { eyebrow: 'Van egy ötleted?', title: 'Adjunk neki', accent: 'digitális formát.', intro: 'Írd le, mit szeretnél. A technikai részletekben segítek.' },
    contact: { eyebrow: 'Kapcsolat', title: 'Kezdjük egy', accent: 'beszélgetéssel.', intro: 'Kérdésed van, vagy közösen dolgoznál valamin? Írj néhány sort.' },
    sections: ['Az elképzelés', 'A funkciók', 'A részletek', 'Az elérhetőségeid'],
    contactSections: ['Rólad', 'Az üzeneted'],
    contactNote: 'Írd le, miben segíthetek. A megadott e-mail-címeden válaszolok.',
    required: 'A csillaggal jelölt mezők kitöltése kötelező.',
    review: 'Kérlek, ellenőrizd a jelzett mezőket.',
    phone: 'Telefonszám (nem kötelező)',
  },
  en: {
    quote: { eyebrow: 'Have an idea?', title: 'Let’s bring it', accent: 'to life online.', intro: 'Tell me what you have in mind. I will help with the technical details.' },
    contact: { eyebrow: 'Contact', title: 'It starts with', accent: 'a conversation.', intro: 'Have a question or a project in mind? Send me a few lines.' },
    sections: ['Your idea', 'The features', 'The details', 'Your contact details'],
    contactSections: ['About you', 'Your message'],
    contactNote: 'Tell me how I can help. I will reply to the email address you provide.',
    required: 'Fields marked with * are required.', review: 'Please check the highlighted fields.', phone: 'Phone number (optional)',
  },
  de: {
    quote: { eyebrow: 'Du hast eine Idee?', title: 'Geben wir ihr', accent: 'eine digitale Form.', intro: 'Erzähl mir, was du vorhast. Bei den technischen Details helfe ich dir.' },
    contact: { eyebrow: 'Kontakt', title: 'Beginnen wir mit', accent: 'einem Gespräch.', intro: 'Du hast eine Frage oder ein Projekt im Kopf? Schreib mir ein paar Zeilen.' },
    sections: ['Deine Idee', 'Die Funktionen', 'Die Details', 'Deine Kontaktdaten'],
    contactSections: ['Über dich', 'Deine Nachricht'],
    contactNote: 'Erzähl mir, wie ich helfen kann. Ich antworte dir per E-Mail.',
    required: 'Mit * markierte Felder sind Pflichtfelder.', review: 'Bitte prüfe die markierten Felder.', phone: 'Telefonnummer (freiwillig)',
  },
};

export const inquiryContent = locale => content[locale?.startsWith('de') ? 'de' : locale === 'hu' ? 'hu' : 'en'];

function Ribbon() {
  const gradientId = `inquiry-ribbon-${useId().replaceAll(':', '')}`;
  return <svg className="inquiry-ribbon" viewBox="0 0 520 310" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id={gradientId} x1="65" y1="240" x2="460" y2="70" gradientUnits="userSpaceOnUse"><stop stopColor="#00f7ff" /><stop offset=".48" stopColor="#6591da" /><stop offset="1" stopColor="#ff007a" /></linearGradient></defs>
    {Array.from({ length: 25 }, (_, i) => <path key={i} d={`M 54 ${153 + i * 2.2} C ${100 + i * 1.7} ${-55 + i * 6}, ${365 - i * 2} ${352 - i * 5}, 463 ${100 + i * 2.2} C ${526 - i * 2} ${-60 + i * 3}, ${290 + i * 2} ${-5 + i * 5}, ${224 - i} ${190 + i * 1.5} C ${145 - i * 2} ${368 - i * 3}, ${26 + i} ${278 - i * 2}, 54 ${153 + i * 2.2}`} stroke={`url(#${gradientId})`} strokeWidth=".85" opacity={.38 + i / 50} />)}
  </svg>;
}

export function InquiryHero({ type, locale }) {
  const copy = inquiryContent(locale)[type];
  return <header className="inquiry-hero">
    <div className="inquiry-hero-copy">
      <p className="inquiry-eyebrow">{copy.eyebrow}</p>
      <h1 className="inquiry-title">{copy.title}<br /><span>{copy.accent}</span></h1>
      <p className="inquiry-intro">{copy.intro}</p>
    </div>
    <div className="inquiry-art"><Ribbon /></div>
  </header>;
}

export function InquirySection({ number, title, description, children }) {
  return <section className="inquiry-form-section">
    <header className="inquiry-section-heading">
      <span className="inquiry-section-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
    <div className="inquiry-section-fields space-y-6">{children}</div>
  </section>;
}
