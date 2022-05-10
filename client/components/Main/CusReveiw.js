import { Box, Container, Grid } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const CusReview = () => {
  const bull = (
    <Box
      component='span'
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    //   Add the card medias maxHeight vh for  grid container vh
    <Grid container sx={{ maxHeight: '120vh', width: '100%' }}>
      {/* grid and card maxHeight should be equal adjust right before smallest breakpoint */}
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
          <Box sx={{ m: 1 }}>VINYL PARADISE</Box>
        </Typography>
      </Grid>
      <Grid sx={{ maxHeight: '50vh', width: '100%' }} item xs={12} lg={8}>
        <Card sx={{ maxHeight: '100%' }}>
          <CardActionArea>
            <CardMedia
              sx={{ bgcolor: grey[300], maxHeight: '55vh', width: '100%' }}
              component='img'
              //   height='140'
              image='https://c.stocksy.com/a/yfC700/z9/1717026.jpg'
            />
            <CardContent></CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid
        sx={{
          display: 'flex',
          bgcolor: grey[50],
          maxHeight: '50vh',
          minHeight: '50vh',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        container
        item
        xs={12}
        lg={4}
      >
        <Card
          sx={{
            display: 'flex',
            maxHeight: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          elevation={0}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              bgcolor: grey[50],
              maxHeight: '55vh',
              minHeight: '55vh',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: grey[800],
              }}
              variant='h4'
              gutterBottom
            >
              GACE VINYL
            </Typography>

            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              <i>Grace Has The Music We Love. </i>
            </Typography>
          </CardContent>
          {/* <CardActionArea>
            <CardMedia
              sx={{ bgcolor: grey[300], maxHeight: '50vh', width: '100%' }}
              component='img'
              //   height='140'
              //   image='https://wdet.org/wp-content/uploads/2019/09/cri_000000319870.jpg'
            />
            <CardContent>Hello</CardContent>
          </CardActionArea> */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CusReview;
