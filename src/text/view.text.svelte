<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreChangeText } from '../stores/texts-store.js'

	let text = ''

	onMount(() => {
		textsStore.subscribe(data => {
			text = (data.textActive && data.textActive.text != text) ? data.textActive.text : text
		})
	})

	function textChanged(e) {
		textsStoreChangeText($textsStore.textActive.id, text)
	}

</script>



	<a href="/">
		← Back
	</a>

	{#if $textsStore.textActive}
		<textarea 
			bind:value={text}
			on:input={e => textChanged(e)}
		></textarea>
	{/if}


<style>

a {
	display:block;
	position: absolute;
	top:6px;
	left:50%;
	transform: translateX(-50%);
	line-height: 30px;
	z-index: 100;
	font-size: 13.2px;
}

textarea {
	display:block;
	border:0;
	position: absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	width:100%;
	height:100%;
	background:#FFF;
	resize: none;
	outline:none;
	padding:48px 120px;
	font-family: monospace;
	font-size:16.5px;
	line-height: 30px;
}

</style>