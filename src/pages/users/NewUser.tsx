import React, { useState, FC, useEffect } from 'react';
import { createUser } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInvalidFeedback,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react';
import { UserErrorProps } from '../../types/Error';
import { User } from '../../types/Model';

const NewUser: FC<{history: any}> = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)

  const [isValidate, setIsValidate] = useState(false);
  const [user, setUser] = useState<User> (
    {
      name: "",
      username: "",
      password: "",
      role: ""
    }
  );

  const [error, setError] = useState<UserErrorProps<boolean>> ({
    name: false,
    username: false,
    password: false,
    role: false
  });

  const handleUserChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await validate(user);
  }

  const validate = async (user: User) => {
    setError({
      name: user.name === "",
      password: user.password === "",
      username: user.username === "",
      role: user.role === ""
    });
    setIsValidate(user !== null 
      && (Object.values(error)
              .filter(val => !val)
              .length !== 0)
    )
  }

  const create = async () => {
    const status = await dispatch(createUser(user));
    switch (+status) {
      case 200:
        props.history.push("/users/all");
        break;
      default:
        console.log("Username existed");
        break;
    }
  }

  useEffect(() => {
    if (isValidate) {
      create();
    }
  }, [error, isValidate])

  return (
    <>
      {
        !isLogin
          ? <Redirect to="/" />
          : (
            <CRow className="justify-content-md-center">
              <CCol xs="12" sm="6">
                <CCard>
                  <CCardHeader>
                    <h2>User Information</h2>
                  </CCardHeader>
                  <CForm onSubmit={handleSubmit}>
                    <CCardBody>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="name">Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.name} id="name" name="name" value={user.name} onChange={handleUserChange} />
                          <CInvalidFeedback>Name cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="username">Username</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.username} id="username" name="username" value={user.username} onChange={handleUserChange} />
                          <CInvalidFeedback>Username cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="password">Password</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.password} id="password" name="password" value={user.password} onChange={handleUserChange} />
                          <CInvalidFeedback>Password cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="role">Role</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.role} id="role" name="role" value={user.role} onChange={handleUserChange} />
                          <CInvalidFeedback>Role cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                    </CCardBody>
                    <CCardFooter>
                      <CButton 
                        type="submit"
                        size="md"
                        shape="pill"
                        color="info"
                      >
                        Create
                      </CButton> 
                      <CButton
                        size="md"
                        shape="pill"
                        color="danger"
                        onClick={() => props.history.goBack()}
                      >
                        Cancel
                      </CButton>
                    </CCardFooter>
                  </CForm>
                </CCard>
              </CCol>
            </CRow>
          )
      }
    </>
  )
};

export default NewUser;