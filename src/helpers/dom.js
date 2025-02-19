export const createElement = (elem, attributes = {}) => {
  if (typeof elem !== 'string' || !elem.trim()) {
    console.error('Ogiltigt elementnamn:', elem);
    return null;
  }

  const element = document.createElement(elem);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

export const createTextElement = (elem, text = '', attributes = {}) => {
  const element = createElement(elem, attributes);
  if (!element) return null;

  if (typeof text === 'string' && text.trim()) {
    element.textContent = text;
  }

  return element;
};
