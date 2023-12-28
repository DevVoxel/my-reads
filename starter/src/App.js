import "./App.css";
import { Route } from "react-router-dom";
import React from "react";
import * as BooksAPI from "./BooksAPI";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";

class BookApp extends React.Component {
  state = {
    books: [],
  };

  bookValues = [
    { key: "currentlyReading", shelfName: "Currently Reading" },
    { key: "wantToRead", shelfName: "Want to Read" },
    { key: "read", shelfName: "Read" },
  ];

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateList(book, list) {
    BooksAPI.update(book, list).then(() => {
      this.getBooks();
    });

    if (list === "none") {
      this.setState({
        books: this.state.books.filter((b) => b.id !== book.id),
      });
    }
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/MyReads/"
          render={() => (
            <BookList
              books={books}
              getAllBooks={this.getAllBooks}
              list={list}
              changeShelve={this.updateList}
            />
          )}
        />
        <Route
          path="/MyReads/search"
          render={() => (
            <BookSearch
              getAllBooks={this.getAllBooks}
              books={books}
              searchBook={this.searchBook}
              searchBookList={searchBookList}
              updateList={this.updateList}
            />
          )}
        />
      </div>
    );
  }
}

export default BookApp;
