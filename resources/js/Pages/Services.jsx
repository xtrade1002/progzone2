import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

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
          {cards.map((card, index) => (
            <article
              key={index}
              className={`pz-card pz-service-reveal group rounded-2xl p-7 ${
                visible ? 'is-visible' : ''
              } ${getRevealDirection(index)}`}
              style={{ transitionDelay: `${420 + index * 260}ms` }}
            >
              <span className="mb-5 inline-grid h-10 w-10 place-items-center rounded-full border border-[#00eaff]/45 text-sm font-black text-[#00eaff] shadow-[0_0_16px_rgba(0,234,255,0.22)] transition duration-700 group-hover:border-[var(--pz-pink)] group-hover:text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mb-4 text-2xl font-black text-[var(--pz-pink)] transition duration-700 group-hover:text-[#00eaff]">
                {card.title}
              </h2>
              <p className="leading-relaxed text-slate-300 transition duration-700 group-hover:text-slate-100">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
