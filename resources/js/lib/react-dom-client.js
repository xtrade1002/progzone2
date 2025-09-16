import { Fragment, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from './react.js';

const { TEXT_ELEMENT } = __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function createDomNode(element) {
  if (element === null || element === undefined || element === false) {
    return document.createComment('');
  }

  if (typeof element === 'string' || typeof element === 'number') {
    return document.createTextNode(String(element));
  }

  if (element.type === TEXT_ELEMENT) {
    return document.createTextNode(element.props.nodeValue);
  }

  if (element.type === Fragment) {
    const fragment = document.createDocumentFragment();
    element.props.children.forEach((child) => {
      const childNode = createDomNode(child);
      if (childNode) {
        fragment.appendChild(childNode);
      }
    });
    return fragment;
  }

  if (typeof element.type === 'function') {
    return createDomNode(element.type({ ...element.props }));
  }

  const dom = document.createElement(element.type);
  const { children = [], ...props } = element.props || {};

  Object.entries(props).forEach(([name, value]) => {
    if (value === null || value === undefined || value === false) {
      return;
    }

    if (name === 'className') {
      dom.setAttribute('class', value);
      return;
    }

    if (name === 'htmlFor') {
      dom.setAttribute('for', value);
      return;
    }

    if (name === 'style' && typeof value === 'object') {
      const styleValue = Object.entries(value)
        .map(([key, val]) => `${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${val}`)
        .join(';');
      dom.setAttribute('style', styleValue);
      return;
    }

    if (name.startsWith('on') && typeof value === 'function') {
      const event = name.slice(2).toLowerCase();
      dom.addEventListener(event, value);
      return;
    }

    dom.setAttribute(name, value);
  });

  children.forEach((child) => {
    const childNode = createDomNode(child);
    if (childNode) {
      dom.appendChild(childNode);
    }
  });

  return dom;
}

export function createRoot(container) {
  return {
    render(element) {
      if (!container) {
        return;
      }

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const node = createDomNode(element);
      if (node) {
        container.appendChild(node);
      }
    },
  };
}

export default { createRoot };
