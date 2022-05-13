import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Login } from '../AuthForm';

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

const MiddleNav = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isLoggedIn = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  React.useEffect(() => {
    handleClose();
  }, [isLoggedIn]);

  const handleClick = (cart) => {
    dispatch(logout(cart));
  };
  const user = useSelector((state) => state.auth);

  return (
    <div>
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
                      <Link to='/albums/searchresults'>
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
                      <Link to='/albums/searchresults'>
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
                      <Link to='/albums/searchresults'>
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
                  )}
                </nav>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'
              >
                Please Login
              </Typography>
              <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                <Login />
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
export default MiddleNav;
