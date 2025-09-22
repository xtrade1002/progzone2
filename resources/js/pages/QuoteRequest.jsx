import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import route from '../route.js';

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
  privacy: false,
});

export default function QuoteRequest() {
  const [formData, setFormData] = useState(createInitialFormState);
  const [processing, setProcessing] = useState(false);
  const { props } = usePage();
  const errors = props?.errors ?? {};

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
      <Head title="Árajánlat kérés" />
      <section className="w-full px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-700 bg-black/30 p-10 shadow-[0_0_45px_rgba(255,0,122,0.18)]">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#FF007A] drop-shadow-[0_0_20px_#ff007a]">
              Árajánlat kérés
            </h2>
            <p className="text-lg text-gray-300">
              Írd le néhány mondatban, mire van szükséged, és rövid időn belül személyre szabott ajánlattal
              kereslek meg.
            </p>
            <p className="text-sm text-gray-400">* A csillaggal jelölt mezők kitöltése kötelező.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="name">
                Teljes név *
                <input
                  id="name"
                  type="text"
                  placeholder="Írd be a neved"
                  required
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleChange('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="email">
                E-mail cím *
                <input
                  id="email"
                  type="email"
                  placeholder="Add meg az e-mail címed"
                  required
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleChange('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="phone">
                Telefonszám
                <input
                  id="phone"
                  type="tel"
                  placeholder="+36 20 123 4567"
                  className={inputClasses}
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="company">
                Cég / projekt neve
                <input
                  id="company"
                  type="text"
                  placeholder="Cégnév vagy projekt"
                  className={inputClasses}
                  value={formData.company}
                  onChange={handleChange('company')}
                  aria-invalid={errors.company ? 'true' : 'false'}
                />
                {errors.company && <span className="text-xs text-red-400">{errors.company}</span>}
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="service">
                Kívánt szolgáltatás *
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={handleChange('service')}
                  className={`${inputClasses} bg-[#151522]`}
                  aria-invalid={errors.service ? 'true' : 'false'}
                >
                  <option value="" disabled>
                    Válassz szolgáltatást
                  </option>
                  <option value="weboldal">Weboldal készítés</option>
                  <option value="webshop">Webshop fejlesztés</option>
                  <option value="design">Webdesign / UI</option>
                  <option value="logo">Logó- vagy arculattervezés</option>
                  <option value="marketing">Online marketing</option>
                  <option value="egyedi">Egyedi fejlesztés</option>
                </select>
                {errors.service && <span className="text-xs text-red-400">{errors.service}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="budget">
                Tervezett költségkeret
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange('budget')}
                  className={`${inputClasses} bg-[#151522]`}
                  aria-invalid={errors.budget ? 'true' : 'false'}
                >
                  <option value="" disabled>
                    Válassz kategóriát
                  </option>
                  <option value="0-200">0 - 200 000 Ft</option>
                  <option value="200-500">200 000 - 500 000 Ft</option>
                  <option value="500-1000">500 000 - 1 000 000 Ft</option>
                  <option value="1000+">1 000 000 Ft felett</option>
                  <option value="bizonytalan">Még bizonytalan</option>
                </select>
                {errors.budget && <span className="text-xs text-red-400">{errors.budget}</span>}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="timeline">
              Tervezett határidő
              <input
                id="timeline"
                type="text"
                placeholder="Pl. 2024. június vége"
                className={inputClasses}
                value={formData.timeline}
                onChange={handleChange('timeline')}
                aria-invalid={errors.timeline ? 'true' : 'false'}
              />
              {errors.timeline && <span className="text-xs text-red-400">{errors.timeline}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300" htmlFor="message">
              Projekt rövid leírása *
              <textarea
                id="message"
                rows="6"
                required
                placeholder="Írd le, milyen megoldást szeretnél, milyen funkciókra van szükség, illetve minden egyéb hasznos információt."
                className={`${inputClasses} min-h-[160px]`}
                value={formData.message}
                onChange={handleChange('message')}
                aria-invalid={errors.message ? 'true' : 'false'}
              ></textarea>
              {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
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
                Megismertem és elfogadom az adatkezelési tájékoztatót.
              </label>
              {errors.privacy && <span className="text-xs text-red-400">{errors.privacy}</span>}
            </div>

            <div className="flex flex-col items-stretch sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-[#FF007A] px-8 py-3 text-center font-semibold text-white shadow-[0_0_25px_#ff007a] transition hover:shadow-[0_0_40px_#ff007a] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={processing}
              >
                {processing ? 'Küldés folyamatban…' : 'Elküldöm'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
