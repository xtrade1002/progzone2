import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

/**
 * Prices oldal – szövegek a fordítási fájlból, árak adatbázisból.
 *
 * Props:
 *  - prices: object, kulcsok a slug-ok (pl. wordpress, woocommerce, egyedifejlesztes, marketing stb.)
 */
export default function Prices({ prices = {} }) {
  const { trans, t } = useTranslations();
  const tr = trans?.prices ?? {};

  // Fordítási kulcs → adatbázis slug leképezés
  const slugMap = {
    wordpress: 'wordpress',
    webshop: 'woocommerce',
    custom: 'egyedifejlesztes',
    marketing: 'marketing',
  };

  const placeholderSlugMap = {
    domain_price: 'domain',
    hosting_price: 'hosting',
    plugin_price: 'plugin',
    hourly_rate: 'extraFunctionsDev',
  };

  const fixMojibake = (value) => {
    if (typeof value !== 'string') return value;

    return value
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ã³/g, 'ó')
      .replace(/Ã¶/g, 'ö')
      .replace(/Å‘/g, 'ő')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã¼/g, 'ü')
      .replace(/Å±/g, 'ű')
      .replace(/Ã/g, 'Á')
      .replace(/Ã‰/g, 'É')
      .replace(/Ã/g, 'Í')
      .replace(/Ã“/g, 'Ó')
      .replace(/Ã–/g, 'Ö')
      .replace(/Å/g, 'Ő')
      .replace(/Ãš/g, 'Ú')
      .replace(/Ãœ/g, 'Ü')
      .replace(/Å°/g, 'Ű');
  };

  const formatPriceValue = (priceObj) => {
    if (!priceObj) return '';

    const { price_value, price_label, currency, extras } = priceObj;

    const currencyLocaleMap = {
      Ft: 'hu-HU',
      HUF: 'hu-HU',
      EUR: 'de-DE',
      CHF: 'de-CH',
    };

    const numericValue =
      price_value !== null && price_value !== undefined && price_value !== ''
        ? Number(price_value)
        : null;
    const hasNumericValue = Number.isFinite(numericValue);
    const locale = currencyLocaleMap[currency] || 'hu-HU';

    let formattedNumber = hasNumericValue
      ? new Intl.NumberFormat(locale, {
          minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
          maximumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
        }).format(numericValue)
      : fixMojibake(price_label ?? '').trim();

    if (locale === 'hu-HU') {
      formattedNumber = formattedNumber.replace(/\s/g, '.');
    }

    if (!formattedNumber) {
      return '';
    }

    const currencyClean = typeof currency === 'string' ? fixMojibake(currency).trim() : '';
    const currencyPart = currencyClean ? ` ${currencyClean}` : '';

    let extrasClean = typeof extras === 'string' ? fixMojibake(extras).trim() : '';
    extrasClean = extrasClean.replace(/^\/\s+/, '/').replace(/^-\s+/, '-');

    let extrasPart = '';
    if (extrasClean) {
      extrasPart = extrasClean.startsWith('/') || extrasClean.startsWith('-')
        ? extrasClean
        : ` ${extrasClean}`;
    }

    return `${formattedNumber}${currencyPart}${extrasPart}`.trim();
  };

  // Helyőrzők cseréje (kezeli a {key}, :key, ({key}) formátumokat is)
  const replacePlaceholders = (text) => {
    if (!text) return text;

    let result = text;

    Object.entries(placeholderSlugMap).forEach(([placeholder, slug]) => {
      const priceObj = prices?.[slug];
      const value = formatPriceValue(priceObj);

      if (!value) return;

      const replacements = [
        { search: `({${placeholder}})`, replaceWith: `(${value})` },
        { search: `{${placeholder}}`, replaceWith: value },
        { search: `:${placeholder}`, replaceWith: value },
      ];

      replacements.forEach(({ search, replaceWith }) => {
        result = result.split(search).join(replaceWith);
      });
    });

    return result;
  };

  // Kártya megjelenítése
  const renderCard = (key) => {
    const block = tr[key];
    if (!block) return null;

    const slug = slugMap[key] || key;
    const priceObj = prices[slug];

    return (
      <li
        key={key}
        className="pz-card rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex-1 min-w-0">
            {/* Cím */}
            <h2 className="mb-3 text-2xl font-black text-[var(--pz-pink)]">
              {block.title}
            </h2>

            {/* Leírás */}
            {block.desc && (
              <p className="whitespace-pre-line leading-relaxed text-slate-300">
                {replacePlaceholders(block.desc)}
              </p>
            )}

            {/* “Az ár NEM tartalmazza” */}
            {block.not_included && (
              <p className="mt-4 text-slate-300">
                <span className="font-bold text-[#00eaff]">
                  {block.not_included}
                </span>
              </p>
            )}

            {/* Listaelemek */}
            {Array.isArray(block.list) && (
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-400">
                {block.list.map((item, idx) => (
                  <li key={idx}>
                    {replacePlaceholders(item)}
                  </li>
                ))}
              </ul>
            )}

            {/* Lábjegyzet */}
            {block.footer && (
              <p className="mt-4 text-slate-300">
                {replacePlaceholders(block.footer)}
              </p>
            )}
          </div>

          {/* Az adatbázisból érkező ár kiírása */}
          {priceObj && (
            <span className="pz-cyan mt-2 break-words text-lg font-black sm:text-xl md:mt-0">
              {formatPriceValue(priceObj)}
            </span>
          )}
        </div>
      </li>
    );
  };

  return (
    <Layout>
      <Head title={tr.meta_title ?? t('menu.prices', 'Prices')} />
      <section className="pz-section max-w-5xl">
        <div className="pz-panel rounded-[2rem] p-5 sm:p-10">
          {tr.title && (
            <h1 className="pz-title text-center text-4xl font-black">
              {tr.title}
            </h1>
          )}

          <ul className="mt-10 space-y-6">
            {renderCard('wordpress')}
            {renderCard('webshop')}
            {renderCard('custom')}
            {renderCard('marketing')}
          </ul>

          {(tr.note || tr.note_email) && (
            <p className="mt-12 text-center text-slate-400">
              {tr.note}{' '}
              {tr.note_email && (
                <span className="font-bold text-[#00eaff]">
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
