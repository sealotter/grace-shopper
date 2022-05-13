import { Grid } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useLocation } from 'react-router-dom';

const SideBySideGenre = () => {
  const location = useLocation();
  const genre = location && location.pathname.slice(7);

  return (
    //   Add the card medias maxHeight vh for  grid container vh
    <Grid
      container
      sx={{ mt: 2, bgcolor: grey[300], maxHeight: '105vh', width: '100%' }}
    >
      {/* grid and card maxHeight should be equal adjust right before smallest breakpoint */}
      <Grid
        sx={{
          display: 'flex',
          bgcolor: grey[300],
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
              bgcolor: grey[300],
              maxHeight: '50vh',
              minHeight: '50vh',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: grey[50],
              }}
              variant='h4'
              gutterBottom
            >
              SHOP VINYL
            </Typography>
            <Typography variant='h3' component='div'>
              RELEASES
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              <i>mood music</i>
            </Typography>

            <Typography
              sx={{
                color: grey[50],
              }}
              variant='h4'
              component='div'
            >
              <i>{genre}</i>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        sx={{ bgcolor: red[300], maxHeight: '50vh', width: '100%' }}
        item
        xs={12}
        lg={8}
      >
        <Card sx={{ maxHeight: '100%' }}>
          <CardActionArea>
            <CardMedia
              sx={{ bgcolor: grey[300], maxHeight: '50vh', width: '100%' }}
              component='img'
              //   height='140'
              image='https://media2.miaminewtimes.com/mia/imager/u/original/9703310/radio_active_records_ian_wilten.jpg'
            />
            <CardContent></CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SideBySideGenre;
