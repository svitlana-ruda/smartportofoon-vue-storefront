export default {
  title: 'Default Theme',
  titleTemplate: '%s - Vue Storefront',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    {
      vmid: 'description',
      name: 'description',
      content:
        'Vue Storefront is a standalone PWA storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, Prestashop or Shopware) through the API.'
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
    { name: 'robots', content: 'index, follow' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/assets/favicon-16x16.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon.png' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_2048.png', sizes: '2048x2732' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1668.png', sizes: '1668x2224' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1536.png', sizes: '1536x2048' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1125.png', sizes: '1125x2436' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1242.png', sizes: '1242x2208' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_750.png', sizes: '750x1334' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_640.png', sizes: '640x1136' },
    { rel: 'manifest', href: '/assets/manifest.json' },
    {
      rel: 'stylesheet',
      as: 'style',
      href:
        'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap'
    },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com/', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css?family=Covered+By+Your+Grace|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap-grid.min.css'
    }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js',
      async: true,
      integrity: 'sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA',
      crossorigin: 'anonymous'
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js'
    }
  ],
  noscript: [
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto:400,700|Material+Icons&display=swap'
    }
  ]
}
