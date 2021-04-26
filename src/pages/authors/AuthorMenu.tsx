import React, { useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Author: FC = (props) => {
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  return (
    <>
      <h1>Author</h1>
      {
        isLogin
          ? (
            <ul>
              <li>
                <Link to="/authors/all">Get All Authors</Link>
              </li>
              <li>
                <Link to="/authors/new">Add a new Authors</Link>
              </li>
            </ul>)
          : <Redirect to="/" />
      }
    </>
  );
};

export default Author;