import React, { useId, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import SelectDropdown from '../Components/SelectDropdown.jsx';
import useTranslations from '../lib/useTranslations.js';
import { localizedRoute } from '../route.js';
import infosDesignContent from '../data/infosDesignContent.js';
import '../../css/inquiry-design.css';
import '../../css/infos.css';

function Content({ content }) {
  const blocks = Array.isArray(content) ? content : content ? [content] : [];
  return <div className="infos-answer">{blocks.map((block, index) => {
    if (typeof block === 'string') return <p key={index} dangerouslySetInnerHTML={{ __html: block }} />;
    if (block?.type === 'paragraph') return <p key={index} dangerouslySetInnerHTML={{ __html: block.text ?? '' }} />;
    if (block?.type === 'list') return <ul key={index}>{(block.items ?? []).map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>;
    return null;
  })}</div>;
}

function TopicIllustration({ topic, copy }) {
  const iconPaths = [
    'M35 8h30v22H35zM8 70h30v22H8zM62 70h30v22H62zM50 30v20H23v20m27-20h27v20',
    'M8 15h12l14 50h45l12-37H25M37 78a6 6 0 1 0 0 12 6 6 0 0 0 0-12m37 0a6 6 0 1 0 0 12 6 6 0 0 0 0-12',
    'M29 7h42a7 7 0 0 1 7 7v72a7 7 0 0 1-7 7H29a7 7 0 0 1-7-7V14a7 7 0 0 1 7-7zM39 17h22M43 81h14M22 72h56',
    'M23 7h39l18 18v63a5 5 0 0 1-5 5H23a5 5 0 0 1-5-5V12a5 5 0 0 1 5-5zM60 7v22h20M33 47h31M33 61h19m-16 15 9 9 22-22',
  ][topic - 3];
  if (iconPaths) return <figure className="infos-illustration infos-illustration--icon">
    <div className="infos-topic-icon" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false"><path d={iconPaths} /></svg></div>
    <figcaption>{copy.diagramLabels[topic - 3]}</figcaption>
  </figure>;
  return <figure className="infos-illustration">
    {topic === 0 ? <>
      <svg viewBox="0 0 500 250" fill="none" aria-hidden="true" focusable="false">
        <g stroke="var(--pz-cyan)" strokeWidth="3">
          <rect x="20" y="60" width="200" height="116" rx="11" /><path d="M20 88h200" />
          <rect x="43" y="112" width="154" height="40" rx="10" />
          <g fill="var(--pz-cyan)" stroke="none"><circle cx="37" cy="74" r="4" /><circle cx="53" cy="74" r="4" /><circle cx="69" cy="74" r="4" /></g>
        </g>
        <path d="M220 127h112" stroke="var(--pz-pink)" strokeWidth="2" />
        <g stroke="var(--pz-pink)" strokeWidth="3">
          {[60, 99, 138].map(y => <g key={y}><rect x="333" y={y} width="145" height="36" rx="9" /><circle cx="350" cy={y + 18} r="2" /><circle cx="364" cy={y + 18} r="2" /><path d={`M433 ${y + 18}h27`} /></g>)}
        </g>
        <g fill="#f7f7ff" textAnchor="middle" fontFamily="inherit">
          <text x="120" y="139" fontSize="21" fontWeight="700">{copy.domain}</text>
          <text x="405" y="38" fontSize="19" fontWeight="700">{copy.hosting}</text>
          <text x="120" y="210" fontSize="16" fill="#b5bdd0">{copy.address}</text>
          <text x="405" y="210" fontSize="16" fill="#b5bdd0">{copy.files}</text>
        </g>
        <path d="m174 145 7 29 6-9 10-1z" fill="white" stroke="#050812" strokeWidth="2" />
      </svg>
      <figcaption className="sr-only">{copy.address}: {copy.domain}. {copy.hosting}: {copy.files}.</figcaption>
    </> : topic === 1 ? <>
      <svg viewBox="0 0 500 250" fill="none" aria-hidden="true" focusable="false">
        <g stroke="var(--pz-cyan)" strokeWidth="3" strokeLinejoin="round"><path d="M55 95h42l80-42v126l-80-40H55zM78 139l15 45h28l-18-42M193 82l27-16m-27 76 27 16m-24-47h37" /></g>
        <path d="M253 188h203" stroke="#8490a1" /><g stroke="var(--pz-pink)" strokeWidth="3"><path d="M275 185v-40h34v40m24 0V112h34v73m24 0V74h34v111" /><path d="m270 114 64-35 48 6 60-48m-23 0h23v23" /></g>
        <g fill="#b5bdd0" textAnchor="middle" fontFamily="inherit" fontSize="16"><text x="123" y="226">{copy.campaign}</text><text x="356" y="226">{copy.growth}</text></g>
      </svg><figcaption className="sr-only">{copy.campaign}. {copy.strategy}. {copy.growth}.</figcaption>
    </> : <>
      <svg viewBox="0 0 500 250" fill="none" aria-hidden="true" focusable="false">
        <path d="M250 28 335 60v59c0 52-51 83-85 100-34-17-85-48-85-100V60z" stroke="var(--pz-cyan)" strokeWidth="3" />
        <rect x="218" y="103" width="64" height="52" rx="8" stroke="var(--pz-pink)" strokeWidth="3" /><path d="M231 103V86a19 19 0 0 1 38 0v17M250 123v13" stroke="var(--pz-pink)" strokeWidth="3" />
        <path d="M90 90h40m-18-30 29 20m229 45h40m-49 25 30 19" stroke="var(--pz-pink)" strokeWidth="2" />
      </svg><figcaption>{copy.trust}</figcaption>
    </>}
  </figure>;
}

export default function Infos() {
  const { trans, t, locale } = useTranslations();
  const { props } = usePage();
  const sections = Array.isArray(trans?.infos?.sections) ? trans.infos.sections : [];
  const copy = infosDesignContent(locale);
  const [activeTopic, setActiveTopic] = useState(0);
  const tabs = useRef([]);
  const id = useId();
  const selectedTopic = Math.min(activeTopic, Math.max(0, sections.length - 1));
  const section = sections[selectedTopic];
  const items = Array.isArray(section?.items) ? section.items : [];

  const handleTabKey = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % sections.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + sections.length) % sections.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = sections.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActiveTopic(next);
    tabs.current[next]?.focus();
  };

  return <Layout variant="inquiry">
    <div className="infos-page">
      <header className="infos-hero">
        <p className="infos-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title} <span>{copy.accent}</span></h1>
        <p className="infos-intro">{copy.intro}</p>
        <svg className="infos-hero-curve" viewBox="0 0 600 200" fill="none" aria-hidden="true" focusable="false">
          <defs><linearGradient id={`${id}-curve`} x1="0" y1="200" x2="600" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#00f7ff" stopOpacity="0" /><stop offset=".4" stopColor="#00f7ff" /><stop offset="1" stopColor="#ff007a" /></linearGradient></defs>
          <path d="M0 198C270 200 450 145 600 2" stroke={`url(#${id}-curve)`} strokeWidth="1.5" />
        </svg>
      </header>
      {sections.length ? <>
        <div className="infos-topic-select"><span>{copy.topics}</span><SelectDropdown id="infos-topic" label={copy.topics} allowEmpty={false} options={sections.map((topic, index) => ({ value: String(index), label: topic.title }))} value={String(selectedTopic)} onChange={value => setActiveTopic(Number(value))} /></div>
        <div className="infos-tabs" role="tablist" aria-label={copy.topics}>
          {sections.map((topic, index) => <button key={topic.key ?? index} ref={el => { tabs.current[index] = el; }} type="button"
            id={`${id}-tab-${index}`} role="tab" aria-selected={selectedTopic === index} aria-controls={`${id}-panel`}
            tabIndex={selectedTopic === index ? 0 : -1} onClick={() => setActiveTopic(index)} onKeyDown={event => handleTabKey(event, index)}>{topic.title}</button>)}
        </div>
        <section id={`${id}-panel`} role="tabpanel" aria-label={section?.title} tabIndex={0} className="infos-topic" key={selectedTopic}>
          {items[0] && <div className="infos-featured">
            <div className="infos-featured-copy">
              <h2>{copy.featured[selectedTopic] ?? items[0].title}</h2>
              {copy.leads[selectedTopic] && <p className="infos-featured-lead">{copy.leads[selectedTopic]}</p>}
              <Content content={items[0].content} />
            </div>
            <TopicIllustration topic={selectedTopic} copy={copy} />
          </div>}
          <div className="infos-questions">
            {items.slice(1).map((item, index) => <details className="infos-question" key={index}>
              <summary><span className="infos-question-category">{section.title}</span><h3>{selectedTopic === 0 ? copy.questions[index] ?? item.title : item.title}</h3><span className="infos-question-toggle" aria-hidden="true" /></summary>
              <div className="infos-question-answer"><Content content={item.content} /></div>
            </details>)}
          </div>
        </section>
      </> : <p className="infos-empty">{t('infos.empty', 'Content will be available soon.')}</p>}
      <aside className="infos-contact"><h2>{copy.cta}</h2><Link className="inquiry-submit" href={localizedRoute('contact', locale, props?.localizedRoutes)}>{copy.contact}</Link></aside>
    </div>
  </Layout>;
}
