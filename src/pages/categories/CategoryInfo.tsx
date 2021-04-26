import React, { useState, FC, useEffect, Props } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategory, deleteCategory } from '../../redux/actions/categoryAction';
import { Redirect, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { Book } from '../../types/Model';

const CategoryInfo: FC<{history: any, match: any}> = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const category = useSelector((state: any) => state.categoryReducer.category)

  const [loading, setLoading] = useState(true);

  const handleDeleteCategory = async () => {
    const status = await dispatch(deleteCategory(+props.match.params.id));
    if (+status === 200) {
      props.history.push('/categories/all');
    }
  }

  const getCategoryInfo = async () => {
    const status = await dispatch(getCategory(+props.match.params.id));
      if (+status === 200) {
        setLoading(false);
      }
  }

  useEffect(() => {
    getCategoryInfo();
  }, [loading, dispatch]);

  return (
    <>
      {
        (isLogin && category)
        ? (
          <CRow className="justify-content-md-center">
            <CCol lg={8}>
              <CCard>
                <CCardHeader className="header">
                  <strong>Category Information</strong>
                  <div className="form-actions">
                    <CButton type="submit" size="md" shape="pill" color="info" onClick={() => props.history.push(`/categories/edit/${category.id}`)}>Update</CButton>
                    <CButton size="md" shape="pill" color="danger" onClick={handleDeleteCategory}>Remove</CButton>
                  </div>
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                      <tbody>
                        {
                          Object.keys(category).map((key, index) => {
                            const value = (key === "books" && category.books.length !== 0) 
                                          ? category.books.reduce((accum: string[], val: Book) => {
                                              accum.push(val.name);
                                              return accum;
                                            }, []).join(",")
                                          : category[key];    
                            return (
                              <tr key={index.toString()}>
                                <td>{`${key}:`}</td>
                                <td><strong>{value}</strong></td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )
        : isLogin
          ? <CircularProgress />
          : <Redirect to="/" />
      }
    </>
  );
};

export default CategoryInfo;