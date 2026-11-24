import React, { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import { localizedRoute } from '../route.js';
import useTranslations from '../lib/useTranslations.js';
import '../../css/inquiry-design.css';
import '../../css/home.css';
import '../../css/home-typewriter.css';

const fallbackServiceItems = [
  {
    title: 'Webdesign',
    text: 'Egyedi, modern és reszponzív design, ami kiemel a versenytársak közül.',
    icon: 'M5 6h14v9H5z M9 19h6 M12 15v4 M15 4l5-2-2 5-8 8H8v-2l7-9z',
  },
  {
    title: 'Webshop készítés',
    text: 'Professzionális webshop WooCommerce vagy egyedi megoldásokkal.',
    icon: 'M6 6h15l-2 8H8L6 3H3 M9 20h.01 M18 20h.01',
  },
  {
    title: 'Webfejlesztés',
    text: 'HTML, CSS, JavaScript, PHP és Laravel alapú fejlesztések.',
    icon: 'M8 8 4 12l4 4 M16 8l4 4-4 4 M14 5l-4 14',
  },
  {
    title: 'SEO & Marketing',
    text: 'Keresőoptimalizálás és online marketing a jobb helyezésekért.',
    icon: 'M12 3c3.2 1.2 5.2 3.5 6 7-3.5.8-5.8 2.8-7 6-3.2-1.2-5.2-3.5-6-7 3.5-.8 5.8-2.8 7-6z',
  },
  {
    title: 'Online Marketing',
    text: 'Célzott kampányok, Google Ads, Facebook és Instagram hirdetések.',
    icon: 'M4 12h4l9-5v10l-9-5H4z M18 9c1.5 1.5 1.5 4.5 0 6',
  },
  {
    title: 'Támogatás & Karbantartás',
    text: 'Folyamatos támogatás, frissítések és biztonsági karbantartás.',
    icon: 'M5 13a7 7 0 0 1 14 0v4a2 2 0 0 1-2 2h-2v-6h4 M5 13h4v6H7a2 2 0 0 1-2-2z',
  },
];

const NeonIcon = ({ path }) => (
  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path.split(' M').map((segment, index) => (
      <path key={index} d={index === 0 ? segment : `M${segment}`} />
    ))}
  </svg>
);

const serviceIconPaths = fallbackServiceItems.map((item) => item.icon);

const TypewriterText = ({ words }) => {
  const safeWords = useMemo(
    () => words.filter((word) => typeof word === 'string' && word.trim().length > 0),
    [words],
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (safeWords.length === 0) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (media.matches) {
      setLetterCount(Array.from(safeWords[0]).length);
      return undefined;
    }

    const currentLength = Array.from(safeWords[wordIndex]).length;
    const isWordComplete = !isDeleting && letterCount === currentLength;
    const isWordCleared = isDeleting && letterCount === 0;
    const delay = isWordComplete ? 1250 : isWordCleared ? 260 : isDeleting ? 46 : 78;

    const timer = window.setTimeout(() => {
      if (isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isWordCleared) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % safeWords.length);
        return;
      }

      setLetterCount((count) => count + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, letterCount, safeWords, wordIndex]);

  if (safeWords.length === 0) return null;

  const visibleWord = Array.from(safeWords[wordIndex]).slice(0, letterCount).join('');

  return (
    <div className="pz-home-typewriter" aria-live="polite">
      <span className="pz-home-typewriter__prompt" aria-hidden="true">&gt;</span>
      <span className="pz-home-typewriter__text">{visibleWord}</span>
      <span className="pz-home-typewriter__cursor" aria-hidden="true" />
    </div>
  );
};

export default function Home() {
  const { locale, trans } = useTranslations();
  const { props } = usePage();

  const localizedRoutes = props?.localizedRoutes;
  const home = trans?.home ?? {};
  const deviceImage = {
    hu: '/img/laptop.png',
    de: '/img/laptop-de.png?v=20261028',
    en: '/img/laptop-en.png?v=20261028',
  }[(props?.contentLocale ?? locale).split(/[-_]/)[0]] ?? '/img/laptop.png';
  const brandLabel = home.brand_label ?? 'Progzone';

  const paragraphs = Array.isArray(home.paragraphs) ? home.paragraphs : [];
  const words = Array.isArray(home.typewriter) ? home.typewriter : [
    'Webshop készítés',
    'Weboldal készítés',
    'Online marketing',
    'Egyedi fejlesztés',
  ];
  const heroTitle = home.hero_title ?? {};
  const heroActions = home.hero_actions ?? {};
  const chips = Array.isArray(home.chips) ? home.chips : ['Modern design', 'Gyors betöltés', 'Mobilbarát'];
  const serviceItems = (Array.isArray(home.service_items) && home.service_items.length > 0
    ? home.service_items
    : fallbackServiceItems
  ).map((item, index) => ({
    ...item,
    icon: serviceIconPaths[index] ?? serviceIconPaths[0],
  }));
  const servicesTitle = home.services_title ?? {};
  const why = home.why ?? {};
  const whyItems = Array.isArray(why.items)
    ? why.items
    : [
      'Egyedi, igényre szabott megoldások',
      'Gyors és megbízható munkavégzés',
      'Korrekt árak, rejtett költségek nélkül',
      'Több éves tapasztalat',
      'Teljes körű ügyféltámogatás',
    ];
  const isGermanLocale = typeof locale === 'string' && locale.toLowerCase().startsWith('de');
  const homePageClassName = isGermanLocale
    ? 'pz-home-page pz-home-page--orbit pz-home-page--de'
    : 'pz-home-page pz-home-page--orbit';

  return (
    <Layout variant="inquiry">


      <div className={homePageClassName}>
        <section className="pz-home-hero">
          <svg className="pz-hero-light-trails" viewBox="0 0 1440 660" preserveAspectRatio="none" aria-hidden="true">
            <path className="pz-neon-path pz-cyan-stroke" d="M-80 470 C 160 350, 290 415, 440 280 S 760 80, 1010 205 S 1260 420, 1520 285" />
            <path className="pz-neon-path pz-pink-stroke" d="M-60 565 C 170 480, 320 535, 505 382 S 790 190, 1010 302 S 1270 532, 1510 405" />
          </svg>

          <svg className="pz-hero-waves" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
            <path className="pz-neon-wave pz-cyan-stroke" d="M-20 118 C 145 64, 280 164, 440 110 S 760 62, 920 106 S 1220 156, 1460 70" />
            <path className="pz-neon-wave pz-pink-stroke" d="M-20 145 C 190 88, 315 142, 505 124 S 790 164, 1010 96 S 1250 64, 1460 132" />
          </svg>

          <div className="pz-home-hero__inner">
            <div>
              <span className="pz-neon-badge">{brandLabel}</span>

              <h1 className="pz-home-hero__title">
                <span>{heroTitle.line1 ?? 'Weboldalkészítés'}</span>
                <span>{heroTitle.line2_prefix ?? 'és'} <strong>{heroTitle.line2_highlight ?? 'Online Megoldások'}</strong></span>
              </h1>

              <TypewriterText words={words} />

              <p className="pz-home-hero__lead">
                {paragraphs[0] ?? 'Professzionális weboldal, webshop, webdesign és online marketing egy helyen.'}
              </p>

              <div className="pz-home-hero__actions">
                <a href={localizedRoute('quote', locale, localizedRoutes)} className="pz-button">
                  {heroActions.quote ?? 'Ingyenes árajánlat'}
                </a>

                <a href={localizedRoute('contact', locale, localizedRoutes)} className="pz-button pz-button-secondary">
                  {heroActions.contact ?? 'Kapcsolat'}
                </a>
              </div>

              <div className="pz-home-hero__chips">
                {chips.map((item, index) => (
                  <div key={item} className="pz-home-chip">
                    <span className={index === 1 ? 'pz-home-chip__icon is-cyan' : 'pz-home-chip__icon'}>
                      <NeonIcon path={[
                        'M4 5h16v11H4z M8 20h8 M12 16v4',
                        'M13 2 4 14h7l-1 8 10-13h-7z',
                        'M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M11 18h2',
                      ][index % 3]} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pz-home-hero__visual" aria-hidden="true">
              <svg className="pz-home-orbits" viewBox="0 0 600 600" aria-hidden="true">
                <g className="pz-home-orbits__cyan">
                  <ellipse cx="300" cy="300" rx="284" ry="148" transform="rotate(-32 300 300)" />
                  <circle cx="91" cy="232" r="3" /><circle cx="480" cy="122" r="2" />
                  <circle cx="523" cy="385" r="3" /><circle cx="174" cy="102" r="2" />
                </g>
                <g className="pz-home-orbits__pink">
                  <ellipse cx="300" cy="313" rx="278" ry="154" transform="rotate(-18 300 313)" />
                  <circle cx="70" cy="378" r="2" /><circle cx="440" cy="204" r="3" />
                  <circle cx="191" cy="476" r="3" />
                </g>
              </svg>

              <div className="pz-home-portrait-frame">
                <img
                  src="/img/home-orbit-portrait-v4.webp"
                  srcSet="/img/home-orbit-portrait-v4-480.webp 480w, /img/home-orbit-portrait-v4.webp 800w"
                  sizes="(max-width: 767px) 360px, (max-width: 1100px) 420px, 500px"
                  alt=""
                  width="800"
                  height="843"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="pz-home-hero__portrait"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pz-services">
          <svg className="pz-services-light" viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
            <path className="pz-neon-path pz-pink-stroke" d="M-80 690 C 190 610, 340 680, 530 535 S 860 315, 1090 390 S 1270 560, 1510 430" />
            <path className="pz-neon-path pz-cyan-stroke" d="M-60 560 C 180 430, 390 520, 590 330 S 930 135, 1170 230 S 1320 390, 1510 300" />
          </svg>

          <div className="pz-home-section">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.04em]">
                {servicesTitle.prefix ?? 'Miben tudok'} <span className="pz-pink">{servicesTitle.highlight ?? 'Neked segíteni?'}</span>
              </h2>
              <span className="mx-auto mt-5 block h-1 w-24 rounded-full bg-gradient-to-r from-[#ff007a] to-[#00f7ff] shadow-[0_0_18px_rgba(255,0,122,.8)]" />
            </div>

            <div className="pz-services-grid">
              {serviceItems.map((item) => (
                <article key={item.title} className="pz-service-card">
                  <div className="pz-service-card__icon">
                    <NeonIcon path={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href={localizedRoute('services', locale, localizedRoutes)} className="pz-card-button">
                    {home.details_label ?? 'Részletek'}
                  </a>
                </article>
              ))}
            </div>

            <div className="pz-why">
    <div className="pz-why-content">
        <span className="pz-neon-badge">{brandLabel}</span>

        <h2>
            {why.title_prefix ?? 'Miért válassz'} <span className="pz-pink">{why.title_highlight ?? 'Engem?'}</span>
        </h2>

        <ul className="pz-check-list">
            {whyItems.map((item) => (
                <li key={item}>
                    <span className="pz-check">✓</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>

        <a
            href={localizedRoute('quote', locale, localizedRoutes)}
            className="pz-button pz-button-secondary mt-7"
        >
            {why.cta ?? 'Árajánlatkérés'}
        </a>
    </div>

    <div className="pz-devices" aria-hidden="true">
        <div className="pz-neon-tube" />
        <div className="pz-neon-tube cyan" />
        <div className="pz-glow-floor" />

        <img
            src={deviceImage}
            alt=""
            width="1858"
            height="846"
            loading="lazy"
            decoding="async"
            className="pz-laptop"
        />
    </div>


            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
