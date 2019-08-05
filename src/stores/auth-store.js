import { writable } from 'svelte/store';


const isIosStandAlone = 'standalone' in navigator 
	&& !navigator.standalone
	&& (/iphone|ipod|ipad/gi).test(navigator.platform)
	&& (/Safari/i).test(navigator.appVersion),
	isLocalhost = window.location.href.includes('localhost'),

	view = isIosStandAlone ? 'ios-sign-in' : 'validate-sign-in',
	mainUrl = isLocalhost ? 'localhost:10002' : 'writer.toolset.one',
	protocol = isLocalhost ? 'http' : 'https',
	urlForSignIn = protocol + '://' + mainUrl + '/' + view + '/'


const ACTION_CODE_SETTINGS = {
	url: urlForSignIn,
	handleCodeInApp: true
}

export const authStore = writable({
	inited: false,
	hasAuth: false,
	user: null
})


export function authInit() {
	firebase.auth().onAuthStateChanged(user => {
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


export function authValidateLink(cb) {
	if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
	
		var email = window.localStorage.getItem('emailForSignIn')
		if (!email) {
			email = window.prompt('Please provide your email for confirmation')
		}

		firebase.auth().signInWithEmailLink(email, window.location.href).then(res => {
			window.localStorage.removeItem('emailForSignIn')
			cb(true)
		}).catch(err => {
			console.log(err)
			cb(false)
		})
	} else {
		cb(false)
	}
}