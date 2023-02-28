import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BooksList from "../components/BooksList";
import * as BooksAPI from "../BooksAPI";

const SearchPage = ({ myBooks, changeBookShelf }) => {
  const [searchResultBooks, setSearcResultBooks] = useState([]);
  let searchTimeout;

  const updateShelf = (book, newShelf) => {
    let currentBooks = [...searchResultBooks];
    currentBooks[currentBooks.findIndex(b => b.id === book.id)].shelf= newShelf;
    setSearcResultBooks(currentBooks);
    changeBookShelf(book, newShelf);
  }
  const getSearchResult = async (query) => {
    const rawBooks = await BooksAPI.search(query);
    if (Array.isArray(rawBooks)) {
      const booksWithshelves = rawBooks.map((rawBook) => {
        const bookFromMine = myBooks.find((b) => {
          return b.id === rawBook.id;
        });
        return bookFromMine
          ? { ...rawBook, shelf: bookFromMine.shelf }
          : { ...rawBook, shelf: "none" };
      });
      setSearcResultBooks(booksWithshelves);
    } else setSearcResultBooks([]);
  };

  const searchBooks = (query) => {
    // to cancel previous search orders within 500 milliseconds...
    clearTimeout(searchTimeout);
    if (query) {
      searchTimeout = setTimeout(() => {
        // console.log(query);
        getSearchResult(query);
      }, 500);
    } else setSearcResultBooks([]);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/myreads" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(e) => searchBooks(e.target.value.trim())}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <BooksList
          shelfBooks={searchResultBooks}
          changeBookShelf={updateShelf}
        />
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  myBooks: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired,
};

export default SearchPage;
