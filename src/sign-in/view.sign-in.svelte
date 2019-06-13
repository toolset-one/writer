<script>
	import { onMount } from 'svelte';
	import { authStore, authSendEmail } from '../stores/auth-store.js'

	let email = '',
		emailSuccessfullySent = false

	onMount(() => {
		
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
		Type in your email address. You'll get an link to sign in to this email address.
	</p>

	<form on:submit|preventDefault={e => submit(e)}>

		<div class="input-wrapper">
			<input type="email" placeholder=" " bind:value={email}>
			<label>
				E-Mail
			</label>
		</div>

		<button class="button">
			Sign In →
		</button>

	</form>

	{:else}

	<p>
		We just sent an email to your address. It contains a link to sign you in. This window can be closed now.
	</p>
	{/if}

</section>


<style>
.small-container {
	margin:30px auto;
	max-width: 420px;
	width:80%;
}

h2 {
	margin:0 0 12px 0;
	padding:0;
	font-size:24px;
	line-height: 30px;
	font-family:georgia;
	font-weight:400;
}

@media (min-width: 600px) {
	h2 {
		font-size:34px;
		line-height: 36px;
	}
}

p {
	margin:0 0 24px 0;
	padding:0;
	font-size:13.2px;
	line-height: 24px;
	font-weight:400;
}

@media (min-width: 600px) {

	p {
		margin:0 0 36px 0;
		font-size:16.5px;
		line-height: 30px;
	}
}


.button {
	margin:0;
	border:#333 1px solid;
	padding:5px 17px 5px 23px;
	line-height: 24px;
	font-size: 14px;
	background:#FCFCFC;
	border-radius: 4px;
	box-shadow: none;
	outline:none;
	font-weight:400;
	color:#333;
	cursor: pointer;
	box-shadow:0 3px 0 #FFF inset, 0 -3px 0 #DDD inset;
	outline-style: solid;
    outline-color: rgba(0, 0, 255, .25);
    outline-width: 0;
    outline-offset: 2px;
    transition: box-shadow 100ms ease, color 100ms ease, border-color 100ms ease;
}

.button:hover {
	border-color:#222;
	color:#222;
	box-shadow:0 4px 0 #FFF inset, 0 -2px 0 #DDD inset;
}

.button:focus {
	outline-width: 4px;
}

.button.disabled {
	color:#999;
	border-color:#999;
	box-shadow:0 3px 0 #FFF inset;
	cursor:default;
}

.button.disabled:hover {
	color:#999;
	border-color:#999;
	box-shadow:0 3px 0 #FFF inset;
}



.input-wrapper {
	position: relative;
	margin:0 0 18px 0;
	max-width:100%;
	width:600px;
}	

.input-wrapper-big {
	margin:0 24px;
	width:auto;
}

.input-wrapper label {
	line-height:12px;
	position: absolute;
	top:50%;
	left:18px;
	font-size:12px;
	transform-origin: 0 0;
	transform: translateY(-50%);
	padding:0;
	transition:top 100ms ease;
	color:#999;
	pointer-events: none;
}

.input-wrapper input {
	width:100%;
	max-width:100%;
	margin:0;
	border:#333 1px solid;
	padding:20px 17px 20px 17px;
	line-height: 24px;
	font-size: 16.5px;
	background:#FFF;
	border-radius: 2px;
	box-shadow: none;
	caret-color:#333;
	box-shadow: 0 0 0 100px #FFF inset;
	outline-style: solid;
    outline-color: rgba(0, 0, 255, .25);
    outline-width: 0;
    outline-offset: 2px;
}

.input-wrapper input:focus {
    outline-width: 4px;
}

.input-wrapper input:not(:placeholder-shown) {
	padding:28px 17px 12px 17px;
}

.input-wrapper input:not(:placeholder-shown):valid  {

}


.input-wrapper input:not(:placeholder-shown) + label {
	top:20px;
	color:#222;
}

.input-wrapper:hover input, .input-wrapper:focus input {
	border-color:#333;
}

</style>