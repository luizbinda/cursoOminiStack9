const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')


const routes = require('./routes')
const app = express()

const server = http.Server(app)
const io = socketio(server)

const connectUsers = {}


mongoose.connect('mongodb+srv://oministack:oministack@oministack9-w9dzo.mongodb.net/oministack9?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

io.on('connect', socket => {
    const {user_id} = socket.handshake.query
    connectUsers [user_id] = socket.id
})

app.use((req, res, next) =>{
    req.io = io
    req.connectUsers = connectUsers

    return next()
})


const port = 3333

// GET, POST, PUT, DELETE
// req.query = Acessar query params (para filtros)
// req.params =  Acessar route params  (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))


app.use(routes)
server.listen(port)

