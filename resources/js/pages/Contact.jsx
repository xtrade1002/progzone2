import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Contact() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="rounded-2xl p-10 text-center">
          <h2 className="text-4xl sm:text-4xl font-extrabold text-center text-[#FF007A] mb-16 drop-shadow-[0_0_15px_#ff007a]">
            Kapcsolat
          </h2>

          {/* Email infó középen felül */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[#00f7ff]">📧 Email</h3>
            <p className="mt-2 text-gray-300 text-lg">info@progzone.de</p>
          </div>

          {/* Form középen, szélesebb */}
          <form className="space-y-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Név *"
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
                required
              />
              <input
                type="email"
                placeholder="E-mail *"
                className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Telefonszám"
              className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
            />
            <textarea
              placeholder="Üzenet"
              rows="5"
              className="w-full rounded-lg bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:ring-2 focus:ring-[#FF007A] outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold bg-[#FF007A] text-white shadow-[0_0_20px_#ff007a] hover:shadow-[0_0_35px_#ff007a] transition"
            >
              Küldés
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}