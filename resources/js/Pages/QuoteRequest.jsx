import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route, { localizedRoute } from '../route.js';
import useTranslations from '../lib/useTranslations.js';

const inputClasses =
  'w-full rounded-lg border border-gray-600 bg-transparent p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none transition';
const selectClasses = inputClasses.replace('bg-transparent', 'bg-[#151522]');

const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

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
  payment_method: '',
  support: '',
  hosting_domain: '',
  integrations: '',
  marketing: '',
  legal: '',
  privacy: false,
});

const digitsOnly = (value) => value.replace(/\D/g, '');
const limitLines = (value, maxLines) => value.split(/\r?\n/).slice(0, maxLines).join('\n');
const withRequiredMark = (value) => {
  const text = value ?? '';

  return text.trim().endsWith('*') ? text : `${text} *`;
};

export default function QuoteRequest() {
  const [formData, setFormData] = useState(() => createInitialFormState());
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const errors = props?.errors ?? {};
  const localizedRoutes = props?.localizedRoutes;
  const { trans, locale, t } = useTranslations();
  const quote = trans?.quote ?? {};
  const fields = quote.fields ?? {};
  const serviceOptions = fields.service?.options ?? [];
  const budgetOptions = fields.budget?.options ?? [];
  const button = quote.button ?? {};
  const introParagraphs = Array.isArray(quote.intro) ? quote.intro : [];
  const dateLocale = locale === 'hu' ? 'hu-HU' : locale === 'de' || locale === 'de-CH' ? 'de-DE' : 'en-GB';
  const minTimelineDate = toDateInputValue(addDays(new Date(), 1));
  const selectedTimelineDate = formData.timeline
    ? new Intl.DateTimeFormat(dateLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(`${formData.timeline}T00:00:00`))
    : null;
  const privacyHref = localizedRoute('privacy', locale, localizedRoutes);
  const privacyText = locale === 'hu'
    ? {
        prefix: 'Megismertem és elfogadom az',
        link: 'adatkezelési tájékoztatót',
        suffix: '',
      }
    : {
        prefix: 'Ich habe die',
        link: 'Datenschutzerklärung',
        suffix: 'gelesen und akzeptiere sie.',
      };

  const handleChange = (field) => (event) => {
    const value = field === 'privacy'
      ? event.target.checked
      : field === 'phone'
        ? digitsOnly(event.target.value)
        : field === 'reference_sites'
          ? limitLines(event.target.value, 5)
        : event.target.value;

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
        <div className="mx-auto max-w-5xl rounded-2xl border-1 border-[#ff007a]/30 bg-black/30 p-10 shadow-[0_0_45px_rgba(255,0,122,0.18)]">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-5xl sm:text-4xl font-extrabold text-[#FF007A] drop-shadow-[0_0_20px_#ff007a]">
              {quote.title}
              <span className="after:content-[''] after:block after:w-24 after:h-1 after:bg-[#00f7ff] after:mx-auto after:mt-4 after:rounded-full"></span>
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
                placeholder={withRequiredMark(fields.name?.placeholder ?? 'Full name')}
                aria-label={fields.name?.label ?? 'Full name'}
                required
                className={inputClasses}
                value={formData.name}
                onChange={handleChange('name')}
              />
              <input
                type="email"
                placeholder={withRequiredMark(fields.email?.placeholder ?? 'Email address')}
                aria-label={fields.email?.label ?? 'Email address'}
                required
                className={inputClasses}
                value={formData.email}
                onChange={handleChange('email')}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative">
                <span
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"
                  aria-hidden="true"
                >
                  +
                </span>
                <input
                  type="tel"
                  placeholder={withRequiredMark(fields.phone?.placeholder ?? '49 XXXXXXXXXX')}
                  aria-label={fields.phone?.label ?? 'Phone'}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={20}
                  required
                  className={`${inputClasses} pl-8`}
                  value={formData.phone}
                  onChange={handleChange('phone')}
                />
              </div>
              <input
                type="text"
                placeholder={withRequiredMark(fields.company?.placeholder ?? 'Company / project')}
                aria-label={fields.company?.label ?? 'Company / project'}
                required
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
                className={selectClasses}
                aria-label={fields.service?.label ?? 'Desired service'}
              >
                <option value="">{withRequiredMark(fields.service?.placeholder ?? 'Choose a service')}</option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={formData.budget}
                onChange={handleChange('budget')}
                className={selectClasses}
                aria-label={fields.budget?.label ?? 'Estimated budget'}
              >
                <option value="">{withRequiredMark(fields.budget?.placeholder ?? 'Select a budget')}</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="timeline" className="text-sm font-medium text-gray-300">
                {withRequiredMark(fields.timeline?.label ?? 'Preferred timeline')}
              </label>
              <input
                id="timeline"
                type="date"
                min={minTimelineDate}
                lang={dateLocale}
                aria-label={fields.timeline?.label ?? 'Preferred timeline'}
                required
                className={inputClasses}
                value={formData.timeline}
                onChange={handleChange('timeline')}
              />
              {selectedTimelineDate && (
                <span className="text-left text-xs text-gray-400">
                  {selectedTimelineDate}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">
                {withRequiredMark(fields.message?.label ?? 'Project summary')}
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
              {withRequiredMark(fields.reference_sites?.label ?? 'Inspiration / reference sites')}
              <div className="relative">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 0 20" />
                  <path d="M12 2a15.3 15.3 0 0 0 0 20" />
                </svg>
                <textarea
                  id="reference_sites"
                  rows="5"
                  placeholder={
                    fields.reference_sites?.placeholder ?? 'Share any websites or products you like'
                  }
                  required
                  className={`${inputClasses} min-h-[150px] pl-11`}
                  value={formData.reference_sites}
                  onChange={handleChange('reference_sites')}
                  aria-invalid={errors.reference_sites ? 'true' : 'false'}
                ></textarea>
              </div>
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
                {withRequiredMark(fields.languages?.label ?? 'Project languages')}
                <input
                  id="languages"
                  type="text"
                  placeholder={fields.languages?.placeholder ?? 'e.g. English, German'}
                  required
                  className={inputClasses}
                  value={formData.languages}
                  onChange={handleChange('languages')}
                  aria-invalid={errors.languages ? 'true' : 'false'}
                />
                {errors.languages && <span className="text-xs text-red-400">{errors.languages}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="features">
              {withRequiredMark(fields.features?.label ?? 'Key features')}
              <textarea
                id="features"
                rows="4"
                placeholder={fields.features?.placeholder ?? 'List the most important functionality'}
                required
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
                {withRequiredMark(fields.hosting_domain?.label ?? 'Hosting / domain needs')}
                <input
                  id="hosting_domain"
                  type="text"
                  placeholder={fields.hosting_domain?.placeholder ?? 'Do you need help with hosting or domains?'}
                  required
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
                <span>
                  {privacyText.prefix}{' '}
                  <a
                    href={privacyHref}
                    className="text-[#00f7ff] underline underline-offset-4 transition hover:text-[#FF007A]"
                  >
                    {privacyText.link}
                  </a>
                  {privacyText.suffix ? ` ${privacyText.suffix}` : ''} *
                </span>
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
