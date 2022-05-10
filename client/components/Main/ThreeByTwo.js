import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ThreeByTwoCard from './ThreeByTwoCard';

const ThreeByTwo = () => {
  let albumsArr = [];
  const albums = useSelector((state) => state.albums);
  const genres = [
    'Pop',
    'Hip Hop',
    'Rock',
    'Electronic',
    'Blues',
    'Stage & Screen',
    'Jazz',
    'Reggae',
  ];

  const albumGenres = (genres, albums) => {
    const dispAlbums = [];
    albums &&
      genres.forEach((genre) => {
        const albumArr = albums.find((album) => album.genre === genre);
        dispAlbums.push(albumArr);
      });

    return dispAlbums;
  };
  albumsArr = albumGenres(genres, albums);
  console.log(albumsArr && albumsArr);
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
            <Box sx={{ m: 1 }}>SHOP THE HOTTEST VINYL GENRES</Box>
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
              <Grid
                key={album && album.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
              >
                <ThreeByTwoCard
                  albumGenre={album && album.genre}
                  albumImg={album && album.albumArt}
                  albumId={album && album.id}
                />
              </Grid>
            ))}
          {/* <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <ThreeByTwoCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <ThreeByTwoCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <ThreeByTwoCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <ThreeByTwoCard />
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThreeByTwo;
