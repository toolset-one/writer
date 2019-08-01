<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreNewText } from '../stores/texts-store.js'

	import UiButton from '../ui/ui-button.svelte'
	import UiOverlayNav from '../ui/ui-overlay-nav.svelte'

	const NAV_ITEMS = [{
		title: 'Open help section',
		event: 'help'
	}, {
		title: 'Sign out',
		event: 'signout'
	}]

	let navEl,
		navOpened = false

	onMount(() => {
		
	})

</script>

<section class="small-container">

	<ul>
		{#each $textsStore.array as text}
			<li>
				<a href="/text/{text.id}">
					{text.excerpt != ''
						? text.excerpt 
						: 'Empty Document'
					}
				</a>
			</li>
		{/each}
	</ul>

	<div class="nav-bar" >

		<div class="button-wrapper">
			<UiButton 
				type="icon"
				icon="plus"
				on:click={e => textsStoreNewText()} />
		</div>

		<div class="button-wrapper" bind:this={navEl}>
			<UiButton 
				type="icon"
				icon="burger"
				on:click={e => navOpened = true}/>
		</div>
	</div>

</section>

{#if navOpened}
	<UiOverlayNav
		options={NAV_ITEMS}
		element={navEl}
		on:close={e => navOpened = false}
		on:help={e => window.open('https://toolset.one/writer/help/', '_blank')}
		on:signout={e => firebase.auth().signOut()} />
{/if}


<style>

.nav-bar {
	position: fixed;
	bottom:0;
	left:50%;
	width: 636px;
	height:66px;
	z-index:10;
	transform:translateX(-50%);
	text-align: center;
	padding:12px 6px;
	transition: opacity 100ms ease;
	max-width:100%;
	display:flex;
	flex-direction: row wrap;
	background: linear-gradient(to bottom, rgba(250, 249, 247, 1) 0, rgba(250, 249, 247, 1) 54px, rgba(250, 249, 247, 0) 66px);
}

@media (min-width:600px) {
	.nav-bar {
		width: 636px;
		bottom:auto;
		top:0;
	}
}

.button-wrapper {
	width:50%;
	margin-left:25%;
}

.button-wrapper + .button-wrapper {
	text-align:right;
	width:25%;
	margin:0;
}



.small-container {
	margin:0 12px;
	padding:12px 0;
	max-width: 624px;
}

@media (min-width:600px) {
	.small-container {
		margin:0 auto;
		padding:66px 0;
	}
}

ul {
	list-style: none;
	margin:0;
	padding:0;
}

li {
	margin:0 0 12px 0;
	padding:0;
}

@media (min-width:600px) {
	li {
		margin:0 0 24px 0;
	}
}

a {
	font-size:13.2px;
	line-height: 24px;
	font-weight:400;
	font-family: Overpass Mono, serif;
	color:#333;
	display:block;
	border-radius: 6px;
	padding:18px 18px;
	background:#FFF;
	box-shadow:0 4px 0 -2px rgba(0, 0, 0, .05),  0 3px 6px rgba(0, 0, 0, .1);
	transition:all 100ms ease;
}

a:hover {
	text-decoration: none;
	color:blue;
	box-shadow:0 4px 0 -2px rgba(0, 0, 0, .1),  0 2px 4px rgba(0, 0, 0, .2);
}

@media (min-width:600px) {
	a {
		font-size:16.5px;
		line-height: 30px;
		padding:23px 59px;
	}
}

</style>