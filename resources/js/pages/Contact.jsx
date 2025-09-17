import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Contact() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Bal oldali kártya */}
        <div className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6 text-gray-300 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#FF007A]">EMAIL</h2>
            <p className="mt-2">info@progzone.de</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#FF007A]">CÍM</h2>
            <p className="mt-2">
              Világszerte elérhető! Professzionális weboldalak<br />
              vállalkozásoknak és magánszemélyeknek – bárhol is vagy!
            </p>
          </div>
        </div>

        {/* Jobb oldali űrlap */}
        <div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Név *"
                className="w-full rounded-md bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="E-mail *"
                className="w-full rounded-md bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Telefonszám"
                className="w-full rounded-md bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Üzenet"
              rows="5"
              className="w-full rounded-md bg-transparent border border-gray-600 p-3 text-gray-200 focus:border-[#FF007A] focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 rounded-md bg-[#1A1A1A] border border-gray-700 hover:border-[#FF007A] text-gray-200 hover:text-white transition-colors"
            >
              Küldés
            </button>
          </form>
        </div>

      </section>
    </Layout>
  );
}