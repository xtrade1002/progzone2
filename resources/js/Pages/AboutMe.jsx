import React, { useId, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';
import { localizedRoute } from '../route.js';
import aboutDesignContent from '../data/aboutDesignContent.js';
import '../../css/inquiry-design.css';
import '../../css/about.css';

function LightTrail() {
  const id = useId();
  const path = 'M0 165C130 210 225 30 400 122S730 190 900 80 1040 65 1160 32';
  return <svg className="about-beam" viewBox="0 0 1160 240" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id={id} x1="0" y1="150" x2="1160" y2="65" gradientUnits="userSpaceOnUse"><stop stopColor="#00f7ff" stopOpacity="0" /><stop offset=".24" stopColor="#00f7ff" /><stop offset=".54" stopColor="#00f7ff" /><stop offset=".72" stopColor="#ff007a" /><stop offset="1" stopColor="#ff007a" stopOpacity="0" /></linearGradient></defs>
    <path className="about-beam-halo" d={path} stroke={'url(#' + id + ')'} strokeWidth="14" />
    <path d={path} stroke={'url(#' + id + ')'} strokeWidth="1.8" />
    <path className="about-beam-spark" d={path} stroke={'url(#' + id + ')'} strokeWidth="3" pathLength="1200" />
  </svg>;
}

export default function AboutMe() {
  const { trans, locale } = useTranslations();
  const { props } = usePage();
  const copy = aboutDesignContent(locale);
  const about = trans?.about ?? {};
  const blocks = Array.isArray(about.service_blocks) ? about.service_blocks : [];
  const [activeTab, setActiveTab] = useState(0);
  const selected = Math.min(activeTab, Math.max(0, blocks.length - 1));
  const block = blocks[selected];
  const tabs = useRef([]);
  const id = useId();
  const selectWithKeyboard = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % blocks.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + blocks.length) % blocks.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = blocks.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActiveTab(next);
    tabs.current[next]?.focus();
  };

  return <Layout variant="inquiry">
    <div className="about-page">
      <section className="about-hero" aria-labelledby={id + '-title'}>
        <div className="about-aura" aria-hidden="true" />
        <div className="about-watermark" aria-hidden="true"><span className="about-watermark-prog">PROG</span><span className="about-watermark-zone">ZONE</span></div>
        <LightTrail />
        <header className="about-hero-heading">
          <p className="about-eyebrow">{copy.eyebrow}</p>
          <h1 id={id + '-title'}>{copy.headline.map(line => <span key={line}>{line}</span>)}</h1>
        </header>
        <figure className="about-portrait-wrap">
          <img className="about-portrait" src="/img/about-portrait-cutout-v1.png" width="1122" height="1402" alt={copy.portraitAlt} fetchPriority="high" />
        </figure>
        <div className="about-intro">
          <h2>{copy.greeting}</h2>
          {copy.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <Link className="about-contact-link" href={localizedRoute('contact', locale, props?.localizedRoutes)}>{copy.cta}</Link>
        </div>
      </section>
      {blocks.length > 0 && <section className="about-expertise" aria-labelledby={id + '-expertise'}>
        <div className="about-expertise-header">
          <h2 id={id + '-expertise'}>{copy.expertise}</h2>
          <div className="about-tabs" role="tablist" aria-label={copy.tabLabel}>
            {blocks.map((item, index) => <button key={index} type="button" role="tab" ref={element => { tabs.current[index] = element; }}
              id={id + '-tab-' + index} aria-controls={id + '-panel'} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
              onClick={() => setActiveTab(index)} onKeyDown={event => selectWithKeyboard(event, index)}>{copy.tabs[index] ?? item.title}</button>)}
          </div>
        </div>
        <div className="about-tab-panel" key={selected} id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + selected} tabIndex={0}>
          <div className="about-panel-summary"><h3>{copy.panelHeadings[selected] ?? block.title}</h3><p>{block.description}</p></div>
          <ul className="about-highlights">{(block.highlights ?? []).map((highlight, index) => <li key={index}><h4>{highlight.title}</h4><p>{highlight.description}</p></li>)}</ul>
        </div>
        <p className="about-tabs-hint">{copy.hint}</p>
      </section>}
    </div>
  </Layout>;
}
