import React, { useId } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';
import { localizedRoute } from '../route.js';
import servicesDesignContent from '../data/servicesDesignContent.js';
import '../../css/inquiry-design.css';
import '../../css/services.css';

const iconPaths = [
  'M3 4h18v13H3z M8 21h8 M12 17v4',
  'M3 3h3l3 12h10l3-9H7 M9 21h.01 M18 21h.01',
  'M8 6 2 12l6 6 M16 6l6 6-6 6 M14 3l-4 18',
  'M3 9h5l12-5v16L8 15H3z M8 15l2 7h4l-2-5',
  'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M10 5h4 M11 19h2',
];

function ServiceIcon({ index }) {
  return <svg className="services-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={iconPaths[index % iconPaths.length]} /></svg>;
}

function Ribbon() {
  const id = useId();
  return <svg className="services-ribbon" viewBox="0 0 560 240" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={id + '-fill'} x1="50" y1="190" x2="520" y2="50" gradientUnits="userSpaceOnUse"><stop stopColor="#00f7ff" stopOpacity=".04" /><stop offset=".26" stopColor="#00f7ff" stopOpacity=".55" /><stop offset=".56" stopColor="#7761a6" stopOpacity=".12" /><stop offset=".79" stopColor="#ff007a" stopOpacity=".5" /><stop offset="1" stopColor="#ff007a" stopOpacity=".02" /></linearGradient>
      <linearGradient id={id + '-line'} x1="20" y1="190" x2="530" y2="45" gradientUnits="userSpaceOnUse"><stop stopColor="#00f7ff" stopOpacity="0" /><stop offset=".25" stopColor="#00f7ff" /><stop offset=".68" stopColor="#ff007a" /><stop offset="1" stopColor="#ff007a" stopOpacity="0" /></linearGradient>
    </defs>
    <path d="M15 202C118-25 169 226 305 132S414 8 550 35C426 50 429 192 302 157S131 114 15 202Z" fill={'url(#' + id + '-fill)'} />
    <path d="M15 202C118-25 169 226 305 132S414 8 550 35M15 202C131 114 176 116 302 157S426 50 550 35" stroke={'url(#' + id + '-line)'} strokeWidth="1.2" />
  </svg>;
}

export default function Services() {
  const { trans, locale } = useTranslations();
  const { props } = usePage();
  const copy = servicesDesignContent(locale);
  const services = trans?.services ?? {};
  const cards = Array.isArray(services.cards) ? services.cards : [];
  const mobile = services.mobile_app;
  const renderService = (card, index, isMobile = false) => <article key={isMobile ? 'mobile' : index} className={'services-entry' + (isMobile ? ' services-entry--mobile' : '')}>
    <ServiceIcon index={isMobile ? 4 : index} />
    <div className="services-entry-copy">
      <h2><span aria-hidden="true">{String(index + 1).padStart(2, '0')} / </span>{isMobile ? copy.mobileTitle : copy.titles[index] ?? card.title}</h2>
      <p className="services-entry-description">{isMobile ? copy.mobileDescription : copy.descriptions[index] ?? card.description}</p>
      <p className="services-entry-tags">{isMobile ? 'Android / iOS' : copy.tags[index]}</p>
    </div>
  </article>;

  return <Layout variant="inquiry">
    <div className="services-page">
      <header className="services-hero">
        <div className="services-hero-copy">
          <p className="services-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}<br /><span>{copy.accent}</span></h1>
          <p className="services-intro">{copy.intro}</p>
        </div>
        <Ribbon />
      </header>
      <div className="services-grid">{cards.map((card, index) => renderService(card, index))}</div>
      {mobile && renderService(mobile, cards.length, true)}
      <aside className="services-footer"><h2>{copy.footer}</h2><Link className="inquiry-submit" href={localizedRoute('quote', locale, props?.localizedRoutes)}>{copy.cta}</Link></aside>
    </div>
  </Layout>;
}
