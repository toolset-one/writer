import { writable } from 'svelte/store';

const ACTION_CODE_SETTINGS = {
	url: 'http://'+ (window.location.href.includes('localhost') ? 'localhost:10002' : 'tiap-writer.web.app') +'/validate-sign-in/',
	handleCodeInApp: true
}

export const authStore = writable({
	inited: false,
	hasAuth: false,
	user: null
})



export function authInit() {
	var timeStart = Date.now()

	console.log(Date.now() - loadedTime)

	firebase.auth().onAuthStateChanged(user => {
		console.log('T', 'AUTH STATE CHANGED', Date.now() - timeStart, firebase.auth().currentUser)
		if (user) {
			authStore.set({
				inited: true,
				hasAuth: true,
				user: {
					id: user.uid,
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
	firebase.auth().sendSignInLinkToEmail(email, ACTION_CODE_SETTINGS).then(() => {
		window.localStorage.setItem('emailForSignIn', email)
		cb(true)
	}).catch(err => {
		console.log(err)
		cb(false)
	})
}


export function authValidateLink() {

	if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
	
		var email = window.localStorage.getItem('emailForSignIn')
		if (!email) {
			email = window.prompt('Please provide your email for confirmation');
		}

		firebase.auth().signInWithEmailLink(email, window.location.href).then(res => {
			window.localStorage.removeItem('emailForSignIn')
		}).catch(err => {
			console.log(err)
		})
	}
}