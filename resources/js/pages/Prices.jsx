import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Prices({ prices = [] }) {
  const { trans, t } = useTranslations();
  const priceTranslations = trans?.prices ?? {};

  const normalizedCards = Array.isArray(prices)
    ? prices.map((price, index) => ({
        id: price.id ?? price.slug ?? index,
        slug: price.slug ?? index,
        title: price.title,
        description: price.description,
        feature_heading: price.feature_heading,
        features: Array.isArray(price.features) ? price.features : [],
        price_label: price.price_label,
      }))
    : [];

  const fallbackKeys = ['wordpress', 'webshop', 'custom', 'marketing'];

  const fallbackCards = fallbackKeys
    .map((key, index) => {
      const translation = priceTranslations?.[key];

      if (!translation || typeof translation !== 'object') {
        return null;
      }

      const descriptionParts = [translation.desc, translation.footer].filter(
        (part) => typeof part === 'string' && part.trim() !== '',
      );

      const description = descriptionParts.join('\n\n');
      const features = Array.isArray(translation.list)
        ? translation.list.filter((item) => typeof item === 'string' && item.trim() !== '')
        : [];

      if (
        !translation.title &&
        !description &&
        !translation.price &&
        !translation.not_included &&
        features.length === 0
      ) {
        return null;
      }

      return {
        id: key,
        slug: key,
        title: translation.title,
        description,
        feature_heading: translation.not_included,
        features,
        price_label: translation.price,
      };
    })
    .filter(Boolean);

  const cards = normalizedCards.length > 0 ? normalizedCards : fallbackCards;

  const cardBase =
    'border border-[#ff007a]/50 rounded-2xl p-6 sm:p-8 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300';

  const renderDescription = (description) => {
    if (typeof description !== 'string' || description.trim() === '') {
      return null;
    }

    return description
      .split('\n\n')
      .filter(Boolean)
      .map((paragraph, index) => {
        const lines = paragraph.split('\n').filter(Boolean);

        return (
          <p
            key={`${paragraph}-${index}`}
            className={`text-gray-300${index > 0 ? ' mt-4' : ''}`}
          >
            {lines.map((line, lineIndex) => (
              <React.Fragment key={`${line}-${lineIndex}`}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      });
  };

  return (
    <Layout>
      <Head title={priceTranslations.meta_title ?? t('menu.prices', 'Prices')} />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl p-4 sm:p-10">
          {priceTranslations.title && (
            <h1 className="text-3xl font-bold text-center text-[#FF007A]">
              {priceTranslations.title}
            </h1>
          )}

          <ul className="space-y-10 mt-10">
            {cards.map((price, index) => {
              const features = Array.isArray(price.features) ? price.features : [];

              return (
                <li key={price.id ?? price.slug ?? index} className={cardBase}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
                        {price.title}
                      </h2>

                      {renderDescription(price.description)}

                      {price.feature_heading && (
                        <p className="text-gray-300 mt-4">
                          <span className="font-bold text-[#FF007A] underline">
                            {price.feature_heading}
                          </span>
                        </p>
                      )}

                      {features.length > 0 && (
                        <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                          {features.map((feature, featureIndex) => (
                            <li key={`${feature}-${featureIndex}`}>{feature}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {price.price_label && (
                      <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
                        {price.price_label}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {(priceTranslations.note || priceTranslations.note_email) && (
            <p className="mt-12 text-center text-gray-400">
              {priceTranslations.note}{' '}
              {priceTranslations.note_email && (
                <span className="text-[#FF007A] font-semibold">
                  {priceTranslations.note_email}
                </span>
              )}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}