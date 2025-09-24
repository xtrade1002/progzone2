import React, { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

/**
 * Prices oldal – szövegek a fordítási fájlból, árak adatbázisból.
 * Props:
 *  - prices: object, kulcsok a slug-ok (pl. wordpress, woocommerce, egyedifejlesztes, marketing stb.)
 */
export default function Prices({ prices = {} }) {
  const { trans, t } = useTranslations();
  const tr = trans?.prices ?? {};

  const normalizeSlug = (slug) => {
    if (!slug) return '';

    return slug
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Normalizált árlista objektum a slug → ár gyors kereséséhez
  const priceMap = useMemo(() => {
    if (!prices) return {};

    const entries = Array.isArray(prices)
      ? prices.map((item) => [item?.slug ?? null, item])
      : Object.entries(prices ?? {});

    return entries.reduce((acc, [key, item]) => {
      if (!item || typeof item !== 'object') {
        return acc;
      }

      const possibleSlugs = [key, item.slug].filter(Boolean);

      for (const slug of possibleSlugs) {
        const normalized = normalizeSlug(slug);

        if (slug && !acc[slug]) {
          acc[slug] = item;
        }

        if (normalized && !acc[normalized]) {
          acc[normalized] = item;
        }
      }

      return acc;
    }, {});
  }, [prices]);

  const getPriceBySlug = (slugCandidates) => {
    const candidates = Array.isArray(slugCandidates) ? slugCandidates : [slugCandidates];

    for (const candidate of candidates) {
      if (!candidate) continue;

      if (priceMap[candidate]) {
        return priceMap[candidate];
      }

      const normalized = normalizeSlug(candidate);
      if (normalized && priceMap[normalized]) {
        return priceMap[normalized];
      }
    }

    return null;
  };

  const formatPriceText = (priceObj) => {
    if (!priceObj || typeof priceObj !== 'object') return '';

    return [priceObj.price_label, priceObj.currency, priceObj.extras]
      .filter(Boolean)
      .join(' ')
      .trim();
  };

  // Fordítási kulcs → adatbázis slug leképezés (több lehetséges sluggal)
  const slugMap = {
    wordpress: ['wordpress-website', 'wordpress'],
    webshop: ['woocommerce-store', 'webshop'],
    custom: ['custom-website', 'custom'],
    marketing: ['marketing'],
  };

  // Külön ármezők a placeholder-ekhez (extras)
  const extras = {
    domain_price:
      getPriceBySlug(['domain', 'domain-price'])?.price_label ??
      prices?.domain?.price_label ??
      '',
    hosting_price:
      getPriceBySlug(['hosting', 'hosting-price'])?.price_label ??
      prices?.hosting?.price_label ??
      '',
    plugin_price:
      getPriceBySlug(['plugin', 'plugin-price'])?.price_label ??
      prices?.plugin?.price_label ??
      '',
    hourly_rate:
      getPriceBySlug(['extra-functions', 'extra-functions-dev', 'extraFunctionsDev', 'hourly-rate'])?.price_label ??
      prices?.extraFunctionsDev?.price_label ??
      '',
  };

  // Helyettesítés a {domain_price}, {plugin_price} stb. helyőrzőkre
  const replacePlaceholders = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text
      .replace('{domain_price}', extras.domain_price)
      .replace('{hosting_price}', extras.hosting_price)
      .replace('{plugin_price}', extras.plugin_price)
      .replace('{hourly_rate}', extras.hourly_rate);
  };

  const renderCard = (key) => {
    const block = tr[key];
    if (!block) return null;

    const slugs = slugMap[key] || [key];
    const priceObj = getPriceBySlug(slugs);
    const priceText = formatPriceText(priceObj);

    return (
      <li className="border border-[#ff007a]/50 rounded-2xl p-6 sm:p-8 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
              {block.title}
            </h2>

            {/* Leírás */}
            {block.desc && (
              <p className="text-gray-300 whitespace-pre-line">
                {replacePlaceholders(block.desc)}
              </p>
            )}

            {/* "Az ár nem tartalmazza" */}
            {block.not_included && (
              <p className="text-gray-300 mt-4">
                <span className="font-bold text-[#FF007A] underline">
                  {block.not_included}
                </span>
              </p>
            )}

            {/* Listaelemek */}
            {Array.isArray(block.list) && (
              <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                {block.list.map((item, idx) => (
                  <li key={idx}>{replacePlaceholders(item)}</li>
                ))}
              </ul>
            )}

            {/* Lábjegyzet */}
            {block.footer && (
              <p className="text-gray-300 mt-4">
                {replacePlaceholders(block.footer)}
              </p>
            )}
          </div>

          {/* Az adatbázisból érkező ár kiírása */}
          {priceText && (
            <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
              {priceText}
            </span>
          )}
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