import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

const sectionStyles = [
  'relative rounded-2xl bg-[#121317] border border-[#ff007a]/40 p-10 shadow-[0_0_25px_#ff007a55]',
  'relative rounded-2xl bg-[#121317] border border-[#ff007a]/40 p-10 shadow-[0_0_25px_#00f7ff55]',
];

function renderRichText(text) {
  if (!text) {
    return null;
  }

  const tokens = text.split(/(\[highlight\]|\[\/highlight\])/);
  let isHighlight = false;

  return tokens.map((token, index) => {
    if (token === '[highlight]') {
      isHighlight = true;
      return null;
    }

    if (token === '[/highlight]') {
      isHighlight = false;
      return null;
    }

    if (!token) {
      return null;
    }

    return isHighlight ? (
      <span key={`highlight-${index}`} className="text-white font-semibold">
        {token}
      </span>
    ) : (
      <React.Fragment key={`text-${index}`}>{token}</React.Fragment>
    );
  });
}

export default function Infos() {
  const { trans, t } = useTranslations();
  const infos = trans?.infos ?? {};
  const sections = Array.isArray(infos.sections) ? infos.sections : [];
  const cards = Array.isArray(infos.cards) ? infos.cards : [];

  return (
    <Layout>
      <Head title={infos.meta_title ?? t('menu.infos', 'Infos')} />
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
          {infos.title}
        </h1>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className={sectionStyles[index] ?? sectionStyles[0]}>
              <div className="absolute -top-6 left-6 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff007a] to-[#00f7ff] text-white font-bold shadow-[0_0_20px_#ff007a]">
                {index + 1}
              </div>
              <h2 className="text-2xl font-bold text-[#FF007A] mb-4">{section.title}</h2>
              {section.lead && <p className="text-gray-300 font-semibold mb-2">{section.lead}</p>}
              {(section.description ?? []).map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-gray-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#121317] border border-[#ff007a]/40 p-8 shadow-[0_0_20px_#ff007a33]"
              >
                <h2 className="text-2xl font-bold text-[#FF007A] mb-4">{card.title}</h2>
                <p className="text-gray-400 leading-relaxed">{renderRichText(card.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
