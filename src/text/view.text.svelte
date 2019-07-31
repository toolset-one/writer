<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { textsStore, textsStoreChangeText } from '../stores/texts-store.js'

	import UiButton from '../ui/ui-button.svelte'


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

	<div class="nav-bar {navBarHidden ? 'hidden' : ''}" >
		<div class="button-wrapper">
			<UiButton 
				type="icon"
				icon="arrow-left"
				link="/" />
		</div>
		<div class="button-wrapper">
			<UiButton 
				type="icon"
				icon="burger"
				on:click={e => alert('NAV')}/>
		</div>
	</div>

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
	bottom:0;
	left:50%;
	width: 624px;
	height:66px;
	z-index:10;
	transform:translateX(-50%);
	text-align: left;
	padding:12px 0;
	transition: opacity 100ms ease;
	max-width:100%;
	background:#FFF;
	display:flex;
	flex-direction: row wrap;
}

@media (min-width:600px) {
	.nav-bar {
		width: 624px;
		bottom:auto;
		top:0;
	}
}

.nav-bar.hidden {
	opacity:0;
	pointer-events: none;
}

.button-wrapper {
	width:50%;
}

.button-wrapper + .button-wrapper {
	text-align:right;
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
	padding:30px 30px 30px 30px;
	font-size:13.2px;
	line-height: 24px;
	font-family: Overpass Mono, serif;
}

@media (min-width:600px) {
	textarea {
		padding:66px calc(100% / 2 - 312px) 30px calc(100% / 2 - 312px);
		font-size:16.5px;
		line-height: 30px;
	}
}

</style>