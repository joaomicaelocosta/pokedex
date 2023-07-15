// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "pokedex nuxt app",
      meta: [
        {
          name: "description",
          content: "pokedex nuxt app",
        },
        {
          name: "keywords",
          content: "Pokemon, Pokedex, Nuxt",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@pinia/nuxt"],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  /* routeRules: {
    // Homepage pre-rendered at build time
    "/": { prerender: true },
    // Product page generated on-demand, revalidates in background
    "/products/**": { swr: true },
    // Blog post generated on-demand once until next deploy
    "/blog/**": { isr: true },
    // Admin dashboard renders only on client-side
    "/admin/**": { ssr: false },
    // Add cors headers on API routes
    "/api/**": { cors: true },
    // Redirects legacy urls
    "/old-page": { redirect: "/new-page" },
  }, */
});
