import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { readProfile, updateProfile } from '../store/profile/actionsProfile';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { grey } from '@mui/material/colors';

export default function ProfileUpdate() {
  const token = window.localStorage.getItem('token');
  const profile = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readProfile(token));
  }, []);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const payload = {
      token,
      firstName:
        data.get('firstName') === ''
          ? profile.firstName
          : data.get('firstName'),
      lastName:
        data.get('lastName') === '' ? profile.lastName : data.get('lastName'),
      email: data.get('email') === '' ? profile.email : data.get('email'),
      address:
        data.get('address') === '' ? profile.address : data.get('address'),
      password: data.get('password') === '' ? null : data.get('password'),
    };

    dispatch(updateProfile(payload));
    setTimeout(function () {
      history.push('/');
    }, 750);
  };

  return (
    <Container component='main' maxWidth='md'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Update {profile.firstName} {profile.lastName}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={{ maxLength: 20 }}
                autoComplete='given-name'
                name='firstName'
                fullWidth
                id='firstName'
                label={profile.firstName}
                autoFocus
                helperText='First Name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={{ maxLength: 20 }}
                fullWidth
                id='lastName'
                label={profile.lastName}
                name='lastName'
                autoComplete='family-name'
                helperText='Last Name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ maxLength: 250 }}
                fullWidth
                id='email'
                label={profile.email}
                name='email'
                autoComplete='email'
                helperText='Email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ maxLength: 250 }}
                fullWidth
                id='address'
                label={profile.address}
                name='address'
                autoComplete='street-address'
                helperText='Address'
              />
            </Grid>
            {profile.isOauthUser ? (
              ''
            ) : (
              <Grid item xs={12}>
                <TextField
                  inputProps={{ maxLength: 250 }}
                  fullWidth
                  id='password'
                  label='Password'
                  name='password'
                  helperText='Password'
                  autoComplete='new-password'
                />
              </Grid>
            )}
          </Grid>
          <Button
            sx={{
              bgcolor: 'black',
              ':hover': {
                bgcolor: grey[900], // background
                color: 'white', //text
              },
              mt: 3,
              mb: 2,
            }}
            type='submit'
            fullWidth
            variant='contained'
          >
            UPDATE
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
