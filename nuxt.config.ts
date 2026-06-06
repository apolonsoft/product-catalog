// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/content',
    '@nuxt/hints',
    '@nuxt/a11y',
    '@pinia/nuxt'
  ]
})