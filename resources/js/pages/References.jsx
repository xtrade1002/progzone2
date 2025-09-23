import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function References() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const { trans, t } = useTranslations();
  const references = trans?.references ?? {};
  const projects = Array.isArray(references.projects) ? references.projects : [];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderProject = (project, index) => {
    if (project.type === 'lightbox') {
      return (
        <button
          key={index}
          onClick={() => setLightboxImage(project.lightboxImage ?? project.image)}
          className="block group w-full"
        >
          <article
            className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
            style={{
              backgroundImage: project.image ? `url('${project.image}')` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '250px',
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
              <h2 className="text-xl font-semibold text-[#FF007A]">{project.title}</h2>
            </div>
          </article>
        </button>
      );
    }

    if (project.type === 'card') {
      return (
        <article
          key={index}
          className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6"
        >
          <h2 className="text-2xl font-semibold text-[#FF007A]">{project.title}</h2>
          <p className="mt-4 text-sm text-gray-300">{project.description}</p>
        </article>
      );
    }

    return (
      <a
        key={index}
        href={project.url ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <article
          className="relative rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02]"
          style={{
            backgroundImage: project.image ? `url('${project.image}')` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '250px',
          }}
        >
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
            <h2 className="text-xl font-semibold text-[#FF007A]">{project.title}</h2>
            {project.description && (
              <p className="mt-1 text-sm text-gray-300">{project.description}</p>
            )}
            {project.cta && (
              <span className="inline-block mt-3 px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
                {project.cta}
              </span>
            )}
          </div>
        </article>
      </a>
    );
  };

  return (
    <Layout>
      <Head title={references.meta_title ?? t('menu.references', 'References')} />
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-6">
  <h1 className="text-4xl font-bold text-center text-[#FF007A] md:text-left">
    {references.title}
  </h1>
  {references.subtitle && (
    <p className="text-lg text-gray-300">{references.subtitle}</p>
  )}

  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
    {projects.map((project, index) => renderProject(project, index))}
  </div>

  {lightboxImage && (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
      onClick={() => setLightboxImage(null)}
    >
      <img
        src={lightboxImage}
        alt={references.lightbox_alt ?? 'Preview'}
        className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
      />
    </div>
  )}
</section>
    </Layout>
  );
}
