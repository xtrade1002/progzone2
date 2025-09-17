import React from 'react';
import Layout from '../Components/Layout.jsx';

export default function Services() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">Szolgáltatások</h1>
        <ul className="space-y-4 list-disc list-inside text-lg text-gray-300">
          <li>Reszponzív weboldalak tervezése és fejlesztése</li>
          <li>Webalkalmazások optimalizálása teljesítményre és SEO-ra</li>
          <li>UI/UX prototípusok készítése modern design eszközökkel</li>
          <li>Folyamatos karbantartás és támogatás hosszú távon</li>
        </ul>
      </section>
    </Layout>
  );
}
