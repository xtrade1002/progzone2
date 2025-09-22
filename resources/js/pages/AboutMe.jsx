import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function AboutMe() {
  const { trans, t } = useTranslations();
  const about = trans?.about ?? {};
  const introParagraphs = Array.isArray(about.intro_paragraphs) ? about.intro_paragraphs : [];
  const serviceBlocks = Array.isArray(about.service_blocks) ? about.service_blocks : [];

  return (
    <Layout>
      <Head title={about.meta_title ?? t('menu.about', 'About')} />
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Kép + bemutatkozás */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/img/me.jpg"
              alt={about.image_alt ?? ''}
              className="rounded-2xl shadow-[0_0_25px_#ff007a]/50"
            />
          </div>
          <div>
            <h3 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
              {about.intro_title}
            </h3>
            {introParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Mit tanultam? */}
        <div className="relative">
          <h4 className="text-4xl font-bold text-[#FF007A] mb-12 text-center relative inline-block">
            {about.services_title}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#00f7ff] rounded-full"></span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {serviceBlocks.map((block, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-[#ff007a]/30 bg-[#121317]/60 hover:shadow-[0_0_25px_#ff007a] transition duration-300"
              >
                <h2 className="text-2xl font-bold text-[#FF007A] mb-4">{block.title}</h2>
                <p className="text-gray-300 mb-6">{block.description}</p>
                <ul className="space-y-4 text-gray-400">
                  {(block.highlights ?? []).map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>
                      <span className="font-semibold text-white">{highlight.title}</span>
                      <br />
                      {highlight.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}