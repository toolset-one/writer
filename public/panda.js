let panda = {
	url: null,
	promises: {}
}



panda.init = async url =>
	panda.gatewayOut({
		action: 'init',
		url
	})



panda.auth = {}


panda.auth.sendEmailToken = email =>
	panda.gatewayOut({
		action: 'sendEmailToken',
		email
	})


panda.auth.verifyEmailToken = (email, token) =>
	panda.gatewayOut({
		action: 'verifyEmailToken',
		email,
		token
	})


panda.auth.subscribe = cb => {
	if(!panda.authCallbacks) {
		panda.authCallbacks = []
	}

	panda.authCallbacks.push({
		id: Math.random(),
		cb
	})

	cb(null)

	// TODO: Unsubscribe function
	return function() {}
}


panda.auth.signOut = () => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}






const pandaDbDefineIndex = index => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}



const pandaDbDefineRules = (kind, fn) => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}



const pandaDbCollection = collection => ({
	collection,
	where: [],
	get: pandaDbGet,
	set: pandaDbSet,
	update: pandaDbUpdate,
	delete: pandaDbDelete,
	query: pandaDbQuery,
	subscribe: pandaDbSubscribe,
	where: pandaDbWhere
})



const pandaDbWhere = (attr, operator, value) => {
	panda.where.push({
		attr,
		operator,
		value
	})
	return panda
}



const pandaDbGet = id => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}



const pandaDbSet = (id, doc) => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}



const pandaDbUpdate = (id, doc) => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}



const pandaDbDelete = id => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}



const pandaDbQuery = () => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}



const pandaDbSubscribe = cb => {
	return new Promise((resolve, reject) => {
		reject('NOT_IMPLEMENTED')
	})
}


panda.db = {
	defineIndex: pandaDbDefineIndex,
	defineRules: pandaDbDefineRules,
	collection: pandaDbCollection
}


panda.gatewayOut = obj => {
	return new Promise((resolve, reject) => {

		const promiseId = Math.random()

		obj.promiseId = promiseId

		panda.promises[promiseId] = {
			resolve,
			reject
		}

		koala.gatewayIn(JSON.stringify(obj))
	})
}

panda.gatewayIn = obj => {
	parsedObj = JSON.parse(obj)
	
	if(parsedObj.promiseId) {
		if(parsedObj.success) {
			panda.promises[parsedObj.promiseId].resolve(parsedObj.data)
		} else {
			panda.promises[parsedObj.promiseId].reject(parsedObj.data)
		}
		delete panda.promises[parsedObj.promiseId]
	}
}