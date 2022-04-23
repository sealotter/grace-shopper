import React from 'react';

class AlbumSearch extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(ev) {
    ev.preventDefault();
    console.log('clicked');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>press me</button>
      </div>
    );
  }
}

export default AlbumSearch;
