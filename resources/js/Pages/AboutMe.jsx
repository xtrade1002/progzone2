import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function AboutMe() {
  const { trans, t } = useTranslations();
  const about = trans?.about ?? {};
  const introParagraphs = Array.isArray(about.intro_paragraphs) ? about.intro_paragraphs : [];
  const serviceBlocks = Array.isArray(about.service_blocks) ? about.service_blocks : [];

  // animáció állapot
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head title={about.meta_title ?? t('menu.about', 'About')} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-16 space-y-20">

        {/* --- Kép + bemutatkozás --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`transform transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            <img
              src="/img/me.jpg"
              alt={about.image_alt ?? ''}
              className="rounded-2xl shadow-[0_0_25px_#ff007a]/50"
            />
          </div>
          <div
            className={`transform transition-all duration-700 ease-out delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-8 drop-shadow-[0_0_15px_#ff007a]">
              {about.intro_title}
            </h3>
            {introParagraphs.length > 0 ? (
              introParagraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-[#00f7ff] italic">Tartalom feltöltés alatt...</p>
            )}
          </div>
        </div>

        {/* --- Mit tanultam? --- */}
        <div
          className={`transform transition-all duration-700 ease-out delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h4 className="text-3xl sm:text-4xl font-bold text-[#FF007A] mb-12 text-center relative inline-block">
            {about.services_title}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#00f7ff] rounded-full"></span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {serviceBlocks.length > 0 ? (
              serviceBlocks.map((block, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-[#ff007a]/30 bg-[#121317]/60 hover:shadow-[0_0_25px_#ff007a] transition duration-300"
                >
                  <h2 className="text-2xl font-bold text-[#FF007A] mb-4">
                    {block.title}
                  </h2>
                  <p className="text-gray-300 mb-6">{block.description}</p>
                  <ul className="space-y-4 text-gray-400">
                    {(block.highlights ?? []).map((highlight, highlightIndex) => (
                      <li key={highlightIndex}>
                        <span className="font-semibold text-white">
                          {highlight.title}
                        </span>
                        <br />
                        {highlight.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-center text-[#00f7ff] italic">
                Nincsenek szolgáltatási blokkok megadva.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}