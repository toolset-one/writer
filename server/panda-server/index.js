const WebSocket = require('ws'),
  { sendEmailToken } = require('./libs/functions/send-email-token.js'),
  { verifyEmailToken } = require('./libs/functions/verify-email-token.js') 


const ACTIONS = {
  sendEmailToken,
  verifyEmailToken 
}


const wss = new WebSocket.Server({
  port: 8080
})


wss.on('connection', ws =>
  ws.on('message', message => messageSwitch(ws, JSON.parse(message)))
)


const messageSwitch = async (ws, obj) => ACTIONS[obj.action](ws, obj)
