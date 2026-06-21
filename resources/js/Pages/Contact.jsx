import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';

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
  const errors = props?.errors ?? {};
  const { trans, t } = useTranslations();
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

    router.post(route('contact-message.store'), formData, {
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => setFormData(createInitialFormState()),
    });
  };

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
                <div className="relative">
                  <span
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <input
                    type="tel"
                    placeholder={fields.phone?.placeholder ?? '49 XXXXXXXXXX'}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={20}
                    className="pz-input pl-8"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                </div>
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

              {/* Gomb */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="pz-button w-full disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                  disabled={processing}
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
