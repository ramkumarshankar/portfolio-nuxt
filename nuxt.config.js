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
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:title', name: 'og:title', content: 'Ramkumar Shankar' },
      { hid: 'og:description', name: 'og:description', content: pkg.description },
      // { hid: 'og:image', name: 'og:image', content: 'https://ramkumar.me/images/social.png' },
      // { hid: 'og:image:alt', name: 'og:image:alt', content: 'Page image for ramkumar.me' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Ramkumar Shankar' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@ramkumarshankar' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@ramkumarshankar' },
      // { hid: 'twitter:image', name: 'twitter:image', content: 'https://ramkumar.me/images/social.png' },
      // { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Page image for ramkumar.me' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/images/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/images/favicon-16x16.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: "180x180", href: '/images/apple-touch-icon.png' },
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
    '@nuxt/content',
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

  content: {
    markdown: {
      prism: {
        theme: '@/assets/styles/prism-shades-of-purple.css'
      }
    }
  },

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
      const projectsResponse = await api.query(
        Prismic.Predicates.at('document.type', 'project'),
        {
          // keep page size large to get all documents
          pageSize: 100
        }
      )
      const projectPages = projectsResponse.results

      const projectPaths =  projectPages.map(projectPage => {
        return '/work/' + projectPage.uid;
      })

      const { $content } = require('@nuxt/content')
      const articles = await $content('writing').only(['slug']).fetch()
      const articlePaths =  articles.map(article => {
        return '/writing/' + article.slug;
      })
      return [...projectPaths, ...articlePaths]
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
