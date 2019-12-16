const ws = require("nodejs-websocket")

const PORT = 3000
let clientCount = 0

// Scream server example: "hi" -> "HI!!!"
const server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++
	conn.nickName = 'user-' + clientCount
	let msg = {
		type: 'enter',
		data: conn.nickName + ' come in.'
	}
	broadcast(JSON.stringify(msg))
	conn.on("text", function (str) {
		console.log("Received "+str)
		let msg = {
			type: 'text',
			data: conn.nickName + ' says : ' + str
		}
		broadcast(JSON.stringify(msg))
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		let msg = {
			type: 'leave',
			data: conn.nickName + ' leave'
		}
		broadcast(JSON.stringify(msg))
  })
  conn.on("error", function (err) {
		console.log(err)
	})
}).listen(PORT)

console.log('websocket server listening on port: ' + PORT)

const broadcast = (str) => server.connections.forEach(connection => connection.sendText(str))