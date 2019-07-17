const { uniqueId, hash } = require('../helpers/helpers.js')
const { dbNew, dbFind } = require('../util/db.js')


const verifyEmailToken = async (ws, obj) => {

  // TODO: Sanetize obj.email

  const docs = await dbFind({ 
    collection: '_email_tokens', 
    query: {
      email: await hash(obj.email),
      token: obj.token
    }
  })


  if(docs.length === 0) {
    ws.send(JSON.stringify({
      promiseId: obj.promiseId,
      success: false,
      data: {
        error: 'NO_TOKEN_FOUND'
      }
    }))
    return
  }



  const user = (await dbFind({ 
    collection: '_users', 
    query: {
      email: obj.email
    }
  }))[0]

  if(!user) {
    const newUser = await dbNew({
      collection: '_users',
      data: {
        email: obj.email,
        _created: (new Date())
      }
    })

    console.log('NEW USER', newUser)
  }


  ws.send(JSON.stringify({
    promiseId: obj.promiseId,
    success: true,
    data: {}
  }))

  ws.send(JSON.stringify({
    action: 'changeAuth',
    data: {
      user: {
        irgendwas: 'IRGENDWAS'
      }
    }
  }))

}

exports.verifyEmailToken = verifyEmailToken




