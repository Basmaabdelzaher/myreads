import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BooksList from "../components/BooksList";

const MyBooksPage = ({ myBooks, changeBookShelf }) => {
  const filterBooksByShelf = (shelfName) =>
    myBooks.filter((book) => book.shelf === shelfName);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {myBooks.length > 0 ? (
            <div>
              <BooksList
                title={"Currently Reading"}
                shelfBooks={filterBooksByShelf("currentlyReading")}
                changeBookShelf={changeBookShelf}
              />
               <BooksList
                title={"Want to Read"}
                shelfBooks={filterBooksByShelf("wantToRead")}
                changeBookShelf={changeBookShelf}
              />
              <BooksList
                title={"read"}
                shelfBooks={filterBooksByShelf("read")}
                changeBookShelf={changeBookShelf}
              />
            </div>
          ) : (
            <h2 style={{'padding': '0 20px 40px'}}>Loading, Please wait...</h2>
          )}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

MyBooksPage.propTypes = {
  myBooks: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};

export default MyBooksPage;
