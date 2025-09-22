import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function Prices() {
  const { props } = usePage();
  const priceItems = Array.isArray(props?.prices) ? props.prices : [];
  const { trans, t } = useTranslations();
  const pricesTrans = trans?.prices ?? {};
  const defaultTitle = t('menu.prices', 'Prices');
  const pageTitle = pricesTrans.title ?? defaultTitle;
  const metaTitle = pricesTrans.meta_title ?? pageTitle;
  const note = pricesTrans.note ?? '';
  const noteEmail = pricesTrans.note_email ?? '';

  return (
    <Layout>
      <Head title={metaTitle} />
      <section className="max-w-5xl mx-auto w-full px-6 py-16">
        <div className="rounded-2xl p-10">
          <h1 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
            {pageTitle}
          </h1>

          <ul className="space-y-8">
            {priceItems.map((price, index) => {
              const key = price?.id ?? price?.slug ?? index;
              const paragraphs =
                typeof price?.description === 'string'
                  ? price.description
                      .split('\n')
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean)
                  : [];
              const features = Array.isArray(price?.features) ? price.features : [];

              return (
                <li
                  key={key}
                  className="border border-[#ff007a] rounded-2xl p-6 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-4 text-gray-300">
                      <h2 className="text-2xl font-bold text-[#FF007A]">{price.title}</h2>
                      {paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}

                      {(price.feature_heading || features.length > 0) && (
                        <div>
                          {price.feature_heading && (
                            <p className="font-bold text-[#FF007A] underline">{price.feature_heading}</p>
                          )}
                          {features.length > 0 && (
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              {features.map((feature, featureIndex) => (
                                <li key={featureIndex}>{feature}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    {price.price_label && (
                      <span className="text-xl font-bold text-[#00f7ff] whitespace-nowrap md:pl-6">
                        {price.price_label}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {note && (
            <p className="mt-12 text-center text-gray-400">
              {note}{' '}
              {noteEmail && (
                <a href={`mailto:${noteEmail}`} className="text-[#FF007A] font-semibold">
                  {noteEmail}
                </a>
              )}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}

