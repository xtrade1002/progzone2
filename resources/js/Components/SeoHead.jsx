import React, { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function SeoHead() {
  const { seo } = usePage().props;

  useEffect(() => {
    if (seo) document.documentElement.lang = seo.locale;
  }, [seo?.locale]);

  if (!seo) return null;

  return (
    <Head title={seo.title}>
      <meta head-key="description" name="description" content={seo.description} />
      <link head-key="canonical" rel="canonical" href={seo.canonical} />
      {Object.entries(seo.alternates).map(([language, href]) => (
        <link key={language} head-key={`alternate-${language}`} rel="alternate" hrefLang={language} href={href} />
      ))}
      <meta head-key="og:type" property="og:type" content="website" />
      <meta head-key="og:title" property="og:title" content={seo.title} />
      <meta head-key="og:description" property="og:description" content={seo.description} />
      <meta head-key="og:url" property="og:url" content={seo.canonical} />
      <meta head-key="og:site_name" property="og:site_name" content="Progzone" />
      <meta head-key="og:locale" property="og:locale" content={seo.ogLocale} />
      {seo.ogAlternateLocales.map((locale) => (
        <meta key={locale} head-key={`og:locale:${locale}`} property="og:locale:alternate" content={locale} />
      ))}
      <meta head-key="og:image" property="og:image" content={seo.image} />
      <meta head-key="twitter:card" name="twitter:card" content="summary" />
      <meta head-key="twitter:title" name="twitter:title" content={seo.title} />
      <meta head-key="twitter:description" name="twitter:description" content={seo.description} />
      <meta head-key="twitter:image" name="twitter:image" content={seo.image} />
      <script head-key="structured-data" type="application/ld+json">
        {JSON.stringify(seo.structuredData).replace(/</g, '\\u003c')}
      </script>
    </Head>
  );
}
