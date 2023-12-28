import React from "react";
import Book from "./Book";

class BookList extends React.Component {
  render() {
    const { books, onUpdateList, list } = this.props;

    function filterBook(list) {
      return books.filter((book) => book.list === list.key);
    }
    return (
      <div className="book-list">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateList={onUpdateList} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default BookList;
