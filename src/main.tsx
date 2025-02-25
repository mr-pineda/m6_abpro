import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';

if ('serviceWorker' in navigator) {
  console.log('Service Worker disponible');

  navigator.serviceWorker
    .register('./sw.js')
    .then(() => console.log('Service Worker registrado'))
    .catch((error) => console.log('Error en Service Worker', error));
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
