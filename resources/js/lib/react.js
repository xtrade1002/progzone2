const TEXT_ELEMENT = 'simple-react.text';

function createTextElement(value) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: value,
      children: [],
    },
  };
}

function flattenChildren(children) {
  const flat = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      flat.push(...flattenChildren(child));
    } else {
      flat.push(child);
    }
  });
  return flat;
}

export function createElement(type, props, ...children) {
  const normalized = flattenChildren(children)
    .filter((child) => child !== null && child !== undefined && child !== false && child !== true)
    .map((child) => (typeof child === 'object' ? child : createTextElement(String(child))));

  return {
    type,
    props: {
      ...(props || {}),
      children: normalized,
    },
  };
}

export const Fragment = Symbol('simple-react.fragment');
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = { TEXT_ELEMENT };

export default {
  createElement,
  Fragment,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
};
