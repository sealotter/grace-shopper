import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// import { createStudent } from '../store/students/studentActions';
import { readProfile } from '../store/profile/actionsProfile';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect } from 'react';

export default function ProfileUpdate() {
  const token = window.localStorage.getItem('token');
  const profile = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readProfile(token));
  }, []);

  // const history = useHistory();

  // const student = useSelector((state) => state.student.student);

  // const [campusSelect, setCampusSelect] = React.useState('');
  // const handleChange = (ev) => {
  //   setCampusSelect(ev.target.value);
  // };

  // const campuses = useSelector((state) => state.campus.campuses);
  const handleSubmit = (event) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const payload = {
    //   id: student.id,
    //   firstName:
    //     data.get('firstName') === ''
    //       ? student.firstName
    //       : data.get('firstName'),
    //   lastName:
    //     data.get('lastName') === '' ? student.lastName : data.get('lastName'),
    //   email: data.get('email') === '' ? student.email : data.get('email'),
    //   gpa: data.get('gpa') === '' ? student.gpa : data.get('gpa'),
    //   imageUrl:
    //     data.get('imageUrl') === '' ? student.imageUrl : data.get('imageUrl'),
    //   bio: data.get('bio') === '' ? student.bio : data.get('bio'),
    //   campusId: campusSelect == '' ? student.campusId : campusSelect,
    // };
    // dispatch(updateStudent(payload));
    // setTimeout(function () {
    //   history.push('/');
    // }, 750);
  };

  // console.log(profile);

  // const theme = createTheme();

  // const firstNameRef = React.useRef(profile.firstName);
  // const lastNameRef = React.useRef(null);
  // const emailRef = React.useRef(null);
  // const gpaRef = React.useRef(null);
  // const imageUrlRef = React.useRef(null);
  // const bioRef = React.useRef(null);
  // const campusRef = React.useRef(null);

  // const [campusSelect, setCampusSelect] = React.useState('');

  // const handleChange = (ev) => {
  //   setCampusSelect(ev.target.value);
  // };

  // const handleSubmit = (event) => {
  //   // event.preventDefault();
  //   // const data = new FormData(event.currentTarget);
  //   // const payload = {
  //   //   firstName: data.get('firstName'),
  //   //   lastName: data.get('lastName'),
  //   //   email: data.get('email'),
  //   //   gpa: data.get('gpa'),
  //   //   imageUrl: data.get('imageUrl'),
  //   //   bio: data.get('bio'),
  //   //   campusId: campusSelect,
  //   // };
  //   // dispatch(createStudent(payload));
  //   // firstNameRef.current.value = '';
  //   // lastNameRef.current.value = '';
  //   // imageUrlRef.current.value = '';
  //   // emailRef.current.value = '';
  //   // gpaRef.current.value = '';
  //   // bioRef.current.value = '';
  //   // campusRef.current.value = '';
  // };

  // //   const campuses = useSelector((state) => state.campus.campuses);

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
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

            {/* <Grid item xs={12}>
              <TextField
                inputProps={{ maxLength: 490 }}
                fullWidth
                name='imageUrl'
                label={profile.imageUrl}
                type='imageUrl'
                id='imageUrl'
                autoComplete='photo'
              />
            </Grid> */}
            {/* <Grid item xs={12}>
              <TextField
                inputProps={{ maxLength: 990 }}
                fullWidth
                name='bio'
                label={profile.bio}
                id='bio'
                multiline
                rows={3}
              />
            </Grid> */}
            {/* {profile.campusId ? (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='create-label'>Campus</InputLabel>
                  <Select
                    labelId='create-label'
                    id='demo-simple-select'
                    label='Campus'
                    value={campusSelect}
                    onChange={handleChange}
                  >
                    {campuses &&
                      campuses.map((campus) => (
                        <MenuItem key={campus.id} value={campus.id}>
                          {campus.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{ maxLength: 4 }}
                    fullWidth
                    id='gpa'
                    label={student.gpa}
                    name='gpa'
                    autoComplete=''
                  />
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  UPDATE
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='create-label'>Required</InputLabel>
                  <Select
                    required
                    labelId='create-label'
                    id='demo-simple-select'
                    label='Campus'
                    value={campusSelect}
                    onChange={handleChange}
                  >
                    {campuses &&
                      campuses.map((campus) => (
                        <MenuItem key={campus.id} value={campus.id}>
                          {campus.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <Grid item xs={12}>
                    <TextField
                      required
                      inputProps={{ maxLength: 4 }}
                      fullWidth
                      id='gpa'
                      label={student.gpa}
                      name='gpa'
                      autoComplete=''
                    />
                  </Grid>
                </FormControl>

                <Button
                  disabled={campusSelect == ''}
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  UPDATE
                </Button>
              </Grid>
            )} */}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
