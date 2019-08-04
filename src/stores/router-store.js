import { writable } from 'svelte/store';
import Page from 'page'


export const routerStore = writable({
	view: 'index',
	subview: null
})


export function routerToIndex() {
	Page('/')
}


Page({
	hashbang: true
})


Page('/', data => 
	routerStore.set({
		view: 'index',
		id: null
	})
)


Page('/validate-sign-in/', data => 
	routerStore.set({
		view: 'validate-sign-in',
		id: null
	})
)


Page('/text/:id/', data => 
	routerStore.set({
		view: 'text',
		id: data.params.id
	})
)


Page()