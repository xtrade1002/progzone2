
import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';

export default function Home() {
  const { locale, trans, t } = useTranslations();
  const home = trans?.home ?? {};
  const paragraphs = Array.isArray(home.paragraphs) ? home.paragraphs : [];
  const highlights = Array.isArray(home.highlights)
    ? home.highlights
    : ['Modern', 'Reszponziv', 'Celorientalt'];

  // Szavak a fordításból
  const words = Array.isArray(home.typewriter) ? home.typewriter : [];

  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showMotto, setShowMotto] = useState(false);

  // typewriter logika
  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex];
    let typingSpeed = deleting ? 50 : 120; // törlés gyorsabb, írás lassabb

    const interval = setInterval(() => {
      if (!deleting) {
        setDisplayedText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setDeleting(true), 1000);
          clearInterval(interval);
        }
      } else {
        setDisplayedText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          clearInterval(interval);
        }
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [charIndex, deleting, wordIndex, words]);

  // kurzor villogás
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  // mottó fade-in késleltetéssel
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMotto(true);
    }, 1500); // kb. 1,5s a typewriter után
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head title={home.meta_title ?? t('menu.home', 'Home')} />
      <section className="pz-section grid min-h-[calc(100vh-76px)] items-center gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
        <div className="space-y-9">
          <div className="space-y-4">
            <h1 className="min-h-[5.8rem] text-5xl font-black leading-none sm:min-h-[7.5rem] sm:text-7xl lg:text-8xl">
              <span className="pz-gradient-text">{displayedText}</span>
              <span className="pz-cyan">{cursorVisible ? "|" : " "}</span>
            </h1>

            {paragraphs.length > 0 && (
              <p
                className={`max-w-3xl border-l-4 border-[var(--pz-pink)] pl-6 text-xl font-semibold italic leading-relaxed text-slate-100 transition-all duration-1000 sm:text-2xl ${
                  showMotto ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                "{paragraphs[0]}"
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a href={route('quote', locale)} className="pz-button">
              {home.cta_quote ?? t('menu.quote', 'Arajanlat')}
            </a>
            <a href={route('references', locale)} className="pz-button pz-button-secondary">
              {home.cta_references ?? t('menu.references', 'Referenciak')}
            </a>
          </div>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div key={item} className="pz-card rounded-2xl px-5 py-4">
                <span className="block text-xs font-black uppercase tracking-[0.18em] text-[#00eaff]">
                  0{index + 1}
                </span>
                <span className="mt-2 block text-lg font-bold text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl items-center justify-center py-8">
          <div className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#00eaff] shadow-[0_0_24px_#00eaff]" />
          <div className="absolute left-0 top-6 h-[76%] w-[62%] rounded-full border-4 border-[var(--pz-pink)] shadow-[0_0_34px_rgb(var(--pz-pink-rgb)/0.76)]" />
          <div className="pz-logo-orb z-10" aria-hidden="true" />
          <div className="pz-device-line absolute inset-0 hidden md:block" aria-hidden="true" />
        </div>
      </section>
    </Layout>
  );
}
