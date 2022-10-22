import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MyBooksPage from "./pages/MyBooksPage";
import SearchPage from "./pages/SearchPage";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [myBooks, setMyBooks] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      const res = await BooksAPI.getAll();
      setMyBooks(res);
    };
    getAll();
  }, []);

  const changeBookShelf = (book, newShelf) =>{
    let index = myBooks.findIndex(b => b.id === book.id);
    if(index !== -1)
      {
        // Update State ...
        let newMyBooks = [...myBooks];
        newMyBooks[index].shelf = newShelf;
        setMyBooks(newMyBooks);
      }
      else {
        //add new book to state
        setMyBooks([...myBooks, {...book, shelf: newShelf}])
      }
      // Update server...
      BooksAPI.update(book, newShelf);
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<MyBooksPage myBooks={myBooks} changeBookShelf={changeBookShelf} />} />
        <Route
          path="/search"
          element={<SearchPage myBooks={myBooks} changeBookShelf={changeBookShelf} />}
        />
      </Routes>
    </div>
  );
}

export default App;
