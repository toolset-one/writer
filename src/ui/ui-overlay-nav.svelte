<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'
	import { getWindowWidth } from '../helpers/helpers.js'

	export let options = []
	export let element

	const dispatch = createEventDispatcher()

	let right,
		top,
		opened = false

	onMount(() => {

		const boundingRect = element.getBoundingClientRect()

		if(getWindowWidth() < 600) {
			top = boundingRect.top + boundingRect.height - (options.length * 42)
		} else {
			top = boundingRect.top		
		}

		right = getWindowWidth() - boundingRect.left - boundingRect.width	

		opened = true
	})

</script>

<nav
	style="{
		'--height: '+ (options.length * 42) +'px;'+
		'top: '+ top +'px;'+
		'right: '+ right +'px;'
	}"
	class="nav-wrapper {opened ? 'opened' : ''}">

	<ul on:click={e => dispatch('close', '')}>
		{#each options as option}
			<li on:click={e => dispatch(option.event)}>
				{option.title}
			</li>
		{/each}
	</ul>
</nav>
<div
	class="backdrop"
	transition:fade="{{delay: 0, duration: 100}}"
	on:click={e => dispatch('close', '')}></div>
<style>
	.backdrop {
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:rgba(0, 0, 0, .15);
		z-index:1000;
	}

	.nav-wrapper {
		position:absolute;
		top:0;
		right:0;
		z-index:1010;
		background:#FFF;
		border-radius:6px;
		box-shadow:0 4px 0 -2px rgba(0, 0, 0, .05),  0 3px 6px rgba(0, 0, 0, .1);
		overflow:hidden;
		height:36px;
		width:36px;
		opacity:0;
		transition:height 100ms ease, width 100ms ease, opacity 100ms ease;
	}

	.opened {
		height:var(--height);
		width:210px;
		opacity:1;
	}

	.border {
		position:relative;
	}

	.border:after {
		content:'';
		position:absolute;
		bottom:100%;
		left:12px;
		right:12px;
		height:1px;
		background:#E6E4E1;
	}

	@media (-webkit-min-device-pixel-ratio:2), (min-resolution:192dpi) { 
		.border:after {
			background:#CCC9C4;
			transform:scale(1, 0.5);
			transform-origin:0 100%;
		}
	}

	ul {
		list-style:none;
		margin:0;
		padding:0;
	}

	li {
		font-size:14px;
		line-height:42px;
		white-space:nowrap;
		padding:0 12px;
		cursor:pointer;
		width:210px;
	}

	li:hover {
		background:#F5F3F0;
	}

	li:hover:after {
		display:none;
	}

	li:hover + li:after {
		display:none;
	}

	.disabled {
		color:#99938A;
		cursor:default;
	}
</style>