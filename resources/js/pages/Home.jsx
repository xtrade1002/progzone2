import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Home() {
  const { trans, t } = useTranslations();
  const home = trans?.home ?? {};
  const paragraphs = Array.isArray(home.paragraphs) ? home.paragraphs : [];

  // Fix szavak animációhoz
  const words = ["Webdesign.", "Marketing.", "Weboldalkészítés.", "Webshop készítés."];

  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = deleting ? 50 : 120; // törlés gyorsabb, írás lassabb

    const interval = setInterval(() => {
      if (!deleting) {
        // gépelés
        setDisplayedText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentWord.length) {
          // ha kész → vár, majd töröl
          setTimeout(() => setDeleting(true), 1000);
          clearInterval(interval);
        }
      } else {
        // törlés
        setDisplayedText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          // ha kitörölte → következő szó
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

  return (
    <Layout>
      <Head title="ProgZone – Home" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-16 text-center space-y-6 border border-[#00f7ff]/30 rounded-2xl shadow-[0_0_25px_#00f7ff55] bg-[#0a0a0f]/60">
        
        {/* Typewriter animált szövegváltás */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FF007A] mb-12 drop-shadow-[0_0_15px_#ff007a] h-16">
          {displayedText}
          <span className="text-[#00f7ff]">{cursorVisible ? '|' : ' '}</span>
        </h1>

        {/* Bekezdések adatbázisból vagy fallback */}
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base sm:text-lg text-gray-300 leading-relaxed"
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
