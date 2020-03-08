
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/fontsizeSet.js' },
      // { src: '/js/iconfont.js'},//无效
    ],
  },
  /* 
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    '@/assets/css/global.scss',
    { src: "swiper/dist/css/swiper.css" }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/iview',
    { src: '@/plugins/iconfont', ssr: false },
    { src: '@/plugins/swiper', ssr: false },
    { src: '@/plugins/function', ssr: false },

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources:{
    scss:'@/assets/css/global.scss'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    cache: true,
    parallel: true,
    extend(config, ctx) {
    }
  },
  axios:{
    proxy:true,
    prefix:'/api',
    credentials:true
  },
  proxy:{
    '/api/':{
      target:'http://140.143.128.100:3000',
      changeOrigin:true,
      pathRewrite:{
        '^/api':''
      }
    },
    '/api/':{
      target:'https://music.163.com',
      changeOrigin:true,
      pathRewrite:{
        '^/api':''
      }
    }
  }
}
