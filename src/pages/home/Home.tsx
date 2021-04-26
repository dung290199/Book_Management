import React, { FC } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage: FC<{history: any}> = (props) => {
  const isLogin = useSelector((state: any) => state.authReducer.isLogin); 

  return (
    <>
      <h1>Menu:</h1>
      {
        isLogin
        ? (
          <ul>
            <li>
              <Link to="/users">User</Link>
            </li>
            <li>
              <Link to="/books">Book</Link>
            </li>
            <li>
              <Link to="/authors">Author</Link>
            </li>
            <li>
              <Link to="/categories">Category</Link>
            </li>
          </ul>
          )
        : <Redirect to="/" />
      }
      
    </>
  );
};

export default HomePage;