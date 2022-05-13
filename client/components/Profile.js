import React from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import ProfileUpdate from './ProfileUpdate';
import { green, grey } from '@mui/material/colors';
Typography;

const Profile = ({ carts, auth, albums, lineItems }) => {
  return (
    <div>
      <Container component='main' maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <Box
              sx={{
                marginTop: 6,
                marginBottom: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ProfileUpdate />
            </Box>
          </Grid>
          <Grid sx={{ marginTop: 15 }} item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card
              sx={{
                bgcolor: grey[50],
                padding: 2,
              }}
              elevation={0}
            >
              <Typography component='h1' variant='h5'>
                Previous Orders
              </Typography>
              <CardActionArea>
                <CardContent>
                  {carts
                    .filter(
                      (cart) => cart.userId === auth.id && cart.isPurchased
                    )
                    .map((cart) => {
                      return (
                        <div key={cart.id}>
                          <Typography gutterBottom variant='h6' component='div'>
                            Order Id: {cart.id}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant='body'
                            component='div'
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;Date:{' '}
                            <i>{cart.updatedAt.slice(0, 10)}</i>
                          </Typography>

                          <ul>
                            {lineItems
                              ? lineItems
                                  .filter((item) => item.cartId === cart.id)
                                  .map((item) => {
                                    return (
                                      <div key={item.id}>
                                        ALBUM:{' '}
                                        {albums.length
                                          ? albums.find(
                                              (album) =>
                                                album.id === item.albumId
                                            ).albumName
                                          : ''}{' '}
                                        x {item.quantity}
                                      </div>
                                    );
                                  })
                              : ''}
                          </ul>
                          <Typography
                            sx={{ color: green[400] }}
                            gutterBottom
                            variant='h6'
                            component='div'
                          >
                            Total: <b>${cart.purchasedTotal}</b>
                          </Typography>
                        </div>
                      );
                    })}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default connect((state) => state)(Profile);
