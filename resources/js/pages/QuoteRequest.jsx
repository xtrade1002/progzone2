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
  reference_sites: '',
  target_audience: '',
  languages: '',
  features: '',
  content_source: '',
  billing_info: '',
  payment_method: '',
  support: '',
  hosting_domain: '',
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
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-700 bg-black/30 p-10 shadow-[0_0_45px_rgba(255,0,122,0.18)]">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="name">
                {fields.name?.label}
                <input
                  id="name"
                  type="text"
                  placeholder={fields.name?.placeholder}
                  required
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleChange('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="email">
                {fields.email?.label}
                <input
                  id="email"
                  type="email"
                  placeholder={fields.email?.placeholder}
                  required
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleChange('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="phone">
                {fields.phone?.label}
                <input
                  id="phone"
                  type="tel"
                  placeholder={fields.phone?.placeholder}
                  className={inputClasses}
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="company">
                {fields.company?.label}
                <input
                  id="company"
                  type="text"
                  placeholder={fields.company?.placeholder}
                  className={inputClasses}
                  value={formData.company}
                  onChange={handleChange('company')}
                  aria-invalid={errors.company ? 'true' : 'false'}
                />
                {errors.company && <span className="text-xs text-red-400">{errors.company}</span>}
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="service">
                {fields.service?.label}
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={handleChange('service')}
                  className={`${inputClasses} bg-[#151522]`}
                  aria-invalid={errors.service ? 'true' : 'false'}
                >
                  <option value="" disabled>
                    {fields.service?.placeholder}
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.service && <span className="text-xs text-red-400">{errors.service}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="budget">
                {fields.budget?.label}
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange('budget')}
                  className={`${inputClasses} bg-[#151522]`}
                  aria-invalid={errors.budget ? 'true' : 'false'}
                >
                  <option value="" disabled>
                    {fields.budget?.placeholder}
                  </option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.budget && <span className="text-xs text-red-400">{errors.budget}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="timeline">
              {fields.timeline?.label}
              <input
                id="timeline"
                type="text"
                placeholder={fields.timeline?.placeholder}
                className={inputClasses}
                value={formData.timeline}
                onChange={handleChange('timeline')}
                aria-invalid={errors.timeline ? 'true' : 'false'}
              />
              {errors.timeline && <span className="text-xs text-red-400">{errors.timeline}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="message">
              {fields.message?.label}
              <textarea
                id="message"
                rows="6"
                required
                placeholder={fields.message?.placeholder}
                className={`${inputClasses} min-h-[160px]`}
                value={formData.message}
                onChange={handleChange('message')}
                aria-invalid={errors.message ? 'true' : 'false'}
              ></textarea>
              {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="reference_sites">
              {fields.reference_sites?.label}
              <textarea
                id="reference_sites"
                rows="4"
                placeholder={fields.reference_sites?.placeholder}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.reference_sites}
                onChange={handleChange('reference_sites')}
                aria-invalid={errors.reference_sites ? 'true' : 'false'}
              ></textarea>
              {errors.reference_sites && (
                <span className="text-xs text-red-400">{errors.reference_sites}</span>
              )}
            </label>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="target_audience">
                {fields.target_audience?.label}
                <input
                  id="target_audience"
                  type="text"
                  placeholder={fields.target_audience?.placeholder}
                  className={inputClasses}
                  value={formData.target_audience}
                  onChange={handleChange('target_audience')}
                  aria-invalid={errors.target_audience ? 'true' : 'false'}
                />
                {errors.target_audience && (
                  <span className="text-xs text-red-400">{errors.target_audience}</span>
                )}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="languages">
                {fields.languages?.label}
                <input
                  id="languages"
                  type="text"
                  placeholder={fields.languages?.placeholder}
                  className={inputClasses}
                  value={formData.languages}
                  onChange={handleChange('languages')}
                  aria-invalid={errors.languages ? 'true' : 'false'}
                />
                {errors.languages && <span className="text-xs text-red-400">{errors.languages}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="features">
              {fields.features?.label}
              <textarea
                id="features"
                rows="4"
                placeholder={fields.features?.placeholder}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.features}
                onChange={handleChange('features')}
                aria-invalid={errors.features ? 'true' : 'false'}
              ></textarea>
              {errors.features && <span className="text-xs text-red-400">{errors.features}</span>}
            </label>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="content_source">
                {fields.content_source?.label}
                <input
                  id="content_source"
                  type="text"
                  placeholder={fields.content_source?.placeholder}
                  className={inputClasses}
                  value={formData.content_source}
                  onChange={handleChange('content_source')}
                  aria-invalid={errors.content_source ? 'true' : 'false'}
                />
                {errors.content_source && (
                  <span className="text-xs text-red-400">{errors.content_source}</span>
                )}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="payment_method">
                {fields.payment_method?.label}
                <input
                  id="payment_method"
                  type="text"
                  placeholder={fields.payment_method?.placeholder}
                  className={inputClasses}
                  value={formData.payment_method}
                  onChange={handleChange('payment_method')}
                  aria-invalid={errors.payment_method ? 'true' : 'false'}
                />
                {errors.payment_method && (
                  <span className="text-xs text-red-400">{errors.payment_method}</span>
                )}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="billing_info">
              {fields.billing_info?.label}
              <textarea
                id="billing_info"
                rows="4"
                placeholder={fields.billing_info?.placeholder}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.billing_info}
                onChange={handleChange('billing_info')}
                aria-invalid={errors.billing_info ? 'true' : 'false'}
              ></textarea>
              {errors.billing_info && (
                <span className="text-xs text-red-400">{errors.billing_info}</span>
              )}
            </label>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="support">
                {fields.support?.label}
                <input
                  id="support"
                  type="text"
                  placeholder={fields.support?.placeholder}
                  className={inputClasses}
                  value={formData.support}
                  onChange={handleChange('support')}
                  aria-invalid={errors.support ? 'true' : 'false'}
                />
                {errors.support && <span className="text-xs text-red-400">{errors.support}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="hosting_domain">
                {fields.hosting_domain?.label}
                <input
                  id="hosting_domain"
                  type="text"
                  placeholder={fields.hosting_domain?.placeholder}
                  className={inputClasses}
                  value={formData.hosting_domain}
                  onChange={handleChange('hosting_domain')}
                  aria-invalid={errors.hosting_domain ? 'true' : 'false'}
                />
                {errors.hosting_domain && (
                  <span className="text-xs text-red-400">{errors.hosting_domain}</span>
                )}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="integrations">
              {fields.integrations?.label}
              <textarea
                id="integrations"
                rows="4"
                placeholder={fields.integrations?.placeholder}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.integrations}
                onChange={handleChange('integrations')}
                aria-invalid={errors.integrations ? 'true' : 'false'}
              ></textarea>
              {errors.integrations && (
                <span className="text-xs text-red-400">{errors.integrations}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="marketing">
              {fields.marketing?.label}
              <textarea
                id="marketing"
                rows="4"
                placeholder={fields.marketing?.placeholder}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.marketing}
                onChange={handleChange('marketing')}
                aria-invalid={errors.marketing ? 'true' : 'false'}
              ></textarea>
              {errors.marketing && <span className="text-xs text-red-400">{errors.marketing}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="legal">
              {fields.legal?.label}
              <textarea
                id="legal"
                rows="4"
                placeholder={fields.legal?.placeholder}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.legal}
                onChange={handleChange('legal')}
                aria-invalid={errors.legal ? 'true' : 'false'}
              ></textarea>
              {errors.legal && <span className="text-xs text-red-400">{errors.legal}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="priority">
              {fields.priority?.label}
              <input
                id="priority"
                type="text"
                placeholder={fields.priority?.placeholder}
                className={inputClasses}
                value={formData.priority}
                onChange={handleChange('priority')}
                aria-invalid={errors.priority ? 'true' : 'false'}
              />
              {errors.priority && <span className="text-xs text-red-400">{errors.priority}</span>}
            </label>

            <div className="flex flex-col gap-4 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
              <label className="inline-flex items-center gap-3 text-gray-300" htmlFor="privacy">
                <input
                  id="privacy"
                  type="checkbox"
                  className="h-4 w-4 accent-[#FF007A]"
                  required
                  checked={formData.privacy}
                  onChange={handleChange('privacy')}
                  aria-invalid={errors.privacy ? 'true' : 'false'}
                />
                {fields.privacy?.label}
              </label>
              {errors.privacy && <span className="text-xs text-red-400">{errors.privacy}</span>}
            </div>

            <div className="flex flex-col items-stretch sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-[#FF007A] px-8 py-3 text-center font-semibold text-white shadow-[0_0_25px_#ff007a] transition hover:shadow-[0_0_40px_#ff007a] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={processing}
              >
                {processing ? quote.button?.processing : quote.button?.default}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
