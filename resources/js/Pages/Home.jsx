
import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Home() {
  const { trans, t } = useTranslations();
  const home = trans?.home ?? {};
  const paragraphs = Array.isArray(home.paragraphs) ? home.paragraphs : [];

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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-16 text-center space-y-10 rounded-2xl">

        {/* Typewriter animált szöveg */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#FF007A] mb-6 drop-shadow-[0_0_30px_#ff007a] h-24 tracking-wide">
          {displayedText}
          <span className="text-[#00f7ff]">{cursorVisible ? "|" : " "}</span>
        </h1>

        {/* Idézetszerű mottó az első paragraphból + fade-in animáció */}
        {paragraphs.length > 0 && (
          <p
            className={`max-w-3xl mx-auto text-xl sm:text-2xl italic text-gray-200 border-l-4 border-[#ff007a] pl-6 leading-relaxed transition-opacity duration-1000 ${showMotto ? "opacity-100" : "opacity-0"
              }`}
          >
            „{paragraphs[0]}”
          </p>
        )}
      </section>
    </Layout>
  );
}
