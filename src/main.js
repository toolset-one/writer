import App from './App.svelte';

panda.init('ws://localhost:8080').then(() => {

	const app = new App({
		target: document.body,
		props: {}
	})
})

export default app;