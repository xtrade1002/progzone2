import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Terms() {
  const { trans, t } = useTranslations();
  const terms = trans?.terms ?? {};
  const items = Array.isArray(terms.items) ? terms.items : [];

  return (
    <Layout>
      <Head title={terms.meta_title ?? t('menu.terms', 'Terms')} />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold text-[#FF007A]">{terms.title}</h1>
        <p className="text-lg text-gray-300">{terms.intro}</p>
        <ol className="space-y-2 list-decimal list-inside text-gray-300">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>
    </Layout>
  );
}
