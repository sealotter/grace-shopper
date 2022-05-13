import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import GenreCard from '../Genre/GenreCard';
import { green, grey } from '@mui/material/colors';
import { createItem, updateItem } from '../../store';

const ListDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const location = useLocation();
  const id = location && location.pathname.split('/').pop();
  const albums = useSelector((state) => state.albums);
  const lineItems = useSelector((state) => state.linItems);
  const selectedCart = useSelector((state) => state.selectedCart);
  const dispatch = useDispatch();

  const data = (id, albums) => {
    const dispAlbum = albums && albums.find((album) => album.id === +id);

    return dispAlbum;
  };

  const album = albums && data(id, albums);
  const alsoCount = 3;
  const genreArr = [];
  let j = 0;
  for (let i = 0; i < alsoCount + 1; i++) {
    while (album && albums && id && albums[j].genre !== album.genre) {
      j++;
    }

    albums[j] && albums[j].id !== +id ? genreArr.push(albums[j]) : null;
    j++;
  }

  const addToCart = () => {
    const item =
      lineItems && lineItems.find((item) => item.albumId === album.id);
    if (item && item.quantity < album.availableInventory) {
      dispatch(updateItem({ ...item, quantity: ++item.quantity }));
      setTimeout(function () {
        history.push('/cart');
      }, 750);
    } else if (!item) {
      dispatch(createItem(selectedCart.id, +id));
      setTimeout(function () {
        history.push('/cart');
      }, 750);
    } else {
      this.setState({ errors: 'No more albums in inventory' });
      setTimeout(function () {
        history.push('/cart');
      }, 750);
    }
  };

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
                  <Typography
                    sx={{ color: green[400] }}
                    gutterBottom
                    variant='h6'
                    component='div'
                  >
                    <b>${album?.price}</b>
                  </Typography>
                  <Typography
                    sx={{}}
                    gutterBottom
                    variant='body'
                    component='div'
                  >
                    <b>GENRE </b>
                    {album?.genre}
                  </Typography>
                  <Typography
                    sx={{}}
                    gutterBottom
                    variant='body'
                    component='div'
                  >
                    <b>YEAR </b>
                    {album?.year}
                  </Typography>
                  {album && album.style ? (
                    <Typography
                      sx={{ mt: 1 }}
                      gutterBottom
                      variant='body'
                      component='div'
                    >
                      <b>STYLE </b>
                      <i>{album?.style}</i>
                    </Typography>
                  ) : (
                    ''
                  )}
                  <Button
                    sx={{
                      mt: 2,
                      bgcolor: 'black',
                      ':hover': {
                        bgcolor: grey[800], // background
                        color: 'white', //text
                      },
                    }}
                    size='small'
                    variant='contained'
                    onClick={addToCart}
                  >
                    <Typography sx={{ color: 'White' }} variant='p'>
                      ADD TO CART
                    </Typography>
                  </Button>
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
