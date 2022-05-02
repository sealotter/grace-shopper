import React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, TextField } from '@mui/material';
import ProfileUpdate from './ProfileUpdate';

const Profile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 5,
            marginLeft: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <ProfileUpdate />
      </Grid>
    </Grid>
  );
};

export default Profile;
