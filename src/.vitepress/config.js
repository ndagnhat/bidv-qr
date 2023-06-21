import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/bidv-qr/",
  title: "BIDV QR",
  description: "QR Code generator",
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'QR Code',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Generate QR Code', link: '/generate-qrcode-payment' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPPage\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPPage.vue', import.meta.url)
          )
        }
      ]
    }
  }
})
