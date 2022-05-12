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

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const BottomNav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign='center' sx={{ color: 'black' }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
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
              {/* SEARCH BAR */}
              <BarSearch />
              {/* Avatar Setting Menu */}
              {/* <Box sx={{ flexGrow: 0, justifyContent: 'flex-end' }}>
                <Tooltip title='Open settings'>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, justifyContent: 'flex-end' }}
                  >
                    <Avatar alt='G' src='/static/images/avatar/2.jpg' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign='center'
                        sx={{
                          color: 'black',
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box> */}
            </Grid>

            {/* Pages menu */}
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default BottomNav;
