import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';

const MiddleNav = () => {
  const isLoggedIn = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  const handleClick = (cart) => {
    dispatch(logout(cart));
  };
  const user = useSelector((state) => state.auth);

  return (
    <AppBar
      sx={{
        height: 50,
        bgcolor: grey[100],
        boxShadow: 0,
        pb: 8,
      }}
      position='static'
    >
      <Container maxWidth='xl'>
        <Toolbar>
          <Grid container>
            <Grid
              sx={{
                color: 'black',
                display: { xs: 'flex', lg: 'none' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
              xs={12}
              lg={6}
              item
            >
              &nbsp;&nbsp;&nbsp;&nbsp; <b>$2.00 Shipping</b>&nbsp; on all
              albums&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              <b>Free Shipping</b>&nbsp; on all other orders over $75
            </Grid>
            <Grid
              sx={{
                color: 'black',
                display: { xs: 'none', lg: 'flex' },
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              lg={6}
              item
            >
              &nbsp;&nbsp;&nbsp;&nbsp; <b>$2.00 Shipping</b>&nbsp; on all
              albums&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              <b>Free Shipping</b>&nbsp; on all other orders over $75
            </Grid>
            {/* Nav Buttons Fullscreen */}
            <Grid
              sx={{
                color: 'black',
                display: { xs: 'none', lg: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              lg={6}
              item
            >
              <nav>
                {isLoggedIn && user.isAdmin === false ? (
                  <div>
                    {/* The navbar will show these links after you log in */}
                    <Link to='/home'>
                      {' '}
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Home
                      </Typography>
                    </Link>
                    <a
                      href='#'
                      onClick={() => {
                        return handleClick();
                      }}
                    >
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Logout
                      </Typography>
                    </a>
                    <Link to='/profile'>
                      {' '}
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Profile
                      </Typography>
                    </Link>
                    <Link to='/cart'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Cart(0)
                      </Typography>
                    </Link>
                    <Link to='/albums/search'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Search
                      </Typography>
                    </Link>
                  </div>
                ) : isLoggedIn && user.isAdmin === true ? (
                  <div>
                    {/* The navbar will show these links after you log in */}
                    <Link to='/home'>
                      {' '}
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Home
                      </Typography>
                    </Link>
                    <a
                      href='#'
                      onClick={() => {
                        return handleClick();
                      }}
                    >
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Logout
                      </Typography>
                    </a>
                    <Link to='/profile'>
                      {' '}
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Profile
                      </Typography>
                    </Link>
                    <Link to='/users'>
                      <Typography sx={{ color: 'royalBlue' }} variant='p'>
                        Users
                      </Typography>
                    </Link>
                    <Link to='/inventory'>
                      <Typography sx={{ color: 'royalBlue' }} variant='p'>
                        Inventory
                      </Typography>
                    </Link>
                    <Link to='/cart'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Cart(0)
                      </Typography>
                    </Link>
                    <Link to='/albums/search'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Search
                      </Typography>
                    </Link>
                  </div>
                ) : (
                  <div>
                    {/* The navbar will show these links before you log in */}

                    <a
                      href={`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_ID} `}
                    >
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Login via GitHub
                      </Typography>
                    </a>

                    <Link to='/login'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Login
                      </Typography>
                    </Link>
                    <Link to='/signup'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Sign Up
                      </Typography>
                    </Link>
                    <Link to='/cart'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Cart(0)
                      </Typography>
                    </Link>
                    <Link to='/albums/search'>
                      <Typography sx={{ color: 'black' }} variant='p'>
                        Search
                      </Typography>
                    </Link>
                  </div>
                )}
              </nav>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MiddleNav;
