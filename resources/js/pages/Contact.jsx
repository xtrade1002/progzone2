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
  const [formData, setFormData] = useState(createInitialFormState);
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const errors = props?.errors ?? {};
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
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="rounded-2xl p-10 text-center">
          <h2 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
            {contact.title}
          </h2>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-[#00f7ff]">{contact.email_label}</h3>
            <p className="mt-2 text-gray-300 text-lg">{contact.email_value}</p>
          </div>

          <form className="space-y-6 max-w-3xl mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder={fields.name?.placeholder}
                  className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
                  required
                  value={formData.name}
                  onChange={handleChange('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <span className="text-xs text-red-400 text-left">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder={fields.email?.placeholder}
                  className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
                  required
                  value={formData.email}
                  onChange={handleChange('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <span className="text-xs text-red-400 text-left">{errors.email}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="tel"
                placeholder={fields.phone?.placeholder}
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
                value={formData.phone}
                onChange={handleChange('phone')}
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && <span className="text-xs text-red-400 text-left">{errors.phone}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                placeholder={fields.message?.placeholder}
                rows="5"
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
                required
                value={formData.message}
                onChange={handleChange('message')}
                aria-invalid={errors.message ? 'true' : 'false'}
              ></textarea>
              {errors.message && <span className="text-xs text-red-400 text-left">{errors.message}</span>}
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold bg-[#FF007A] text-white shadow-[0_0_20px_#ff007a] hover:shadow-[0_0_35px_#ff007a] transition disabled:cursor-not-allowed disabled:opacity-70"
              disabled={processing}
            >
              {processing ? buttonLabels.processing : buttonLabels.default}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
