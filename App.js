import React from 'react';
import './App.css';



function App() {

   // gets 'myLibraryInLocalStorage' from localStorage, or if emtpy, returns empty array
  const storedLibrary = JSON.parse(localStorage.getItem('myLibraryInLocalStorage') || '[]')
  
  // sets state to equal the local storage
  const [myLibrary, setMyLibrary] = React.useState(storedLibrary); 

  // sets myLibrary as localStorage when myLibrary is changed at all
  React.useEffect(() => {
    localStorage.setItem('myLibraryInLocalStorage', JSON.stringify(myLibrary));
  }, [myLibrary]);

  // setter function, adds a new book to the library
  // should be passed to a child component
  function addBook(newBook) {
    setMyLibrary([newBook, ...myLibrary])
  }

  // toggle the 'read' boolean on a book in the library
  function toggleBookRead(index) {
    // access the desired book
    const currentBook = myLibrary[index]

    // toggle the 'read' key
    currentBook.read = !currentBook.read

    // copy the library so we can safely edit
    const newLibrary = [...myLibrary]
    
    // set the edited book
    newLibrary[index] = currentBook
    setMyLibrary(newLibrary)
  }

  function deleteBook(title) {
    const filteredArray = [...myLibrary].filter(items => items.title !== title)
    setMyLibrary(filteredArray)
  }

  return (
    <div className="App">
      <h1 className="titleText">My Library</h1>
      <div className="bookForm">
        <AddBooktoLibrary onAddBook={addBook}/>
      </div>
      <div className="books"></div>
      <h2 className="myBook">My Books</h2>
      <div className="book">
        {myLibrary.map(({title, author, pages, read}, index) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>
              {author} &nbsp; {pages} pages &nbsp; Have read: 
              <input type='checkbox' checked={read} onChange={() => toggleBookRead(index)} />
              &nbsp;&nbsp; <button className="delete" onClick={() => deleteBook(title)}>X</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// initial new book state
const initialState = {title: '', author: '', pages: '', read: false}

function AddBooktoLibrary(props) {
  const [newBook, setNewBook] = React.useState(initialState)
  
  // add book to library using prop
  // clear form state after
  const handleClick = () => {
    props.onAddBook(newBook)
    setNewBook(initialState)
  }

  return (
    <div>
      <h3>Add New Book</h3>
      <input type='text' placeholder="Title" value={newBook.title} onChange={(event) => setNewBook({...newBook, title: event.target.value})} />
      <br></br>
      <input type='text' placeholder="Author" value={newBook.author} onChange={(event) => setNewBook({...newBook, author: event.target.value})} />
      <br></br>
      <input type='text' placeholder="Pages" value={newBook.pages} onChange={(event) => setNewBook({...newBook, pages: event.target.value})} />
      <br></br>
      Read?<input type='checkbox' checked={newBook.read} onChange={(event) => setNewBook({...newBook, read: event.target.checked})} />
      <br></br>
      <button onClick={handleClick}>Add Book</button>
      
    </div>
  )
};

export default App;
