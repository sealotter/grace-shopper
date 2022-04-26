import React from "react";
import { connect } from "react-redux";
import { loadAlbums } from "../store/albums";
import Cart from "./Cart";

/**
 * COMPONENT
 */
export const Home = ({ auth }) => {
  return (
    <div>
      <h3>Welcome, {auth.firstName}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */

export default connect((state) => state)(Home);
