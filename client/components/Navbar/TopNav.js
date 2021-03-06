import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const TopNav = () => {
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
          <Grid
            sx={{
              color: 'black',
            }}
            container
            direction='row'
            alignItems='center'
          >
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
              Save 10% Sitewide! &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                sx={{
                  bgcolor: 'black',
                  ':hover': {
                    bgcolor: grey[900], // background
                    color: 'white', //text
                  },
                }}
                variant='contained'
              >
                Code: GRACESHOPPER
              </Button>
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
            >
              {name && name ? `Hello ${name}` : ''}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopNav;
