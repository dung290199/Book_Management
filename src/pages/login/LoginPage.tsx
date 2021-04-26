import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authAction';
import { Link, Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const LoginPage: FC = (props) => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [isValidate, setIsValidate] = useState(false);

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const validate = (username: string, password: string) => {
  }

  function handleChange(e: React.ChangeEvent<any>): void {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value }))
  }

  function handleSubmit(e: React.ChangeEvent<any>): void {
    e.preventDefault();

    setIsValidate(user.username !== "" || user.password !== "");
     if (!isValidate) {
      console.log("you have to enter the login!!");
    }
  }

  useEffect(() => {
    if (isValidate) {
      dispatch(login(user, props));
    }
  }, [isValidate]);

  return (
    <>
      {
        !isLogin
          ? (
            <div className="c-app c-default-layout flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md="8">
                    <CCardGroup>
                      <CCard className="p-4">
                        <CCardBody>
                          <CForm onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <p className="text-muted">Sign In to your account</p>
                            <CInputGroup className="mb-3">
                              <CInput type="text" name="username" value={user.username} placeholder="Username" onInput={handleChange} />
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                              <CInput type="password" name="password" value={user.password} placeholder="Password" onInput={handleChange} />
                            </CInputGroup>
                            <CRow>
                              <CCol xs="6">
                                <CButton type="submit" color="primary" className="px-4">Login</CButton>
                              </CCol>
                              <CCol xs="6" className="text-right">
                                <CButton color="link" className="px-0">Forgot password?</CButton>
                              </CCol>
                            </CRow>
                          </CForm>
                        </CCardBody>
                      </CCard>
                      <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                        <CCardBody className="text-center">
                          <div>
                            <h2>Sign up</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                              labore et dolore magna aliqua.</p>
                            <Link to="/register">
                              <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                            </Link>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </CRow>
              </CContainer>
            </div>
          ) 
          : <Redirect to="/home" />
      }
    </>
  );
};

export default LoginPage;