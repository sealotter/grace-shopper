import React from 'react';
import { connect } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import ProfileUpdate from './ProfileUpdate';

const Profile = ({ carts, auth, albums, lineItems }) => {
  return (
    <div>
      <Container component="main" maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <Box
              sx={{
                marginTop: 8,
                marginBottom: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ProfileUpdate />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <div>Previous Orders:</div>
      <ul>
        {carts
          .filter((cart) => cart.userId === auth.id && cart.isPurchased)
          .map((cart) => {
            return (
              <li key={cart.id}>
                cart id: {cart.id}, purchased: {cart.updatedAt.slice(0, 10)}
                <ul>
                  {lineItems
                    ? lineItems
                        .filter((item) => item.cartId === cart.id)
                        .map((item) => {
                          return (
                            <li key={item.id}>
                              album:{' '}
                              {albums.length
                                ? albums.find(
                                    (album) => album.id === item.albumId
                                  ).albumName
                                : ''}{' '}
                              x {item.quantity}
                            </li>
                          );
                        })
                    : ''}
                </ul>
                <div>total: ${cart.purchasedTotal}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default connect((state) => state)(Profile);
