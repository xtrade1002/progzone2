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
    if (project.type === 'card') {
      return (
        <article
          key={index}
          className="rounded-lg border border-[#FF007A]/30 bg-[#1A1A1A] p-6 h-full flex flex-col"
        >
          <h2 className="text-2xl font-semibold text-[#FF007A]">{project.title}</h2>
          {project.description && (
            <p className="mt-4 text-sm text-gray-300">{project.description}</p>
          )}
        </article>
      );
    } 

    const CardContent = (
      <article className="relative flex h-full flex-col rounded-lg border border-[#FF007A]/30 overflow-hidden shadow-lg transform transition hover:scale-[1.02] bg-[#0B0B0B]">
        <div className="relative h-[250px] overflow-hidden">
          {project.image && (
            <img
              src={project.image}
              alt={project.title ?? references.lightbox_alt ?? 'Reference image'}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" aria-hidden="true"></div>
        </div>
        <div className="flex flex-1 flex-col p-4 bg-black/70">
          <h2 className="text-xl font-semibold text-[#FF007A]">{project.title}</h2>
          {project.description && (
            <p className="mt-1 text-sm text-gray-300">{project.description}</p>
          )}
          {project.cta && (
            <span className="mt-auto inline-flex self-start px-4 py-2 rounded-md bg-[#FF007A] text-white text-sm font-medium shadow-md hover:shadow-[0_0_15px_#ff007a] transition">
              {project.cta}
            </span>
          )}
        </div>
      </article>
    );

    if (project.type === 'lightbox') {
      return (
        <button
          key={index}
          type="button"
          onClick={() => setLightboxImage(project.lightboxImage ?? project.image)}
          className="group block h-full w-full text-left"
        >
          {CardContent}
        </button>
      );
    }

    return (
      <a
        key={index}
        href={project.url ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        {CardContent}
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
