import { writable } from 'svelte/store';
import { routerStore } from '../stores/router-store.js'
import { authStore } from '../stores/auth-store.js'

export const textsStore = writable({
	textActive: null,
	json: {},
	array: []
})

let listener,
	textId


export function textsStoreInit() {
	setListener()

	routerStore.subscribe(routerData => {
		textId = routerData.id
		textsStore.update(data => {
			data.textActive = (data.json && data.json[textId]) ? data.json[textId] : null
			return data
		})
	})
}

function setListener() {
	authStore.subscribe(authData => {
		if(listener) {
			listener()
		}

		if(authData.hasAuth) {
			listener = firebase.db.collection('texts').where('user', '==', authData.user.id).onSnapshot(snapshot =>
				snapshot.docChanges().forEach(change => {
								
					if (change.type === 'added' || change.type === 'modified') {

						const textData = Object.assign({ 
							id: change.doc.id 
						}, change.doc.data())

						textsStore.update(data => {
							data.json[textData.id] = textData
							data.array = Object.keys(data.json).map(el => data.json[el])
							data.textActive = (data.json && data.json[textId]) ? data.json[textId] : null
							return data
						})
					} else if (change.type === 'removed') {
						textsStore.update(data => {
							delete data.json[change.doc.data().slug]
							data.array = Object.keys(data.json).map(el => data.json[el])
							data.textActive = (data.json && data.json[textId]) ? data.json[textId] : null
							return data
						})
					}
				})
			)
		}
	})
}



export function textsStoreNewText(cb) {

	const unsubscribe = authStore.subscribe(authData => {
		firebase.db.collection('texts').doc().set({
			user: authData.user.id
		}).then(() => {
			console.log('document created');
			cb(true)
		}).catch(err => {
			console.error('error: ', err);
			cb(false)
		})
	})
	unsubscribe()
}