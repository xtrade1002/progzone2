import React, { useState, useEffect, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import SelectDropdown from '../Components/SelectDropdown.jsx';
import useTranslations from '../lib/useTranslations.js';
import referencePreview, { largeReferencePreview } from '../lib/referencePreview.js';
import { localizedRoute } from '../route.js';
import webshopReferences from '../data/webshopReferences.js';
import businessCardReferences from '../data/businessCardReferences.js';
import '../../css/inquiry-design.css';
import '../../css/references.css';

const copy = {
  hu: { websites: 'Weboldalak', webshops: 'Webshopok', flyers: 'Flyerek', businessCards: 'Névjegykártyák', mockups: 'Mockupok', otherDesigns: 'Egyéb grafikák', empty: 'Ebben a kategóriában még nincs feltöltött referencia.', view: 'Megtekintés', question: 'Van egy ötleted?', contact: 'Beszéljünk róla', previous: 'Előző kép', next: 'Következő kép', close: 'Előnézet bezárása', filter: 'Referencia kategóriája' },
  de: { websites: 'Websites', webshops: 'Onlineshops', flyers: 'Flyer', businessCards: 'Visitenkarten', mockups: 'Mockups', otherDesigns: 'Weitere Designs', empty: 'In dieser Kategorie gibt es noch keine Referenzen.', view: 'Ansehen', question: 'Hast du eine Idee?', contact: 'Lass uns darüber sprechen', previous: 'Vorheriges Bild', next: 'Nächstes Bild', close: 'Vorschau schließen', filter: 'Referenzkategorie' },
  en: { websites: 'Websites', webshops: 'Online stores', flyers: 'Flyers', businessCards: 'Business cards', mockups: 'Mockups', otherDesigns: 'Other designs', empty: 'There are no references in this category yet.', view: 'View', question: 'Have an idea?', contact: 'Let’s talk about it', previous: 'Previous image', next: 'Next image', close: 'Close preview', filter: 'Reference category' },
};
const categories = ['websites', 'webshops', 'flyers', 'businessCards', 'mockups', 'otherDesigns'];
const aliases = { 'business-cards': 'businessCards', 'other-designs': 'otherDesigns', webshop: 'webshops' };
export function projectCategory(project) {
  const explicit = aliases[project.categoryKey] ?? project.categoryKey;
  if (categories.includes(explicit)) return explicit;
  const text = [project.category, project.label, project.title, ...(project.tags ?? [])].filter(Boolean).join(' ').toLowerCase();
  if (/webshop|woocommerce|online (shop|store)|onlineshop/.test(text)) return 'webshops';
  if (project.type === 'link' || project.url) return 'websites';
  if (/névjegy|business card|visitenkarte/.test(text)) return 'businessCards';
  if (/mockup/.test(text)) return 'mockups';
  if (/flyer|szórólap/.test(text)) return 'flyers';
  return 'otherDesigns';
}

export default function References() {
  const { props } = usePage();
  const { locale, trans } = useTranslations();
  const labels = copy[locale?.split(/[-_]/)[0]] ?? copy.hu;
  const references = trans?.references ?? {};
  const activeCategory = aliases[props.category] ?? (categories.includes(props.category) ? props.category : 'websites');
  const projects = businessCardReferences([...(Array.isArray(references.projects) ? references.projects : []), ...webshopReferences(locale)], locale);
  const host = typeof window === 'undefined' ? '' : window.location.hostname.replace(/^www\./, '').toLowerCase();
  const displayedProjects = projects.filter(project => projectCategory(project) === activeCategory).map(project => ({ ...project, ...project.domainOverrides?.[host] }));
  const isWeb = ['websites', 'webshops'].includes(activeCategory);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [failedImages, setFailedImages] = useState({});
  const dialog = useRef(null);
  const trigger = useRef(null);
  const galleryProjects = displayedProjects.filter(project => project.image || project.lightboxImage);
  const lightboxProject = lightboxIndex === null ? null : galleryProjects[lightboxIndex];
  const lightboxImage = lightboxProject?.lightboxImage ?? lightboxProject?.image;
  const closeLightbox = () => {
    dialog.current?.close();
    setLightboxIndex(null);
    trigger.current?.focus();
  };
  const changeImage = delta => setLightboxIndex(index => index === null ? null : (index + delta + galleryProjects.length) % galleryProjects.length);
  const openLightbox = project => {
    trigger.current = document.activeElement;
    const index = galleryProjects.indexOf(project);
    if (index >= 0) setLightboxIndex(index);
  };
  useEffect(() => { setLightboxIndex(null); }, [activeCategory, locale]);
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); closeLightbox(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); changeImage(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); changeImage(1); }
    };
    window.addEventListener('keydown', handleKey);
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = previousOverflow; trigger.current?.focus(); };
  }, [lightboxIndex !== null]);

  const imageError = (event, project, key) => {
    const original = new URL(project.image, window.location.origin).href;
    if (event.currentTarget.src !== original) {
      event.currentTarget.removeAttribute('srcset'); event.currentTarget.removeAttribute('sizes'); event.currentTarget.src = original;
    } else setFailedImages(current => ({ ...current, [key]: true }));
  };
  return <Layout variant="inquiry">
    <section className="references-page">
      <header className="references-hero">
        <div><h1>{references.title ?? 'Referenciák'}</h1><p>{references.subtitle}</p></div>
        <svg className="references-beam" viewBox="0 0 800 180" fill="none" aria-hidden="true"><path d="M0 60C250 0 380 200 800 26" stroke="#00f7ff" /><path d="M60 170C310 100 410 160 800 0" stroke="#ff007a" /></svg>
      </header>
      <nav className="references-filters" aria-label={labels.filter}>
        <label className="sr-only" htmlFor="reference-category">{labels.filter}</label>
        <div className="references-mobile-filter"><SelectDropdown id="reference-category" label={labels.filter} allowEmpty={false} options={categories.map(key => ({ value: key, label: labels[key] }))} value={activeCategory} onChange={category => router.visit(localizedRoute('references', locale, props.localizedRoutes, { category }))} /></div>
        <div className="references-filter-links">{categories.map(key => <Link key={key} href={localizedRoute('references', locale, props.localizedRoutes, { category: key })} aria-current={activeCategory === key ? 'page' : undefined}>{labels[key]}</Link>)}</div>
      </nav>
      <div className={'references-grid' + (isWeb ? ' references-grid--web' : ' references-grid--graphic') + (activeCategory === 'flyers' ? ' references-grid--flyers' : '')}>
        {displayedProjects.length ? displayedProjects.map((project, index) => {
          const key = project.url ?? project.image ?? project.title;
          const hasImage = project.image && !failedImages[key];
          const preview = referencePreview(project.image, isWeb, index === 0);
          // The wide gallery uses larger image slots than the old framed cards.
          const sizes = isWeb ? '(min-width: 1584px) 744px, (min-width: 768px) calc((100vw - 96px) / 2), calc(100vw - 40px)' : activeCategory === 'flyers' ? '(min-width: 1584px) 286px, (min-width: 1280px) calc((100vw - 152px) / 5), (min-width: 768px) calc((100vw - 108px) / 3), calc((100vw - 54px) / 2)' : '(min-width: 1584px) 485px, (min-width: 1100px) calc((100vw - 128px) / 3), (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 40px)';
          return <article className="reference-project" key={key}>
            <button type="button" className={'reference-preview' + (isWeb ? ' reference-preview--web' : ' reference-preview--graphic')} onClick={() => openLightbox(project)} disabled={!hasImage} aria-label={project.previewLabel ?? project.title}>
              {isWeb && <span className="reference-browser" aria-hidden="true"><i /><i /><i /><span>{project.url?.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')}</span></span>}
              {hasImage ? <img {...preview} srcSet={project.previewSrcSet ?? preview.srcSet} sizes={sizes} alt={project.title ?? references.lightbox_alt} loading={index < 2 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : undefined} decoding="async" className={project.imageFit === 'contain' || !isWeb ? 'reference-image--contain' : ''} onError={event => imageError(event, project, key)} /> : <span className="reference-placeholder">{project.title}</span>}
            </button>
            {isWeb && <div className="reference-caption">
              <p className="reference-category">{project.label ?? project.category ?? labels[activeCategory]}</p>
              <div className="reference-title-row"><h2>{project.title}</h2>{project.url && <a className="reference-view" href={project.url} target="_blank" rel="noopener noreferrer">{project.cta ?? labels.view}</a>}</div>
              {project.description && <p className="reference-description">{project.description}</p>}
              {project.tags?.length > 0 && <ul className="reference-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
              {!project.url && hasImage && <button type="button" className="reference-view" onClick={() => openLightbox(project)}>{labels.view}</button>}
            </div>}
          </article>;
        }) : <p className="references-empty">{labels.empty}</p>}
      </div>
      <footer className="references-cta"><h2>{labels.question}</h2><Link href={localizedRoute('contact', locale, props.localizedRoutes)}>{labels.contact}</Link></footer>
    </section>
    {lightboxImage && <dialog ref={dialog} className="references-lightbox" aria-label={lightboxProject.title ?? references.lightbox_alt} onCancel={event => { event.preventDefault(); closeLightbox(); }} onClick={event => { if (event.target === event.currentTarget) closeLightbox(); }}>
      {galleryProjects.length > 1 && <button type="button" className="references-lightbox-prev" aria-label={labels.previous} onClick={() => changeImage(-1)}>‹</button>}
      <img src={largeReferencePreview(lightboxImage)} alt={lightboxProject.title ?? references.lightbox_alt} onError={({ currentTarget }) => { const original = new URL(lightboxImage, window.location.origin).href; if (currentTarget.src !== original) currentTarget.src = lightboxImage; }} />
      {galleryProjects.length > 1 && <button type="button" className="references-lightbox-next" aria-label={labels.next} onClick={() => changeImage(1)}>›</button>}
      <button type="button" className="references-lightbox-close" aria-label={labels.close} onClick={closeLightbox} autoFocus>×</button>
    </dialog>}
  </Layout>;
}
