import React from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

class BookSearch extends React.component {
  state = {
    searchResults: [],
    query: "",
  };

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query });

    if (query.length > 0) {
      BooksAPI.search(query.trim()).then((searchResults) => {
        if (searchResults.error) {
          this.setState({ searchResults: [] });
        } else {
          this.setState({ searchResults: searchResults });
        }
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    const { books, onUpdateList } = this.props;
    const { searchResults, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.clearQuery}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((searchResult) => {
              let shelf = "none";

              books.map((book) =>
                book.id === searchResult.id ? (shelf = book.list) : ""
              );

              return (
                <li key={searchResult.id}>
                  <Book book={searchResult} onUpdateList={onUpdateList} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookSearch;
