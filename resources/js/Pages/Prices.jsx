import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';
import { CONTACT_EMAIL_PLACEHOLDER } from '../lib/constants.js';

/**
 * Prices oldal – szövegek a fordítási fájlból, árak adatbázisból.
 *
 * Props:
 *  - prices: object, kulcsok a slug-ok (pl. wordpress, woocommerce, egyedifejlesztes, marketing stb.)
 */
export default function Prices(props) {
  const {
    prices = {},
    contactEmail: sharedContactEmail = null,
    domain = null,
    locale = null,
  } = props;
  const { trans, t } = useTranslations();
  const tr = trans?.prices ?? {};
  const contactEmail =
    typeof sharedContactEmail === 'string' && sharedContactEmail.trim() !== ''
      ? sharedContactEmail.trim()
      : null;

  const noteEmailRaw = typeof tr.note_email === 'string' ? tr.note_email.trim() : '';
  const noteEmailFallback =
    noteEmailRaw && noteEmailRaw !== CONTACT_EMAIL_PLACEHOLDER ? noteEmailRaw : null;
  const displayContactEmail = contactEmail ?? noteEmailFallback ?? null;

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

  useEffect(() => {
    console.log('=== 🧩 Prices Debug Info ===');
    console.log('Prices props:', props);
    console.log('============================');
  }, [props]);

  const debugDump = { domain, locale, prices };

  if (!prices || Object.keys(prices).length === 0) {
    return (
      <Layout>
        <Head title={tr.meta_title ?? t('menu.prices', 'Prices')} />
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-[#121317] border border-red-500/50 rounded-2xl p-6 sm:p-10 text-gray-200 space-y-6">
            <h1 className="text-2xl font-bold text-[#FF007A] flex items-center gap-2">
              <span role="img" aria-hidden="true">
                ⚠️
              </span>
              Nincs ár adat a backendtől!
            </h1>
            <p>
              Ez azt jelenti, hogy a Laravel (<code>PriceController</code>) nem küldött árakat az Inertia-nak.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Ellenőrizd a <code>storage/logs/laravel.log</code> fájlt (keresd a „Resolved domain” sort).</li>
              <li>Győződj meg róla, hogy a <code>prices</code> táblában van adat a domainhez.</li>
              <li>Ellenőrizd a <code>PriceController</code> végén, hogy a <code>$mappedPrices</code> nem üres-e.</li>
            </ol>
            <div>
              <h2 className="text-xl font-semibold text-[#00f7ff] mb-2">Debug info (props dump)</h2>
              <pre className="bg-black/60 border border-[#00f7ff]/40 rounded-lg p-4 text-xs overflow-auto">
                {JSON.stringify(debugDump, null, 2)}
              </pre>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

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

    const formattedNumber = hasNumericValue
      ? new Intl.NumberFormat(locale, {
          minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
          maximumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
        }).format(numericValue)
      : (price_label ?? '').trim();

    if (!formattedNumber) {
      return '';
    }

    const currencyClean = typeof currency === 'string' ? currency.trim() : '';
    const currencyPart = currencyClean ? ` ${currencyClean}` : '';

    let extrasClean = typeof extras === 'string' ? extras.trim() : '';
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
        className="border border-[#ff007a]/50 rounded-2xl p-6 sm:p-8 bg-[#121317] hover:shadow-[0_0_30px_#ff007a] transition duration-300"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex-1 min-w-0">
            {/* Cím */}
            <h2 className="text-2xl font-bold text-[#FF007A] mb-3">
              {block.title}
            </h2>

            {/* Leírás */}
            {block.desc && (
              <p className="text-gray-300 whitespace-pre-line">
                {replacePlaceholders(block.desc)}
              </p>
            )}

            {/* “Az ár NEM tartalmazza” */}
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
                  <li key={idx}>
                    {replacePlaceholders(item)}
                  </li>
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
          {priceObj && (
            <span className="text-lg sm:text-xl font-bold text-[#00f7ff] mt-2 md:mt-0 break-words">
              {priceObj.price_label} {priceObj.currency}{' '}
              {priceObj.extras}
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

          {(tr.note || displayContactEmail) && (
            <p className="mt-12 text-center text-gray-400">
              {tr.note}{' '}
              {displayContactEmail && (
                <span className="text-[#FF007A] font-semibold">
                  {displayContactEmail}
                </span>
              )}
            </p>
          )}
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-[#00f7ff] mb-3">🔍 Raw Data Dump (Inertia props)</h2>
          <pre className="bg-black/60 border border-[#00f7ff]/40 rounded-lg p-4 text-xs overflow-auto">
            {JSON.stringify(debugDump, null, 2)}
          </pre>
        </div>
      </section>
    </Layout>
  );
}
