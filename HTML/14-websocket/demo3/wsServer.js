const ws = require("nodejs-websocket")

const PORT = 3000
let clientCount = 0

// Scream server example: "hi" -> "HI!!!"
const server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++
	conn.nickName = 'user-' + clientCount
	broadcast(conn.nickName + 'come in.')
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str)
		broadcast(conn.nickName + ': ' + str)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		broadcast(conn.nickName + ' leave')
  })
  conn.on("error", function (err) {
		console.log(err)
	})
}).listen(PORT)

console.log('websocket server listening on port: ' + PORT)

const broadcast = (str) => server.connections.forEach(connection => connection.sendText(str))