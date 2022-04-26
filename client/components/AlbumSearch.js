import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { albumSearch } from '../store';

class AlbumSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      genre: '',
      style: '',
      artist: '',
      title: '',
      track: '',
      genres: [
        'Rock',
        'Electronic',
        'Hip Hop',
        'Folk',
        'Country',
        'Jazz',
        'Funk',
        'Soul',
        'Pop',
        'Latin',
        'Classical',
        'Reggae',
        'Blues',
        'Stage & Screen',
      ],
      styles: [],
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleOnSelect(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleOnClick(ev) {
    ev.preventDefault();
    const { genre, style, artist, title, track } = this.state;
    const searchString = `&genre=${genre}&style=${style}&artist=${artist}&title=${title}&track=${track}`;
    this.props.albumSearch(searchString);
  }

  render() {
    const { searchResults } = this.props;
    const { genres } = this.state;
    return (
      <div>
        <form>
          {/* //took out these selectors because I think they are unnecessary */}
          {/* <select
            name="genre"
            placeholder="genre"
            value={this.state.genre}
            onChange={this.handleOnSelect}
          >
            {genres.map((genre, i) => {
              return <option key={i}>{genre}</option>;
            })}
          </select> */}
          {/* <select
            name="style"
            placeholder="style"
            value={this.state.style}
            onChange={this.handleOnChange}
          >
            <option>select style</option>
          </select> */}
          <input
            name="artist"
            placeholder="artist"
            value={this.state.artist}
            onChange={this.handleOnChange}
          ></input>
          <input
            name="title"
            placeholder="album title"
            value={this.state.title}
            onChange={this.handleOnChange}
          ></input>
          <input
            name="track"
            placeholder="song"
            value={this.state.track}
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
