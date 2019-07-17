import { writable } from 'svelte/store';
import Page from 'page'



export const routerStore = writable({
  view: 'index',
  subview: null
})



Page({
	hashbang: true
})

Page('/', data => 
	routerStore.set({
		view: 'index',
		id: null
	})
)

Page('/validate-sign-in/:token/', data => 
	routerStore.set({
		view: 'validate-sign-in',
		token: data.params.token
	})
)


Page('/text/:id/', data => 
	routerStore.set({
		view: 'text',
		id: data.params.id
	})
)

Page()