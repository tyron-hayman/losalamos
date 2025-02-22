// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    public: {
      gemini_api: process.env.gemini_api,
    }
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/sanity', ['@nuxtjs/google-fonts', {
    families : {
      'DM+Sans' : {
        wght : [300, 400, 600, 900]
      }
    }
  }], '@vesp/nuxt-fontawesome'],
  shadcn: {
    prefix: '',
    componentDir: 'components/ui'
  },
  fontawesome: {
    icons: {
      solid: ['magnifying-glass', 'bars-staggered'],
      regular: ['user']
    }
  },
  sanity: {
    projectId: "agv38rs9",
    dataset: "production",
  },
  css: ['~/assets/css/global.css'],
  devtools: { enabled: true }
})
