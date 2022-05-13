import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import BarSearch from '../Search/BarSearch';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const pages = ['Home', 'Logout', 'Cart'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BottomNav = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isLoggedIn = useSelector((state) => state.auth.id);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    handleClose();
  }, [isLoggedIn]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (cart) => {
    dispatch(logout(cart));
  };

  const user = useSelector((state) => state.auth);

  return (
    <AppBar
      sx={{
        bgcolor: 'white',
        boxShadow: 0,
      }}
      position='static'
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid container>
            <Grid
              item
              sx={{
                display: { xs: 'flex', lg: 'none' },
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              xs={1}
              md={1}
            >
              {/* Hamburger Icon */}
              <Box>
                <IconButton
                  sx={{ color: 'black' }}
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <nav>
                    {isLoggedIn && user.isAdmin === false ? (
                      <div>
                        {/* The navbar will show these links after you log in */}
                        <Link to='/login'>
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
                        <Link to='/albums/search'>
                          <Typography sx={{ color: 'black' }} variant='p'>
                            Search
                          </Typography>
                        </Link>
                        <Link to='/cart'>
                          <Typography
                            sx={{
                              color: 'black',
                            }}
                            variant='p'
                          >
                            Cart
                          </Typography>
                        </Link>
                      </div>
                    ) : isLoggedIn && user.isAdmin === true ? (
                      <div>
                        {/* The navbar will show these links after you log in */}
                        <Link to='/login'>
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
                        <Link to='/albums/search'>
                          <Typography sx={{ color: 'black' }} variant='p'>
                            Search
                          </Typography>
                        </Link>
                        <Link to='/cart'>
                          <Typography sx={{ color: 'black' }} variant='p'>
                            Cart
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

                        <Button onClick={handleOpen}>
                          <Typography sx={{ color: 'black' }} variant='p'>
                            Login
                          </Typography>
                        </Button>
                        {/* <Link to='/login'>
                        <Typography sx={{ color: 'black' }} variant='p'>
                          Login
                        </Typography>
                      </Link> */}
                        <Link to='/signup'>
                          <Typography sx={{ color: 'black' }} variant='p'>
                            Sign Up
                          </Typography>
                        </Link>
                        <Link to='/albums/search'>
                          <Typography sx={{ color: 'black' }} variant='p'>
                            Search
                          </Typography>
                        </Link>
                        <Link to='/cart' onClick={handleCloseNavMenu}>
                          <MenuItem>
                            <Typography sx={{ color: 'black' }} variant='p'>
                              Cart
                            </Typography>
                          </MenuItem>
                        </Link>
                      </div>
                    )}
                  </nav>
                  {/* {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        href='/cart'
                        textAlign='center'
                        sx={{ color: 'black' }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))} */}
                </Menu>
              </Box>
            </Grid>
            <Grid
              sx={{
                color: 'black',
                display: { xs: 'none', lg: 'flex' },
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              item
              xs={5}
              lg={6}
            >
              {/* Grace Vinyl Logo Desktop */}
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  display: { xs: 'none', lg: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                  alignItems: 'center',
                }}
              >
                Grace Vinyl
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: { xs: 'flex', lg: 'none' },
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              item
              xs={6}
              md={5}
            >
              {/* Mobile Grace Vinyl Logo */}
              <Typography
                variant='h5'
                noWrap
                component='a'
                href='/'
                sx={{
                  // mr: 2,
                  display: { xs: 'flex', lg: 'none' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                Grace Vinyl
              </Typography>
            </Grid>

            <Grid
              sx={{
                color: 'black',
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              item
              md={6}
            >
              <BarSearch />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default BottomNav;
