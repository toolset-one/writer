<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreNewText } from '../stores/texts-store.js'

	onMount(() => {
		
	})

	function getTextForList(text) {
		const trimmedText = text.substr(0, 100),
			wordTrimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(' ')))
			return wordTrimmedText +'…'
	}

</script>

<section class="small-container">

	<ul>
		{#each $textsStore.array as text}
			<li>
				<a href="/text/{text.id}">
					{getTextForList(text.text)}
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

ul {
	list-style: none;
	margin:0;
	padding:0;
}

li {
	margin:0 0 24px 0;
	padding:0;
	font-size:13.2px;
	line-height: 24px;
	font-weight:400;
}

a {
	color:#222;
}

@media (min-width: 600px) {

}

</style>