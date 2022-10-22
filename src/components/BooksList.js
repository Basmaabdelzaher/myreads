import PropTypes from "prop-types";
import Book from "./Book";

const BooksList = ({ title, shelfBooks, changeBookShelf }) => {
  return (
    <div className="bookshelf">
      {title && <h2 className="bookshelf-title">{title}</h2>}
      {shelfBooks && (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                changeBookShelf={changeBookShelf}
              />
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

BooksList.prototype = {
  title: PropTypes.string,
  shelfBooks: PropTypes.array,
  changeBookShelf: PropTypes.func.isRequired,
};
export default BooksList;
