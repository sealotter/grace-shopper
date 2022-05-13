import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GenreCard from './GenreCard';

const GenreList = () => {
  let albumsArr = [];
  const location = useLocation();
  const genre = location && location.pathname.slice(7);
  const albums = useSelector((state) => state.albums);

  const albumGenres = (genre, albums) => {
    const dispAlbums =
      albums && albums.filter((album) => album.genre === genre);

    return dispAlbums;
  };
  albumsArr = albumGenres(genre, albums);
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            my: 2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Typography variant='h4' component='div'>
            <Box sx={{ m: 1 }}>SHOP THE HOTTEST {genre}</Box>
          </Typography>
        </Grid>
        <Grid
          container
          item
          spacing={2}
          xs={12}
          sx={{
            my: 2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          {/* {albumsArr && albumsArr[2].id} */}
          {albumsArr &&
            albumsArr.map((album) => (
              <div key={album && album.id}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <GenreCard
                    name={album && album.albumName}
                    albumImg={album && album.albumArt}
                    artist={album && album.artistName}
                    albumId={album && album.id}
                  />
                </Grid>
              </div>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GenreList;
