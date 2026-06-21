import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
        includeAssets: [
        "bg-hero-campanhas.jpg",
        "dnd.jpg",
        "Ordem.jpg",
        "paperTexture.jpg",
        "Tormenta20.jpg"
      ],

      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,ico}"]
      },
      manifest: {
        name: 'Mitos RPG',
        short_name: 'MitosRPG',
        theme_color: '#ff0000',
        icons: [
          {
            src: 'd20.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'd20.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})