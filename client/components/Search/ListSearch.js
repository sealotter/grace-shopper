import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ThreeByTwoCard from '../Genre/GenreCard';

const ListSearch = () => {
  const searchResults = useSelector((state) => state.searchResults);
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
            <Box sx={{ m: 1 }}>GET THEM WHILE SUPPLIES LAST </Box>
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
          {searchResults &&
            searchResults.map((album) => (
              <div key={album && album.id}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <ThreeByTwoCard
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

export default ListSearch;
