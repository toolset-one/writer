const https = require('https')



const sendEmail = ({ sender, receiver, subject, body }) =>
  new Promise((resolve, reject) => {

    const postData = JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: receiver
            }
          ]
        }
      ],
      from: {
        email: sender
      },
      subject: subject,
      content: [
        {
          type: 'text/plain',
          value: body
        }
      ]
    })


    const options = {
      hostname: 'api.sendgrid.com',
      port: 443,
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "process.env['SENDGRID_KEY']"
      }
    }

    console.log(postData, options)

    /*const req = https.request(options, res =>
      res.on('data', d =>
        process.stdout.write(d)
      )
    )

    req.on('error', err => console.error(e))

    req.write(postData)
    req.end()*/

    resolve()
  })

exports.sendEmail = sendEmail