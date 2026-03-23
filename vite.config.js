import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'autoUpdate',
			includeAssets: ['favicon.ico', 'Image/apple-touch-icon.png', 'Image/*.png'],
			manifest: {
				name: 'سلامتكم أولاً',
				short_name: 'سلامتكم أولاً',
				description: 'نظام إدارة سيارات الإسعاف - سلامتكم أولاً',
				theme_color: '#1e40af', 
				background_color: '#000000',
				display: 'standalone',
				display_override: ['standalone', 'window-controls-overlay'],
				orientation: 'portrait',
				start_url: '/',
				scope: '/',
				id: '/',
				lang: 'ar',
				dir: 'rtl',
				categories: ['medical', 'productivity', 'utilities'],
				icons: [
					{
						src: 'Image/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'Image/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'Image/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],
				screenshots: [
					{
						src: 'Image/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						form_factor: 'narrow',
						label: 'سلامتكم أولاً'
					},
					{
						src: 'Image/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						form_factor: 'wide',
						label: 'سلامتكم أولاً'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // < 1 year
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // < 1 year
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			}
		})
	],
});
