import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readProfile } from '../store/profile/actionsProfile';

const Profile = () => {
  const token = window.localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readProfile(token));
  });

  return <h1>Hello Profile</h1>;
};

export default Profile;
