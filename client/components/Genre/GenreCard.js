import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
grey;

const GenreCard = (props) => {
  const { name, albumImg, artist } = props;
  console.log(name);
  return (
    <Card
      sx={{
        mx: 2,
        minWidth: 300,
        maxWidth: 300,
        minHeight: 560,
        maxHeight: 560,
      }}
      elevation={0}
      square
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='300'
          width='300'
          image={albumImg}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div' noWrap>
            {name}
          </Typography>
          <Typography gutterBottom variant='h6' component='div' noWrap>
            <i>{artist}</i>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{ color: grey[800] }} size='small' color='primary'>
          View This Album >
        </Button>
      </CardActions>
    </Card>
  );
};

export default GenreCard;
