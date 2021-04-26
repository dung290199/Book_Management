import React, { FC } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBook } from '../../redux/actions/bookAction';

const BookMenu: FC = (props) => {
  const isLogin = useSelector((state: any) => state.authReducer.isLogin); 

  return (
    <>
      <h1>BookMenu</h1>
      {
        isLogin
          ? (
            <ul>
              <li>
                <Link to="/books/all">Get All Books</Link>
              </li>
              <li>
                <Link to="/books/new">Add a new book</Link>
              </li>
            </ul>)
          : <Redirect to="/" />
      }
      
    </>
  );
};

export default BookMenu;