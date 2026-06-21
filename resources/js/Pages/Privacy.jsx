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
      <section className="pz-section max-w-4xl">
        <div className="pz-panel rounded-[2rem] p-6 sm:p-10">
          <h1 className="pz-title mb-6 text-3xl font-black sm:text-4xl">{privacy.title}</h1>
          <p className="text-lg leading-relaxed text-slate-300">{privacy.intro}</p>
          <ul className="mt-8 list-inside list-disc space-y-3 text-slate-300">
            {bullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
