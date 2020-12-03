export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'RINNE',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '繋がるぬいぐるみと思い出',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap',
      },
    ],
    script: [
      {
        src: `https://apps.8thwall.com/xrweb?appKey=${process.env.EIGHTHWALL_APP_KEY}`,
      },
      { src: 'https://cdn.8thwall.com/web/aframe/8frame-0.9.2.min.js' },
      { src: 'https://cdn.8thwall.com/web/xrextras/xrextras.js' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/mapbox.scss',
    '@/assets/scss/8thwall.scss',
    '@/assets/scss/global.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/pageTransitionTimeout.ts',
    '@/plugins/fontawesome.ts',
    { src: '@/plugins/localStorage.ts', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
  ],

  env: {
    EIGHTHWALL_APP_KEY: process.env.EIGHTHWALL_APP_KEY,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    GCP_API_KEY: process.env.GCP_API_KEY,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[path][name]---[local]---[hash:base64:5]',
        },
      },
    },
  },
}
