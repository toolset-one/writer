<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreChangeText } from '../stores/texts-store.js'


	let text = '',
	debounceTimeOut = null


	onMount(() => {
		textsStore.subscribe(data => {
			if(data.textActive) {
				const newText = data.textActive.text ? data.textActive.text : ''
				text = newText != text ? newText : text
			}
		})
	})


	function textChanged(e) {

		const id = $textsStore.textActive.id

		if(debounceTimeOut) {
			clearTimeout(debounceTimeOut)
		}

		debounceTimeOut = setTimeout(() => {
			textsStoreChangeText(id, text)
		}, 1000)
	}

</script>



	<a href="/" class="button button-icon">
		←
	</a>

	{#if $textsStore.textActive}
		<textarea
			placeholder="Click here to write text"
			bind:value={text}
			on:input={e => textChanged(e)}
		></textarea>
	{/if}


<style>

.button {
	position: absolute;
	top:12px;
	left:50%;
	transform: translateX(-50%);
	z-index:10;
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
	padding:60px calc(100% / 2 - 312px) 30px calc(100% / 2 - 312px);
	font-size:16.5px;
	line-height: 30px;
	font-family: Courier, "Courier New", monospace;
}

</style>