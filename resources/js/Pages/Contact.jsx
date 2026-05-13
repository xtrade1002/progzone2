import React, { useCallback, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import TurnstileWidget from '../Components/TurnstileWidget.jsx';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';

const createInitialFormState = () => ({
  name: '',
  email: '',
  phone: '',
  message: '',
  cf_turnstile_response: '',
});

const onlyDigits = (value) => value.replace(/\D/g, '');

const allowedControlKeys = new Set([
  'Backspace',
  'Delete',
  'Tab',
  'Escape',
  'Enter',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
]);

const preventNonDigitKey = (event) => {
  if (
    allowedControlKeys.has(event.key)
    || event.ctrlKey
    || event.metaKey
    || event.altKey
  ) {
    return;
  }

  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
};

const preventNonDigitPaste = (event) => {
  const pastedText = event.clipboardData?.getData('text') ?? '';

  if (/\D/.test(pastedText)) {
    event.preventDefault();
  }
};

export default function Contact() {
  const [formData, setFormData] = useState(() => createInitialFormState());
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const errors = props?.errors ?? {};
  const flash = props?.flash ?? {};
  const turnstile = props?.turnstile ?? {};
  const { trans, t } = useTranslations();
  const contact = trans?.contact ?? {};
  const fields = contact.fields ?? {};
  const buttonLabels = contact.button ?? {};
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const turnstileRequired = Boolean(turnstile.enabled);
  const canSubmit = !processing && (!turnstileRequired || formData.cf_turnstile_response);

  const handleChange = (field) => (event) => {
    const value = field === 'phone'
      ? onlyDigits(event.target.value)
      : event.target.value;

    if (field === 'phone' && event.target.value !== value) {
      event.target.value = value;
    }

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    router.post(route('contact-message.store'), formData, {
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => {
        setFormData(createInitialFormState());
        setTurnstileResetKey((value) => value + 1);
      },
    });
  };

  const handleTurnstileVerify = useCallback((token) => {
    setFormData((previous) => ({
      ...previous,
      cf_turnstile_response: token,
    }));
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setFormData((previous) => ({
      ...previous,
      cf_turnstile_response: '',
    }));
  }, []);

  return (
    <Layout>
      <Head title={contact.meta_title ?? t('menu.contact', 'Contact')} />
      <section className="pz-section max-w-6xl">
        <div className="pz-panel rounded-[2rem] p-6 text-center sm:p-10">
          <h2 className="pz-title relative text-3xl font-black sm:text-5xl">
            {contact.title}
            <span className="pz-rule mx-auto mt-5"></span>
          </h2>

          {/* Flash üzenetek */}
          {flash.success && (
            <div className="mt-8 rounded-lg border border-emerald-400/50 bg-emerald-500/10 p-4 text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.22)]">
              {flash.success}
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="mt-8 rounded-lg border border-red-400/50 bg-red-500/10 p-4 text-red-200 shadow-[0_0_18px_rgb(var(--pz-pink-rgb)/0.22)]">
              Kérlek javítsd a hibákat a mezőkben.
            </div>
          )}

          <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-[#00eaff]/15 bg-black/18 px-6 py-10 sm:px-10 sm:py-12 md:px-16">
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              {/* Név + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder={fields.name?.placeholder}
                    className="pz-input"
                    required
                    value={formData.name}
                    onChange={handleChange('name')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 text-left">{errors.name}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder={fields.email?.placeholder}
                    className="pz-input"
                    required
                    value={formData.email}
                    onChange={handleChange('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 text-left">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Telefon */}
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={fields.phone?.placeholder}
                  className="pz-input"
                  value={formData.phone}
                  onKeyDown={preventNonDigitKey}
                  onPaste={preventNonDigitPaste}
                  onDrop={(event) => event.preventDefault()}
                  onInput={handleChange('phone')}
                  onChange={handleChange('phone')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && (
                  <span className="text-xs text-red-400 text-left">{errors.phone}</span>
                )}
              </div>

              {/* Üzenet */}
              <div className="flex flex-col gap-2">
                <textarea
                  placeholder={fields.message?.placeholder}
                  rows="5"
                  className="pz-input"
                  required
                  value={formData.message}
                  onChange={handleChange('message')}
                  aria-invalid={errors.message ? 'true' : 'false'}
                ></textarea>
                {errors.message && (
                  <span className="text-xs text-red-400 text-left">{errors.message}</span>
                )}
              </div>

              <TurnstileWidget
                siteKey={turnstile.siteKey}
                onVerify={handleTurnstileVerify}
                onExpire={handleTurnstileExpire}
                resetKey={turnstileResetKey}
              />
              {errors.cf_turnstile_response && (
                <span className="block text-xs text-red-400">{errors.cf_turnstile_response}</span>
              )}

              {/* Gomb */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="pz-button w-full disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                  disabled={!canSubmit}
                >
                  {processing ? buttonLabels.processing : buttonLabels.default}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
