import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CNavLink,
  CDropdown,
  CForm,
  CInput,
  CButton,
  CImg
} from '@coreui/react'

const NavBar = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  return (
    <>
      {
        isLogin
          ? (
            <CNavbar expandable="sm" color="info" >
              <CNavbarBrand>
                Book Management
              </CNavbarBrand>
              <CNavbarNav>
                <CNavLink to="/home">Home</CNavLink>
                <CDropdown inNav >
                  <CDropdownToggle color="primary">
                    User
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/users/all">Users</CNavLink>
                    </CDropdownItem>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/users/new">New User</CNavLink>
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown inNav >
                  <CDropdownToggle color="primary">
                    Book
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/books/all">Books</CNavLink>
                    </CDropdownItem>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/books/new">New Book</CNavLink>
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown inNav >
                  <CDropdownToggle color="primary">
                    Author
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/authors/all">Authors</CNavLink>
                    </CDropdownItem>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/authors/new">New Author</CNavLink>
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown inNav >
                  <CDropdownToggle color="primary">
                    Category
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/categories/all">Categories</CNavLink>
                    </CDropdownItem>
                    <CDropdownItem>
                      <CNavLink className="text-dark" to="/categories/new">New Category</CNavLink>
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavbarNav>
              <CNavbarNav className="ml-auto">
                <CForm inline>
                  <CInput
                    className="mr-sm-2"
                    placeholder="Search"
                    size="sm"
                  />
                  <CButton color="light" className="my-2 my-sm-0" type="submit">Search</CButton>
                </CForm>
                {
                  isLogin
                    ? <CNavLink className="text-white" to="/" onClick={() => dispatch(logout())} >Logout</CNavLink>
                    : <CNavLink className="text-white" to="/" >Sign in</CNavLink>
                }
              </CNavbarNav>
            </CNavbar>
          )
          : null
      }
    </>
  );
}

export default NavBar;