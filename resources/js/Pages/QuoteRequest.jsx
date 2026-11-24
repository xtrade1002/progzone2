import React, { useMemo, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route, { localizedRoute } from '../route.js';
import useTranslations from '../lib/useTranslations.js';
import TurnstileWidget from '../Components/TurnstileWidget.jsx';
import PhoneNumberInput from '../Components/PhoneInput/PhoneNumberInput.jsx';
import phoneCountries from '../Components/PhoneInput/countries.js';
import FloatingField from '../Components/FloatingField.jsx';
import QuoteDropdown from '../Components/QuoteDropdown.jsx';
import quoteFormContent, { serviceValues, featureValues, timelineValues } from '../data/quoteFormContent.js';
import { InquiryHero, InquirySection, inquiryContent } from '../Components/InquiryDesign.jsx';
import '../../css/quote-phone-input.css';
import '../../css/quote-floating-fields.css';
import '../../css/quote-request.css';

const initialForm = () => ({
  last_name: '', first_name: '', email: '', phone: '', company: '', service: '',
  budget: '', timeline_preference: '', timeline: '', deadline_reason: '', message: '',
  existing_site: '', reference_sites: '', languages: '', features: [], content_source: [],
  product_count: '', integrations: '', support: '', hosting_domain: '', privacy: false,
});
const asOptions = (labels, values = labels) => labels.map((label, index) => ({ value: values[index], label }));
const tomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
};
function Field({ id, label, hint, error, required, children }) {
  return <div className="quote-question">
    <label className="quote-question-label" htmlFor={id}>{label}{required ? ' *' : ''}</label>
    {children}
    {hint && <p id={id + '-hint'} className="quote-question-hint">{hint}</p>}
    {error && <p id={id + '-error'} className="quote-field-error" role="alert">{error}</p>}
  </div>;
}
function FormInput({ id, field, placeholder, label, hint, value, onChange, error, required = false, multiline = false, ...props }) {
  // Keep the existing two separate name controls and their floating labels.
  if (id === 'quote-last-name' || id === 'quote-first-name') {
    const nameLabel = placeholder + ' *';
    return <FloatingField id={id} label={nameLabel} value={value} error={error}>
      <input {...props} id={id} name={id} required placeholder={nameLabel} aria-label={nameLabel} aria-invalid={Boolean(error)} aria-describedby={error ? id + '-error' : undefined} className="pz-input" value={value} onChange={onChange} />
    </FloatingField>;
  }
  const Control = multiline ? 'textarea' : 'input';
  return <Field {...{ id, label, hint, error, required }}>
    <Control {...props} id={id} name={id} required={required} placeholder={placeholder} className="pz-input" value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={[hint && id + '-hint', error && id + '-error'].filter(Boolean).join(' ') || undefined} />
  </Field>;
}
function Choices({ id, label, hint, options, value, onChange, exclusive, error }) {
  return <fieldset className="quote-choices" aria-describedby={hint ? id + '-hint' : undefined}>
    <legend className="quote-question-label">{label}</legend>
    {hint && <p id={id + '-hint'} className="quote-question-hint mb-3">{hint}</p>}
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map(option => <label key={option.value} className={'quote-choice ' + (value.includes(option.value) ? 'quote-choice--selected' : '')}>
        <input type="checkbox" name={id} value={option.value} checked={value.includes(option.value)} onChange={() => onChange(value.includes(option.value) ? value.filter(item => item !== option.value) : option.value === exclusive ? [exclusive] : [...value.filter(item => item !== exclusive), option.value])} />
        <span>{option.label}</span>
      </label>)}
    </div>
    {error && <p className="quote-field-error" role="alert">{error}</p>}
  </fieldset>;
}
export default function QuoteRequest() {
  const [formData, setFormData] = useState(initialForm);
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const [verification, setVerification] = useState('');
  const [verificationReset, setVerificationReset] = useState(0);
  const errors = props?.errors ?? {};
  const { trans, locale } = useTranslations();
  const copy = quoteFormContent(locale);
  const design = inquiryContent(locale);
  const countries = useMemo(() => phoneCountries(locale), [locale]);
  const hostname = typeof window === 'undefined' ? '' : window.location.hostname.replace(/^www\./, '').toLowerCase();
  const defaultPhoneCountry = { 'progzone.hu': 'HU', 'progzone.de': 'DE', 'bitbau.ch': 'CH' }[hostname] ?? (locale === 'de-CH' ? 'CH' : locale.startsWith('de') ? 'DE' : locale === 'hu' ? 'HU' : 'GB');
  const nameLabels = locale.startsWith('de') ? { last: 'Nachname', first: 'Vorname' } : locale === 'hu' ? { last: 'Vezetéknév', first: 'Keresztnév' } : { last: 'Last name', first: 'First name' };
  const termsHref = localizedRoute('terms', locale, props?.localizedRoutes);
  const privacyHref = localizedRoute('privacy', locale, props?.localizedRoutes);
  const consentText = locale === 'hu'
    ? { prefix: 'Elolvastam és elfogadom az', terms: 'ÁSZF-et', connector: 'és az', privacy: 'Adatvédelmi szerződést', suffix: '' }
    : locale.startsWith('de')
      ? { prefix: 'Ich habe die', terms: 'AGB', connector: 'und die', privacy: 'Datenschutzerklärung', suffix: 'gelesen und akzeptiere sie.' }
      : { prefix: 'I have read and accept the', terms: 'Terms and Conditions', connector: 'and the', privacy: 'Privacy Policy', suffix: '' };
  const set = (key, value) => setFormData(previous => ({ ...previous, [key]: value }));
  const handleChange = key => event => set(key, key === 'privacy' ? event.target.checked : event.target.value);
  const digitalProject = ['weboldal', 'webshop', 'atalakitas', 'egyedi', 'bizonytalan'].includes(formData.service);
  const shop = digitalProject && (formData.service === 'webshop' || formData.features.includes('shop'));
  const multilingual = digitalProject && formData.features.includes('multilingual');
  const serviceOptions = asOptions(copy.services, serviceValues);
  const featureOptions = asOptions(copy.featureOptions, featureValues);
  const budgetOptions = (trans?.quote?.fields?.budget?.options ?? []).map(option => ({ ...option, label: option.value === 'bizonytalan' ? copy.unknownBudget : option.label }));
  const input = (key, extra = {}) => <FormInput id={key} label={copy[key]} value={formData[key]} onChange={handleChange(key)} error={errors[key]} maxLength={extra.multiline ? 5000 : 255} {...extra} />;
  const select = (key, options, extra = {}) => <Field id={key} label={copy[key]} error={errors[key]} {...extra}>
    <QuoteDropdown id={key} name={key} label={copy[key]} placeholder={copy.choose} options={[{ value: '', label: copy.choose }, ...options]} value={formData[key]} onChange={value => set(key, value)} required={extra.required} error={errors[key]} />
  </Field>;
  const handleSubmit = event => {
    event.preventDefault();
    const labelFor = (options, value) => options.find(option => option.value === value)?.label ?? value;
    router.post(route('quote-request.store'), {
      ...formData,
      locale,
      cf_turnstile_response: verification,
      name: locale === 'hu' ? formData.last_name.trim() + ' ' + formData.first_name.trim() : formData.first_name.trim() + ' ' + formData.last_name.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      service: labelFor(serviceOptions, formData.service),
      budget: labelFor(budgetOptions, formData.budget),
      timeline_preference: formData.timeline_preference,
      timeline: formData.timeline_preference === 'fixed' ? formData.timeline : '',
      deadline_reason: formData.timeline_preference === 'fixed' ? formData.deadline_reason : '',
      features: digitalProject ? featureOptions.filter(option => formData.features.includes(option.value)).map(option => option.label).join('\n') : '',
      content_source: formData.content_source.join('; '),
      languages: multilingual ? formData.languages : '',
      product_count: shop ? formData.product_count : '',
      integrations: digitalProject ? formData.integrations : '',
      hosting_domain: digitalProject ? formData.hosting_domain : '',
    }, {
      onStart: () => setProcessing(true), onFinish: () => { setProcessing(false); setVerificationReset(value => value + 1); setVerification(''); },
      onSuccess: () => setFormData(initialForm()),
      onError: () => window.setTimeout(() => document.getElementById('quote-error-summary')?.focus(), 0),
    });
  };
  return <Layout variant="inquiry">
    <div className="inquiry-page inquiry-page--quote">
        <InquiryHero type="quote" locale={locale} />
        <p className="inquiry-form-note">{copy.optional}</p>
        <form onSubmit={handleSubmit} className="quote-request-form">
          {Object.keys(errors).length > 0 && <div id="quote-error-summary" tabIndex={-1} role="alert" className="rounded-xl border border-red-400 p-4 text-red-300">{copy.review}</div>}
          <InquirySection number={1} title={design.sections[0]}>
            {select('service', serviceOptions, { required: true })}
            {input('message', { multiline: true, rows: 4, required: true, hint: copy.messageHint, placeholder: copy.messagePlaceholder })}
            {input('existing_site', { hint: copy.existingHint, placeholder: 'https://…' })}
          </InquirySection>
          {digitalProject && <InquirySection number={2} title={design.sections[1]}>
            <Choices id="features" label={copy.features} hint={copy.featuresHint} options={featureOptions} value={formData.features} onChange={value => set('features', value)} exclusive="unsure" error={errors.features} />
            {multilingual && input('languages', { placeholder: copy.languagesPlaceholder, maxLength: 100 })}
            {shop && select('product_count', asOptions(copy.productOptions))}
            {input('integrations', { multiline: true, rows: 3, hint: copy.integrationsHint })}
          </InquirySection>}
          <InquirySection number={digitalProject ? 3 : 2} title={design.sections[2]}>
            <Choices id="content_source" label={copy.assets} options={asOptions(copy.assetOptions)} value={formData.content_source} onChange={value => set('content_source', value)} exclusive={copy.assetOptions[4]} error={errors.content_source} />
            {input('reference_sites', { multiline: true, rows: 3, hint: copy.referenceHint, placeholder: copy.referencePlaceholder })}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {select('timeline_preference', asOptions(copy.timelines, timelineValues))}
              {select('budget', budgetOptions, { hint: copy.budgetHint })}
            </div>
            {formData.timeline_preference === 'fixed' && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {input('timeline', { type: 'date', min: tomorrow(), required: true })}
              {input('deadline_reason', { placeholder: copy.deadlinePlaceholder })}
            </div>}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {select('support', asOptions(copy.supportOptions))}
              {digitalProject && select('hosting_domain', asOptions(copy.hostingOptions))}
            </div>
          </InquirySection>
          <InquirySection number={digitalProject ? 4 : 3} title={design.sections[3]} description={copy.contactHint}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              <FormInput
                id="quote-last-name"
                placeholder={nameLabels.last}
                autoComplete="family-name"
                required
                maxLength={100}
                value={formData.last_name}
                onChange={handleChange('last_name')}
                error={errors.name}
              />
              <FormInput
                id="quote-first-name"
                placeholder={nameLabels.first}
                autoComplete="given-name"
                required
                maxLength={100}
                value={formData.first_name}
                onChange={handleChange('first_name')}
              />
            </div>


            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {input('email', { type: 'email', autoComplete: 'email', required: true })}
              <Field id="quote-phone" label={copy.phone} error={errors.phone}>
                <PhoneNumberInput key={defaultPhoneCountry} id="quote-phone" name="phone" countries={countries} country={defaultPhoneCountry} variant="embedded" placeholder={copy.phone} aria-label={copy.phone} maxLength={15} className="quote-phone-control" value={formData.phone} onChange={phone => set('phone', phone)} error={errors.phone} />
              </Field>
            </div>
            {input('company', { autoComplete: 'organization' })}
          </InquirySection>
          <div className="inquiry-form-footer">
                      <div className="flex flex-col gap-4 text-sm text-gray-400">
              {props.turnstile?.enabled && <div><TurnstileWidget siteKey={props.turnstile.siteKey} onVerify={setVerification} onExpire={() => setVerification('')} resetKey={verificationReset} />{errors.cf_turnstile_response && <p role="alert" className="inquiry-field-error">{errors.cf_turnstile_response}</p>}</div>}
              <label className="inline-flex items-center gap-3 text-gray-300" htmlFor="privacy">
                <input
                  id="privacy"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 accent-[#FF007A]"
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


          <div className="inquiry-submit-row">
            <button type="submit" className="inquiry-submit" disabled={processing}>{processing ? copy.sending : copy.send}</button>
          </div>
          </div>
        </form>
      </div>
  </Layout>;
}
