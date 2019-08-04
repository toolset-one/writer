<script>
	import { createEventDispatcher } from 'svelte'
	import UiIcon from './ui-icon.svelte'

	const dispatch = createEventDispatcher()

	export let label = 'No Label'
	export let type = 'default'
	export let icon = 'burger'
	export let link = null

	let el,
		hover = false,
		mousePosition = {
			x: 0,
			y: 0
		}

	$: boundingRect = el ? el.getBoundingClientRect() : {
		top: 0,
		left: 0
	}

	function click(e) {
		if(!link) {
			e.preventDefault()
		}
		dispatch('click', '')
	}

</script>

<a
	href="{link ? link : '#'}"
	class="type-{type}"
	style="{
		'--x: '+ (mousePosition.x - boundingRect.left) +'px;' +
		'--y: '+ (mousePosition.y - boundingRect.top) +'px;'
	}"
	bind:this={el}
	on:click={e => click(e)}
	on:mouseenter={e => hover = true}
	on:mouseleave={e => hover = false}
	on:mousemove={e => mousePosition = {
		x: e.pageX,
		y: e.pageY
	}}>
	<em></em>
	<span>
		{#if type === 'default'}	
			{label}
		{:else if type === 'icon' || type === 'entry'}
			<UiIcon type={icon} color="{hover ? 'blue' :'var(--color-dark)'}" />
		{/if}	
	</span>
</a>

<style>
	a {
		display:inline-block;
		position:relative;
		padding:1px;
		border:0;
		border-radius:6px;
		background:#CCC9C4;
		cursor:pointer;
		box-shadow:0 6px 0 -3px rgba(0, 0, 0, .05);
		transition:all 100ms ease;
		outline:none;
	}

	a:hover {
		text-decoration:none;
		transform:translateY(1px);
		box-shadow:0 4px 0 -3px rgba(0, 0, 0, .05);
	}

	a:active {
		background:#99815C;
		transform:translateY(2px);
		box-shadow:0 -4px 0 -3px rgba(0, 0, 0, .05);
	}

	a:before {
		content:'';
		display:block;
		width:100%;
		height:100%;
		background:rgba(0, 0, 0, 0);
		position:absolute;
		top:2px;
		left:0;
		transition:all 100ms ease;
	}


	.type-icon {
		width:42px;
		height:42px;
		border-radius:50%;
	}

	.type-icon span {
		display:block;
		width:40px;
		height:40px;
		padding:0;
		padding:14px;
		border-radius:50%;
	}

	.type-icon em {
		border-radius:50%;
	}

	.type-icon em:after, .type-entry em:after {
		width:60px;
		height:60px;
	}

	span {
		display:block;
		position:relative;
		border-radius:5px;
		line-height:40px;
		background:#FFF;
		padding:0 18px;
		font-size:14px;
		font-weight:600;
		color:#26231E;
	}

	em {
		display:block;
		width:100%;
		height:100%;
		position:absolute;
		top:0;
		left:0;
		background:transparent;
		border-radius:6px;
		overflow:hidden;
	}

	em:after {
		content:'';
		display:block;
		position:absolute;
		left:var(--x);
		top:var(--y);
		width:120px;
		height:120px;
		background:radial-gradient(circle closest-side, blue, transparent);
		transform:translate(-50%, -50%) scale(0);
		transition:transform 500ms ease;
		pointer-events:none;
	}

	a:hover em:after {
		transform:translate(-50%, -50%) scale(1);
	}

</style>