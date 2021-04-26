import React, { useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


const CategoryMenu: FC = (props) => {
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  return (
    <>
      <h1>Category</h1>
      {
        isLogin
          ? (
            <ul>
              <li>
                <Link to="/categories/all">Get All Categorys</Link>
              </li>
              <li>
                <Link to="/categories/new">Add a new Category</Link>
              </li>
            </ul>)
          : <Redirect to="/" />
      }
    </>
  );
};

export default CategoryMenu;