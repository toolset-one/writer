<script>
	import { onMount } from 'svelte'
	import { routerStore } from './stores/router-store.js'
	import { authStore, authInit } from './stores/auth-store.js'
	import { textsStoreInit } from './stores/texts-store.js'

	import ViewSignIn from './sign-in/sign-in-view.svelte'
	import ViewValidateSignIn from './sign-in/validate-sign-in-view.svelte'
	import ViewIosSignIn from './sign-in/ios-sign-in-view.svelte'
	import IndexView from './index/index-view.svelte'
	import TextView from './text/text-view.svelte'

	onMount(() => {
		authInit()
		textsStoreInit()
	})

</script>

{#if $routerStore.view === 'ios-sign-in'}
	<ViewIosSignIn />
{:else if $authStore.inited && $authStore.user != null}
	
	{#if $routerStore.view === 'index'}
		<IndexView />
	{:else if $routerStore.view === 'text'}
		<TextView />
	{/if}

{:else if $authStore.inited && $authStore.user === null}

	{#if $routerStore.view === 'validate-sign-in'}
		<ViewValidateSignIn />
	{:else}
		<ViewSignIn />
	{/if}
	
{:else}
	<div class="loader">
		Loading…
	</div>
{/if}
<style>

.loader, .loader:before, .loader:after {
	border-radius:50%;
	width:12px;
	height:12px;
	animation:load 1200ms infinite ease-in-out;
	background:transparent;
	box-shadow:0 -12px 0 0 var(--color-dark);
}
.loader {
	position:absolute;
	top:50%;
	left:50%;
	animation-delay:200ms;
	text-indent:-9999px;
	margin:6px 0 0 -6px;
}
.loader:before, .loader:after {
	display:block;
	content:'';
	position:absolute;
	top:0;
}
.loader:before {
	left:-18px;
	animation-delay:0ms;
}
.loader:after {
	left:18px;
	animation-delay:400ms;
}

@keyframes load {
	0%,
	80%,
	100% {
		box-shadow:0 -12px 0 0 var(--color-dark);
	}
	40% {
		box-shadow:0 -24px 0 0 var(--color-dark);
	}
}
</style>