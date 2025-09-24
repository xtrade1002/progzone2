import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Prices({ prices = {} }) {
  const { trans, t } = useTranslations();
  const tr = trans?.prices ?? {};

  const cardBase =
    'border border-[#ff007a]/50 rounded-2xl p-6 sm:p-8 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300';

  // Helyőrzők kicserélése DB árakkal
  const replacePlaceholders = (text) => {
    if (!text) return '';
    return text
      .replace(
        '{domain_price}',
        `${prices.domain?.price_label ?? ''} ${prices.domain?.currency ?? ''}${prices.domain?.extras ?? ''}`
      )
      .replace(
        '{hosting_price}',
        `${prices.hosting?.price_label ?? ''} ${prices.hosting?.currency ?? ''}${prices.hosting?.extras ?? ''}`
      )
      .replace(
        '{plugin_price}',
        `${prices.plugin?.price_label ?? ''} ${prices.plugin?.currency ?? ''}${prices.plugin?.extras ?? ''}`
      )
      .replace(
        '{hourly_rate}',
        `${prices.extraFunctionsDev?.price_label ?? ''} ${prices.extraFunctionsDev?.currency ?? ''}${prices.extraFunctionsDev?.extras ?? ''}`
      );
  };

  const renderCard = (key) => {
    const block = tr[key];
    if (!block) return null;

    return (
      <li className={cardBase}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
              {block.title}
            </h2>
            {block.desc && (
              <p className="text-gray-300 whitespace-pre-line">
                {block.desc}
              </p>
            )}

            {block.not_included && (
              <p className="text-gray-300 mt-4">
                <span className="font-bold text-[#FF007A] underline">
                  {block.not_included}
                </span>
              </p>
            )}

            {Array.isArray(block.list) && (
              <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                {block.list.map((item, i) => (
                  <li key={i}>{replacePlaceholders(item)}</li>
                ))}
              </ul>
            )}

            {block.footer && (
              <p className="text-gray-300 mt-4">
                {replacePlaceholders(block.footer)}
              </p>
            )}
          </div>

          <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
            {prices[key]?.price_label} {prices[key]?.currency}{' '}
            {prices[key]?.extras}
          </span>
        </div>
      </li>
    );
  };

  return (
    <Layout>
      <Head title={tr.meta_title ?? t('menu.prices', 'Prices')} />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl p-4 sm:p-10">
          {tr.title && (
            <h1 className="text-3xl font-bold text-center text-[#FF007A]">
              {tr.title}
            </h1>
          )}

          <ul className="space-y-10 mt-10">
            {renderCard('wordpress')}
            {renderCard('webshop')}
            {renderCard('custom')}
            {renderCard('marketing')}
          </ul>

          {(tr.note || tr.note_email) && (
            <p className="mt-12 text-center text-gray-400">
              {tr.note}{' '}
              {tr.note_email && (
                <span className="text-[#FF007A] font-semibold">
                  {tr.note_email}
                </span>
              )}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}