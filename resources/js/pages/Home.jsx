import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';
import { motion } from 'framer-motion';

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

  const titleText = home.title ?? t('menu.home', 'Home');

  return (
    <Layout>
      <Head title={home.meta_title ?? t('menu.home', 'Home')} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-16 text-center space-y-6 border border-[#00f7ff]/30 rounded-2xl shadow-[0_0_25px_#00f7ff55] bg-[#0a0a0f]/60">
        
        {/* Betűnként animált cím */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FF007A] mb-12">
          {titleText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 }}
              className="inline-block drop-shadow-[0_0_15px_#ff007a]"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Bekezdések vagy fallback */}
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="text-base sm:text-lg text-gray-300 leading-relaxed"
            >
              {paragraph}
            </motion.p>
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
