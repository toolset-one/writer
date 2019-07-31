<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreNewText } from '../stores/texts-store.js'

	import UiButton from '../ui/ui-button.svelte'

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

		<div class="button-wrapper">
			<UiButton 
				type="icon"
				icon="burger"
				on:click={e => alert('NAV')}/>
		</div>
	</div>

</section>


<style>

.nav-bar {
	position: absolute;
	bottom:0;
	left:50%;
	width: 624px;
	height:66px;
	z-index:10;
	transform:translateX(-50%);
	text-align: center;
	padding:12px 0;
	transition: opacity 100ms ease;
	max-width:100%;
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
	box-shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 3px 12px rgba(0, 0, 0, .025);
}

@media (min-width:600px) {
	a {
		font-size:16.5px;
		line-height: 30px;
		padding:23px 59px;
	}
}

</style>