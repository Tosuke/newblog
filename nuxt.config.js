import dotenv from 'dotenv'
dotenv.config()

export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Tosuke&apos;s blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      /*{
        rel: 'stylesheet',
        href:
          '//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic'
      }*/
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
