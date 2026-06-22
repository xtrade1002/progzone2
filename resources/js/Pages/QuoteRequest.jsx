import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route, { localizedRoute } from '../route.js';
import useTranslations from '../lib/useTranslations.js';

const inputClasses =
  'pz-input';
const selectClasses = 'pz-input bg-[#090d1d]';

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
  menu_items: '',
  languages: '',
  features: '',
  content_source: '',
  payment_method: '',
  support: '',
  hosting_domain: '',
  integrations: '',
  legal: '',
  privacy: false,
});

const digitsOnly = (value) => value.replace(/\D/g, '');
const limitLines = (value, maxLines) => value.split(/\r?\n/).slice(0, maxLines).join('\n');
const withRequiredMark = (value) => {
  const text = value ?? '';

  return text.trim().endsWith('*') ? text : `${text} *`;
};

const fallbackSelectOptions = {
  content_source: [
    { value: 'Megbízó', label: 'Megbízó' },
    { value: 'Megbízott', label: 'Megbízott' },
  ],
  payment_method: [
    { value: 'Bankkártya', label: 'Bankkártya' },
    { value: 'Átutalás', label: 'Átutalás' },
    { value: 'Revolut', label: 'Revolut' },
  ],
  support: [
    { value: 'Nem', label: 'Nem' },
    { value: 'Igen, hetente', label: 'Igen, hetente' },
    { value: 'Igen, kéthetente', label: 'Igen, kéthetente' },
    { value: 'Igen, havonta', label: 'Igen, havonta' },
  ],
  hosting_domain: [
    { value: 'Van tárhelyem', label: 'Van tárhelyem' },
    { value: 'Van tárhelyem és domain nevem', label: 'Van tárhelyem és domain nevem' },
    { value: 'Nincsen tárhelyem, de megoldom', label: 'Nincsen tárhelyem, de megoldom' },
    { value: 'Segíts tárhelyet/domain-t venni', label: 'Segíts tárhelyet/domain-t venni' },
  ],
  languages: Array.from({ length: 10 }, (_, index) => {
    const value = String(index + 1);

    return { value, label: value };
  }),
};

const getOptions = (field, fallbackKey) => (
  Array.isArray(field?.options) && field.options.length > 0
    ? field.options
    : fallbackSelectOptions[fallbackKey] ?? []
);

function FormSelect({
  id,
  field,
  fallbackKey,
  fallbackLabel,
  fallbackPlaceholder,
  required = false,
  value,
  onChange,
  error,
}) {
  const options = getOptions(field, fallbackKey);
  const label = field?.label ?? fallbackLabel;
  const placeholder = field?.placeholder ?? fallbackPlaceholder;

  return (
    <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor={id}>
      {required ? withRequiredMark(label) : label}
      <select
        id={id}
        required={required}
        className={selectClasses}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
      >
        <option value="">{required ? withRequiredMark(placeholder) : placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}

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
  const termsHref = localizedRoute('terms', locale, localizedRoutes);
  const privacyHref = localizedRoute('privacy', locale, localizedRoutes);
  const consentText = locale === 'hu'
    ? {
        prefix: 'Elolvastam és elfogadom az',
        terms: 'ÁSZF-et',
        connector: 'és az',
        privacy: 'Adatvédelmi szerződést',
        suffix: '',
      }
    : locale === 'de' || locale === 'de-CH'
      ? {
          prefix: 'Ich habe die',
          terms: 'AGB',
          connector: 'und die',
          privacy: 'Datenschutzerklärung',
          suffix: 'gelesen und akzeptiere sie.',
        }
      : {
          prefix: 'I have read and accept the',
          terms: 'Terms and Conditions',
          connector: 'and the',
          privacy: 'Privacy Policy',
          suffix: '',
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
      <section className="pz-section max-w-6xl">
        <div className="pz-panel rounded-[2rem] p-6 sm:p-10">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="pz-title text-4xl font-black sm:text-5xl">
              {quote.title}
              <span className="pz-rule mx-auto mt-5"></span>
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
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="menu_items">
                {fields.menu_items?.label ?? 'Number of menu items'}
                <input
                  id="menu_items"
                  type="text"
                  placeholder={fields.menu_items?.placeholder ?? 'How many menu items do you need?'}
                  className={inputClasses}
                  value={formData.menu_items}
                  onChange={handleChange('menu_items')}
                  aria-invalid={errors.menu_items ? 'true' : 'false'}
                />
                {errors.menu_items && (
                  <span className="text-xs text-red-400">{errors.menu_items}</span>
                )}
              </label>
              <FormSelect
                id="languages"
                field={fields.languages}
                fallbackKey="languages"
                fallbackLabel="How many languages should the website have?"
                fallbackPlaceholder="Choose language count"
                required
                value={formData.languages}
                onChange={handleChange('languages')}
                error={errors.languages}
              />
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
              <FormSelect
                id="content_source"
                field={fields.content_source}
                fallbackKey="content_source"
                fallbackLabel="Who provides copy, images and videos?"
                fallbackPlaceholder="Choose a content owner"
                value={formData.content_source}
                onChange={handleChange('content_source')}
                error={errors.content_source}
              />
              <FormSelect
                id="payment_method"
                field={fields.payment_method}
                fallbackKey="payment_method"
                fallbackLabel="Preferred payment method"
                fallbackPlaceholder="Choose a payment method"
                value={formData.payment_method}
                onChange={handleChange('payment_method')}
                error={errors.payment_method}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormSelect
                id="support"
                field={fields.support}
                fallbackKey="support"
                fallbackLabel="Maintenance need"
                fallbackPlaceholder="Choose maintenance frequency"
                value={formData.support}
                onChange={handleChange('support')}
                error={errors.support}
              />
              <FormSelect
                id="hosting_domain"
                field={fields.hosting_domain}
                fallbackKey="hosting_domain"
                fallbackLabel="Hosting / domain needs"
                fallbackPlaceholder="Choose hosting / domain status"
                required
                value={formData.hosting_domain}
                onChange={handleChange('hosting_domain')}
                error={errors.hosting_domain}
              />
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
                  {consentText.prefix}{' '}
                  <a
                    href={termsHref}
                    className="text-[#00f7ff] underline underline-offset-4 transition hover:text-[#FF007A]"
                  >
                    {consentText.terms}
                  </a>
                  {' '}{consentText.connector}{' '}
                  <a
                    href={privacyHref}
                    className="text-[#00f7ff] underline underline-offset-4 transition hover:text-[#FF007A]"
                  >
                    {consentText.privacy}
                  </a>
                  {consentText.suffix ? ` ${consentText.suffix}` : ''} *
                </span>
              </label>
              {errors.privacy && <span className="text-xs text-red-400">{errors.privacy}</span>}
            </div>

            <div className="flex flex-col items-stretch sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="pz-button disabled:cursor-not-allowed disabled:opacity-70"
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
