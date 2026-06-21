import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function AboutMe() {
  const { trans, t } = useTranslations();
  const about = trans?.about ?? {};
  const introParagraphs = Array.isArray(about.intro_paragraphs) ? about.intro_paragraphs : [];
  const serviceBlocks = Array.isArray(about.service_blocks) ? about.service_blocks : [];
  const [visible, setVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!servicesRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(servicesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <Head title={about.meta_title ?? t('menu.about', 'About')} />
      <section className="pz-section space-y-20">
        <div className="pz-panel grid grid-cols-1 items-center gap-12 rounded-[2rem] p-6 md:grid-cols-[0.82fr_1.18fr] md:p-10">
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
            }`}
          >
            <img
              src="/img/me.png"
              alt={about.image_alt ?? ''}
              width="1123"
              height="1401"
              className="mx-auto max-h-[560px] rounded-[1.25rem] border border-[rgb(var(--pz-pink-rgb)/0.58)] object-cover shadow-[0_0_38px_rgb(var(--pz-pink-rgb)/0.44),0_0_36px_rgba(0,231,255,0.18)]"
            />
          </div>
          <div
            className={`transition-all delay-200 duration-700 ease-out ${
              visible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
            }`}
          >
            <h3 className="pz-title pz-text-sweep mb-8 text-3xl font-black sm:text-5xl">
              {about.intro_title}
            </h3>
            {introParagraphs.length > 0 ? (
              introParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`pz-copy-reveal mb-4 px-1 text-lg leading-relaxed text-slate-300 ${
                    visible ? 'is-visible' : ''
                  }`}
                  style={{ transitionDelay: `${560 + index * 260}ms` }}
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="pz-cyan px-1 italic">Tartalom feltoltes alatt...</p>
            )}
          </div>
        </div>

        <div
          ref={servicesRef}
          className={`transition-all delay-500 duration-700 ease-out ${
            servicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h4 className="pz-title pz-text-sweep relative mb-12 inline-block text-3xl font-black sm:text-4xl">
            {about.services_title}
            <span className="pz-rule absolute -bottom-4 left-0" />
          </h4>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {serviceBlocks.length > 0 ? (
              serviceBlocks.map((block, index) => (
                <article
                  key={index}
                  className={`pz-card pz-service-reveal p-6 ${
                    servicesVisible ? 'is-visible' : ''
                  } ${index === 0 ? 'from-left' : index === 1 ? 'from-bottom' : 'from-right'}`}
                  style={{ transitionDelay: `${760 + index * 320}ms` }}
                >
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
