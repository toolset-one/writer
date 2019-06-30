<script>
	import { onMount } from 'svelte';
	import { textsStore, textsStoreNewText } from '../stores/texts-store.js'

	onMount(() => {
		
	})

</script>

<section class="small-container">

	<ul>
		{#each $textsStore.array as text}
			<li>
				<a href="/text/{text.id}">
					{text.excerpt != '' ? text.excerpt : 'Empty Document'}
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
	margin:0 12px;
	padding:12px 0;
	max-width: 624px;
}

@media (min-width:600px) {
	.small-container {
		margin:0 auto;
		padding:60px 0;
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
	font-family: Courier, "Courier New", monospace;
	color:#333;
	display:block;
	border-radius: 2px;
	padding:17px 17px;
	background:#FFF;
	box-shadow: 0 1px 2px rgba(0, 0, 0, .2), 0 3px 12px rgba(0, 0, 0, .025);
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

.button {
	position: fixed;
	bottom:12px;
	left:50%;
	transform: translateX(-50%);
}

@media (min-width: 600px) {
	.button {
		position: absolute;
		bottom:auto;
		top:12px;
	}
}

</style>