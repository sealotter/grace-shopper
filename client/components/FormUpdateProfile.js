import {
  Container,
  Grid,
  Typography,
  CssBaseline,
  FormControl,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readProfile } from '../store/profile/actionsProfile';

const FormUpdateProfile = () => {
  const token = window.localStorage.getItem('token');
  const profile = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readProfile(token));
  }, []);
  console.log(profile);

  const handleSubmit = () => {};
  const theme = createTheme();

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <TextField
          required
          id='outlined-required'
          label='Required'
          defaultValue='Hello World'
        />
        <TextField
          disabled
          id='outlined-disabled'
          label='Disabled'
          defaultValue='Hello World'
        />
        <TextField
          id='outlined-password-input'
          label='Passwordd'
          type='password'
          autoComplete='current-password'
        />
        <TextField
          id='outlined-read-only-input'
          label='Read Only'
          defaultValue='Hello World'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='outlined-number'
          label='Number'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id='outlined-search' label='Search field' type='search' />
        <TextField
          id='outlined-helperText'
          label='Helper text'
          defaultValue='Default Value'
          helperText='Some important text'
        />
      </div>
      <div>
        <TextField
          required
          id='filled-required'
          label='Required'
          defaultValue='Hello World'
          variant='filled'
        />
        <TextField
          disabled
          id='filled-disabled'
          label='Disabled'
          defaultValue='Hello World'
          variant='filled'
        />
        <TextField
          id='filled-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='filled'
        />
        <TextField
          id='filled-read-only-input'
          label='Read Only'
          defaultValue='Hello World'
          InputProps={{
            readOnly: true,
          }}
          variant='filled'
        />
        <TextField
          id='filled-number'
          label='Number'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
        <TextField
          id='filled-search'
          label='Search field'
          type='search'
          variant='filled'
        />
        <TextField
          id='filled-helperText'
          label='Helper text'
          defaultValue='Default Value'
          helperText='Some important text'
          variant='filled'
        />
      </div>
      <div>
        <TextField
          required
          id='standard-required'
          label='Required'
          defaultValue='Hello World'
          variant='standard'
        />
        <TextField
          disabled
          id='standard-disabled'
          label='Disabled'
          defaultValue='Hello World'
          variant='standard'
        />
        <TextField
          id='standard-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
        />
        <TextField
          id='standard-read-only-input'
          label='Read Only'
          defaultValue='Hello World'
          InputProps={{
            readOnly: true,
          }}
          variant='standard'
        />
        <TextField
          id='standard-number'
          label='Number'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          variant='standard'
        />
        <TextField
          id='standard-search'
          label='Search field'
          type='search'
          variant='standard'
        />
        <TextField
          id='standard-helperText'
          label='Helper text'
          defaultValue='Default Value'
          helperText='Some important text'
          variant='standard'
        />
      </div>
    </Box>
  );

  //   return (
  //     <ThemeProvider theme={theme}>
  //       <Container component="main" maxWidth="md">
  //         <CssBaseline />
  //         <Box
  //           sx={{
  //             marginTop: 8,
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Typography component="h1" variant="h5">
  //             Update {profile.firstName} {profile.lastName}
  //           </Typography>
  //           <TextField id="outlined-basic" label="Outlined" variant="outlined" />
  //           <form onSubmit={handleSubmit}>
  //             <TextField
  //               id="outlined-basic"
  //               label="Outlined"
  //               variant="outlined"
  //             />
  //             <Grid container spacing={2}>
  //               <Grid item xs={12} sm={6}>
  //                 <TextField
  //                   inputProps={{ maxLength: 20 }}
  //                   autoComplete="given-name"
  //                   name="firstName"
  //                   fullWidth
  //                   id="firstName"
  //                   label={profile.firstName}
  //                   autoFocus
  //                 />
  //               </Grid>
  //               <Grid item xs={12} sm={6}>
  //                 <TextField
  //                   inputProps={{ maxLength: 20 }}
  //                   fullWidth
  //                   id="lastName"
  //                   label={profile.lastName}
  //                   name="lastName"
  //                   autoComplete="family-name"
  //                 />
  //               </Grid>
  //             </Grid>
  //           </form>
  //         </Box>
  //       </Container>
  //     </ThemeProvider>
  //   );
};

export default FormUpdateProfile;
