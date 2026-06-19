import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

export default function References() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [failedImages, setFailedImages] = useState({});
  const { locale, trans, t } = useTranslations();
  const references = trans?.references ?? {};
  const projects = Array.isArray(references.projects) ? references.projects : [];
  const tabLabels = {
    hu: {
      all: 'Összes',
      websites: 'Weboldalak',
      flyers: 'Flyerek',
      businessCards: 'Névjegykártyák',
      mockups: 'Mockupok',
      otherDesigns: 'Egyéb grafikák',
      empty: 'Ebben a kategóriában még nincs feltöltött referencia.',
    },
    de: {
      all: 'Alle',
      websites: 'Websites',
      flyers: 'Flyer',
      businessCards: 'Visitenkarten',
      mockups: 'Mockups',
      otherDesigns: 'Weitere Designs',
      empty: 'In dieser Kategorie gibt es noch keine Referenzen.',
    },
    en: {
      all: 'All',
      websites: 'Websites',
      flyers: 'Flyers',
      businessCards: 'Business cards',
      mockups: 'Mockups',
      otherDesigns: 'Other designs',
      empty: 'There are no references in this category yet.',
    },
  };
  const labels = tabLabels[locale] ?? tabLabels.hu;

  const getProjectCategory = (project) => {
    const searchable = [
      project.categoryKey,
      project.category,
      project.label,
      project.title,
      ...(Array.isArray(project.tags) ? project.tags : []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (project.categoryKey) {
      return project.categoryKey;
    }

    if (project.type === 'link' || project.url) {
      return 'websites';
    }

    if (searchable.includes('névjegy') || searchable.includes('business card') || searchable.includes('visitenkarte')) {
      return 'businessCards';
    }

    if (searchable.includes('mockup')) {
      return 'mockups';
    }

    if (searchable.includes('flyer') || searchable.includes('szórólap')) {
      return 'flyers';
    }

    return 'otherDesigns';
  };

  const tabs = [
    { key: 'all', label: labels.all },
    { key: 'websites', label: labels.websites },
    { key: 'flyers', label: labels.flyers },
    { key: 'businessCards', label: labels.businessCards },
    { key: 'mockups', label: labels.mockups },
    { key: 'otherDesigns', label: labels.otherDesigns },
  ].map((tab) => ({
    ...tab,
    count: tab.key === 'all' ? projects.length : projects.filter((project) => getProjectCategory(project) === tab.key).length,
  }));
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => getProjectCategory(project) === activeCategory);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resolveProject = (project) => {
    const host = typeof window === 'undefined'
      ? ''
      : window.location.hostname.replace(/^www\./, '').toLowerCase();
    const override = project.domainOverrides?.[host];

    return override ? { ...project, ...override } : project;
  };

  const renderProject = (project, index) => {
    project = resolveProject(project);

    const domain = project.url?.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
    const previewTitle = domain ?? project.category ?? project.label ?? references.preview_label ?? 'Preview';
    const image = project.image;
    const imageKey = project.url ?? project.title ?? String(index);
    const hasImage = image && !failedImages[imageKey];
    const lightbox = hasImage ? project.lightboxImage ?? image : null;
    const imageMode = project.imageFit === 'contain' ? 'object-contain object-bottom px-3 sm:px-4' : 'object-cover';

    return (
      <article
        key={project.url ?? index}
        className="group grid items-start overflow-hidden rounded-xl border border-[#00eaff]/18 bg-[#040b1c]/88 shadow-[0_12px_42px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#00eaff]/46 hover:shadow-[0_16px_52px_rgba(0,234,255,0.12)] lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.65fr)]"
      >
        <button
          type="button"
          onClick={() => lightbox && setLightboxImage(lightbox)}
          className="relative aspect-[16/9] w-full overflow-hidden bg-[#061327] text-left"
          aria-label={project.previewLabel ?? project.title}
        >
          <div className="absolute left-0 right-0 top-0 z-10 flex h-8 items-center gap-2 border-b border-white/10 bg-[#071025]/94 px-4">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]"></span>
            <span className="h-2 w-2 rounded-full bg-[#ffbd2e]"></span>
            <span className="h-2 w-2 rounded-full bg-[#28c840]"></span>
            <span className="ml-2 min-w-0 truncate rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[11px] font-semibold text-slate-300">
              {previewTitle}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-8">
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,rgba(255,0,122,0.18),rgba(0,234,255,0.12),rgba(6,19,39,0.92))] px-6 text-center">
              <span className="max-w-xs text-2xl font-black text-white/90">{project.title}</span>
            </div>
          </div>

          {hasImage ? (
            <img
              src={image}
              alt={project.title ?? references.lightbox_alt ?? 'Reference image'}
              className={`absolute inset-x-0 bottom-0 top-8 h-[calc(100%-2rem)] w-full bg-[#061327] transition duration-500 group-hover:scale-[1.025] ${imageMode}`}
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

        <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
          <div>
            {project.label && (
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#00eaff]">
                {project.label}
              </p>
            )}
            <h2 className="text-2xl font-black text-[var(--pz-pink)] sm:text-3xl">{project.title}</h2>
            {project.description && (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
            )}
            {Array.isArray(project.tags) && project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-0 w-full max-w-[190px] items-center justify-center rounded-xl bg-[var(--pz-pink)] px-4 py-2.5 text-sm font-black text-white shadow-[0_0_18px_rgb(var(--pz-pink-rgb)/0.36)] transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgb(var(--pz-pink-rgb)/0.5)] sm:w-auto"
              >
                {project.cta ?? references.cta ?? 'View website'}
              </a>
            )}
            {lightbox && (
              <button
                type="button"
                onClick={() => setLightboxImage(lightbox)}
                className={
                  project.url
                    ? 'inline-flex min-h-0 w-full max-w-[190px] items-center justify-center rounded-xl border border-[#00eaff]/60 bg-transparent px-4 py-2.5 text-sm font-black text-[#00eaff] shadow-[0_0_14px_rgba(0,234,255,0.14)] transition hover:-translate-y-0.5 hover:border-[#00eaff] hover:text-white sm:w-auto'
                    : 'inline-flex min-h-0 w-full max-w-[190px] items-center justify-center rounded-xl bg-[var(--pz-pink)] px-4 py-2.5 text-sm font-black text-white shadow-[0_0_18px_rgb(var(--pz-pink-rgb)/0.36)] transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgb(var(--pz-pink-rgb)/0.5)] sm:w-auto'
                }
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

        <div className="border-b border-[#00eaff]/20 pb-3">
          <label htmlFor="reference-category" className="sr-only">
            {references.category_filter_label ?? 'Reference category'}
          </label>
          <select
            id="reference-category"
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            className="block w-full rounded-xl border border-[#00eaff]/35 bg-[#071025] px-4 py-3 text-sm font-black text-white shadow-[0_0_20px_rgba(0,234,255,0.12)] outline-none transition focus:border-[#00eaff] focus:ring-2 focus:ring-[#00eaff]/30 sm:hidden"
          >
            {tabs.map((tab) => (
              <option key={tab.key} value={tab.key} className="bg-[#071025] text-white">
                {tab.label} ({tab.count})
              </option>
            ))}
          </select>

          <div className="hidden flex-wrap gap-2 sm:flex">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? 'border-[#00eaff] bg-[#00eaff]/12 text-white shadow-[0_0_24px_rgba(0,234,255,0.18)]'
                      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-[#00eaff]/55 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{tab.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                    isActive ? 'bg-[#00eaff]/20 text-[#00eaff]' : 'bg-white/10 text-slate-400'
                  }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => renderProject(project, index))
          ) : (
            <div className="rounded-2xl border border-[#00eaff]/18 bg-[#040b1c]/80 p-8 text-center text-slate-300">
              {labels.empty}
            </div>
          )}
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
