import PropTypes from "prop-types";
const Book = ({ book, changeBookShelf }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: book.imageLinks? `url(${book.imageLinks.thumbnail})` : '',
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => changeBookShelf(book, e.target.value)}>
              <option disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.map((author, index) => <span key={index}>{author} <br /></span>)}
        </div>
      </div>
    </li>
  );
};

Book.PropTyoes = {
  book: PropTypes.object.isRequired,
  changeBookShelf: PropTypes.func.isRequired
}
export default Book;
