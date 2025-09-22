import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Home() {
  const { trans, t } = useTranslations();
  const home = trans?.home ?? {};
  const paragraphs = Array.isArray(home.paragraphs) ? home.paragraphs : [];

  return (
    <Layout>
      <Head title={home.meta_title ?? t('menu.home', 'Home')} />
      <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
          {home.title}
        </h1>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-300">
            {paragraph}
          </p>
        ))}
      </section>
    </Layout>
  );
}