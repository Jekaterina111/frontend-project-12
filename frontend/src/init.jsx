import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react';
import store from './slices/index.js';
import App from './pages/App';
import resources from './locales/index.js';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false, // escaping is already present in React, so we disable it
      },
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <React.StrictMode>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </React.StrictMode>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
