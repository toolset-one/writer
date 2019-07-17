const { uniqueId, hash, sendEmail } = require('../helpers/helpers.js'),
  { dbNew } = require('../util/db.js')

const sendEmailToken = async (ws, obj) => {

  const email = obj.email,
    token = uniqueId() + uniqueId()

  const tokenEntry = await dbNew({
    collection: '_email_tokens',
    data: {
      email: await hash(email),
      token,
      _created: (new Date())
    }
  })


  const emailSuccessFullSent = await sendEmail({
    sender: 'account@toolset.one',
    receiver: email,
    subject: 'Toolset.One Writer – Sign In',
    body: 'Sign In Link: http://localhost:10002/validate-sign-in/' + token + '/'
  })

  ws.send(JSON.stringify({
    promiseId: obj.promiseId,
    success: true,
    data: {}
  }))
}

exports.sendEmailToken = sendEmailToken