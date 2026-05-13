import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function AboutMe() {
  const { trans, t } = useTranslations();
  const about = trans?.about ?? {};
  const introParagraphs = Array.isArray(about.intro_paragraphs) ? about.intro_paragraphs : [];
  const serviceBlocks = Array.isArray(about.service_blocks) ? about.service_blocks : [];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head title={about.meta_title ?? t('menu.about', 'About')} />
      <section className="pz-section space-y-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
            }`}
          >
            <img
              src="/img/me-20260513.png"
              alt={about.image_alt ?? ''}
              className="rounded-[2rem] border border-[rgb(var(--pz-pink-rgb)/0.46)] shadow-[0_0_36px_rgb(var(--pz-pink-rgb)/0.42)]"
            />
          </div>
          <div
            className={`transition-all delay-200 duration-700 ease-out ${
              visible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
            }`}
          >
            <h3 className="pz-title mb-8 text-3xl font-black sm:text-5xl">
              {about.intro_title}
            </h3>
            {introParagraphs.length > 0 ? (
              introParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 px-1 text-lg leading-relaxed text-slate-300">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="pz-cyan px-1 italic">Tartalom feltoltes alatt...</p>
            )}
          </div>
        </div>

        <div
          className={`transition-all delay-500 duration-700 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h4 className="pz-title relative mb-12 inline-block text-3xl font-black sm:text-4xl">
            {about.services_title}
            <span className="pz-rule absolute -bottom-4 left-0" />
          </h4>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {serviceBlocks.length > 0 ? (
              serviceBlocks.map((block, index) => (
                <article key={index} className="pz-card rounded-2xl p-6">
                  <h2 className="mb-4 text-2xl font-black text-[var(--pz-pink)]">{block.title}</h2>
                  <p className="mb-6 px-1 leading-relaxed text-slate-300">{block.description}</p>
                  <ul className="space-y-4 text-slate-400">
                    {(block.highlights ?? []).map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="px-1">
                        <span className="font-bold text-white">{highlight.title}</span>
                        <br />
                        {highlight.description}
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            ) : (
              <p className="pz-cyan text-center italic">Nincsenek szolgaltatasi blokkok megadva.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
