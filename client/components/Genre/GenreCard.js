import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const GenreCard = (props) => {
  const { name, albumImg, artist, albumId } = props;

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
          alt='Album Art Coming Soon'
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
        <Link to={`/album/${albumId}`}>
          <Button sx={{ color: grey[800] }} size='small' color='primary'>
            View This Album >
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default GenreCard;
