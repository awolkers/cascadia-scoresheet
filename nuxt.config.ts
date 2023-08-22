// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/i18n', '@nuxtjs/eslint-module', '@pinia/nuxt', '@nuxtjs/google-fonts'],

  imports: {
    dirs: ['./stores'],
  },

  googleFonts: {
    families: {
      'Noto+Serif': [400, 700],
    },
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'nl',
        iso: 'nl',
        name: 'Nederlands',
        file: 'nl.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
  },
});
