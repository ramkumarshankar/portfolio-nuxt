import Prismic from "prismic-javascript"
import pkg from './package'

require('dotenv').config()

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Ramkumar Shankar',
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
  css: ['socicon'],

  /*
   ** Plugins to load before mounting the App
   */

  plugins: [
    '~/plugins/prismic-api.js',
    '~/plugins/link-resolver.js',
    '~/plugins/prismic-vue.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/dotenv', '@nuxtjs/style-resources'],

  router: {
    middleware: 'navMenu'
  },

  styleResources: {
    stylus: './assets/styles/main.styl'
  },

  generate: {
    routes: async () => {
      const api = await Prismic.getApi("https://ramkumarshankar.cdn.prismic.io/api/v2", {
        accessToken: process.env.API_ACCESS_KEY
      })
      const response = await api.query(Prismic.Predicates.at("document.type", "project"), {
        // keep page size large to get all projects
        pageSize: 100
      });
      const projects = response.results;
      return projects.map(project => '/work/' + project.uid)
    }
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
