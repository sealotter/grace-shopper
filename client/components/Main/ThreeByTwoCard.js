import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const ThreeByTwoCard = (props) => {
  const { albumGenre, albumImg, albumId } = props;
  return (
    <Link to={`/genre/${albumGenre}`}>
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
            <Typography gutterBottom variant='h5' component='div'>
              {albumGenre}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button sx={{ color: grey[800] }} size='small' color='primary'>
            Shop this genre >
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ThreeByTwoCard;

//<Link to={`/albums/${album.id}`}>
