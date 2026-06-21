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
      <section className="pz-section max-w-3xl">
        <h1 className="pz-title mb-10 text-center text-4xl font-black">{impressum.title}</h1>

        <div className="pz-panel space-y-4 rounded-[2rem] p-8 text-lg text-slate-300">
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
