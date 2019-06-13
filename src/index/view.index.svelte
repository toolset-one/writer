<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreNewText } from '../stores/texts-store.js'

	onMount(() => {
		
	})

</script>

<section class="small-container">

	<h2>
		Index
	</h2>

	<ul>
		{#each $textsStore.array as text}
			<li>
				<a href="/text/{text.id}">
					Text {text.id}
				</a>
			</li>
		{/each}
	</ul>
	

	<button on:click={e =>textsStoreNewText()}>
		New Text
	</button>


</section>


<style>
.small-container {
	margin:30px auto;
	max-width: 420px;
	width:80%;
}

h2 {
	margin:0 0 12px 0;
	padding:0;
	font-size:24px;
	line-height: 30px;
	font-family:georgia;
	font-weight:400;
}

@media (min-width: 600px) {
	h2 {
		font-size:34px;
		line-height: 36px;
	}
}

p {
	margin:0 0 24px 0;
	padding:0;
	font-size:13.2px;
	line-height: 24px;
	font-weight:400;
}

@media (min-width: 600px) {

	p {
		margin:0 0 36px 0;
		font-size:16.5px;
		line-height: 30px;
	}
}

</style>