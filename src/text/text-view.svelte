<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { textsStore, textsStoreChangeText, textsStoreDeleteText } from '../stores/texts-store.js'

	import UiButton from '../ui/ui-button.svelte'
	import UiOverlayNav from '../ui/ui-overlay-nav.svelte'


	const NAV_ITEMS = [{
		title: 'Open help section',
		event: 'help'
	}, {
		title: 'Delete this text',
		event: 'delete'
	}, {
		title: 'Sign out',
		event: 'signout'
	}]


	let text = '',
		debounceTimeOut = null,
		fadeTimeOut = null,
		navBarHidden = false,
		navEl,
		navOpened = false

	onMount(() =>
		textsStore.subscribe(data => {
			if(data.textActive) {
				const newText = data.textActive.text ? data.textActive.text : ''
				text = newText != text ? newText : text
			}
		})
	)


	function textChanged() {

		const id = $textsStore.textActive.id

		if(debounceTimeOut) {
			clearTimeout(debounceTimeOut)
		}

		debounceTimeOut = setTimeout(() =>
			textsStoreChangeText(id, text)
		, 1000)
	}


	function hideNavBar() {
		fadeTimeOut = setTimeout(() =>
			navBarHidden = true
		, 1000)
	}
</script>

<nav class="nav-bar {navBarHidden ? 'hidden' : ''}" >
	<div class="button-wrapper">
		<UiButton 
			type="icon"
			icon="arrow-left"
			link="/" />
	</div>
	<div class="button-wrapper" bind:this={navEl}>
		<UiButton 
			type="icon"
			icon="burger"
			on:click={e => navOpened = true}/>
	</div>
</nav>

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


{#if navOpened}
	<UiOverlayNav
		options={NAV_ITEMS}
		element={navEl}
		on:close={e => navOpened = false}
		on:help={e => window.open('https://toolset.one/writer/help/', '_blank')}
		on:delete={e => textsStoreDeleteText($textsStore.textActive.id)}/>
		on:signout={e => firebase.auth().signOut()}/>
{/if}


<style>

.nav-bar {
	position:fixed;
	bottom:0;
	left:50%;
	width:636px;
	height:66px;
	z-index:10;
	transform:translateX(-50%);
	text-align:left;
	padding:12px;
	transition:opacity 100ms ease;
	max-width:100%;
	display:flex;
	flex-direction:row wrap;
	background:linear-gradient(to top, rgba(255, 255, 255, 1) 0, rgba(255, 255, 255, 1) 54px, rgba(255, 255, 255, 0) 66px);
}

@media (min-width:600px) {
	.nav-bar {
		width:636px;
		bottom:auto;
		top:0;
		padding:12px 6px;
		background:linear-gradient(to bottom, rgba(255, 255, 255, 1) 0, rgba(255, 255, 255, 1) 54px, rgba(255, 255, 255, 0) 66px);
	}
}

.nav-bar.hidden {
	opacity:0;
	pointer-events:none;
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
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	width:100%;
	height:100%;
	background:#FFF;
	resize:none;
	outline:none;
	padding:30px 30px 30px 30px;
	font-size:13.2px;
	line-height:24px;
	font-family:overpass-mono, monospace;
}

@media (min-width: 600px) {
	textarea {
		padding:66px calc(100% / 2 - 312px) 30px calc(100% / 2 - 312px);
		font-size:16.5px;
		line-height:30px;
	}
}

</style>