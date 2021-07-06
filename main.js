const bookListContainer = document.querySelector('#bookListContainer')
const baseURL = 'http://localhost:5050/booklist'
const bookForm = document.querySelector('#bookForm')

const booksCallback = ({ data: books }) => displayBooks(books)
const errCallback = err => {
    console.log(err)
}

const getAllBooks = () => {
    axios
        .post(baseURL)
        .then(booksCallback)
        .catch(errCallback)
}

const addBook = body => {
    axios
        .post(`${baseURL}/addbook`, body)
        .then(booksCallback)
        .catch(errCallback)
}

const deleteBook = id => {
    axios
        .delete(`${baseURL}/${id}`)
        .then(booksCallback)
        .catch(errCallback)
}


function submitBook(e) {
    e.preventDefault()
    let title = document.querySelector('#titleText')
    let bodyObj = {
        title: title.value,
    }

    addBook(bodyObj)

    title.value = ''
}

function createBookCard(book) {
    const bookCard = document.createElement('div')
    bookCard.innerHTML = `<p>${book.title}</p>
    <button class="delBtn" onclick="deleteBook(${book.id})">X</button>`
    bookListContainer.appendChild(bookCard)
}

function displayBooks(arr) {
    bookListContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createBookCard(arr[i])
    }
}

bookForm.addEventListener('submit', submitBook)


document.getElementById('shuffleBtn').onclick = () => {
    axios
        .get(`${baseURL}/shuffle`)
        .then((res) => {
            let books = res.data
            let randomIndex = Math.floor(Math.random() * books.length)
            let randomBook = books[randomIndex]
            let bookName = randomBook.title
            // let randomBookDisplay = document.getElementById('shuffledBookContainer')
            alert(bookName)
        })
        .catch(errCallback)
}

getAllBooks()
