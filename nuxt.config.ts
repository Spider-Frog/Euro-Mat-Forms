// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Euro-mat Forms",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {rel: 'icon', href: 'icon.png'}
      ]
    }
  },

  runtimeConfig: {
    dbUrl: "",
    dbDatabase: "",
    useMemory: false,
    public: {
      mode: ""
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon'
  ],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
})
