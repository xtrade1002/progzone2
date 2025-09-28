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
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        {cards.map((card, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold text-[#FF007A] mb-4">{card.title}</h2>
            <p className="text-gray-300 mb-6">{card.description}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}