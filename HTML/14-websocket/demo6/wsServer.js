const app = require('http').createServer()
const io = require("socket.io")(app)

const PORT = 3000
let clientCount = 0

app.listen(PORT)

io.on('connection', (socket) => {
	clientCount++
	socket.nickName = 'user' + clientCount
	io.emit('enter', socket.nickName + ' comes in')
	socket.on('message', (str) => {
		io.emit('message', socket.nickName + ' says: ' + str)
	})
	socket.on('disconnect', () => {
		io.emit('leave', socket.nickName + ' leave')
	})
})

console.log('websocket server listening on port: ' + PORT)