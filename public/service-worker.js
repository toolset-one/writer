const REQUIRED_FILES = [
	'/',
	'/index.html',
	'/global.css',
	'/bundle.css',
	'/firebase-app.js',
	'/firebase-auth.js',
	'/firebase-firestore.js',
	'/bundle.js',
	'/manifest.json',
	'/icons/icon-512x512.png',

	'/fonts/overpass/overpass-regular-webfont.woff2',
	'/fonts/vollkorn/vollkorn-webfont.woff2',
	'/fonts/overpass/overpass-semibold-webfont.woff2',
	'/fonts/overpass/overpass-bold-webfont.woff2',
	'/fonts/overpass/overpass-italic-webfont.woff2'
]


self.addEventListener('activate', e => e.waitUntil(clients.claim()))


self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('static').then(cache => {
			return cache.addAll(REQUIRED_FILES)
		}).then(() => {
			return self.skipWaiting()
		})
	)
})


self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request).then(res => {

			if (res) {
				return res
			}

			return fetch(e.request)
		})
	)
})