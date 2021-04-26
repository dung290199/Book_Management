import React, { useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const UserMenu: FC = (props) => {
  const isLogin = useSelector((state: any) => state.authReducer.isLogin); 

  return (
    <>
      <h1>UserMenu</h1>
      {
        isLogin
          ? (
            <ul>
              <li>
                <Link to="/users/all">Get All Users</Link>
              </li>
              <li>
                <Link to="/users/new">Add a new user</Link>
              </li>
            </ul>)
          : <Redirect to="/" />
      }
    </>
  );
};

export default UserMenu;