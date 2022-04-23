import React from 'react';
import { connect } from 'react-redux';
import { albumSearch } from '../store';

class AlbumSearch extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(ev) {
    ev.preventDefault();
    this.props.albumSearch();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>press me</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    albumSearch: (searchString) => {
      return dispatch(albumSearch(searchString));
    },
  };
};

export default connect(null, mapDispatchToProps)(AlbumSearch);
