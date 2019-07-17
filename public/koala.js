let koala = {
	promises: {}
}


koala.gatewayIn = obj => {
	parsedObj = JSON.parse(obj)
	
	switch(parsedObj.action) {
		case 'init': koala.init(parsedObj); break;
		case 'sendEmailToken': koala.auth.sendEmailToken(parsedObj); break;
		case 'verifyEmailToken': koala.auth.verifyEmailToken(parsedObj); break;
		default: console.log('ACTION NOT SET') 
	}
}

koala.gatewayOut = obj => {
	panda.gatewayIn(JSON.stringify(obj))
}

koala.init = ({ promiseId, url }) => {
	koala.url = url

	koala.initPromiseId = promiseId

	koala.server = new WebSocket(url)
	koala.server.onopen = koala.serverOpen
	koala.server.onmessage = koala.serverMessage
	koala.server.onclose = koala.serverClose
}

koala.serverOpen = e => {
	koala.gatewayOut({ 
		promiseId: koala.initPromiseId,
		success: true,
		data: {}
	})
}

koala.serverMessage = e => {
	parsedObj = JSON.parse(e.data)
	
	if(parsedObj.promiseId) {
		if(parsedObj.success) {
			koala.promises[parsedObj.promiseId].resolve(parsedObj.data)
		} else {
			koala.promises[parsedObj.promiseId].reject(parsedObj.data)
		}
		delete koala.promises[parsedObj.promiseId]
	} else {
		switch (parsedObj.action) {
			case 'changeAuth': console.log('AUTH CHANGE', parsedObj.data); break;
		}
	}
}

koala.serverClose = e => {
	console.log('SOCKET CLOSED')
}

koala.serverSend = obj =>
	new Promise((resolve, reject) => {
		obj.promiseId = Math.random()
		koala.promises[obj.promiseId] = {
			resolve,
			reject
		}
		koala.server.send(JSON.stringify(obj))		
	})


koala.auth = {}

koala.auth.sendEmailToken = ({ promiseId, email }) =>
	koala.serverSend({
		action: 'sendEmailToken',
		email
	}).then(res =>
		koala.gatewayOut({ 
			promiseId,
			success: true,
			data: {}
		})
	).catch(error =>
		koala.gatewayOut({ 
			promiseId,
			success: false,
			data: {
				errorCode: 'SERVER_ERROR',
				error 
			}
		})
	)


koala.auth.verifyEmailToken = ({ promiseId, email, token }) =>
	koala.serverSend({
		action: 'verifyEmailToken',
		email,
		token
	}).then(res =>
		koala.gatewayOut({ 
			promiseId,
			success: true,
			data: {}
		})
	).catch(error =>
		koala.gatewayOut({ 
			promiseId,
			success: false,
			data: {
				errorCode: 'SERVER_ERROR',
				error 
			}
		})
	)

