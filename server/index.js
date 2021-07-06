const express = require('express')
const app = express()
const cors = require('cors')
const ctrl = require('./controller')

const { deleteBook, getAllBooks, addBook, shuffleBooks } = ctrl

app.use(express.json())
app.use(cors())

app.post('/booklist/addbook', addBook)
app.delete('/booklist/:bookId', deleteBook)
app.get('/booklist', getAllBooks)
app.get('/booklist/shuffle', shuffleBooks)

const serverPort = 5050
app.listen(serverPort, () => {
    console.log(`server up on ${serverPort}`)
})