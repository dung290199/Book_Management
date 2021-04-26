import React, { useState, FC, useEffect } from 'react';
import { createCategory } from '../../redux/actions/categoryAction';
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
import { Category } from '../../types/Model';
import { CategoryErrorProps } from '../../types/Error';

const NewCategory: FC<{history: any}> = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)

  const [isValidate, setIsValidate] = useState(false);
  const [category, setCategory] = useState<Category> (
    {
      name: "",
      description: "",
    }
  );

  const [error, setError] = useState<CategoryErrorProps<boolean>> ({
    name: false,
    description: false
  })

  const handleCategoryChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    
    setCategory({
      ...category,
      [name]: value
    });
    
  }

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await validate(category);
  }

  const validate = async (category: Category) => {
    setError({
      name: category.name === "",
      description: category.description === ""
    });
    setIsValidate(category !== null 
      && (Object.values(error)
              .filter(val => !val)
              .length !== 0)
    );
  }

  const create = async () => {
    const status = await dispatch(createCategory(JSON.stringify(category)));      
    if (+status === 200) {
      props.history.push("/categories/all");
    }
  }

  useEffect(() => {
    if (isValidate) {
      create();
    }
  }, [error, isValidate]);

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
                    <h2>category Information</h2>
                  </CCardHeader>
                  <CForm onSubmit={handleSubmit}>
                    <CCardBody>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="name">Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.name} id="name" name="name" value={category.name} onChange={handleCategoryChange} />
                          <CInvalidFeedback>Name cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="description">Description</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.description} id="description" name="description" value={category.description} onChange={handleCategoryChange} />
                          <CInvalidFeedback>Description cannot be empty</CInvalidFeedback>
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

export default NewCategory;