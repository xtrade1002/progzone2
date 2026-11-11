import previews from '../../reference-previews.json';

export default function referencePreview(image, isWebsite, isFirst) {
  if (!image?.startsWith('/img/')) {
    return { src: image };
  }

  const { widths, sizes } = isWebsite ? previews.website : previews.gallery;
  const path = image.slice('/img/'.length).replace(/\.[^.]+$/, '.webp');
  const url = (width) => `${previews.directory}/${width}/${path}`;
  return {
    src: url(widths[1]),
    srcSet: widths.map((width) => `${url(width)} ${width}w`).join(', '),
    sizes: isFirst ? sizes : `auto, ${sizes}`,
  };
}

export function largeReferencePreview(image) {
  return image?.startsWith('/img/')
    ? `${previews.directory}/large/${image.slice('/img/'.length).replace(/\.[^.]+$/, '.webp')}`
    : image;
}
