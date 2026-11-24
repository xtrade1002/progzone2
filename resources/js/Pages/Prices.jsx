import React from 'react';
import { Link } from '@inertiajs/react';
import { localizedRoute } from '../route.js';
import pricesDesignContent from '../data/pricesDesignContent.js';
import '../../css/inquiry-design.css';
import '../../css/prices.css';
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
    locale = null,
  } = props;
  const { trans, locale: currentLocale } = useTranslations();
  const language = locale ?? currentLocale;
  const copy = pricesDesignContent(language);
  const quoteHref = localizedRoute('quote', language, props.localizedRoutes);
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
    wordpress: ['wordpress', 'wordpress-website', 'wordpress_website'],
    webshop: ['woocommerce', 'woocommerce-2', 'webshop', 'webshop-woocommerce', 'online-shop'],
    custom: ['egyedifejlesztes', 'custom'],
    mobile_app: ['mobile-app', 'mobile_app'],
    marketing: ['marketing', 'marketing-2'],
  };

  const placeholderKeyMap = {
    domain_price: ['domain', 'domain_price'],
    hosting_price: ['hosting', 'hosting_price'],
    plugin_price: ['plugin', 'plugin_price'],
    hourly_rate: ['extraFunctionsDev', 'extrafunctionsdev', 'hourly_rate'],
  };

  const resolvePriceObject = (keys) => {
    const candidates = Array.isArray(keys) ? keys : [keys];

    for (const candidate of candidates) {
      if (candidate && prices?.[candidate]) {
        return prices[candidate];
      }
    }

    return null;
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

    const formattedNumber = hasNumericValue
      ? new Intl.NumberFormat(locale, {
          minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
          maximumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
        }).format(numericValue)
      : (price_label ?? '').trim();

    if (!formattedNumber) {
      return '';
    }

    const normalizePriceText = (value) =>
      String(value ?? '').toLowerCase().replace(/\s+/g, '');

    const formattedNormalized = normalizePriceText(formattedNumber);
    const currencyClean = typeof currency === 'string' ? currency.trim() : '';
    const shouldAppendCurrency =
      currencyClean && !formattedNormalized.includes(normalizePriceText(currencyClean));
    const currencyPart = shouldAppendCurrency ? ` ${currencyClean}` : '';

    let extrasClean = typeof extras === 'string' ? extras.trim() : '';
    extrasClean = extrasClean.replace(/^\/\s+/, '/').replace(/^-\s+/, '-');

    let extrasPart = '';
    if (extrasClean && !formattedNormalized.includes(normalizePriceText(extrasClean))) {
      extrasPart = extrasClean.startsWith('/') || extrasClean.startsWith('-')
        ? extrasClean
        : ` ${extrasClean}`;
    }

    return `${formattedNumber}${currencyPart}${extrasPart}`.trim();
  };

  // Helyőrzők cseréje (kezeli a {{key}}, {key}, :key, és zárójeles formátumokat is)
  const replacePlaceholders = (text) => {
    if (!text) return text;

    let result = text;

    Object.entries(placeholderKeyMap).forEach(([placeholder, keys]) => {
      const priceObj = resolvePriceObject(keys);
      const value = formatPriceValue(priceObj);

      if (!value) return;

      const replacements = [
        { search: `({{${placeholder}}})`, replaceWith: `(${value})` },
        { search: `({${placeholder}})`, replaceWith: `(${value})` },
        { search: `{{${placeholder}}}`, replaceWith: value },
        { search: `{${placeholder}}`, replaceWith: value },
        { search: `:${placeholder}`, replaceWith: value },
      ];

      replacements.forEach(({ search, replaceWith }) => {
        result = result.split(search).join(replaceWith);
      });
    });

    return result;
  };

  const serviceKeys = ['wordpress', 'webshop', 'custom', 'mobile_app', 'marketing'];
  const hasPrices = prices && Object.keys(prices).length > 0;

  const renderService = (key, index) => {
    const block = tr[key];
    if (!block) return null;
    const priceObj = resolvePriceObject(slugMap[key] || key);
    const formattedPrice = formatPriceValue(priceObj) || block.price_label;
    return <li key={key} className="prices-row">
      <div className="prices-row-main">
        <span className="prices-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div className="prices-service">
          <h2>{copy.names[index] ?? block.title}</h2>
          <p>{copy.descriptions[index]}</p>
        </div>
        {formattedPrice && <div className="prices-amount">
          <span>{copy.units[index]}</span>
          <strong>{formattedPrice}</strong>
          {key === 'marketing' && <p className="prices-budget-note">{copy.marketingNote}</p>}
        </div>}
      </div>
      <details className="prices-details">
        <summary>{copy.details}<span className="sr-only"> — {copy.names[index] ?? block.title}</span></summary>
        <div className="prices-conditions">
          {key === 'marketing' ? <p>{copy.marketingDetails}</p> : block.desc && <p>{replacePlaceholders(block.desc)}</p>}
          {block.not_included && <h3>{block.not_included}</h3>}
          {Array.isArray(block.list) && <ul>{block.list.map((item, i) => <li key={i}>{replacePlaceholders(item)}</li>)}</ul>}
          {block.footer && <p>{replacePlaceholders(block.footer)}</p>}
        </div>
      </details>
    </li>;
  };

  return <Layout variant="inquiry">
    <div className="prices-page">
      <header className="prices-hero">
        <p className="prices-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}<br /><span>{copy.accent}</span></h1>
        <p className="prices-intro">{copy.intro}</p>
        <svg className="prices-hero-art" viewBox="0 0 500 170" fill="none" aria-hidden="true" focusable="false">
          <path d="M0 72C130-20 320 205 500 40" stroke="var(--pz-cyan)" strokeWidth="1.5" />
          <path d="M0 132C200 190 310-10 500 70" stroke="var(--pz-pink)" strokeWidth="1.5" />
        </svg>
      </header>
      {hasPrices ? <>
        <ol className="prices-list">{serviceKeys.map(renderService)}</ol>
        <aside className="prices-extras"><h2>{copy.extraTitle}</h2><p>{copy.extra}</p></aside>
      </> : <p className="prices-empty" role="status">{copy.unavailable}</p>}
      <div className="prices-footer"><p>{copy.final}</p><Link className="inquiry-submit" href={quoteHref}>{copy.cta}</Link></div>
      {displayContactEmail && <p className="prices-contact">{tr.note}{' '}<a href={'mailto:' + displayContactEmail}>{displayContactEmail}</a></p>}
    </div>
  </Layout>;
}
