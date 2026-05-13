import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function References() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [failedImages, setFailedImages] = useState({});
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
    const domain = project.url?.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
    const previewTitle = domain ?? project.category ?? project.label ?? references.preview_label ?? 'Preview';
    const image = project.image;
    const imageKey = project.url ?? project.title ?? String(index);
    const hasImage = image && !failedImages[imageKey];
    const lightbox = hasImage ? project.lightboxImage ?? image : null;
    const imageMode = project.imageFit === 'contain' ? 'object-contain p-6' : 'object-cover';

    return (
      <article
        key={project.url ?? index}
        className="group grid overflow-hidden rounded-2xl border border-[#00eaff]/18 bg-[#040b1c]/88 shadow-[0_18px_60px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#00eaff]/46 hover:shadow-[0_20px_70px_rgba(0,234,255,0.14)] lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]"
      >
        <button
          type="button"
          onClick={() => lightbox && setLightboxImage(lightbox)}
          className="relative min-h-[260px] overflow-hidden bg-[#061327] text-left sm:min-h-[340px] lg:min-h-[390px]"
          aria-label={project.previewLabel ?? project.title}
        >
          <div className="absolute left-0 right-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-white/10 bg-[#071025]/94 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
            <span className="ml-3 min-w-0 truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {previewTitle}
            </span>
          </div>

          <div className="absolute inset-0 pt-9">
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,rgba(255,0,122,0.18),rgba(0,234,255,0.12),rgba(6,19,39,0.92))] px-8 text-center">
              <span className="max-w-sm text-3xl font-black text-white/90">{project.title}</span>
            </div>
          </div>

          {hasImage ? (
            <img
              src={image}
              alt={project.title ?? references.lightbox_alt ?? 'Reference image'}
              className={`absolute inset-0 h-full w-full bg-[#061327] pt-9 transition duration-500 group-hover:scale-[1.025] ${imageMode}`}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                setFailedImages((current) => ({ ...current, [imageKey]: true }));
              }}
            />
          ) : null}

          {hasImage ? (
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/40 via-transparent to-transparent" aria-hidden="true"></div>
          ) : null}
        </button>

        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
          <div>
            {project.label && (
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#00eaff]">
                {project.label}
              </p>
            )}
            <h2 className="text-3xl font-black text-[var(--pz-pink)] sm:text-4xl">{project.title}</h2>
            {project.description && (
              <p className="mt-5 text-base leading-relaxed text-slate-300">{project.description}</p>
            )}
            {Array.isArray(project.tags) && project.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pz-button"
              >
                {project.cta ?? references.cta ?? 'View website'}
              </a>
            )}
            {lightbox && (
              <button
                type="button"
                onClick={() => setLightboxImage(lightbox)}
                className={project.url ? 'pz-button pz-button-secondary' : 'pz-button'}
              >
                {references.preview_cta ?? 'Preview'}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <Layout>
      <Head title={references.meta_title ?? t('menu.references', 'References')} />
      <section className="pz-section space-y-10">
        <div className="max-w-3xl">
          <h1 className="pz-title text-4xl font-black sm:text-5xl">
            {references.title}
          </h1>
          {references.subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-slate-300">{references.subtitle}</p>
          )}
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => renderProject(project, index))}
        </div>

        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/86 backdrop-blur"
            onClick={() => setLightboxImage(null)}
          >
            <img
              src={lightboxImage}
              alt={references.lightbox_alt ?? 'Preview'}
              className="max-h-[90%] max-w-[92%] rounded-2xl border border-[#00eaff]/30 object-contain shadow-[0_0_40px_rgba(0,234,255,0.24)]"
            />
          </div>
        )}
      </section>
    </Layout>
  );
}
