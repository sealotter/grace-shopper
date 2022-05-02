import React, { useEffect } from 'react';

import FormUpdateProfile from './FormUpdateProfile';

import Stack from '@mui/material/Stack';
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
            marginLeft: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button variant='text'>Text</Button>
          <Button variant='contained'>Contained</Button>
          <Button variant='outlined'>Outlined</Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <TextField id='outlined-basic' label='Outlined' variant='outlined' />

        <ProfileUpdate />
      </Grid>
    </Grid>
  );
};

export default Profile;
