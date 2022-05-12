import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';

const TopNav = () => {
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
            justifyContent='center'
            alignItems='center'
          >
            Save 10% Sitewide! &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              sx={{
                bgcolor: 'black',
              }}
              variant='contained'
            >
              Code: GRACESHOPPER
            </Button>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopNav;
