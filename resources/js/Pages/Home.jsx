import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Home() {
  const { trans, t } = useTranslations();
  const home = trans?.home ?? {};
  const paragraphs = Array.isArray(home.paragraphs) ? home.paragraphs : [];

  // animációhoz állapot
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // kis delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head title={home.meta_title ?? t('menu.home', 'Home')} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-16 text-center space-y-6 border border-[#00f7ff]/30 rounded-2xl shadow-[0_0_25px_#00f7ff55] bg-[#0a0a0f]/60">
        {/* Cím animációval */}
        <h1
          className={`text-3xl sm:text-5xl font-extrabold text-[#FF007A] mb-12 drop-shadow-[0_0_15px_#ff007a] transform transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {home.title ?? t('menu.home', 'Home')}
        </h1>

        {/* Bekezdések vagy fallback */}
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-base sm:text-lg text-gray-300 leading-relaxed transform transition-all duration-700 ease-out delay-${
                index * 150
              } ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-lg text-[#00f7ff] drop-shadow-[0_0_10px_#00f7ff] italic">
            Tartalom feltöltés alatt...
          </p>
        )}
      </section>
    </Layout>
  );
}