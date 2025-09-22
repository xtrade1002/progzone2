import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

function renderParagraphs(text) {
  if (!text) {
    return [];
  }

  return text.split(/\n+/).map((paragraph, index) => (
    <p key={index} className="text-gray-300">
      {paragraph}
    </p>
  ));
}

export default function Prices() {
  const { props } = usePage();
  const { prices = [] } = props;
  const { trans, t } = useTranslations();
  const pricesTrans = trans?.prices ?? {};
  const note = pricesTrans.note ?? '';
  const noteEmail = pricesTrans.note_email ?? '';

  return (
    <Layout>
      <Head title={pricesTrans.meta_title ?? t('menu.prices', 'Prices')} />
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-2xl p-10">
          <h1 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
            {pricesTrans.title}
          </h1>

          <ul className="space-y-8">
            {prices.map((item) => (
              <li
                key={item.id ?? item.slug}
                className="border border-[#ff007a] rounded-2xl p-6 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#FF007A]">{item.title}</h2>
                    <div className="space-y-4">{renderParagraphs(item.description)}</div>
                    {item.features?.length > 0 && (
                      <div className="text-gray-300">
                        {item.feature_heading && (
                          <p className="font-bold text-[#FF007A] underline">{item.feature_heading}</p>
                        )}
                        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                          {item.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {item.price_label && (
                    <span className="text-xl font-bold text-[#00f7ff] whitespace-nowrap">{item.price_label}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {(note || noteEmail) && (
            <p className="mt-12 text-center text-gray-400">
              {note}{' '}
              {noteEmail && <span className="text-[#FF007A] font-semibold">{noteEmail}</span>}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
