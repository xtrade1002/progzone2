import React, { useEffect, useMemo, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';
import { localizedRoute } from '../route.js';

const routeCategories = {
  websites: 'websites',
  flyers: 'flyers',
  businessCards: 'businessCards',
  'business-cards': 'businessCards',
  mockups: 'mockups',
  otherDesigns: 'otherDesigns',
  'other-designs': 'otherDesigns',
};

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

function normalizeSearchText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getProjectCategory(project) {
  const searchable = normalizeSearchText([
    project.categoryKey,
    project.category,
    project.label,
    project.title,
    project.image,
    ...(Array.isArray(project.tags) ? project.tags : []),
  ]
    .filter(Boolean)
    .join(' '));

  if (project.categoryKey) {
    return project.categoryKey;
  }

  if (project.type === 'link' || project.url) {
    return 'websites';
  }

  if (searchable.includes('nevjegy') || searchable.includes('business card') || searchable.includes('visitenkarte')) {
    return 'businessCards';
  }

  if (searchable.includes('mockup')) {
    return 'mockups';
  }

  if (
    searchable.includes('flyer')
    || searchable.includes('szorolap')
    || searchable.includes('/img/flyer/')
  ) {
    return 'flyers';
  }

  return 'otherDesigns';
}

export default function References() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { props } = usePage();
  const { locale, trans, t } = useTranslations();
  const references = trans?.references ?? {};
  const projects = Array.isArray(references.projects) ? references.projects : [];
  const labels = tabLabels[locale] ?? tabLabels.hu;
  const activeCategory = routeCategories[props?.category] ?? 'all';
  const localizedRoutes = props?.localizedRoutes;

  const tabs = useMemo(() => ([
    { key: 'all', label: labels.all },
    { key: 'websites', label: labels.websites },
    { key: 'flyers', label: labels.flyers },
    { key: 'businessCards', label: labels.businessCards },
    { key: 'mockups', label: labels.mockups },
    { key: 'otherDesigns', label: labels.otherDesigns },
  ].map((tab) => ({
    ...tab,
    href: localizedRoute('references', locale, localizedRoutes, { category: tab.key }),
    count: tab.key === 'all'
      ? projects.length
      : projects.filter((project) => getProjectCategory(project) === tab.key).length,
  }))), [labels, locale, localizedRoutes, projects]);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => getProjectCategory(project) === activeCategory);

  const resolveProject = (project) => {
    const host = typeof window === 'undefined'
      ? ''
      : window.location.hostname.replace(/^www\./, '').toLowerCase();
    const override = project.domainOverrides?.[host];

    return override ? { ...project, ...override } : project;
  };

  const resolvedFilteredProjects = filteredProjects.map(resolveProject);
  const galleryProjects = resolvedFilteredProjects.filter((project) => project.image || project.lightboxImage);
  const lightboxProject = lightboxIndex === null ? null : galleryProjects[lightboxIndex] ?? null;
  const lightboxImage = lightboxProject?.lightboxImage ?? lightboxProject?.image ?? null;

  const openLightbox = (project) => {
    const index = galleryProjects.findIndex((item) => item === project);
    setLightboxIndex(index >= 0 ? index : null);
  };

  const showPreviousImage = () => {
    setLightboxIndex((current) => {
      if (current === null || galleryProjects.length === 0) {
        return current;
      }

      return (current - 1 + galleryProjects.length) % galleryProjects.length;
    });
  };

  const showNextImage = () => {
    setLightboxIndex((current) => {
      if (current === null || galleryProjects.length === 0) {
        return current;
      }

      return (current + 1) % galleryProjects.length;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      }

      if (event.key === 'ArrowLeft') {
        showPreviousImage();
      }

      if (event.key === 'ArrowRight') {
        showNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryProjects.length]);

  const renderProject = (project, index) => {
    const projectCategory = getProjectCategory(project);
    const isWebsiteCard = projectCategory === 'websites';
    const isImageGalleryCard = projectCategory === 'flyers'
      || projectCategory === 'mockups'
      || projectCategory === 'businessCards'
      || projectCategory === 'otherDesigns';
    const isVisualOnlyCard = isImageGalleryCard || isWebsiteCard;
    const galleryAspectClass = projectCategory === 'flyers'
      ? 'aspect-[3/4]'
      : projectCategory === 'websites'
        ? 'aspect-video'
        : 'aspect-[4/3]';
    const imageFit = isVisualOnlyCard || project.imageFit === 'contain' ? 'object-contain' : 'object-cover';
    const imagePadding = isVisualOnlyCard ? 'p-3' : project.imageFit === 'contain' ? 'p-4' : '';

    if (project.type === 'card') {
      return (
        <article
          key={index}
          className="rounded-lg border border-white/10 bg-[#1A1A1A] p-6 h-full flex flex-col"
        >
          <h2 className="text-2xl font-semibold text-[#FF007A]">{project.title}</h2>
          {project.description && (
            <p className="mt-4 text-sm text-gray-300">{project.description}</p>
          )}
        </article>
      );
    }

    if (isWebsiteCard) {
      return (
        <article
          key={project.image ?? index}
          className="group h-full overflow-hidden rounded-lg border border-white/10 bg-[#0B0B0B] shadow-lg transition hover:scale-[1.02]"
        >
          <button
            type="button"
            onClick={() => openLightbox(project)}
            className="block w-full text-left"
          >
            <div className={`relative overflow-hidden ${galleryAspectClass}`}>
              <div className="flex h-full w-full flex-col bg-[#050714] p-3">
                <div className="flex h-7 items-center gap-2 rounded-t-md border border-white/10 bg-[#151522] px-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" aria-hidden="true"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true"></span>
                  <span className="ml-2 h-3 flex-1 rounded-full bg-white/10" aria-hidden="true"></span>
                </div>
                <div className="min-h-0 flex-1 overflow-hidden rounded-b-md border-x border-b border-white/10 bg-black">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title ?? references.lightbox_alt ?? 'Reference image'}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          </button>
          {project.url && (
            <div className="border-t border-white/10 bg-black/70 p-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-[#FF007A] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-[0_0_15px_#ff007a]"
              >
                {project.cta ?? 'Website ansehen'}
              </a>
            </div>
          )}
        </article>
      );
    }

    const CardContent = (
      <article className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[#0B0B0B] shadow-lg transform transition hover:scale-[1.02]">
        <div className={`relative overflow-hidden ${isImageGalleryCard ? galleryAspectClass : 'h-[250px]'}`}>
          {project.image && (
            <img
              src={project.image}
              alt={project.title ?? references.lightbox_alt ?? 'Reference image'}
              className={`h-full w-full bg-[#050714] transition-transform duration-500 group-hover:scale-105 ${imageFit} ${imagePadding}`}
              loading="lazy"
            />
          )}
          {!isImageGalleryCard && (
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" aria-hidden="true"></div>
          )}
        </div>
        {!isImageGalleryCard && (
          <div className="flex flex-1 flex-col p-4 bg-black/70">
            {project.label && (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#00f7ff]">{project.label}</p>
            )}
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
        )}
      </article>
    );

    if (project.type === 'lightbox' || project.type === 'image') {
      return (
        <button
          key={project.image ?? index}
          type="button"
          onClick={() => openLightbox(project)}
          className="group block h-full w-full text-left"
        >
          {CardContent}
        </button>
      );
    }

    return (
      <a
        key={project.url ?? index}
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
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-black text-[#FF007A]">
            {references.title}
          </h1>
          {references.subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-slate-300">{references.subtitle}</p>
          )}
        </div>

        <div className="border-b border-[#00f7ff]/20 pb-3">
          <label htmlFor="reference-category" className="sr-only">
            {references.category_filter_label ?? 'Reference category'}
          </label>
          <select
            id="reference-category"
            value={activeCategory}
            onChange={(event) => {
              window.location.href = localizedRoute('references', locale, localizedRoutes, { category: event.target.value });
            }}
            className="block w-full rounded-xl border border-[#00f7ff]/35 bg-[#071025] px-4 py-3 text-sm font-black text-white shadow-[0_0_20px_rgba(0,247,255,0.12)] outline-none transition focus:border-[#00f7ff] focus:ring-2 focus:ring-[#00f7ff]/30 sm:hidden"
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
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? 'border-[#00f7ff] bg-[#00f7ff]/12 text-white shadow-[0_0_24px_rgba(0,247,255,0.18)]'
                      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-[#00f7ff]/55 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{tab.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                    isActive ? 'bg-[#00f7ff]/20 text-[#00f7ff]' : 'bg-white/10 text-slate-400'
                  }`}
                  >
                    {tab.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className={`grid gap-6 ${
          activeCategory === 'flyers'
          || activeCategory === 'mockups'
          || activeCategory === 'businessCards'
          || activeCategory === 'otherDesigns'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {resolvedFilteredProjects.length > 0 ? (
            resolvedFilteredProjects.map((project, index) => renderProject(project, index))
          ) : (
            <div className="rounded-lg border border-[#00f7ff]/20 bg-[#121317] p-8 text-center text-slate-300 md:col-span-2">
              {labels.empty}
            </div>
          )}
        </div>

        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black/88 flex items-center justify-center z-50 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-3xl font-bold text-white transition hover:border-[#00f7ff] hover:text-[#00f7ff] sm:left-6"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
            >
              ‹
            </button>
            <img
              src={lightboxImage}
              alt={references.lightbox_alt ?? 'Preview'}
              className="max-h-[92vh] max-w-[92vw] rounded-lg object-contain shadow-lg"
              onClick={(event) => event.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-3xl font-bold text-white transition hover:border-[#00f7ff] hover:text-[#00f7ff] sm:right-6"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
            >
              ›
            </button>
            <button
              type="button"
              aria-label="Close preview"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/65 text-2xl font-bold text-white transition hover:border-[#FF007A] hover:text-[#FF007A] sm:right-6 sm:top-6"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex(null);
              }}
            >
              ×
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}
