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

export default function Contact() {
  const [formData, setFormData] = useState(() => createInitialFormState());
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const errors = props?.errors ?? {};
  const flash = props?.flash ?? {};
  const { trans, t } = useTranslations();
  const contact = trans?.contact ?? {};
  const fields = contact.fields ?? {};
  const buttonLabels = contact.button ?? {};

  const handleChange = (field) => (event) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
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
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
        <div className="rounded-2xl p-6 sm:p-10 text-center border-1 border-[#ff007a] bg-[#0a0a0f]/60 shadow-[0_0_30px_#ff007a55] backdrop-blur">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FF007A] drop-shadow-[0_0_15px_#ff007a] relative">
            {contact.title}
            <span className="after:content-[''] after:block after:w-24 after:h-1 after:bg-[#00f7ff] after:mx-auto after:mt-4 after:rounded-full"></span>
          </h2>

          {/* Flash üzenetek */}
          {flash.success && (
            <div className="mt-8 p-4 rounded-lg bg-green-900/50 border border-green-500 text-green-300 shadow-[0_0_10px_#00ff9d]">
              {flash.success}
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="mt-8 p-4 rounded-lg bg-red-900/50 border border-red-500 text-red-300 shadow-[0_0_10px_#ff0000]">
              Kérlek javítsd a hibákat a mezőkben.
            </div>
          )}

          <div className="mt-12  rounded-xl px-6 sm:px-10 md:px-16 py-10 sm:py-12 max-w-5xl mx-auto">
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              {/* Név + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder={fields.name?.placeholder}
                    className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 placeholder-gray-400 
                               focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] focus:placeholder-transparent transition"
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
                    className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 placeholder-gray-400 
                               focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] focus:placeholder-transparent transition"
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
                  type="tel"
                  placeholder={fields.phone?.placeholder}
                  className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 placeholder-gray-400 
                             focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] focus:placeholder-transparent transition"
                  value={formData.phone}
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
                  className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 placeholder-gray-400 
                             focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] focus:placeholder-transparent transition"
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
                  className="w-full md:w-auto px-10 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#ff007a] to-[#ff4da6] 
                             text-white shadow-[0_0_20px_#ff007a] hover:shadow-[0_0_40px_#ff007a] hover:scale-105 active:scale-95 
                             transition-transform duration-200 disabled:cursor-not-allowed disabled:opacity-70"
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