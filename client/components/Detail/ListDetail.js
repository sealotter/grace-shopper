import { Box, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import GenreCard from '../Genre/GenreCard';

const ListDetail = () => {
  const location = useLocation();
  const id = location && location.pathname.split('/').pop();
  const albums = useSelector((state) => state.albums);

  const data = (id, albums) => {
    const dispAlbum = albums && albums.find((album) => album.id === +id);
    //console.log(dispAlbum);
    return dispAlbum;
  };

  //     albumArt,
  //     albumDetails,
  //     albumName,
  //     artistName,
  //     genre,
  //     style,
  //     trackList,
  //     year,

  const album = albums && data(id, albums);
  const alsoCount = 3;
  const genreArr = [];
  let j = 0;
  for (let i = 0; i < alsoCount + 1; i++) {
    while (album && albums && id && albums[j].genre !== album.genre) {
      j++;
    }
    console.log(albums[j] && albums[j].id, +id);
    albums[j] && albums[j].id !== +id ? genreArr.push(albums[j]) : null;
    j++;
  }
  console.log(genreArr && genreArr);
  return (
    <Container maxWidth='xl'>
      <Grid container>
        <Grid container item xs={8}>
          {/* THIS IS THE LEFT COLUMN */}
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={12}
            md={6}
          >
            <Card sx={{ width: '90vh' }} elevation={0}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  image={album?.albumArt}
                  alt='Album Art Coming Soon'
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid>{/* 3 Genres */}</Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={12}
            md={12}
          >
            <Card sx={{}} elevation={0}>
              <CardActionArea>
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    {album?.albumDetails}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>{' '}
          <Typography variant='h5' color='text.secondary'>
            YOU MAY ALSO LIKE
          </Typography>
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
            {genreArr &&
              genreArr.map((album) => (
                <Grid
                  key={album && album.id}
                  sx={{
                    mx: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  item
                  xs={12}
                  sm={5}
                  md={4}
                  lg={3}
                  xl={3}
                >
                  <GenreCard
                    name={album && album.albumName}
                    albumImg={album && album.albumArt}
                    albumId={album && album.id}
                    artist={album && album.artistName}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid sx={{}} container item xs={4}>
          {/* THIS IS THE RIGHT COLUMN */}
          <Grid sx={{ minWidth: '100%' }}>
            <Card sx={{}} elevation={0}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {album?.albumName}
                  </Typography>
                  <Typography gutterBottom variant='h6' component='div'>
                    <i>{album?.artistName}</i>
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {album?.albumDetails}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListDetail;
