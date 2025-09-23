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
  const button = quote.button ?? {};
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
                placeholder={fields.name?.placeholder ?? 'Full name *'}
                aria-label={fields.name?.label ?? 'Full name'}
                required
                className={inputClasses}
                value={formData.name}
                onChange={handleChange('name')}
              />
              <input
                type="email"
                placeholder={fields.email?.placeholder ?? 'Email address *'}
                aria-label={fields.email?.label ?? 'Email address'}
                required
                className={inputClasses}
                value={formData.email}
                onChange={handleChange('email')}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                type="tel"
                placeholder={fields.phone?.placeholder ?? 'Phone'}
                aria-label={fields.phone?.label ?? 'Phone'}
                className={inputClasses}
                value={formData.phone}
                onChange={handleChange('phone')}
              />
              <input
                type="text"
                placeholder={fields.company?.placeholder ?? 'Company / project'}
                aria-label={fields.company?.label ?? 'Company / project'}
                className={inputClasses}
                value={formData.company}
                onChange={handleChange('company')}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <select
                required
                value={formData.service}
                onChange={handleChange('service')}
                className={`${inputClasses} bg-[#151522]`}
                aria-label={fields.service?.label ?? 'Desired service'}
              >
                <option value="">{fields.service?.placeholder ?? 'Choose a service'}</option>
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
                aria-label={fields.budget?.label ?? 'Estimated budget'}
              >
                <option value="">{fields.budget?.placeholder ?? 'Select a budget'}</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="timeline" className="text-sm font-medium text-gray-300">
                {fields.timeline?.label ?? 'Preferred timeline'}
              </label>
              <input
                id="timeline"
                type="text"
                placeholder={fields.timeline?.placeholder ?? 'Preferred timeline'}
                aria-label={fields.timeline?.label ?? 'Preferred timeline'}
                className={inputClasses}
                value={formData.timeline}
                onChange={handleChange('timeline')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">
                {fields.message?.label ?? 'Project summary *'}
              </label>
              <textarea
                id="message"
                rows="5"
                required
                placeholder={fields.message?.placeholder ?? 'Project summary *'}
                aria-label={fields.message?.label ?? 'Project summary'}
                className={`${inputClasses} min-h-[140px]`}
                value={formData.message}
                onChange={handleChange('message')}
              ></textarea>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="reference_sites">
              {fields.reference_sites?.label ?? 'Inspiration / reference sites'}
              <textarea
                id="reference_sites"
                rows="4"
                placeholder={
                  fields.reference_sites?.placeholder ?? 'Share any websites or products you like'
                }
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
                {fields.target_audience?.label ?? 'Primary audience'}
                <input
                  id="target_audience"
                  type="text"
                  placeholder={fields.target_audience?.placeholder ?? 'Who will use or buy the product?'}
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
                {fields.languages?.label ?? 'Project languages'}
                <input
                  id="languages"
                  type="text"
                  placeholder={fields.languages?.placeholder ?? 'e.g. English, German'}
                  className={inputClasses}
                  value={formData.languages}
                  onChange={handleChange('languages')}
                  aria-invalid={errors.languages ? 'true' : 'false'}
                />
                {errors.languages && <span className="text-xs text-red-400">{errors.languages}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="features">
              {fields.features?.label ?? 'Key features'}
              <textarea
                id="features"
                rows="4"
                placeholder={fields.features?.placeholder ?? 'List the most important functionality'}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.features}
                onChange={handleChange('features')}
                aria-invalid={errors.features ? 'true' : 'false'}
              ></textarea>
              {errors.features && <span className="text-xs text-red-400">{errors.features}</span>}
            </label>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="content_source">
                {fields.content_source?.label ?? 'Content source'}
                <input
                  id="content_source"
                  type="text"
                  placeholder={fields.content_source?.placeholder ?? 'Who will provide copy, images or videos?'}
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
                {fields.payment_method?.label ?? 'Preferred payment method'}
                <input
                  id="payment_method"
                  type="text"
                  placeholder={fields.payment_method?.placeholder ?? 'e.g. bank transfer, milestone-based'}
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
              {fields.billing_info?.label ?? 'Billing information'}
              <textarea
                id="billing_info"
                rows="4"
                placeholder={fields.billing_info?.placeholder ?? 'Company name, tax number, address, etc.'}
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
                {fields.support?.label ?? 'Support expectations'}
                <input
                  id="support"
                  type="text"
                  placeholder={fields.support?.placeholder ?? 'Do you need maintenance after launch?'}
                  className={inputClasses}
                  value={formData.support}
                  onChange={handleChange('support')}
                  aria-invalid={errors.support ? 'true' : 'false'}
                />
                {errors.support && <span className="text-xs text-red-400">{errors.support}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="hosting_domain">
                {fields.hosting_domain?.label ?? 'Hosting / domain needs'}
                <input
                  id="hosting_domain"
                  type="text"
                  placeholder={fields.hosting_domain?.placeholder ?? 'Do you need help with hosting or domains?'}
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
              {fields.integrations?.label ?? 'Required integrations'}
              <textarea
                id="integrations"
                rows="4"
                placeholder={fields.integrations?.placeholder ?? 'CRM, newsletter, payment gateways, etc.'}
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
              {fields.marketing?.label ?? 'Marketing goals'}
              <textarea
                id="marketing"
                rows="4"
                placeholder={fields.marketing?.placeholder ?? 'Campaigns, KPIs or channels to focus on'}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.marketing}
                onChange={handleChange('marketing')}
                aria-invalid={errors.marketing ? 'true' : 'false'}
              ></textarea>
              {errors.marketing && <span className="text-xs text-red-400">{errors.marketing}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="legal">
              {fields.legal?.label ?? 'Legal / compliance notes'}
              <textarea
                id="legal"
                rows="4"
                placeholder={fields.legal?.placeholder ?? 'GDPR, contracts, terms, other requirements'}
                className={`${inputClasses} min-h-[120px]`}
                value={formData.legal}
                onChange={handleChange('legal')}
                aria-invalid={errors.legal ? 'true' : 'false'}
              ></textarea>
              {errors.legal && <span className="text-xs text-red-400">{errors.legal}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="priority">
              {fields.priority?.label ?? 'Project priority'}
              <input
                id="priority"
                type="text"
                placeholder={fields.priority?.placeholder ?? 'How urgent or important is this project?'}
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
                {fields.privacy?.label ?? 'I have read and accept the privacy policy.'}
              </label>
              {errors.privacy && <span className="text-xs text-red-400">{errors.privacy}</span>}
            </div>

            <div className="flex flex-col items-stretch sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="rounded-lg bg-[#FF007A] px-8 py-3 font-semibold text-white shadow-[0_0_25px_#ff007a] transition hover:shadow-[0_0_40px_#ff007a] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={processing}
              >
                {processing
                  ? button.processing ?? 'Sending…'
                  : button.default ?? 'Send'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}