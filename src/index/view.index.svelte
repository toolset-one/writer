<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreNewText } from '../stores/texts-store.js'

	onMount(() => {
		
	})

	function getTextForList(text) {

		text = text ? text : 'Empty Document'

		if(text.length >= 100) {
			const trimmedText = text.substr(0, 100),
				wordTrimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(' ')))
				return wordTrimmedText +'…'
		}

		return text
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
	

	<button class="button button-icon" on:click={e =>textsStoreNewText()}>
		+
	</button>


</section>


<style>
.small-container {
	margin:0 auto;
	padding:60px 0;
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
	font-size:14px;
	line-height: 18px;
	font-weight:400;
	font-family: Courier, "Courier New", monospace;
}

a {
	color:#333;
	display:block;
	border-radius: 2px;
	padding:29px 35px;
	background:#FFF;
	box-shadow: 0 1px 2px rgba(0, 0, 0, .2), 0 3px 12px rgba(0, 0, 0, .025);
	transition:all 100ms ease;
}

a:hover {
	text-decoration: none;
	color:blue;
	box-shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 3px 12px rgba(0, 0, 0, .025);
}

.button {
	position: absolute;
	top:12px;
	left:50%;
	transform: translateX(-50%);
}

@media (min-width: 600px) {

}

</style>