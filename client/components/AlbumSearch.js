import React from 'react';
import { connect } from 'react-redux';
import { albumSearch } from '../store';

class AlbumSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.albums.length && prevProps !== this.props) {
      console.log(this.props.albums);
      // this.setState({searchResults: xxx})
    }
  }

  handleOnClick(ev) {
    ev.preventDefault();
    this.props.albumSearch();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>press me</button>
        <div></div>
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

export default connect((state) => state, mapDispatchToProps)(AlbumSearch);
