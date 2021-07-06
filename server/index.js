const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const ctrl = require('./controller')

const { deleteBook, getAllBooks, addBook, shuffleBooks } = ctrl

app.use(express.json())
app.use(cors())

app.post('/booklist/addbook', addBook)
app.delete('/booklist/:bookId', deleteBook)
// app.get('/booklist', getAllBooks)
app.get('/booklist/shuffle', shuffleBooks)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.css'))
})

const serverPort = process.env.PORT || 5050
app.listen(serverPort, () => {
    console.log(`server up on ${serverPort}`)
})