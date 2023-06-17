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
    sidebar: [
      {
        text: 'QR Code Generator',
        items: [
          {
            text: 'QR Type',
            items: [
              { text: 'QR Payment', link: '/generate-qrcode-payment' },
              {
                text: 'Link',
                link: '/markdown-examples'
              },
              {
                text: 'Nav',
                link: '/reference/default-theme-nav'
              },
              {
                text: 'Sidebar',
                link: '/reference/default-theme-sidebar'
              },
              {
                text: 'Home Page',
                link: '/reference/default-theme-home-page'
              },
              {
                text: 'Footer',
                link: '/reference/default-theme-footer'
              },
              {
                text: 'Layout',
                link: '/reference/default-theme-layout'
              },
              {
                text: 'Badge',
                link: '/reference/default-theme-badge'
              },
              {
                text: 'Team Page',
                link: '/reference/default-theme-team-page'
              },
              {
                text: 'Prev / Next Links',
                link: '/reference/default-theme-prev-next-links'
              },
              {
                text: 'Edit Link',
                link: '/reference/default-theme-edit-link'
              },
              {
                text: 'Last Updated Timestamp',
                link: '/reference/default-theme-last-updated'
              },
              {
                text: 'Search',
                link: '/reference/default-theme-search'
              },
              {
                text: 'Carbon Ads',
                link: '/reference/default-theme-carbon-ads'
              }
            ]
          }
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
