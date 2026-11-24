import React, { useMemo, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';
import TurnstileWidget from '../Components/TurnstileWidget.jsx';
import PhoneNumberInput from '../Components/PhoneInput/PhoneNumberInput.jsx';
import phoneCountries from '../Components/PhoneInput/countries.js';
import '../../css/quote-phone-input.css';
import { InquiryHero, InquirySection, inquiryContent } from '../Components/InquiryDesign.jsx';

const createInitialFormState = () => ({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const digitsOnly = (value) => value.replace(/\D/g, '');

export default function Contact() {
  const [formData, setFormData] = useState(() => createInitialFormState());
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const [verification, setVerification] = useState('');
  const [verificationReset, setVerificationReset] = useState(0);
  const errors = props?.errors ?? {};
  const { trans, locale } = useTranslations();
  const countries = useMemo(() => phoneCountries(locale), [locale]);
  const hostname = typeof window === 'undefined' ? '' : window.location.hostname.replace(/^www\./, '').toLowerCase();
  const defaultPhoneCountry = { 'progzone.hu': 'HU', 'progzone.de': 'DE', 'bitbau.ch': 'CH' }[hostname] ?? (locale.startsWith('de') ? 'DE' : locale === 'hu' ? 'HU' : 'GB');
  const design = inquiryContent(locale);
  const contact = trans?.contact ?? {};
  const fields = contact.fields ?? {};
  const buttonLabels = contact.button ?? {};

  const handleChange = (field) => (event) => {
    const value = field === 'phone' ? digitsOnly(event.target.value) : event.target.value;

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    router.post(route('contact-message.store'), { ...formData, phone: digitsOnly(formData.phone), locale, cf_turnstile_response: verification }, {
      onStart: () => setProcessing(true),
      onFinish: () => { setProcessing(false); setVerificationReset(value => value + 1); setVerification(''); },
      onSuccess: () => setFormData(createInitialFormState()),
      onError: () => window.setTimeout(() => document.getElementById('contact-error-summary')?.focus(), 0),
    });
  };

  const field = (key, { type = 'text', required = false, multiline = false, autoComplete } = {}) => {
    const id = 'contact-' + key;
    const label = key === 'phone' ? design.phone : fields[key]?.placeholder?.replace(/\s*\*$/, '') ?? key;
    const Control = multiline ? 'textarea' : 'input';
    return <div className="inquiry-field">
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      <div>
        {key === 'phone' ? <PhoneNumberInput key={defaultPhoneCountry} id={id} name={key} countries={countries} country={defaultPhoneCountry} variant="embedded" aria-label={label} maxLength={15} className="quote-phone-control" value={formData.phone} onChange={phone => setFormData(previous => ({ ...previous, phone }))} error={errors.phone} /> : <Control
          id={id} name={key} {...(!multiline ? { type, autoComplete } : { rows: 6 })}
          className="pz-input" required={required}
          maxLength={key === 'phone' ? 20 : multiline ? 5000 : 255}
          {...(key === 'phone' ? { inputMode: 'numeric', pattern: '[0-9]*', placeholder: fields.phone?.placeholder ?? '36 XXXXXXXXX' } : {})}
          value={formData[key]} onChange={handleChange(key)}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? id + '-error' : undefined}
        />}
      </div>
      {errors[key] && <p id={id + '-error'} className="inquiry-field-error" role="alert">{errors[key]}</p>}
    </div>;
  };

  return <Layout variant="inquiry">
    <div className="inquiry-page inquiry-page--contact">
      <InquiryHero type="contact" locale={locale} />
      <p className="inquiry-form-note">{design.required}</p>
      <form onSubmit={handleSubmit}>
        {Object.keys(errors).length > 0 && <div id="contact-error-summary" tabIndex={-1} role="alert" className="inquiry-error-summary">{design.review}</div>}
        <InquirySection number={1} title={design.contactSections[0]} description={design.contactNote}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {field('name', { required: true, autoComplete: 'name' })}
            {field('email', { type: 'email', required: true, autoComplete: 'email' })}
          </div>
          {field('phone', { type: 'tel', autoComplete: 'tel' })}
        </InquirySection>
        <InquirySection number={2} title={design.contactSections[1]}>
          {field('message', { multiline: true, required: true })}
        </InquirySection>
        <div className="inquiry-form-footer inquiry-form-footer--contact">
          {props.turnstile?.enabled && <div><TurnstileWidget siteKey={props.turnstile.siteKey} onVerify={setVerification} onExpire={() => setVerification('')} resetKey={verificationReset} />{errors.cf_turnstile_response && <p role="alert" className="inquiry-field-error">{errors.cf_turnstile_response}</p>}</div>}
          <button type="submit" className="inquiry-submit" disabled={processing}>
            {processing ? buttonLabels.processing : buttonLabels.default}
          </button>
        </div>
      </form>
    </div>
  </Layout>;
}
