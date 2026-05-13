import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Services() {
  const { trans, t } = useTranslations();
  const services = trans?.services ?? {};
  const cards = Array.isArray(services.cards) ? services.cards : [];

  return (
    <Layout>
      <Head title={services.meta_title ?? t('menu.services', 'Services')} />
      <section className="pz-section">
        <div className="mb-12 max-w-3xl">
          <h1 className="pz-title text-4xl font-black sm:text-5xl">
            {t('menu.services', 'Services')}
          </h1>
          <span className="pz-rule mt-5" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card, index) => (
            <article key={index} className="pz-card rounded-2xl p-7">
              <span className="mb-5 inline-grid h-10 w-10 place-items-center rounded-full border border-[#00eaff]/45 text-sm font-black text-[#00eaff] shadow-[0_0_16px_rgba(0,234,255,0.22)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mb-4 text-2xl font-black text-[var(--pz-pink)]">{card.title}</h2>
              <p className="leading-relaxed text-slate-300">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
