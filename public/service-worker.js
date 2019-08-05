addEventListener('install', e => {
	const preCache = async () => {
		const cache = await caches.open('static')
		return cache.addAll([
			'/',
			'/index.html',
			'/global.css',
			'/bundle.css',
			'/firebase-app.js',
			'/firebase-auth.js',
			'/firebase-firestore.js',
			'/bundle.js',

			'/fonts/overpass-regular-webfont.woff2',
			'/fonts/vollkorn-webfont.woff2',
			'/fonts/overpass-semibold-webfont.woff2',
			'/fonts/overpass-bold-webfont.woff2',
			'/fonts/overpass-italic-webfont.woff2'
		])
	}
	e.waitUntil(preCache())
})


self.addEventListener('fetch', e => {
	var request = e.request
	return caches.open('static').then(cache => {
		return cache.match(request).then(matching => {
			return matching || fetch(request)
		})
	})
})