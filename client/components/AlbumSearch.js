import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { albumSearch } from '../store';

class AlbumSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      // searchResults: [],
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(ev) {
    ev.preventDefault();
    this.props.albumSearch('testString');
  }

  render() {
    const { searchResults } = this.props;
    return (
      <div>
        <button onClick={this.handleOnClick}>press me</button>
        <div>
          {searchResults.length ? (
            <ol>
              {searchResults.map((album) => {
                return (
                  <li key={album.id}>
                    <div>
                      {album.albumName}, {album.artistName}
                    </div>
                    <Link to={`/albums/${album.id}`}>
                      <img src={album.thumbNail}></img>
                    </Link>
                  </li>
                );
              })}
            </ol>
          ) : (
            ''
          )}
        </div>
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
