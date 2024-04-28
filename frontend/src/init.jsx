import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import './index.css';
import App from './App.jsx';
import resources from './locales/index.js';
import React from 'react';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <React.StrictMode>
         <I18nextProvider i18n={i18n}>
          <App />
         </I18nextProvider>
    </React.StrictMode>
  );
};

export default init;
