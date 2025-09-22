import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Privacy() {
  const { trans, t } = useTranslations();
  const privacy = trans?.privacy ?? {};
  const bullets = Array.isArray(privacy.items) ? privacy.items : [];

  return (
    <Layout>
      <Head title={privacy.meta_title ?? t('menu.privacy', 'Privacy')} />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold text-[#FF007A]">{privacy.title}</h1>
        <p className="text-lg text-gray-300">{privacy.intro}</p>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
