import React from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/Navbar/BottomNav';
import Footer from './components/Navbar/Footer';
import MiddleNav from './components/Navbar/MiddleNav';
import TopNav from './components/Navbar/TopNav';
import Routes from './Routes';
//import Cart from './components/Cart';

const App = () => {
  return (
    <div>
      <TopNav />
      <MiddleNav />
      <BottomNav />
      {/* <Navbar /> */}
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
