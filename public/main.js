const bookListContainer = document.querySelector('#bookListContainer')
const baseURL = //'http://localhost:5050/booklist'
    'https://project-book-list.herokuapp.com'
const bookForm = document.querySelector('#bookForm')

const booksCallback = ({ data: books }) => displayBooks(books)
const errCallback = err => {
    console.log(err)
}

// const getAllBooks = () => {
//     axios
//         .post(baseURL)
//         .then(booksCallback)
//         .catch(errCallback)
// }

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

// getAllBooks()


document.getElementById('movieBtn').onclick = () => {
    let search = document.getElementById('movieSearch')
    let searchText = search.value
    axios
        .get(`https://www.omdbapi.com/?apikey=2b23be8b&t=${searchText}`)
        .then((res) => {
            let movieTitle = res.data.Title
            let movieYear = res.data.Year
            let director = res.data.Director
            let results = document.getElementById('searchResults')
            let movieCard = document.createElement('div')
            movieCard.innerHTML = `MOVIE: ${movieTitle} YEAR: ${movieYear} DIRECTOR: ${director}`
            results.appendChild(movieCard)
            // console.log(res.data.Title)

        })
        .catch(errCallback)

    searchText = ''
}