<script>
	import { onMount } from 'svelte'
	import Page from 'page'
	import { routerStore } from '../stores/router-store.js'
	
	onMount(() => {
		routerStore.subscribe(data => {
			firebase.db.collection('token').doc(data.id).set({
				location: window.location.href
			})
		})
	})

</script>

<section class="small-container">

	<h2>
		Sign In
	</h2>

	<p>
		Please open the app on your homescreen now to be signed in.
	</p>

</section>


<style>
.small-container {
	margin:30px auto;
	max-width:420px;
	width:80%;
}

h2 {
	margin:0 0 12px 0;
	padding:0;
	font-size:24px;
	line-height:30px;
	font-family:vollkorn, serif;
	font-weight:400;
}

@media (min-width: 600px) {
	h2 {
		font-size:34px;
		line-height:36px;
	}
}

p {
	margin:0 0 24px 0;
	padding:0;
	font-size:13.2px;
	line-height:24px;
	font-weight:400;
}

@media (min-width: 600px) {

	p {
		margin:0 0 36px 0;
		font-size:16.5px;
		line-height:30px;
	}
}

</style>