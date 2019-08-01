import { writable } from 'svelte/store';
import { routerStore, routerToIndex } from '../stores/router-store.js'
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
							data.array = (Object.keys(data.json).map(el => data.json[el])).sort((a, b) => 
								(b.updated ? b.updated.toDate() : 0) - (a.updated ? a.updated.toDate() : 0)
							)
							data.textActive = (data.json && data.json[textId]) ? data.json[textId] : null
							return data
						})
					} else if (change.type === 'removed') {
						textsStore.update(data => {
							delete data.json[change.doc.id]
							data.array = (Object.keys(data.json).map(el => data.json[el])).sort((a, b) => 
								(b.updated ? b.updated.toDate() : 0) - (a.updated ? a.updated.toDate() : 0)
							)
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
			user: authData.user.id,
			excerpt: '',
			text: '',
			updated: new Date(),
			created: new Date()
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


export function textsStoreChangeText(id, text) {
	firebase.db.collection('texts').doc(id).update({
		text,
		excerpt: getExcerpt(text),
		updated: new Date()
	})
}

export function textsStoreDeleteText(id) {

	routerToIndex()

	firebase.db.collection('texts').doc(id).delete().then(res => {

	}).catch(err => {
		console.log('ERR', err)
	})
}


function getExcerpt(text) {

	if(text.length > 100) {

		if(text.split('\n')[0].length <= 100) {
			return	text.split('\n')[0]
		}

		const trimmedText = text.substr(0, 100),
			wordTrimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(' ')))
			return wordTrimmedText +'…'
	}

	return text
}
