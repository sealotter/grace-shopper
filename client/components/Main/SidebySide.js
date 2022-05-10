import { Box, Container, Grid } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const SideBySide = () => {
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
    <Grid
      container
      sx={{ mt: 2, bgcolor: grey[300], maxHeight: '155vh', width: '100%' }}
    >
      {/* grid and card maxHeight should be equal adjust right before smallest breakpoint */}
      <Grid
        sx={{
          display: 'flex',
          bgcolor: grey[300],
          maxHeight: '75vh',
          minHeight: '75vh',
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
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              bgcolor: grey[300],
              maxHeight: '75vh',
              minHeight: '75vh',
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
              VINYL COLLECTOR
            </Typography>
            <Typography variant='h3' component='div'>
              vi{bull}nyl
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              /ˈvīnl/ <i>noun</i>
            </Typography>

            <Typography variant='body2'>
              vinyl is a vibe, mood and lifestyle.
              <br />
              {'"I collect vinyl IYKYK"'}
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
      <Grid
        sx={{ bgcolor: red[300], maxHeight: '75vh', width: '100%' }}
        item
        xs={12}
        lg={8}
      >
        <Card sx={{ maxHeight: '100%' }}>
          <CardActionArea>
            <CardMedia
              sx={{ bgcolor: grey[300], maxHeight: '75vh', width: '100%' }}
              component='img'
              //   height='140'
              image='https://wdet.org/wp-content/uploads/2019/09/cri_000000319870.jpg'
            />
            <CardContent></CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SideBySide;
