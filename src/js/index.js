console.log('index.js laddas!');
import { initApp } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event triggad!');
  initApp();
});
