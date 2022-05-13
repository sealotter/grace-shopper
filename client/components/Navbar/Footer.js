import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Footer = () => {
  const name = useSelector((state) => state.auth.firstName);
  return (
    <AppBar
      sx={{
        height: 50,
        bgcolor: grey[300],
        boxShadow: 0,
        pb: 8,
      }}
      position='static'
    >
      <Container maxWidth='xl'>
        <Toolbar>
          <Grid sx={{}} container direction='row' alignItems='center'>
            <Grid
              item
              sx={{
                display: { xs: 'flex' },
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              xs={0}
              md={4}
            ></Grid>
            <Grid
              item
              sx={{
                display: { xs: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
              xs={6}
              md={4}
            >
              {' '}
              By Janae, Lisa, Anna & Eric &nbsp;&nbsp;&nbsp;&nbsp;
            </Grid>
            <Grid
              item
              sx={{
                display: { xs: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              xs={6}
              md={4}
            ></Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Footer;
