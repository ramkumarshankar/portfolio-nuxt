import Prismic from 'prismic-javascript'
import pkg from './package'

require('dotenv').config()

export default {
  target: 'static',
  mode: 'universal',

  env: {
    API_ACCESS_KEY: process.env.API_ACCESS_KEY
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Ramkumar Shankar',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:ital,wght@0,300;0,500;0,600;0,700;1,300&family=IBM+Plex+Serif:wght@200&display=swap' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/prism-shades-of-purple.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */

  plugins: [
    '@/plugins/vue-code-highlight.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap',
    '@nuxtjs/prismic',
    ['nuxt-fontawesome', {
      component: 'fa', 
      imports: [
        {
          set: '@fortawesome/fontawesome-free-brands',
          icons: ['faTwitter', 'faGithub', 'faFacebook', 'faDribbble', 'faLinkedin']
        }
      ]
    }],
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Disallow: '/thanks'
      }
    ]
  ],

  buildModules: [
    '@nuxtjs/moment'
  ],

  prismic: {
    endpoint: 'https://ramkumarshankar.cdn.prismic.io/api/v2',
    preview: process.env.NODE_ENV !== 'production' ? true : false,
    linkResolver: '~/plugins/link-resolver',
    htmlSerializer: '~/plugins/html-serializer',
  },

  router: {
    middleware: 'navMenu'
  },

  sitemap: {
    hostname: 'https://ramkumar.me',
    gzip: true,
    exclude: ['/thanks'],
    routes: async () => {
      const api = await Prismic.getApi(
        'https://ramkumarshankar.cdn.prismic.io/api/v2',
        {
          accessToken: process.env.API_ACCESS_KEY
        }
      )
      const response = await api.query(
        Prismic.Predicates.at('document.type', 'project'),
        {
          // keep page size large to get all projects
          pageSize: 100
        }
      )
      const projects = response.results
      return projects.map(project => '/work/' + project.uid)
    }
  },

  styleResources: {
    stylus: './assets/styles/main.styl'
  },

  generate: {
    routes: async () => {
      const api = await Prismic.getApi(
        'https://ramkumarshankar.cdn.prismic.io/api/v2',
        {
          accessToken: process.env.API_ACCESS_KEY
        }
      )
      const response = await api.query(
        Prismic.Predicates.any('document.type', ['project', 'article']),
        {
          // keep page size large to get all documents
          pageSize: 100
        }
      )
      const pages = response.results
      return pages.map(page => {
        if (page.type === 'project') {
          return '/work/' + page.uid;
        } else if (page.type === 'article') {
          return '/writing/' + page.uid;
        }
      })
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
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
      // Run ESLint on save
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
