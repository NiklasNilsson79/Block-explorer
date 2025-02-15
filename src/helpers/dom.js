// 🔹 Skapa ett nytt HTML-element
export const createElement = (elem) => {
  return document.createElement(elem);
};

// 🔹 Skapa ett nytt HTML-element med text
export const createTextElement = (elem, text) => {
  const element = document.createElement(elem);
  element.appendChild(document.createTextNode(text));
  return element;
};
