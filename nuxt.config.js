import dotenv from './utils/env'
dotenv.config()

export default {
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.TITLE,
    titleTemplate: `%s | ${process.env.TITLE}`,
    htmlAttrs: {
      lang: 'ja',
      prefix:
        'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.SUBTITLE
      },

      // OGP
      { property: 'og:site_name', content: process.env.SITENAME },
      { property: 'og:locale', content: 'ja_JP' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${process.env.TITLE} | ${process.env.SUBTITLE}`
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `https://${process.env.HOST}`
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: process.env.SUBTITLE
      },

      // Twitter
      { property: 'twitter:card', content: 'summary' }
    ],
    link: [
      // preconnect
      ...['//images.ctfassets.net', '//cdn.contentful.com'].map(d => ({
        rel: 'preconnect',
        href: d
      })),
      // icon
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // atom.xml
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        title: process.env.TITLE,
        href: '/feed/atom.xml'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  css: ['bulma', '~/assets/css/font.css'],

  env: process.env,

  /*
  ** Router configuration
  */
  router: {
    scrollBehavior(to, from, savedPosition) {
      let position = false

      if (to.matched.length < 2) {
        position = { x: 0, y: 0 }
      } else if (
        to.matched.some(r => r.components.default.options.scrollToTop)
      ) {
        position = { x: 0, y: 0 }
      }

      if (savedPosition) {
        position = savedPosition
      }

      return position
    }
  },

  /*
  ** Build configuration
  */
  build: {
    // cache: true,
    parallel: true,
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev }) {
      if (isDev && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // markdown as a vue component
      config.module.rules.push({
        test: /\.md$/,
        use: ['vue-loader', require.resolve('./utils/markdownLoader')]
      })
    }
  },

  generate: {
    routes: require('./posts.json').map(post => `/posts/${post.fields.slug}`),
    fallback: true
  }
}
