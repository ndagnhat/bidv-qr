import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BIDV QR",
  description: "BIDV QR",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Generate QR Code', link: '/generate-qrcode-payment' }
    ],
    sidebar: [
      {
        text: 'Generate QR Code',
        items: [
        { text: 'QR Payment', link: '/generate-qrcode-payment' },
          { text: 'Link', link: '/markdown-examples' },
          { text: 'Text', link: '/api-examples' },
          { text: 'Wifi', link: '/api-examples' }
        ]
      }
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
