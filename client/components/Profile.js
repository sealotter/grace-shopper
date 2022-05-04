import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import ProfileUpdate from './ProfileUpdate';

const Profile = () => {
  return (
    <Container component='main' maxWidth='md'>
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
  );
};

export default Profile;
