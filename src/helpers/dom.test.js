import { describe, it, expect } from 'vitest';
import { createElement, createTextElement } from './dom.js';

describe('DOM Helper Functions', () => {
  it('createElement() should create a valid element', () => {
    const div = createElement('div');
    expect(div).toBeInstanceOf(HTMLElement);
    expect(div.tagName.toLowerCase()).toBe('div');
  });

  it('createElement() should apply attributes', () => {
    const button = createElement('button', { class: 'btn', id: 'test-btn' });
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.id).toBe('test-btn');
  });

  it('createTextElement() should create an element with text', () => {
    const p = createTextElement('p', 'Hello World');
    expect(p.tagName.toLowerCase()).toBe('p');
    expect(p.textContent).toBe('Hello World');
  });

  it('createTextElement() should apply attributes', () => {
    const h1 = createTextElement('h1', 'Title', { class: 'title' });
    expect(h1.classList.contains('title')).toBe(true);
    expect(h1.textContent).toBe('Title');
  });
});
