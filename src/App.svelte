<script>
	import { onMount } from 'svelte';
	import { routerStore } from './stores/router-store.js'
	import { authStore, authInit } from './stores/auth-store.js'

	import ViewSignIn from './sign-in/view.sign-in.svelte'
	import ViewValidateSignIn from './sign-in/view.validate-sign-in.svelte'

	onMount(() => {
		authInit()
	})

</script>

{#if $authStore.inited && $authStore.user != null}
	App
{:else if $authStore.inited && $authStore.user === null}

	{#if $routerStore.view === 'validate-sign-in'}
		<ViewValidateSignIn />
	{:else}
		<ViewSignIn />
	{/if}
	
{:else}
	<!-- LOADING -->
{/if}

<style>

</style>