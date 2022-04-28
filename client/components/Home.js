import React from "react";
import { connect } from "react-redux";
import { loadAlbums } from "../store/albums";
import Cart from "./Cart";
import AlbumList from './AlbumList';

/**
 * COMPONENT
 */
export const Home = ({ auth }) => {
  return (
    <div>
      <h3>Welcome, {auth.firstName}</h3>
      <AlbumList />
    </div>
  );
};

/**
 * CONTAINER
 */

export default connect((state) => state)(Home);
