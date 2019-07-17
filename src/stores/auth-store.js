import { writable } from 'svelte/store';

const ACTION_CODE_SETTINGS = {
	url: 'http://'+ (window.location.href.includes('localhost') ? 'localhost:10002' : 'writer.toolset.one') +'/validate-sign-in/',
	handleCodeInApp: true
}

export const authStore = writable({
	inited: false,
	hasAuth: false,
	user: null
})



export function authInit() {
	var timeStart = Date.now()

	panda.auth.subscribe(user => {
		if(user) {
			authStore.set({
				inited: true,
				hasAuth: true,
				user: {
					id: user.id,
					email: user.email
				}
			})
		} else {
			authStore.set({
				inited: true,
				hasAuth: false,
				user: null
			})
		}
	})
}



export function authSendEmail(email, cb) {

	panda.auth.sendEmailToken(email).then(() => {
		window.localStorage.setItem('emailForSignIn', email)
		cb(true)
	}).catch(err => {
		console.log('ERR', err)
		cb(false)
	})
}


export function authValidateLink(token, cb) {

	const email = window.localStorage.getItem('emailForSignIn')
	// email = window.prompt('Please provide your email for confirmation');

	console.log('TTTT')
	panda.auth.verifyEmailToken(email, token).then(res => {
		cb(true)
	}).catch(err => {
		console.log('ERR', err)
		cb(false)
	})
}