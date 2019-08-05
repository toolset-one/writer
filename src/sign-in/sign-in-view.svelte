<script>
	import { onMount } from 'svelte';
	import { authStore, authSendEmail } from '../stores/auth-store.js'

	import UiButton from '../ui/ui-button.svelte'

	let email = '',
		emailSuccessfullySent = false

	onMount(() => {
		authStore.subscribe(data => {
			if( data.anonymousId ) {
				firebase.db.collection('token').doc(data.anonymousId).get().then(doc => {
					if (doc.exists) {
						firebase.db.collection('token').doc(data.anonymousId).delete()
						const location = doc.data().location.replace('ios-sign-in', 'validate-sign-in'),
							locationWithoutId = location.replace(data.anonymousId, '')
						window.location.href = locationWithoutId
					}
				})
			}
		})
	})

	function submit(e) {
		e.preventDefault()
		authSendEmail(email, success => {
			if(success) {
				emailSuccessfullySent = true
			}
		})
	}

</script>

<section class="small-container">

	<h2>
		Sign In
	</h2>

	{#if !emailSuccessfullySent}

		<p>
			Type in your email address. You'll get an link to sign in to your mailbox.
		</p>
		<form on:submit|preventDefault={e => submit(e)}>
			<div class="input-wrapper">
				<input type="email" placeholder=" " bind:value={email}>
				<label>
					Type your E-Mail here
				</label>
			</div>
			<UiButton
				label="Sign In"
				 on:click={e => submit(e)} />
		</form>

	{:else}

		<p>
			We just sent an email to your address. It contains a link to sign you in. This window can be closed now.
		</p>

	{/if}

</section>


<style>
.small-container {
	margin:0 auto;
	padding:30px 0;
	max-width:420px;
	width:80%;
}

h2 {
	margin:0 0 12px 0;
	padding:0;
	font-size:24px;
	line-height:30px;
	font-family:vollkorn, serif;
	font-weight:400;
}

@media (min-width: 600px) {
	h2 {
		font-size:34px;
		line-height:36px;
	}
}

p {
	margin:0 0 12px 0;
	padding:0;
	font-size:14px;
	line-height:24px;
	font-weight:500;
}

@media (min-width: 600px) {

	p {
		margin:0 0 18px 0;
		font-size:16.5px;
		line-height:30px;
	}
}


.input-wrapper {
	position:relative;
	margin:0 0 30px 0;
	max-width:100%;
}

.input-wrapper label {
	line-height:12px;
	position:absolute;
	top:50%;
	left:18px;
	font-size:12px;
	transform-origin:0 0;
	transform:translateY(-50%);
	padding:0;
	transition:top 100ms ease;
	color:#999;
	pointer-events:none;
}

.input-wrapper input {
	-webkit-appearance:none;
	width:100%;
	max-width:100%;
	margin:0;
	border:0;
	border:#CCC9C4 1px solid;
	padding:14px 17px 14px 17px;
	line-height:24px;
	font-size:16px;
	background:#FFF;
	border-radius:6px;
	box-shadow:none;
	caret-color:#26231E;
	box-shadow:0 0 0 100px #FFF inset;
	outline-style:solid;
		outline-color:rgba(0, 0, 255, .25);
		outline-width:0;
		outline-offset:2px;
		color:#26231E;
}

.input-wrapper input:focus {
		outline-width:0px;
}

.input-wrapper input:not(:placeholder-shown) {
	padding:22px 17px 6px 17px;
}

.input-wrapper input:not(:placeholder-shown):valid	{

}


.input-wrapper input:not(:placeholder-shown) + label {
	top:15px;
	color:#26231E;
}

.input-wrapper:hover input, .input-wrapper:focus input {
	border-color:#26231E;
}

</style>