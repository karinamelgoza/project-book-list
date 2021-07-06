// const { title } = require("process")

const books = []
let id = 1

module.exports = {
    addBook: (req, res) => {
        let { title } = req.body
        let newBook = {
            id,
            title
        }
        books.push(newBook)
        id++

        res.status(200).send(books)

        // for (i = 0; i < books.length; i++) {
        //     if (newBook.title === books.title) {
        //         res.status(400).send('already in list')
        //     } else {
        //         books.push(newBook)
        //         id++

        //     }
        // }
        // res.status(200).send(books)
    },
    // getAllBooks: (req, res) => {
    //     res.status(200).send(books)
    // },
    deleteBook: (req, res) => {
        const tgtIndex = books.findIndex((bookIndex) => {
            return bookIndex.id === +req.params.bookId
        })

        books.splice(tgtIndex, 1)
        res.status(200).send(books)
    },
    shuffleBooks: (req, res) => {
        res.status(200).send(books)
    }
}