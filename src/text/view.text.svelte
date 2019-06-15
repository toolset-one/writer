<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { textsStore, textsStoreChangeText } from '../stores/texts-store.js'


	let text = '',
	debounceTimeOut = null,
	fadeTimeOut = null,
	navBarHidden = false


	onMount(() => {
		textsStore.subscribe(data => {
			if(data.textActive) {
				const newText = data.textActive.text ? data.textActive.text : ''
				text = newText != text ? newText : text
			}
		})
	})


	function textChanged() {

		const id = $textsStore.textActive.id

		if(debounceTimeOut) {
			clearTimeout(debounceTimeOut)
		}

		debounceTimeOut = setTimeout(() => {
			textsStoreChangeText(id, text)
		}, 1000)
	}


	function hideNavBar() {
		fadeTimeOut = setTimeout(() => {
			navBarHidden = true
		}, 1000)
	}
</script>

	{#if !navBarHidden && $textsStore.textActive}
		<div class="nav-bar" out:fade='{{duration: 100}}' in:fade='{{duration: 100}}'>
			<a href="/" class="button button-icon">
				←
			</a>
		</div>
	{/if}

	{#if $textsStore.textActive}
		<textarea
			placeholder="Click here to write text"
			bind:value={text}
			on:input={e => textChanged()}
			on:keydown={e => hideNavBar()}
			on:mousemove={e => navBarHidden = false}
			on:blur={e => navBarHidden = false}
		></textarea>
	{/if}


<style>

.nav-bar {
	position: absolute;
	top:0;
	left:50%;
	width: 624px;
	z-index:10;
	transform:translateX(-50%);
	text-align: center;
	padding:12px 0;
}

.nav-bar.hidden {
	opacity:0;
}

.button {
	display: block;
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