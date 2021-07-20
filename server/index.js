const express = require('express')
const app = express()
app.use(express.static("public"))
const cors = require('cors')
const path = require('path')
const ctrl = require('./controller')

const { deleteBook, getAllBooks, addBook, shuffleBooks } = ctrl

app.use(express.json())
app.use(cors())

app.post('/addbook', addBook)
app.delete('/:bookId', deleteBook)
// app.get('/booklist', getAllBooks)
app.get('/shuffle', shuffleBooks)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.css'))
})

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/main.js'))
})

app.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/config.js'))
})

const serverPort = process.env.PORT || 5050
app.listen(serverPort, () => {
    console.log(`server up on ${serverPort}`)
})