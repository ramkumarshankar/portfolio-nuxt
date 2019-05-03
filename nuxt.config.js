import pkg from './package'

const accessToken = 'MC5YQVo2V2hFQUFDMEFUMF9T.XO-_vXw4VO-_vVQ1be-_ve-_ve-_ve-_vSzvv71USFTvv70O77-977-9eu-_ve-_vUXvv73vv73vv73vv71aew'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    'socicon',
  ],

  /*
   ** Plugins to load before mounting the App
   */  	
  plugins: [
    '~/plugins/prismic-api.js',
    '~/plugins/link-resolver.js',
    '~/plugins/prismic-vue.js',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],

  router: {
    middleware: 'navMenu'
  },

  styleResources: {
    stylus: './assets/styles/main.styl'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
