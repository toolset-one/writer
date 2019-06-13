/*addEventListener('install', e => {
	const preCache = async () => {
		const cache = await caches.open('static')
		return cache.addAll([
			'',
			'/global.css',
			'/bundle.css',
			'/firebase-app.js',
			'/firebase-auth.js',
			'/firebase-firestore.js',
			'/firebase-storage.js',
			'/bundle.js'
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
})*/