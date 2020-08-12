import Prismic from 'prismic-javascript'
import pkg from './package'

export default {
  target: 'static',
  mode: 'universal',

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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&family=IBM+Plex+Sans:ital,wght@0,300;0,500;0,600;0,700;1,300&family=IBM+Plex+Serif:wght@200&display=swap' }
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
    '@nuxtjs/moment',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],

  prismic: {
    endpoint: 'https://ramkumarshankar.cdn.prismic.io/api/v2',
    preview: process.env.NODE_ENV !== 'production' ? true : false
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

  styleResources: {
    stylus: './assets/styles/main.styl'
  },

  generate: {
    fallback: true
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  }
}
