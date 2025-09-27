import React, { useState, Fragment } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route from '../route.js';
import useTranslations from '../lib/useTranslations.js';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';

const inputClasses =
  'w-full rounded-lg border border-gray-600 bg-transparent p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none transition';
const selectClasses = inputClasses.replace('bg-transparent', 'bg-[#151522]');

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

  const handleChange = (field) => (valueOrEvent) => {
    const value =
      field === 'privacy'
        ? valueOrEvent.target.checked
        : valueOrEvent?.target
        ? valueOrEvent.target.value
        : valueOrEvent;

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
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder={fields.name?.placeholder ?? 'Full name *'}
                required
                className={inputClasses}
                value={formData.name}
                onChange={handleChange('name')}
              />
              <input
                type="email"
                placeholder={fields.email?.placeholder ?? 'Email address *'}
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
                className={inputClasses}
                value={formData.phone}
                onChange={handleChange('phone')}
              />
              <input
                type="text"
                placeholder={fields.company?.placeholder ?? 'Company / project'}
                className={inputClasses}
                value={formData.company}
                onChange={handleChange('company')}
              />
            </div>

            {/* Custom Selects with Headless UI */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Service Select */}
              <Listbox value={formData.service} onChange={handleChange('service')}>
                <div className="relative">
                  <Listbox.Button
                    className={`${inputClasses} flex items-center justify-between cursor-pointer`}
                  >
                    <span>
                      {serviceOptions.find((o) => o.value === formData.service)?.label ||
                        fields.service?.placeholder ||
                        'Choose a service'}
                    </span>
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-[#151522] py-1 shadow-lg ring-1 ring-[#ff007a] focus:outline-none text-gray-200">
                      {serviceOptions.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-[#ff007a]/30 text-[#ff007a]' : 'text-gray-200'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`${selected ? 'font-medium' : 'font-normal'}`}>
                                {option.label}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#ff007a]">
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>

              {/* Budget Select */}
              <Listbox value={formData.budget} onChange={handleChange('budget')}>
                <div className="relative">
                  <Listbox.Button
                    className={`${inputClasses} flex items-center justify-between cursor-pointer`}
                  >
                    <span>
                      {budgetOptions.find((o) => o.value === formData.budget)?.label ||
                        fields.budget?.placeholder ||
                        'Select a budget'}
                    </span>
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-[#151522] py-1 shadow-lg ring-1 ring-[#00f7ff] focus:outline-none text-gray-200">
                      {budgetOptions.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-[#00f7ff]/20 text-[#00f7ff]' : 'text-gray-200'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`${selected ? 'font-medium' : 'font-normal'}`}>
                                {option.label}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#00f7ff]">
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* ... a többi mező marad változatlan ... */}

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
