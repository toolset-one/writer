import { writable } from 'svelte/store';


const isIosStandAlone = 'standalone' in navigator
	&& (/iphone|ipod|ipad/gi).test(navigator.platform)
	&& (/Safari/i).test(navigator.appVersion),
	isLocalhost = window.location.href.includes('localhost'),

	view = isIosStandAlone ? 'ios-sign-in' : 'validate-sign-in',
	mainUrl = isLocalhost ? 'localhost:10002' : 'writer.toolset.one',
	protocol = isLocalhost ? 'http' : 'https',
	urlForSignIn = protocol + '://' + mainUrl + '/' + view + '/'


export const authStore = writable({
	inited: false,
	hasAuth: false,
	user: null
})


export function authInit() {
	firebase.auth().onAuthStateChanged(user => {
		if (user && !user.isAnonymous) {
			authStore.set({
				inited: true,
				hasAuth: true,
				anonymousId: null,
				user: {
					id: user.uid,
					email: user.email
				}
			})
		} else {
			authStore.set({
				inited: true,
				hasAuth: false,
				anonymousId: user ? user.uid : null,
				user: null
			})
		}
	})
}


export function authSendEmail(email, cb) {

	window.localStorage.setItem('emailForSignIn', email)

	if( true ) {
		firebase.auth().signInAnonymously().then(res => {

			firebase.auth().sendSignInLinkToEmail(email, {
				url: urlForSignIn + res.user.uid + '',
				handleCodeInApp: true
			}).then(() => {
				cb(true)
			}).catch(err => {
				console.log(err)
				cb(false)
			})

		}).catch(err => {
			cb(false)
		})
	} else {
		firebase.auth().sendSignInLinkToEmail(email, {
			url: urlForSignIn,
			handleCodeInApp: true
		}).then(() => {
			cb(true)
		}).catch(err => {
			console.log(err)
			cb(false)
		})
	}
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