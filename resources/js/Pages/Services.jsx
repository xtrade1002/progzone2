import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

const serviceIcons = [
  'M5 6h14v9H5z M9 19h6 M12 15v4',
  'M6 6h15l-2 8H8L6 3H3 M9 20h.01 M18 20h.01',
  'M8 8 4 12l4 4 M16 8l4 4-4 4 M14 5l-4 14',
  'M12 3c3.2 1.2 5.2 3.5 6 7-3.5.8-5.8 2.8-7 6-3.2-1.2-5.2-3.5-6-7 3.5-.8 5.8-2.8 7-6z M12 3v5 M9 17l-2 4 4-2',
  'M4 12h4l9-5v10l-9-5H4z M18 9c1.5 1.5 1.5 4.5 0 6',
  'M5 13a7 7 0 0 1 14 0v4a2 2 0 0 1-2 2h-2v-6h4 M5 13h4v6H7a2 2 0 0 1-2-2z',
];

const ServiceIcon = ({ path }) => (
  <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path.split(' M').map((segment, index) => (
      <path key={index} d={index === 0 ? segment : `M${segment}`} />
    ))}
  </svg>
);

export default function Services() {
  const { trans, t } = useTranslations();
  const services = trans?.services ?? {};
  const cards = Array.isArray(services.cards) ? services.cards : [];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const getRevealDirection = (index) => {
    if (index % 4 === 0) {
      return 'from-left';
    }

    if (index % 4 === 1) {
      return 'from-right';
    }

    return 'from-bottom';
  };

  return (
    <Layout>
      <Head title={services.meta_title ?? t('menu.services', 'Services')} />
      <section className="pz-section">
        <div
          className={`mb-12 max-w-3xl transition-all duration-[1400ms] ease-out ${
            visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-5 opacity-0 blur-sm'
          }`}
        >
          <h1 className="pz-title pz-text-sweep text-4xl font-black sm:text-5xl">
            {t('menu.services', 'Services')}
          </h1>
          <span
            className={`pz-rule mt-5 transition-all duration-[1600ms] ease-out ${
              visible ? 'w-[92px] opacity-100' : 'w-0 opacity-0'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card, index) => {
            const iconPath = serviceIcons[index % serviceIcons.length];
            const accentClass = index % 2 === 0 ? 'text-[var(--pz-pink)]' : 'text-[var(--pz-cyan)]';

            return (
              <article
                key={index}
                className={`pz-card pz-service-reveal group p-7 ${
                  visible ? 'is-visible' : ''
                } ${getRevealDirection(index)}`}
                style={{ transitionDelay: `${420 + index * 260}ms` }}
              >
                <div className={`mb-6 inline-grid h-16 w-16 place-items-center rounded-2xl border border-current/50 ${accentClass} shadow-[0_0_22px_currentColor]`}>
                  <ServiceIcon path={iconPath} />
                </div>
                <h2 className="mb-4 text-2xl font-black text-white transition duration-700 group-hover:text-[#00eaff]">
                  {card.title}
                </h2>
                <p className="leading-relaxed text-slate-300 transition duration-700 group-hover:text-slate-100">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
