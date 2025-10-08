import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';
import { CONTACT_EMAIL_PLACEHOLDER } from '../lib/constants.js';

export default function Impressum() {
  const { trans, t } = useTranslations();
  const { props } = usePage();
  const contactEmail =
    typeof props?.contactEmail === 'string' && props.contactEmail.trim() !== ''
      ? props.contactEmail.trim()
      : null;
  const impressum = trans?.impressum ?? {};
  const details = Array.isArray(impressum.details) ? impressum.details : [];
  const resolvedDetails = details.map((item) => {
    if (item.type !== 'email') {
      return item;
    }

    const rawValue = typeof item.value === 'string' ? item.value.trim() : '';
    const fallbackValue =
      rawValue && rawValue !== CONTACT_EMAIL_PLACEHOLDER ? rawValue : null;

    return {
      ...item,
      value: contactEmail ?? fallbackValue ?? null,
    };
  });

  const renderValue = (item) => {
    if (item.type === 'email' && item.value) {
      return (
        <a href={`mailto:${item.value}`} className="text-[#00f7ff] hover:text-[#ff007a] transition">
          {item.value}
        </a>
      );
    }

    if (item.type === 'phone' && item.value) {
      return (
        <a href={`tel:${item.value.replace(/\s+/g, '')}`} className="text-[#00f7ff] hover:text-[#ff007a] transition">
          {item.value}
        </a>
      );
    }

    return item.value;
  };

  return (
    <Layout>
      <Head title={impressum.meta_title ?? t('menu.impressum', 'Impressum')} />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] mb-10">{impressum.title}</h1>

        <div className="bg-[#121317] border border-[#ff007a]/40 rounded-2xl p-8 shadow-[0_0_25px_#ff007a]/30 space-y-4 text-lg text-gray-300">
          {resolvedDetails.map((item, index) => (
            <p key={index}>
              <span className="font-semibold text-white">{item.label}</span>{' '}
              {renderValue(item)}
            </p>
          ))}
        </div>
      </section>
    </Layout>
  );
}
