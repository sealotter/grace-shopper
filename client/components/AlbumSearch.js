import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { albumSearch } from '../store';

//genre dropdown, style dropdown, artistName field, albumName field, track name field

class AlbumSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      genre: '',
      style: '',
      artist: '',
      title: '',
      song: '',
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleOnClick(ev) {
    ev.preventDefault();
    this.props.albumSearch('testString');
  }

  render() {
    const { searchResults } = this.props;
    return (
      <div>
        <form>
          <select
            name="genre"
            placeholder="genre"
            value={this.state.genre}
            onChange={this.handleOnChange}
          >
            <option>select genre</option>
          </select>
          <select
            name="style"
            placeholder="style"
            value={this.state.style}
            onChange={this.handleOnChange}
          >
            <option>select style</option>
          </select>
          <input
            name="artist"
            placeholder="artist"
            value={this.state.artist}
            onChange={this.handleOnChange}
          ></input>
          <input
            name="album"
            placeholder="album"
            value={this.state.album}
            onChange={this.handleOnChange}
          ></input>
          <input
            name="song"
            placeholder="song"
            value={this.state.song}
            onChange={this.handleOnChange}
          ></input>
          <button onClick={this.handleOnClick}>submit</button>
        </form>
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
