import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';

const inputClasses =
  'w-full rounded-lg border border-gray-600 bg-transparent p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none transition';

const createInitialFormState = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  referenceSites: '',
  targetAudience: '',
  languages: '',
  features: '',
  contentSource: '',
  billingInfo: '',
  paymentMethod: '',
  support: '',
  hostingDomain: '',
  integrations: '',
  marketing: '',
  legal: '',
  priority: '',
  privacy: false,
});

export default function QuoteRequest() {
  const [formData, setFormData] = useState(createInitialFormState);
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const errors = props?.errors ?? {};
  const { trans, t } = useTranslations();
  const quote = trans?.quote ?? {};
  const fields = quote.fields ?? {};
  const serviceOptions = fields.service?.options ?? [];
  const budgetOptions = fields.budget?.options ?? [];
  const introParagraphs = Array.isArray(quote.intro) ? quote.intro : [];

  const handleChange = (field) => (event) => {
    const value = field === 'privacy' ? event.target.checked : event.target.value;
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    router.post(route('quote-request.store'), formData, {
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => setFormData(createInitialFormState()),
    });
  };

  return (
    <Layout>
      <Head title={quote.meta_title ?? t('menu.quote', 'Quote request')} />
      <section className="w-full px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-700 bg-black/30 p-10 shadow-[0_0_45px_rgba(255,0,122,0.18)]">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#FF007A] drop-shadow-[0_0_20px_#ff007a]">
              {quote.title}
            </h2>
            {introParagraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-300">
                {paragraph}
              </p>
            ))}
            {quote.hint && <p className="text-sm text-gray-400">{quote.hint}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Név + Email */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Teljes név *"
                required
                className={inputClasses}
                value={formData.name}
                onChange={handleChange('name')}
              />
              <input
                type="email"
                placeholder="E-mail cím *"
                required
                className={inputClasses}
                value={formData.email}
                onChange={handleChange('email')}
              />
            </div>

            {/* Telefon + Cég */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                type="tel"
                placeholder="Telefonszám"
                className={inputClasses}
                value={formData.phone}
                onChange={handleChange('phone')}
              />
              <input
                type="text"
                placeholder="Cég / projekt neve"
                className={inputClasses}
                value={formData.company}
                onChange={handleChange('company')}
              />
            </div>

            {/* Szolgáltatás + Költségkeret */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <select
                required
                value={formData.service}
                onChange={handleChange('service')}
                className={`${inputClasses} bg-[#151522]`}
              >
                <option value="">Kívánt szolgáltatás *</option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={formData.budget}
                onChange={handleChange('budget')}
                className={`${inputClasses} bg-[#151522]`}
              >
                <option value="">Tervezett költségkeret</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Határidő */}
            <input
              type="text"
              placeholder="Tervezett határidő"
              className={inputClasses}
              value={formData.timeline}
              onChange={handleChange('timeline')}
            />

            {/* Projekt leírás */}
            <textarea
              rows="5"
              required
              placeholder="Projekt rövid leírása *"
              className={`${inputClasses} min-h-[140px]`}
              value={formData.message}
              onChange={handleChange('message')}
            ></textarea>

            {/* Új mezők */}
            <textarea
              rows="2"
              placeholder="Referencia weboldalak (linkek)"
              className={inputClasses}
              value={formData.referenceSites}
              onChange={handleChange('referenceSites')}
            />
            <input
              type="text"
              placeholder="Célközönség / piac (pl. magyar, nemzetközi)"
              className={inputClasses}
              value={formData.targetAudience}
              onChange={handleChange('targetAudience')}
            />
            <input
              type="text"
              placeholder="Nyelvi igények (pl. egynyelvű, kétnyelvű, többnyelvű)"
              className={inputClasses}
              value={formData.languages}
              onChange={handleChange('languages')}
            />
            <textarea
              rows="2"
              placeholder="Fő funkciók listája (pl. webshop, foglalási rendszer)"
              className={inputClasses}
              value={formData.features}
              onChange={handleChange('features')}
            />
            <input
              type="text"
              placeholder="Tartalomforrás (saját vagy szükséges segítség)"
              className={inputClasses}
              value={formData.contentSource}
              onChange={handleChange('contentSource')}
            />

            {/* Pénzügyi / adminisztratív */}
            <textarea
              rows="2"
              placeholder="Számlázási adatok (cégnév, adószám, ország)"
              className={inputClasses}
              value={formData.billingInfo}
              onChange={handleChange('billingInfo')}
            />
            <input
              type="text"
              placeholder="Preferált fizetési mód (átutalás, PayPal, kártya)"
              className={inputClasses}
              value={formData.paymentMethod}
              onChange={handleChange('paymentMethod')}
            />
            <input
              type="text"
              placeholder="Támogatási igény (SLA, havi support, karbantartás)"
              className={inputClasses}
              value={formData.support}
              onChange={handleChange('support')}
            />

            {/* Technikai igények */}
            <input
              type="text"
              placeholder="Domain és tárhely helyzete"
              className={inputClasses}
              value={formData.hostingDomain}
              onChange={handleChange('hostingDomain')}
            />
            <textarea
              rows="2"
              placeholder="Integrációs igények (számlázó, CRM, API-k)"
              className={inputClasses}
              value={formData.integrations}
              onChange={handleChange('integrations')}
            />
            <textarea
              rows="2"
              placeholder="SEO / marketing igények (SEO, Ads, social media)"
              className={inputClasses}
              value={formData.marketing}
              onChange={handleChange('marketing')}
            />
            <textarea
              rows="2"
              placeholder="Biztonsági / jogi elvárások (GDPR, SSL, consent modul)"
              className={inputClasses}
              value={formData.legal}
              onChange={handleChange('legal')}
            />
            <input
              type="text"
              placeholder="Fontossági sorrend (pl. gyors határidő vagy alacsony költség)"
              className={inputClasses}
              value={formData.priority}
              onChange={handleChange('priority')}
            />

            {/* Privacy */}
            <label className="flex items-center gap-3 text-gray-300 text-sm">
              <input
                type="checkbox"
                required
                checked={formData.privacy}
                onChange={handleChange('privacy')}
                className="h-4 w-4 accent-[#FF007A]"
              />
              Megismertem és elfogadom az adatkezelési tájékoztatót
            </label>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-[#FF007A] px-8 py-3 font-semibold text-white shadow-[0_0_25px_#ff007a] transition hover:shadow-[0_0_40px_#ff007a] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={processing}
              >
                {processing ? 'Küldés folyamatban…' : 'Árajánlat kérése'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}