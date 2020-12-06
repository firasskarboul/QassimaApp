/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: 'listar',
  displayName: 'Listar',
  appVersion: '1.0.0',
  domain: 'listar.passionui.com',
  protocol: 'http',
  defaultLanguage: 'en',
  languageSupport: [
    'en',
    'ar',
  ],
  resourcesLanguage: {
    en: {
      translation: require('../lang/en.json'),
    },
    ar: {
      translation: require('../lang/ar.json'),
    },
  },
};
