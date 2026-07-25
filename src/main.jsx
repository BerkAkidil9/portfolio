import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { seo } from './data/portfolio.js';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/globals.css';

function setMeta(selector, value, attribute = 'content') {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

document.title = seo.title;
setMeta('meta[name="description"]', seo.description);
setMeta('meta[name="author"]', seo.author);
setMeta('meta[property="og:title"]', seo.openGraphTitle);
setMeta('meta[property="og:description"]', seo.openGraphDescription);
setMeta('meta[property="og:image"]', seo.openGraphImage);
setMeta('link[rel="canonical"]', seo.canonicalUrl, 'href');
setMeta('link[rel="icon"]', seo.favicon, 'href');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
