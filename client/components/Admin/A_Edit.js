import React from 'react';
import { connect } from 'react-redux';
import { updateAdmin } from '../../store/albums';

class EditAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.album ? this.props.album.price : '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.album && this.props.album) {
      this.setState({ price: this.props.album.price });
    }
  }
  onSubmit(evt) {
    evt.preventDefault();
    this.props.updateAdmin({ ...this.props.album, ...this.state });
  }
  render() {
    const { price } = this.state;
    const { onSubmit } = this;

    return (
      <form id='price-change' onSubmit={onSubmit}>
        <input
          placeholder='album price'
          value={price}
          onChange={(ev) => this.setState({ price: ev.target.value })}
        ></input>
        <button type='submit'>Update</button>
      </form>
    );
  }
}

const mapState = (state, { match }) => {
  const albums = state.albums;
  const album = albums.find((a) => a.id === match.params.id * 1);

  return {
    album,
  };
};

const mapDispatch = (dispatch, { match }) => {
  return {
    updateAdmin: (album) => {
      album = { ...album, id: match.params.id };
      dispatch(updateAdmin(album));
    },
  };
};

export default connect(mapState, mapDispatch)(EditAlbum);
