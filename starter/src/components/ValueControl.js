import React from "react";

class ValueControl extends React.Component {
  state = {
    value: this.props.book.list,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onUpdateList(this.props.book, event.target.value);
  };

  render() {
    return (
      <div className="value-control">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="none" disabled>
            Move to..
          </option>
          <option value="wantToRead">Want to Read</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="read">Read</option>
        </select>
      </div>
    );
  }
}

export default ValueControl;
