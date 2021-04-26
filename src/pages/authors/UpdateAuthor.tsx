import React, { useState, FC, useEffect } from 'react';
import { updateAuthor } from '../../redux/actions/authorAction';
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
import { Author } from '../../types/Model';
import { AuthorErrorProps } from '../../types/Error';

const UpdateAuthor: FC<{history: any, match: any}> = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const data = useSelector((state: any) => state.authorReducer.author);

  const [isValidate, setIsValidate] = useState(false);
  const [author, setAuthor] = useState<Author> ({...data});

  const [error, setError] = useState<AuthorErrorProps<boolean>> ({
    name: false,
    birthday: false
  });

  const { name, website, birthday, cover } = data ? data : "";

  const handleAuthorChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    setAuthor({
      ...author,
      [name]: value
    });
  }

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await validate(author);
  }

  const validate = async (author: Author) => {
    setError({
      name: author.name === "",
      birthday: author.birthday === ""
    });
    setIsValidate(author !== null 
      && (Object.values(error)
              .filter(val => !val)
              .length !== 0)
    );
  }

  const update = async () => {
    const newAuthor = {
      ...author,
      cover: null
    }

    const status = await dispatch(updateAuthor(JSON.stringify(newAuthor), +props.match.params.id));
    if (+status === 200) {
      props.history.push("/authors/all");        
    }
    console.log("status: ", status);
    
  }

  useEffect(() => {
    if (isValidate) {
      update();
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
                    <h2>Author Information</h2>
                  </CCardHeader>
                  <CForm onSubmit={handleSubmit}>
                    <CCardBody>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="name">Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.name} id="name" name="name" value={author.name} onChange={handleAuthorChange} />
                          <CInvalidFeedback>Name cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="birthday">Birthday</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.birthday} id="birthday" name="birthday" value={author.birthday} onChange={handleAuthorChange} />
                          <CInvalidFeedback>Birthday cannot be empty</CInvalidFeedback>
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
                        Save changes
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

export default UpdateAuthor;